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
                let CompilerClass = (window as any).MINDAR_COMPILER || (window as any).MINDAR?.Compiler;
                
                if (!CompilerClass) {
                    setSyncStatus('Initializing Engine...');
                    try {
                        const libUrl = "https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image.prod.js";
                        const MINDARMod = await eval(`import("${libUrl}")`);
                        CompilerClass = MINDARMod.Compiler || MINDARMod.default?.Compiler;
                        if (CompilerClass) (window as any).MINDAR_COMPILER = CompilerClass;
                    } catch (e) {
                         console.error("Native Module load failed, trying fallback injection...");
                    }
                }

                if (!CompilerClass) throw new Error("AR Engine not available. Please try on a modern browser.");

                const img = new (window as any).Image();
                img.crossOrigin = "Anonymous";
                img.src = uri;
                await new Promise((res) => img.onload = res);

                const canvas = document.createElement('canvas');
                const maxDim = 800; // Restored resolution for quality
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
                    setSyncStatus(`Compiling AR: ${Math.floor(progress)}%`);
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
            alert(`${title}: ${message}`);
        } else {
            Alert.alert(title, message);
        }
    };

    const handleCreateAndPay = async () => {
        if (!name || name.trim().length === 0) {
            showAlert('Missing Name', 'Please enter an album name.');
            return;
        }
        if (!phone) {
            showAlert('Missing Phone', 'Please enter a 10-digit mobile number.');
            return;
        }
        if (!targetImage) {
            showAlert('Missing Photo', 'Please upload a photo for the AR frame.');
            return;
        }
        if (!video) {
            showAlert('Missing Video', 'Please upload a video for the AR frame.');
            return;
        }

        const cleanedPhone = phone.replace(/[^0-9]/g, '');
        const phoneRegex = /^[0-9]{10}$/;
        
        if (!phoneRegex.test(cleanedPhone)) {
            showAlert('Invalid Phone', 'Please enter a valid 10-digit mobile number.');
            return;
        }

        setLoading(true);
        try {
            const timestamp = Date.now();
            const folder = `personal/${cleanedPhone}/${timestamp}`;
            
            setSyncStatus('Compiling AR engine...');
            const mindBlob = await compileImagesToMind(targetImage);
            
            setSyncStatus('Uploading Photo & Video...');
            const imgKey = `${folder}/target.jpg`;
            const vidKey = `${folder}/video.mp4`;
            const mindKey = `${folder}/targets.mind`;

            const [imgUrl, vidUrl, mindUrl] = await Promise.all([
                uploadFileToR2({ uri: targetImage }, imgKey, 'ar-assets'),
                uploadFileToR2({ uri: video }, vidKey, 'ar-assets'),
                Platform.OS === 'web' && (mindBlob as Blob).size > 0 
                   ? uploadFileToR2(new File([mindBlob as Blob], 'targets.mind'), mindKey, 'ar-assets')
                   : Promise.resolve('')
            ]);

            const albumPayload = {
                title: name,
                phone_number: cleanedPhone,
                image_url: imgUrl,
                video_url: vidUrl,
                mind_file_url: mindUrl,
                amount_paid: pricing.price,
                user_id: user?.id || null
            };

            setSyncStatus('Creating Order...');
            const orderRes = await fetch(`${API_CONFIG.BASE_URL}/api/create-cashfree-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: pricing.price,
                    customer_id: user?.id || `guest_${timestamp}`,
                    customer_email: user?.email || 'guest@giftmagic.beauty',
                    customer_phone: cleanedPhone,
                    album_payload: albumPayload 
                }),
            });

            if (!orderRes.ok) throw new Error('Order creation failed');

            const res = await orderRes.json();
            const sessionId = res.payment_session_id;
            const orderId = res.order_id;
            const mode = res.checkout_base?.includes('sandbox') ? 'sandbox' : 'production';
            
            if (typeof window !== 'undefined') {
                localStorage.setItem('pending_cf_order_id', orderId);
            }
            
            setSyncStatus('Redirecting to Payment...');
            if (Platform.OS === 'web') {
                const initCashfreeAndPay = () => {
                    const cashfreeSDK = (window as any).Cashfree;
                    if (!cashfreeSDK) throw new Error('Cashfree SDK load failed');
                    const cashfree = cashfreeSDK({ mode });
                    cashfree.checkout({
                        paymentSessionId: sessionId,
                        returnUrl: `${window.location.origin}/history?order_id={order_id}`,
                        redirectTarget: '_self',
                    });
                };

                if ((window as any).Cashfree) {
                    initCashfreeAndPay();
                } else {
                    const script = document.createElement('script');
                    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
                    script.onload = initCashfreeAndPay;
                    document.head.appendChild(script);
                }
            } else {
                const checkoutBase = mode === 'production' 
                    ? 'https://payments.cashfree.com/checkout'
                    : 'https://sandbox.cashfree.com/checkout';
                const checkoutUrl = `${checkoutBase}/?payment_session_id=${encodeURIComponent(sessionId)}`;
                await WebBrowser.openBrowserAsync(checkoutUrl);
                router.push('/(user)/history');
            }
        } catch (err: any) {
             console.error('[DEBUG] Process Error:', err);
             showAlert('Error', err.message || 'Payment initiation failed');
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

                <Button mode="contained" onPress={handleCreateAndPay} loading={loading} disabled={loading} style={styles.mainActionBtn} contentStyle={styles.mainActionBtnContent} buttonColor="#f04299">
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
    content: { padding: 20, flexGrow: 1 },
    formContainer: { gap: 20, paddingTop: 20 },
    headerSection: { alignItems: 'center' },
    pageTitle: { color: '#fff', fontWeight: '900', marginTop: 10 },
    pageSubtitle: { color: 'rgba(255,255,255,0.4)', textAlign: 'center' },
    inputCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, padding: 8 },
    fieldInput: { backgroundColor: 'transparent' },
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
    mainActionBtn: { borderRadius: 20, marginTop: 10 },
    mainActionBtnContent: { height: 60 }
});

export default CreateAlbumScreen;
