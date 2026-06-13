// v2 - Fix platform reference
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Dimensions, Animated, Platform } from 'react-native';
import { Text, TextInput, Button, Surface, ActivityIndicator, ProgressBar } from 'react-native-paper';
import { Upload, Image as ImageIcon, Video, CreditCard, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { uploadFileToR2 } from '../../lib/r2Client';
import * as WebBrowser from 'expo-web-browser';
import { API_CONFIG } from '../../lib/config';
import PermissionDisclosure from '../../components/PermissionDisclosure';

const { width } = Dimensions.get('window');

const CreateAlbumScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [targetImage, setTargetImage] = useState<string | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [pricing, setPricing] = useState({ price: 149, original_mrp: 499 });
    const [isCompiling, setIsCompiling] = useState(false);
    const [syncStatus, setSyncStatus] = useState('');
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [pendingMediaType, setPendingMediaType] = useState<'image' | 'video' | null>(null);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const { data: systemData } = await supabase
                    .from('system_settings')
                    .select('value')
                    .eq('key', 'album_pricing')
                    .maybeSingle();

                if (systemData?.value) {
                    try {
                        const priceObj = typeof systemData.value === 'string' 
                            ? JSON.parse(systemData.value) 
                            : systemData.value;
                        setPricing(priceObj);
                    } catch (e) {
                        const priceNum = Number(systemData.value);
                        setPricing({ 
                            price: priceNum, 
                            original_mrp: Math.round(priceNum * 1.5)
                        });
                    }
                    return;
                }
            } catch (err: any) {
                console.warn('[DEBUG] Pricing fetch error:', err.message);
            }
        };
        fetchPricing();
    }, []);

    const compileImagesToMind = async (uri: string): Promise<Blob> => {
        return new Promise(async (resolve, reject) => {
            if (Platform.OS !== 'web') {
                return resolve(new Blob());
            }

            try {
                // Try to find compiler in global scope first
                let CompilerClass = (window as any).MINDAR_COMPILER || (window as any).MINDAR?.Compiler;
                
                if (!CompilerClass) {
                    setSyncStatus('Initialising AR Engine...');
                    try {
                        // Use local library instead of CDN for reliability
                        const libUrl = "/mindar-image.js"; 
                        const script = document.createElement('script');
                        script.src = libUrl;
                        await new Promise((res, rej) => {
                            script.onload = res;
                            script.onerror = rej;
                            document.head.appendChild(script);
                        });
                        CompilerClass = (window as any).MINDAR?.Compiler;
                        if (CompilerClass) (window as any).MINDAR_COMPILER = CompilerClass;
                    } catch (e) {
                         console.error("Local library load failed, trying CDN...");
                         const libUrlCDN = "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image.prod.js";
                         const MINDARMod = await eval(`import("${libUrlCDN}")`);
                         CompilerClass = MINDARMod.Compiler || MINDARMod.default?.Compiler;
                    }
                }

                if (!CompilerClass) throw new Error("AR Engine (MindAR) not available. Please check your internet.");

                const img = new (window as any).Image();
                img.crossOrigin = "Anonymous";
                img.src = uri;
                await new Promise((res) => img.onload = res);

                const canvas = document.createElement('canvas');
                const maxDim = 800; 
                let width = img.width;
                let height = img.height;
                if (width > height && width > maxDim) {
                    height = (height * maxDim) / width;
                    width = maxDim;
                } else if (height > maxDim) {
                    width = (width * maxDim) / height;
                    height = maxDim;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                const compiler = new CompilerClass();
                await compiler.compileImageTargets([canvas], (progress: number) => {
                    setSyncStatus(`Processing AR: ${Math.floor(progress)}%`);
                });

                const buffer = compiler.exportData();
                resolve(new Blob([buffer], { type: 'application/octet-stream' }));
            } catch (err) {
                console.error("[AR ERROR]", err);
                reject(err);
            }
        });
    };

    const requestAndPickMedia = (type: 'image' | 'video') => {
        setPendingMediaType(type);
        setShowPermissionModal(true);
    };

    const pickMedia = async () => {
        const type = pendingMediaType;
        setShowPermissionModal(false);
        if (!type) return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            if (type === 'image') {
                setTargetImage(result.assets[0].uri);
            } else {
                setVideo(result.assets[0].uri);
            }
        }
    };

    const showAlert = (title: string, message: string) => {
        if (Platform.OS === 'web') {
            alert(message);
        } else {
            Alert.alert(title, message);
        }
    };

    const handleCreateAndPay = async () => {
        if (!name || !phone || !targetImage || !video) return;
        
        const cleanedPhone = phone.replace(/\D/g, '');
        setLoading(true);
        setSyncStatus('Preparing Secure Payment...');
        console.log('[CREATE] Order Phase Initiation...');

        try {
            // STEP 1: Create Order First (Immediate feedback - no upload yet)
            const timestamp = Date.now();
            const orderRes = await fetch(`${API_CONFIG.BASE_URL}/api/create-cashfree-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: pricing.price,
                    customer_id: user?.id || `guest_${timestamp}`,
                    customer_email: user?.email || 'guest@giftmagic.beauty',
                    customer_phone: cleanedPhone,
                    // No album_payload yet - we upload ONLY after success
                }),
            });

            if (!orderRes.ok) {
                const errText = await orderRes.text();
                throw new Error(`Payment Gateway Error: ${errText}`);
            }

            const res = await orderRes.json();
            const sessionId = res.payment_session_id;
            const orderId = res.order_id;
            const mode = res.checkout_base?.includes('sandbox') ? 'sandbox' : 'production';
            
            console.log('[CREATE] Order ID:', orderId, 'Mode:', mode);
            
            // STEP 2: Payment Execution
            if (Platform.OS === 'web') {
                setSyncStatus('Redirecting to Cashfree...');
                
                let cashfreeSDK = (window as any).Cashfree;
                if (!cashfreeSDK) {
                    console.log('[CREATE] Cashfree SDK missing, loading dynamically...');
                    try {
                        await new Promise((resolve, reject) => {
                            const script = document.createElement('script');
                            script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
                            script.onload = resolve;
                            script.onerror = reject;
                            document.head.appendChild(script);
                        });
                        cashfreeSDK = (window as any).Cashfree;
                    } catch (e) {
                        throw new Error('Failed to load Cashfree Payment SDK. Please check your internet.');
                    }
                }
                
                if (!cashfreeSDK) throw new Error('Cashfree SDK could not be initialized. Please refresh the page.');
                
                const cashfree = cashfreeSDK({ mode });
                
                // Open modal for faster feedback and state preservation
                console.log('[CREATE] Opening Modal...');
                await cashfree.checkout({
                    paymentSessionId: sessionId,
                    redirectTarget: '_modal', // Stay on page to keep files in memory
                });

                // STEP 3: Verification Post-Modal
                setSyncStatus('Verifying Transaction...');
                const verifyRes = await fetch(`${API_CONFIG.BASE_URL}/api/verify-cashfree-order?orderId=${orderId}`);
                const verifyData = await verifyRes.json();

                if (verifyData.order_status !== 'PAID') {
                    throw new Error('Payment not verified. If you have paid, please contact support with order ID: ' + orderId);
                }

                // STEP 4: SUCCESS! Now Process Assets (As requested: Upload ONLY after successful payment)
                setSyncStatus('Payment Success! Now setting up AR...');
                console.log('[CREATE] Payment Verified. Starting Upload...');

                const folder = `personal/${cleanedPhone}/${timestamp}`;
                
                setSyncStatus('Compiling Magic Engine...');
                const mindBlob = await compileImagesToMind(targetImage);
                
                setSyncStatus('Uploading Magical Assets...');
                const imgKey = `${folder}/target.jpg`;
                const vidKey = `${folder}/video.mp4`;
                const mindKey = `${folder}/targets.mind`;

                console.log('[CREATE] Uploading to R2...');
                const [imgUrl, vidUrl, mindUrl] = await Promise.all([
                    uploadFileToR2({ uri: targetImage }, imgKey, 'ar-assets'),
                    uploadFileToR2({ uri: video }, vidKey, 'ar-assets'),
                    mindBlob && mindBlob.size > 0 
                       ? uploadFileToR2(new File([mindBlob], 'targets.mind'), mindKey, 'ar-assets')
                       : Promise.resolve('')
                ]);

                // STEP 5: Finalize record in database
                const { error: finalErr } = await supabase.from('ar_albums').insert({
                    title: name,
                    phone_number: cleanedPhone,
                    image_url: imgUrl,
                    video_url: vidUrl,
                    mind_file_url: mindUrl,
                    amount_paid: pricing.price,
                    payment_status: 'paid',
                    cf_order_id: orderId,
                    user_id: user?.id || null,
                    is_active: true
                });

                if (finalErr) throw finalErr;

                console.log('[CREATE] Activation Complete!');
                showAlert('Success!', 'Your Magic Frame has been activated successfully!');
                router.push('/(user)/history');

            } else {
                // Mobile Native Flow (Redirect)
                const checkoutBase = mode === 'production' 
                    ? 'https://payments.cashfree.com/checkout'
                    : 'https://sandbox.cashfree.com/checkout';
                const checkoutUrl = `${checkoutBase}/?payment_session_id=${encodeURIComponent(sessionId)}`;
                await WebBrowser.openBrowserAsync(checkoutUrl);
                router.push({
                    pathname: '/(user)/history',
                    params: { order_id: orderId, auto_activate: 'true' }
                });
            }
        } catch (err: any) {
             console.error('[CREATE] SEVERE ERROR:', err);
             showAlert('Payment/Setup Interrupted', err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
            setSyncStatus('');
        }
    };

    const renderStep = () => {
        return (
            <View style={styles.formContainer}>
                <View style={styles.headerSection}>
                    <Sparkles size={32} color="#f04299" />
                    <Text variant="headlineMedium" style={styles.pageTitle}>Create Magic Frame</Text>
                    <Text variant="bodySmall" style={styles.pageSubtitle}>Bring your frames to life with AR</Text>
                </View>

                <Surface style={styles.inputCard} elevation={2}>
                    <TextInput label="Album Name" value={name} onChangeText={setName} mode="flat" style={styles.fieldInput} textColor="#fff" />
                    <TextInput label="Phone Number" value={phone} onChangeText={setPhone} mode="flat" style={styles.fieldInput} textColor="#fff" keyboardType="phone-pad" />
                </Surface>

                <View style={styles.mediaRow}>
                    <TouchableOpacity style={[styles.mediaBox, targetImage ? styles.mediaBoxActive as any : null]} onPress={() => requestAndPickMedia('image')}>
                        {targetImage ? <Image source={{ uri: targetImage }} style={styles.mediaPreview} /> : (
                            <View style={styles.mediaPlaceholder}><ImageIcon size={24} color="rgba(255,255,255,0.4)" /><Text style={styles.mediaText}>Photo</Text></View>
                        )}
                        {targetImage && <View style={styles.checkBadge}><CheckCircle2 size={12} color="#fff" /></View>}
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.mediaBox, video ? styles.mediaBoxActive as any : null]} onPress={() => requestAndPickMedia('video')}>
                        {video ? (
                            <View style={styles.mediaPlaceholder}><CheckCircle2 size={24} color="#f04299" /><Text style={[styles.mediaText, {color: '#f04299'}]}>Video Set</Text></View>
                        ) : (
                            <View style={styles.mediaPlaceholder}><Video size={24} color="rgba(255,255,255,0.4)" /><Text style={styles.mediaText}>Video</Text></View>
                        )}
                        {video && <View style={styles.checkBadge}><CheckCircle2 size={12} color="#fff" /></View>}
                    </TouchableOpacity>
                </View>

                <Surface style={styles.priceCard} elevation={1}>
                    <View style={styles.priceMain}>
                        <Text style={styles.priceLabel}>AR Activation Fee</Text>
                        <View style={styles.priceValues}>
                            <Text style={styles.originalMrp}>₹{pricing.original_mrp}</Text>
                            <Text style={styles.currentPrice}>₹{pricing.price}</Text>
                        </View>
                    </View>
                    <Text style={styles.priceDetail}>• Lifetime AR • High-quality hosting • Instant activation</Text>
                </Surface>

                <Button 
                    mode="contained" 
                    onPress={() => {
                        console.log('[DEBUG] Button Pressed. Name:', name, 'Phone:', phone);
                        if (!name) { showAlert('Entry Required', 'Name is required'); return; }
                        if (!phone) { showAlert('Entry Required', 'Phone is required'); return; }
                        if (!targetImage) { showAlert('Photo Required', 'Please select a photo'); return; }
                        if (!video) { showAlert('Video Required', 'Please select a video'); return; }
                        handleCreateAndPay();
                    }} 
                    loading={loading} 
                    disabled={loading} 
                    style={styles.mainActionBtn} 
                    contentStyle={styles.mainActionBtnContent} 
                    buttonColor="#f04299"
                >
                    {loading ? (syncStatus || 'Processing...') : `Pay ₹${pricing.price}`}
                </Button>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.patternOverlay} pointerEvents="none" />
            <ScrollView contentContainerStyle={styles.content}>{renderStep()}</ScrollView>
            <PermissionDisclosure 
                visible={showPermissionModal} 
                type={pendingMediaType === 'image' ? 'storage' : 'storage'} 
                onAccept={pickMedia} 
                onCancel={() => setShowPermissionModal(false)} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a060a' },
    patternOverlay: { ...StyleSheet.absoluteFillObject, opacity: 0.03, backgroundColor: '#000' },
    content: { padding: 20, flexGrow: 1, paddingBottom: 120 },
    formContainer: { gap: 20, paddingTop: 20 },
    headerSection: { alignItems: 'center' },
    pageTitle: { color: '#fff', fontWeight: '900', marginTop: 10 },
    pageSubtitle: { color: 'rgba(255,255,255,0.4)', textAlign: 'center' },
    inputCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 8 },
    fieldInput: { backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: 8, borderRadius: 12 },
    mediaRow: { flexDirection: 'row', gap: 15 },
    mediaBox: { flex: 1, aspectRatio: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, borderWidth: 2, borderColor: 'rgba(255,255,255,0.05)', borderStyle: 'dashed', overflow: 'hidden' },
    mediaBoxActive: { borderColor: 'rgba(240,66,153,0.4)', borderStyle: 'solid', backgroundColor: 'rgba(240,66,153,0.05)' },
    mediaPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
    mediaText: { color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 'bold' },
    mediaPreview: { width: '100%', height: '100%' },
    checkBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: '#f04299', borderRadius: 10, padding: 2 },
    priceCard: { backgroundColor: 'rgba(240,66,153,0.03)', borderRadius: 24, padding: 20 },
    priceMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    priceLabel: { color: 'rgba(255,255,255,0.7)', fontWeight: 'bold' },
    priceValues: { alignItems: 'flex-end' },
    originalMrp: { color: 'rgba(255,255,255,0.2)', textDecorationLine: 'line-through', fontSize: 12 },
    currentPrice: { color: '#f04299', fontSize: 24, fontWeight: '900' },
    priceDetail: { color: 'rgba(255,255,255,0.3)', fontSize: 10 },
    mainActionBtn: { borderRadius: 20, marginTop: 10, marginBottom: 20, zIndex: 999 },
    mainActionBtnContent: { height: 60 }
});

export default CreateAlbumScreen;
