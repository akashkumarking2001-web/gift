import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Text, Button, Surface, ActivityIndicator, TextInput } from 'react-native-paper';
import { Sparkles, Mail, Lock, ChevronLeft } from 'lucide-react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { StatusBar } from 'expo-status-bar';
import FloatingHearts from '../../components/FloatingHearts';
import MeshBackground from '../../components/MeshBackground';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');

const UserLoginScreen = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const { loginIndividual } = useAuth();


    const handleEmailLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                const userObj = {
                    id: data.user.id,
                    email: data.user.email,
                    name: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
                    type: 'individual'
                };
                await loginIndividual(userObj);
                router.replace('/(user)');
            }
        } catch (e: any) {
            Alert.alert('Login Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />
            <MeshBackground />
            <FloatingHearts />
            
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <ChevronLeft color="#fff" size={24} />
            </TouchableOpacity>

            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('../../assets/icon.png')} 
                        style={styles.logoImage} 
                        resizeMode="contain"
                    />
                </View>
                <Text variant="headlineMedium" style={styles.title}>Welcome Creator</Text>
                <Text variant="bodyMedium" style={styles.subtitle}>Sign in to start creating magic</Text>
            </View>

            <View style={styles.form}>

                <Surface style={styles.inputSurface} elevation={1}>
                    <TextInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        style={styles.input}
                        textColor="#fff"
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                    />
                </Surface>

                <Surface style={styles.inputSurface} elevation={1}>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        style={styles.input}
                        textColor="#fff"
                        mode="flat"
                        secureTextEntry={secureText}
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        right={<TextInput.Icon icon={secureText ? "eye-off" : "eye"} onPress={() => setSecureText(!secureText)} color="rgba(255,255,255,0.4)" />}
                    />
                </Surface>

                <Button 
                    mode="contained" 
                    onPress={handleEmailLogin} 
                    loading={loading}
                    disabled={loading}
                    style={styles.emailButton}
                    contentStyle={styles.buttonContent}
                    buttonColor="#f04299"
                >
                    Continue to Dashboard
                </Button>

                <TouchableOpacity onPress={() => router.push('/(userAuth)/register')} style={styles.registerLink}>
                    <Text style={styles.registerLinkText}>
                        Don't have an account? <Text style={styles.linkBold}>Register Now</Text>
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    By continuing, you agree to our{' '}
                    <Text style={styles.link} onPress={() => router.push('/policies')}>Terms of Service</Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a060a',
        padding: 24,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
        marginTop: 100,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 40,
        backgroundColor: 'rgba(240,66,153,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        overflow: 'hidden',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subtitle: {
        color: 'rgba(255,255,255,0.5)',
        marginTop: 8,
    },
    form: {
        gap: 16,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    inputSurface: {
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#151015',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    input: {
        backgroundColor: 'transparent',
        height: 64,
        paddingHorizontal: 10,
    },
    googleIcon: {
        marginRight: 12,
    },
    googleButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.3)',
        marginHorizontal: 16,
        fontSize: 12,
    },
    emailButton: {
        height: 64,
        borderRadius: 20,
        shadowColor: '#f04299',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginTop: 5,
    },
    buttonContent: {
        height: 60,
    },
    registerLink: {
        marginTop: 10,
        alignItems: 'center',
    },
    registerLinkText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
    },
    linkBold: {
        color: '#f04299',
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 40,
        left: 24,
        right: 24,
    },
    footerText: {
        color: 'rgba(255,255,255,0.3)',
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 18,
    },
    link: {
        color: '#f04299',
    },
});

export default UserLoginScreen;
