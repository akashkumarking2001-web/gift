import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Dimensions, Platform, KeyboardAvoidingView, Image } from 'react-native';
import { Text, Button, Surface, TextInput, ActivityIndicator, RadioButton } from 'react-native-paper';
import { Sparkles, Briefcase, CreditCard, CheckCircle2, ChevronLeft, Gift, Image as ImageIcon } from 'lucide-react-native';
import { useRouter, Stack } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { BusinessService } from '../../lib/businessService';
import MeshBackground from '../../components/MeshBackground';
import FloatingHearts from '../../components/FloatingHearts';

const SignupWorkflow = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [packages, setPackages] = useState<any[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<any>(null);

    // Development API Helper
    const API_BASE = process.env.EXPO_PUBLIC_API_URL || (Platform.OS === 'web' ? '' : '');
    
    // Form State
    const [logoUrl, setLogoUrl] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [instagramId, setInstagramId] = useState('');
    const [customDomain, setCustomDomain] = useState('');

    useEffect(() => {
        const fetchPackages = async () => {
            const data = await BusinessService.getPackages();
            setPackages(data);
            if (data.length > 0) setSelectedPackage(data[0]);
        };
        fetchPackages();

        // Check for return from payment
        if (typeof window !== 'undefined') {
            const urlParams = new URLSearchParams(window.location.search);
            const orderId = urlParams.get('order_id');
            const requestId = urlParams.get('request_id');
            if (orderId && requestId) {
                handlePostPayment(orderId, requestId);
            }
        }
    }, []);

    const handlePostPayment = async (orderId: string, requestId: string) => {
        setStep(3);
        setLoading(true);
        try {
            // 1. Verify Payment
            const resp = await fetch(`${API_BASE}/api/verify-cashfree-order?orderId=${orderId}`);
            const statusData = await resp.json();

            // Save transaction metadata for Admin Dashboard Monitoring
            await supabase.from('business_registration_requests')
                .update({ 
                    payment_status: statusData.order_status, 
                    payment_details: orderId,
                    admin_notes: JSON.stringify(statusData) 
                })
                .eq('id', requestId);

            if (statusData.order_status === 'PAID' || statusData.order_status === 'ACTIVE') {
                 // 2. Fetch the registration request to get the set password
                 const { data: request, error: reqError } = await supabase
                    .from('business_registration_requests')
                    .select('*')
                    .eq('id', requestId)
                    .single();

                 if (reqError) throw reqError;

                 // 3. Provision the account (Auto-Approve)
                 const { error: approveError } = await supabase.rpc('approve_business_request', {
                    p_request_id: requestId,
                    p_password: request.password_plain
                 });

                 if (approveError) throw approveError;

                 // 4. Redirect to Dashboard
                 const dashboardUrl = __DEV__ 
                    ? `http://${request.business_slug}.localhost:8080/dashboard`
                    : `https://${request.business_slug}.giftmagic.in/dashboard`; 
                 // In production, this would be https://slug.giftmagic.beauty/dashboard
                 
                 setTimeout(() => {
                     window.location.href = dashboardUrl;
                 }, 3000);
            } else {
                throw new Error('Payment not completed. Status: ' + statusData.order_status);
            }
        } catch (e: any) {
            Alert.alert('Activation Error', e.message);
            setStep(2); // Go back to try again
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    };

    const handlePackageSelect = (pkg: any) => {
        setSelectedPackage(pkg);
    };

    const handleStartPayment = () => {
        if (!selectedPackage) return;
        setLoading(true);
        // Simulate Cashfree Redirect
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    const handleSubmitRequest = async () => {
        console.log('[Signup] Starting submission...', { businessName, contactPerson, email, phone });
        if (!businessName || !contactPerson || !email || !password) {
            alert('Please fill in all required fields: Business Name, Owner Name, Email, and Password.');
            return;
        }

        setLoading(true);
        try {
            console.log('[Signup] 1. Creating database record...');
            const slug = generateSlug(businessName);
            const { data: request, error: regError } = await supabase
                .from('business_registration_requests')
                .insert({
                    business_name: businessName,
                    business_slug: slug,
                    contact_person: contactPerson,
                    email: email,
                    whatsapp_number: phone,
                    instagram_id: instagramId,
                    logo_url: logoUrl,
                    password_plain: password,
                    package_name: selectedPackage.name,
                    package_price: selectedPackage.price,
                    status: 'pending'
                })
                .select()
                .single();

            if (regError) throw regError;

            console.log('[Signup] 2. Creating Cashfree order...');
            const safePhone = (phone || '').replace(/[^0-9]/g, '').substring(0, 10) || '9999999999';
            const response = await fetch(`${API_BASE}/api/create-cashfree-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: selectedPackage.price,
                    customer_id: email.replace(/[^a-zA-Z0-9]/g, '_'),
                    customer_email: email,
                    customer_phone: safePhone,
                    registration_payload: {
                        request_id: request.id,
                        type: 'vendor_activation'
                    },
                    return_url: `${window.location.origin.replace('http://', 'https://')}/signup?request_id=${request.id}&order_id={order_id}`
                })
            });

            const orderData = await response.json();
            console.log('[Signup] Order Data received:', orderData);
            
            // Remove debug alert as we handle it with SDK
            if (orderData.payment_session_id) {
                console.log('[Signup] 3. Initializing Cashfree SDK Checkout...');
                const sessionId = orderData.payment_session_id;

                if (Platform.OS === 'web') {
                    // Inject SDK if not present
                    if (!(window as any).Cashfree) {
                        console.log('[Signup] Loading Cashfree SDK js...');
                        const script = document.createElement('script');
                        script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
                        script.async = true;
                        document.body.appendChild(script);
                        
                        await new Promise((resolve) => {
                            script.onload = resolve;
                        });
                    }

                    const mode = orderData.checkout_base?.includes('sandbox') ? 'sandbox' : 'production';
                    const cf = new (window as any).Cashfree({ mode });
                    cf.checkout({
                        paymentSessionId: sessionId,
                        returnUrl: `${window.location.origin}/signup?request_id=${request.id}&order_id={order_id}`
                    });
                } else {
                    // Fallback for native mobile platforms, try payment link or display message
                    const checkoutUrl = orderData.payment_link || `${orderData.checkout_base}/pg/view/checkout/${sessionId}`;
                    window.location.href = checkoutUrl;
                }
            } else {
                throw new Error(orderData.message || 'Failed to create payment session');
            }
        } catch (e: any) {
            console.error('[Signup] Error:', e);
            alert('Registration Error: ' + e.message);
        } finally {
            setLoading(false);
        }
    };

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <Text variant="headlineSmall" style={styles.stepTitle}>Choose Your Package</Text>
            <Text variant="bodyMedium" style={styles.stepSubtitle}>Select the fuel for your AR business (Live Prices)</Text>
            
            <ScrollView style={styles.packageList} showsVerticalScrollIndicator={false}>
                {packages.map((pkg) => (
                    <TouchableOpacity 
                        key={pkg.id} 
                        style={[styles.packageCard, selectedPackage?.id === pkg.id && styles.packageCardActive]}
                        onPress={() => handlePackageSelect(pkg)}
                    >
                        <View style={styles.packageHeader}>
                            <Briefcase size={20} color={selectedPackage?.id === pkg.id ? '#fff' : '#f04299'} />
                            <Text style={[styles.packageName, selectedPackage?.id === pkg.id && styles.textWhite]}>{pkg.name}</Text>
                        </View>
                        <Text style={[styles.packagePrice, selectedPackage?.id === pkg.id && styles.textWhite]}>₹{pkg.price}</Text>
                        <View style={styles.featureList}>
                            {pkg.features?.map((f: string, i: number) => (
                                <Text key={i} style={[styles.featureText, selectedPackage?.id === pkg.id && styles.textWhite70]}>• {f}</Text>
                            ))}
                        </View>
                    </TouchableOpacity>
                ))}
                <View style={{ height: 100 }} />
            </ScrollView>

            <Button 
                mode="contained" 
                onPress={handleStartPayment} 
                loading={loading}
                disabled={!selectedPackage || loading}
                style={styles.actionBtn}
                buttonColor="#f04299"
                contentStyle={styles.btnContent}
            >
                Continue for ₹{selectedPackage?.price || 0}
            </Button>
        </View>
    );

    const renderStep2 = () => (
        <ScrollView style={styles.stepContainer}>
            <Text variant="headlineSmall" style={styles.stepTitle}>Business Details</Text>
            <Text variant="bodyMedium" style={styles.stepSubtitle}>Your portal: {generateSlug(businessName || 'yourbusiness')}.giftmagic.in</Text>

            <View style={styles.form}>
                <View style={styles.logoUploadSection}>
                    <TouchableOpacity 
                        style={styles.logoPlaceholder}
                        onPress={async () => {
                            // Simplified web upload for local dev
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = async (e: any) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                try {
                                    setLoading(true);
                                    const key = `logos/${Date.now()}_${file.name}`;
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    
                                    const resp = await fetch('/api/upload-to-r2', {
                                        method: 'POST',
                                        headers: { 'x-key': key, 'x-bucket-type': 'ar-assets' },
                                        body: file
                                    });
                                    const data = await resp.json();
                                    setLogoUrl(data.url);
                                } finally { setLoading(false); }
                            };
                            input.click();
                        }}
                    >
                        {logoUrl ? <Image source={{ uri: logoUrl }} style={styles.logoImage} /> : <ImageIcon size={30} color="rgba(255,255,255,0.3)" />}
                    </TouchableOpacity>
                    <Text style={styles.logoLabel}>{logoUrl ? 'Logo Uploaded!' : 'Upload Business Logo'}</Text>
                </View>

                <Surface style={styles.inputSurface}>
                    <TextInput label="Business Name" value={businessName} onChangeText={setBusinessName} mode="flat" textColor="#fff" style={styles.input} underlineStyle={{ display: 'none' }} />
                </Surface>

                <Surface style={styles.inputSurface}>
                    <TextInput label="Owner Name" value={contactPerson} onChangeText={setContactPerson} mode="flat" textColor="#fff" style={styles.input} underlineStyle={{ display: 'none' }} />
                </Surface>

                <Surface style={styles.inputSurface}>
                    <TextInput label="Email Address" value={email} onChangeText={setEmail} keyboardType="email-address" mode="flat" textColor="#fff" style={styles.input} underlineStyle={{ display: 'none' }} />
                </Surface>

                <Surface style={styles.inputSurface}>
                    <TextInput label="Set Login Password" value={password} onChangeText={setPassword} secureTextEntry mode="flat" textColor="#fff" style={styles.input} underlineStyle={{ display: 'none' }} />
                </Surface>

                <Surface style={styles.inputSurface}>
                    <TextInput label="WhatsApp Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" mode="flat" textColor="#fff" style={styles.input} underlineStyle={{ display: 'none' }} />
                </Surface>

                <Surface style={styles.inputSurface}>
                    <TextInput label="Instagram ID (Optional)" value={instagramId} onChangeText={setInstagramId} mode="flat" textColor="#fff" style={styles.input} underlineStyle={{ display: 'none' }} />
                </Surface>

                <Button 
                    mode="contained" 
                    onPress={handleSubmitRequest} 
                    loading={loading}
                    style={styles.actionBtn}
                    buttonColor="#10b981"
                    contentStyle={styles.btnContent}
                >
                    Pay & Activate {selectedPackage?.name} Portal
                </Button>
            </View>
        </ScrollView>
    );

    const renderStep3 = () => (
        <View style={styles.successContainer}>
            <ActivityIndicator size="large" color="#10b981" />
            <Text variant="headlineMedium" style={styles.successTitle}>Activating Your Portal...</Text>
            <Text variant="bodyMedium" style={styles.successSubtitle}>
                We've received your payment! We are now setting up your studio dashboard and secure subdomain. 
                {"\n\n"}Please don't close this window.
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <MeshBackground />
            <FloatingHearts />
            
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.backBtn} onPress={() => step === 1 ? router.back() : setStep(step - 1)}>
                    <ChevronLeft color="#fff" size={24} />
                </TouchableOpacity>

                <View style={styles.header}>
                    <Text variant="labelLarge" style={styles.stepIndicator}>STEP {step} OF 3</Text>
                </View>

                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a060a' },
    overlay: { flex: 1, padding: 25 },
    backBtn: { marginTop: 40, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
    header: { marginTop: 20, alignItems: 'center' },
    stepIndicator: { color: '#f04299', letterSpacing: 2, fontWeight: 'bold' },
    stepContainer: { marginTop: 30, flex: 1 },
    stepTitle: { color: '#fff', fontWeight: 'bold' },
    stepSubtitle: { color: 'rgba(255,255,255,0.4)', marginTop: 8 },
    packageList: { marginTop: 30, gap: 15 },
    packageCard: { padding: 20, borderRadius: 20, backgroundColor: '#151015', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    packageCardActive: { backgroundColor: '#f04299', borderColor: '#f04299' },
    packageHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    packageName: { color: '#f04299', fontWeight: 'bold', marginLeft: 10, fontSize: 18 },
    packagePrice: { color: '#fff', fontSize: 24, fontWeight: '900', marginBottom: 10 },
    featureList: { gap: 5 },
    featureText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
    textWhite: { color: '#fff' },
    textWhite70: { color: 'rgba(255,255,255,0.7)' },
    actionBtn: { marginTop: 30, borderRadius: 16 },
    btnContent: { height: 60 },
    form: { marginTop: 30, gap: 15 },
    logoUploadSection: { alignItems: 'center', marginBottom: 20 },
    logoPlaceholder: { 
        width: 100, 
        height: 100, 
        borderRadius: 20, 
        backgroundColor: 'rgba(255,255,255,0.05)', 
        borderStyle: 'dashed', 
        borderWidth: 1, 
        borderColor: 'rgba(255,255,255,0.1)', 
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden' 
    },
    logoImage: { width: '100%', height: '100%' },
    logoLabel: { 
        color: 'rgba(255,255,255,0.4)', 
        fontSize: 10, 
        fontWeight: 'bold', 
        textTransform: 'uppercase', 
        marginTop: 8, 
        letterSpacing: 1 
    },
    inputSurface: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#151015' },
    input: { backgroundColor: 'transparent', height: 60 },
    successContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    successTitle: { color: '#fff', fontWeight: 'bold', marginTop: 20 },
    successSubtitle: { color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 15, lineHeight: 24 },
    backToLoginBtn: { marginTop: 40, borderColor: 'rgba(255,255,255,0.2)', width: '100%' }
});

export default SignupWorkflow;
