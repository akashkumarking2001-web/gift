import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Platform, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button, Surface, ActivityIndicator } from 'react-native-paper';
import { Mail, ChevronLeft, Search, Clock, CheckCircle2, XCircle } from 'lucide-react-native';
import { useRouter, Stack } from 'expo-router';
import { supabase } from '../../lib/supabase';
import MeshBackground from '../../components/MeshBackground';
import FloatingHearts from '../../components/FloatingHearts';

const RequestStatus = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [request, setRequest] = useState<any>(null);
    const router = useRouter();

    const checkStatus = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('business_registration_requests')
                .select('*')
                .eq('email', email.trim().toLowerCase())
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (error) {
                if (error.code === 'PGRST116') {
                    Alert.alert('Not Found', 'No registration request found for this email.');
                } else {
                    throw error;
                }
            } else {
                setRequest(data);
            }
        } catch (e: any) {
            Alert.alert('Error', e.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle2 color="#10b981" size={40} />;
            case 'rejected': return <XCircle color="#ef4444" size={40} />;
            default: return <Clock color="#fbbf24" size={40} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return '#10b981';
            case 'rejected': return '#ef4444';
            default: return '#fbbf24';
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
                    <Text variant="headlineSmall" style={styles.title}>Track Application</Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>Enter your email to check registration status</Text>
                </View>

                <View style={styles.form}>
                    <Surface style={styles.inputSurface}>
                        <TextInput
                            label="Registration Email"
                            value={email}
                            onChangeText={setEmail}
                            mode="flat"
                            textColor="#fff"
                            left={<TextInput.Icon icon={() => <Mail size={18} color="#f04299" />} />}
                            style={styles.input}
                            underlineStyle={{ display: 'none' }}
                        />
                    </Surface>

                    <Button 
                        mode="contained" 
                        onPress={checkStatus}
                        loading={loading}
                        style={styles.checkBtn}
                        buttonColor="#f04299"
                        contentStyle={{ height: 60 }}
                        icon={() => <Search size={20} color="#fff" />}
                    >
                        Verify Status
                    </Button>
                </View>

                {request && (
                    <Surface style={styles.resultCard}>
                        <View style={styles.statusHeader}>
                            {getStatusIcon(request.request_status)}
                            <View style={styles.statusTextContainer}>
                                <Text variant="titleLarge" style={[styles.statusText, { color: getStatusColor(request.request_status) }]}>
                                    {request.request_status.toUpperCase()}
                                </Text>
                                <Text style={styles.dateText}>Requested on {new Date(request.created_at).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        
                        <View style={styles.detailsDivider} />
                        
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Business:</Text>
                            <Text style={styles.detailValue}>{request.business_name}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Package:</Text>
                            <Text style={styles.detailValue}>{request.package_name}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Text style={styles.detailLabel}>Payment:</Text>
                            <Text style={[styles.detailValue, { color: '#10b981' }]}>{request.payment_status.toUpperCase()}</Text>
                        </View>

                        {request.admin_notes && (
                            <View style={styles.notesContainer}>
                                <Text style={styles.notesLabel}>Admin Feedback:</Text>
                                <Text style={styles.notesValue}>{request.admin_notes}</Text>
                            </View>
                        )}
                    </Surface>
                )}
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0a060a' },
    overlay: { flex: 1, padding: 30 },
    backBtn: { marginTop: 40, width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
    header: { marginTop: 40, marginBottom: 30 },
    title: { color: '#fff', fontWeight: 'bold' },
    subtitle: { color: 'rgba(255,255,255,0.4)', marginTop: 8 },
    form: { gap: 15 },
    inputSurface: { borderRadius: 16, overflow: 'hidden', backgroundColor: '#151015' },
    input: { backgroundColor: 'transparent', height: 60 },
    checkBtn: { borderRadius: 16, marginTop: 10 },
    resultCard: { marginTop: 40, padding: 25, borderRadius: 24, backgroundColor: '#151015', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
    statusHeader: { flexDirection: 'row', alignItems: 'center' },
    statusTextContainer: { marginLeft: 15 },
    statusText: { fontWeight: '900', letterSpacing: 1 },
    dateText: { color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 2 },
    detailsDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 20 },
    detailItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    detailLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 14 },
    detailValue: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    notesContainer: { marginTop: 15, padding: 15, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 12 },
    notesLabel: { color: '#f04299', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
    notesValue: { color: 'rgba(255,255,255,0.6)', fontSize: 13, lineHeight: 18 }
});

export default RequestStatus;
