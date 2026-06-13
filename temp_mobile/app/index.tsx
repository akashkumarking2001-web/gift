// v2 - Triggering fresh build
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { Briefcase, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import FloatingHearts from '../components/FloatingHearts';
import MeshBackground from '../components/MeshBackground';

import { useAuth } from '../hooks/useAuth';

const { width } = Dimensions.get('window');

const LandingScreen = () => {
    const router = useRouter();
    const { user, loading } = useAuth();

    React.useEffect(() => {
        if (!loading && user) {
            if (user.authType === 'business') {
                router.replace('/(vendor)');
            } else if (user.authType === 'individual') {
                router.replace('/(user)');
            }
        }
    }, [user, loading, router]);

    return (
        <View style={styles.container}>
            <MeshBackground />
            <FloatingHearts />
            <StatusBar style="light" />
            
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../assets/icon.png')} 
                        style={styles.logoImage} 
                        resizeMode="contain"
                    />
                </View>
                <Text variant="displaySmall" style={styles.brandName}>GiftMagic</Text>
                <Text variant="titleMedium" style={styles.tagline}>Select Your Experience</Text>
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity 
                    style={styles.optionCard}
                    onPress={() => router.replace('/(user)')}
                >
                    <Surface style={styles.surface} elevation={2}>
                        <View style={styles.iconCircle}>
                            <Sparkles size={32} color="#f04299" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text variant="headlineSmall" style={styles.optionTitle}>Personal Account</Text>
                            <Text variant="bodySmall" style={styles.optionSubtitle}>Explore AR magic as a guest</Text>
                        </View>
                    </Surface>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.optionCard}
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Surface style={[styles.surface, styles.vendorSurface]} elevation={2}>
                        <View style={styles.iconCircle}>
                            <Briefcase size={32} color="#fbbf24" />
                        </View>
                        <View style={styles.textContainer}>
                            <Text variant="headlineSmall" style={styles.optionTitle}>Business Account</Text>
                            <Text variant="bodySmall" style={styles.optionSubtitle}>Manage your Studio portal</Text>
                        </View>
                    </Surface>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text variant="labelSmall" style={styles.footerText}>Powered by Giftmagic AR Engine</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a060a',
        padding: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 30,
        backgroundColor: 'rgba(240,66,153,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        overflow: 'hidden',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    brandName: {
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    tagline: {
        color: 'rgba(255,255,255,0.4)',
        marginTop: 8,
    },
    optionsContainer: {
        gap: 20,
    },
    optionCard: {
        width: '100%',
    },
    surface: {
        flexDirection: 'row',
        padding: 24,        borderRadius: 24,
        backgroundColor: '#151015',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    vendorSurface: {
        borderColor: 'rgba(251,191,36,0.1)',
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.03)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    textContainer: {
        flex: 1,
    },
    optionTitle: {
        color: '#fff',
        fontWeight: '900',
    },
    optionSubtitle: {
        color: 'rgba(255,255,255,0.4)',
        marginTop: 4,
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    footerText: {
        color: 'rgba(255,255,255,0.2)',
    }
});

export default LandingScreen;
