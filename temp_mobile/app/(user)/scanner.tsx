import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Animated, Alert, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { X, Zap, ZapOff, Camera as CameraIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Camera, FlashMode } from 'expo-camera';

import PermissionDisclosure from '../../components/PermissionDisclosure';

const { width, height } = Dimensions.get('window');

const ScannerScreen = () => {
    const router = useRouter();
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [torch, setTorch] = useState(false);
    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const scanAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        (async () => {
            const { status } = await Camera.getCameraPermissionsAsync();
            if (status === 'granted') {
                setHasPermission(true);
            } else {
                setShowPermissionModal(true);
            }
        })();
        
        // Start scanning animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(scanAnim, {
                    toValue: 300,
                    duration: 2000,
                    useNativeDriver: Platform.OS !== 'web',
                }),
                Animated.timing(scanAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: Platform.OS !== 'web',
                })
            ])
        ).start();
    }, []);

    const requestPermission = async () => {
        setShowPermissionModal(false);
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    };

    if (hasPermission === null && !showPermissionModal) {
        return <View style={styles.container}><Text style={styles.hintText}>Initializing camera...</Text></View>;
    }

    if (hasPermission === false || showPermissionModal) {
        return (
            <View style={styles.container}>
                <PermissionDisclosure 
                    visible={showPermissionModal}
                    type="camera"
                    onAccept={requestPermission}
                    onCancel={() => {
                        setShowPermissionModal(false);
                        router.back();
                    }}
                />
                {!showPermissionModal && (
                    <View style={styles.permContainer}>
                        <CameraIcon size={64} color="#f04299" />
                        <Text style={styles.permTitle}>Camera Access Required</Text>
                        <Text style={styles.permText}>To scan your magical frames and bring them to life, we need access to your camera.</Text>
                        <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
                            <Text style={styles.permBtnText}>Enable Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                            <Text style={styles.cancelBtnText}>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Camera 
                style={StyleSheet.absoluteFillObject} 
                flashMode={torch ? FlashMode.torch : FlashMode.off}
                onBarCodeScanned={(result: any) => {
                    console.log("Scanned:", result.data);
                }}
            />
            
            <View style={styles.overlay}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
                        <X color="#fff" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconBtn} onPress={() => setTorch(!torch)}>
                        {torch ? <Zap color="#f04299" size={24} /> : <ZapOff color="#fff" size={24} />}
                    </TouchableOpacity>
                </View>

                <View style={styles.scanTarget}>
                    <View style={styles.targetFrame}>
                        <Animated.View 
                            style={[
                                styles.scanLine, 
                                { transform: [{ translateY: scanAnim }] }
                            ]} 
                        />
                    </View>
                    <Text style={styles.scanHint}>Align magical frame within the box</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>Pro Tip</Text>
                    <Text style={styles.footerText}>Hold the phone steady and ensure good lighting for instant magic activation.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a060a',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'space-between',
        padding: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    iconBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanTarget: {
        alignItems: 'center',
    },
    targetFrame: {
        width: width * 0.8,
        height: 300,
        borderWidth: 2,
        borderColor: '#f04299',
        borderRadius: 30,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    scanLine: {
        width: '100%',
        height: 4,
        backgroundColor: '#f04299',
        ...Platform.select({
            web: {
                boxShadow: '0 0 15px #f04299',
            },
            default: {
                shadowColor: '#f04299',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 15,
            }
        }),
        elevation: 10,
    },
    scanHint: {
        color: '#fff',
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    footer: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
        borderRadius: 24,
        marginBottom: 20,
    },
    footerTitle: {
        color: '#f04299',
        fontWeight: 'bold',
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 4,
    },
    footerText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        lineHeight: 18,
    },
    permContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    permTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 24,
        textAlign: 'center',
    },
    permText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 12,
        lineHeight: 22,
    },
    permBtn: {
        backgroundColor: '#f04299',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 16,
        marginTop: 32,
        width: '100%',
        alignItems: 'center',
    },
    permBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelBtn: {
        marginTop: 16,
    },
    cancelBtnText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 14,
    },
    hintText: {
        color: '#fff',
        alignSelf: 'center',
        marginTop: height / 2,
    }
});

export default ScannerScreen;
