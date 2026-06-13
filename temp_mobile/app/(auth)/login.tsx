import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import { Text, TextInput, Button, Surface } from 'react-native-paper';
import { Gift, Mail, Lock, ChevronLeft } from 'lucide-react-native';
import { useRouter, Stack } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import FloatingHearts from '../../components/FloatingHearts';
import MeshBackground from '../../components/MeshBackground';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      const { success, error } = await login(email, password);
      if (success) {
        router.replace('/(vendor)');
      } else {
        Alert.alert('Login Failed', error || 'Invalid credentials');
      }
    } catch (e: any) {
      Alert.alert('System Error', e.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <MeshBackground />
      <FloatingHearts />
      
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ChevronLeft color="#fff" size={24} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Gift size={40} color="#f04299" />
          </View>
          <Text variant="headlineLarge" style={styles.title}>Giftmagic Business</Text>
          <Text variant="bodyMedium" style={styles.subtitle}>Enter your portal as a vendor</Text>
        </View>

        <View style={styles.form}>
          <Surface style={styles.inputSurface} elevation={1}>
            <TextInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              mode="flat"
              textColor="#fff"
              placeholderTextColor="rgba(255,255,255,0.4)"
              left={<TextInput.Icon icon={() => <Mail size={18} color="#f04299" />} />}
              style={styles.input}
              underlineStyle={{ display: 'none' }}
            />
          </Surface>

          <Surface style={styles.inputSurface} elevation={1}>
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="flat"
              textColor="#fff"
              placeholderTextColor="rgba(255,255,255,0.4)"
              secureTextEntry={secureText}
              left={<TextInput.Icon icon={() => <Lock size={18} color="#f04299" />} />}
              right={<TextInput.Icon icon={secureText ? "eye-off" : "eye"} onPress={() => setSecureText(!secureText)} color="rgba(255,255,255,0.4)" />}
              style={styles.input}
              underlineStyle={{ display: 'none' }}
            />
          </Surface>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text variant="labelMedium" style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button 
            mode="contained" 
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.loginBtn}
            contentStyle={styles.loginBtnContent}
            textColor="#fff"
            buttonColor="#f04299"
          >
            Login to Dashboard
          </Button>

          <View style={styles.signupContainer}>
            <Text variant="bodySmall" style={styles.signupLabel}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text variant="labelLarge" style={styles.signupText}> Register as Vendor</Text>
            </TouchableOpacity>
          </View>

          <Button 
            mode="text" 
            onPress={() => router.push('/(auth)/status')}
            textColor="rgba(255,255,255,0.4)"
            style={styles.statusBtn}
          >
            Check Application Status
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="bodySmall" style={styles.footerText}>
            By signing in, you agree to our 
            <Text variant="labelLarge" style={styles.legalLink}> Privacy Policy </Text>
            and 
            <Text variant="labelLarge" style={styles.legalLink}> Terms </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a060a' },
  overlay: { flex: 1, padding: 30, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 60, left: 20, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  header: { alignItems: 'center', marginBottom: 50 },
  logoContainer: { width: 80, height: 80, borderRadius: 25, backgroundColor: 'rgba(240,66,153,0.1)', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  title: { color: '#fff', fontWeight: 'bold' },
  subtitle: { color: 'rgba(255,255,255,0.4)', marginTop: 8 },
  form: { width: '100%', gap: 15 },
  inputSurface: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#151015' },
  input: { backgroundColor: 'transparent', height: 60 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 15 },
  forgotText: { color: '#f04299' },
  loginBtn: { borderRadius: 16, shadowColor: '#f04299', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 10, marginTop: 15 },
  loginBtnContent: { height: 60 },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 30 },
  signupLabel: { color: 'rgba(255,255,255,0.4)' },
  signupText: { color: '#f04299', fontWeight: 'bold' },
  statusBtn: { marginTop: 10 },
  footer: { position: 'absolute', bottom: 40, left: 30, right: 30 },
  footerText: { textAlign: 'center', color: 'rgba(255,255,255,0.3)', lineHeight: 20 },
  legalLink: { color: '#f04299', textDecorationLine: 'underline' }
});

export default Login;
