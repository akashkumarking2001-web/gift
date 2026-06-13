import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Alert, ScrollView, Platform } from 'react-native';
import { Text, Button, Surface, ActivityIndicator, TextInput } from 'react-native-paper';
import { Sparkles, Mail, Lock, ChevronLeft, User, Phone } from 'lucide-react-native';
import { useRouter, Stack } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { StatusBar } from 'expo-status-bar';
import FloatingHearts from '../../components/FloatingHearts';
import MeshBackground from '../../components/MeshBackground';

const { width } = Dimensions.get('window');

import { Image } from 'react-native';
const UserRegisterScreen = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !phone || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.trim())) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            // 1. Unified Signup (Supabase Auth + Profile via trigger or manual)
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone,
                    }
                }
            });

            if (authError) throw authError;

            // 2. Insert into profiles table if it doesn't happen automatically
            // Assuming there's a profiles table based on standard patterns
            const { error: profileError } = await supabase.from('profiles').insert({
                id: authData.user?.id,
                full_name: name,
                email: email,
                phone_number: phone,
                role: 'user'
            });
            // We ignore conflict if the trigger already created it
            if (profileError && !profileError.message.includes('unique constraint')) {
                console.warn('Profile creation warning:', profileError.message);
            }

            Alert.alert('Success', 'Account created successfully!');
            router.replace('/(user)');
        } catch (e: any) {
            Alert.alert('Registration Error', e.message);
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

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require('../../assets/icon.png')} 
                            style={styles.logoImage} 
                            resizeMode="contain"
                        />
                    </View>
                    <Text variant="headlineMedium" style={styles.title}>Create Account</Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>Join the digital magic community</Text>
                </View>

                <View style={styles.form}>
                    <Surface style={styles.inputSurface} elevation={1}>
                        <TextInput
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            style={styles.input}
                            textColor="#fff"
                            mode="flat"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            left={<TextInput.Icon icon={() => <User size={20} color="rgba(255,255,255,0.4)" />} />}
                        />
                    </Surface>

                    <Surface style={styles.inputSurface} elevation={1}>
                        <TextInput
                            placeholder="Mobile Number"
                            value={phone}
                            onChangeText={setPhone}
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            style={styles.input}
                            textColor="#fff"
                            mode="flat"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            keyboardType="phone-pad"
                            left={<TextInput.Icon icon={() => <Phone size={20} color="rgba(255,255,255,0.4)" />} />}
                        />
                    </Surface>

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
                            keyboardType="email-address"
                            left={<TextInput.Icon icon={() => <Mail size={20} color="rgba(255,255,255,0.4)" />} />}
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
                            left={<TextInput.Icon icon={() => <Lock size={20} color="rgba(255,255,255,0.4)" />} />}
                            right={<TextInput.Icon icon={secureText ? "eye-off" : "eye"} onPress={() => setSecureText(!secureText)} color="rgba(255,255,255,0.4)" />}
                        />
                    </Surface>

                    <Surface style={styles.inputSurface} elevation={1}>
                        <TextInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            style={styles.input}
                            textColor="#fff"
                            mode="flat"
                            secureTextEntry={secureText}
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            left={<TextInput.Icon icon={() => <Lock size={20} color="rgba(255,255,255,0.4)" />} />}
                        />
                    </Surface>

                    <Button 
                        mode="contained" 
                        onPress={handleRegister} 
                        loading={loading}
                        disabled={loading}
                        style={styles.registerButton}
                        contentStyle={styles.buttonContent}
                        buttonColor="#f04299"
                    >
                        Create My Account
                    </Button>

                    <TouchableOpacity onPress={() => router.back()} style={styles.loginLink}>
                        <Text style={styles.loginLinkText}>
                            Already have an account? <Text style={styles.linkBold}>Login</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By registering, you agree to our{' '}
                        <Text style={styles.link} onPress={() => router.push('/policies')}>Terms of Service</Text>
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a060a',
    },
    scrollContent: {
        padding: 24,
        paddingTop: 100,
        paddingBottom: 40,
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
        marginBottom: 40,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 35,
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
        paddingHorizontal: 0,
    },
    registerButton: {
        height: 64,
        borderRadius: 20,
        shadowColor: '#f04299',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginTop: 10,
    },
    buttonContent: {
        height: 60,
    },
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginLinkText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 14,
    },
    linkBold: {
        color: '#f04299',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 40,
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

export default UserRegisterScreen;
