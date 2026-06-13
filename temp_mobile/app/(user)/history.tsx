import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl, Platform, Alert, Linking } from 'react-native';
import { Text, Surface, Badge, IconButton } from 'react-native-paper';
import { Calendar, CreditCard, CheckCircle, Clock, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { API_CONFIG } from '../../lib/config';

const OrderHistoryScreen = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [orders, setOrders] = useState<any[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, [user]);

    // Handle auto-verification if coming back from payment
    useEffect(() => {
        const checkUrlParams = async () => {
            if (Platform.OS === 'web') {
                const params = new URLSearchParams(window.location.search);
                // Check URL params first, then localStorage as fallback
                const orderId = params.get('order_id') || params.get('orderId') 
                    || localStorage.getItem('pending_cf_order_id');
                if (orderId) {
                    console.log('[DEBUG] Auto-verifying order:', orderId);
                    // Clear storage immediately to prevent re-triggering
                    localStorage.removeItem('pending_cf_order_id');
                    await handleVerifyPayment(orderId);
                    window.history.replaceState({}, '', window.location.pathname);
                }
            }
        };
        checkUrlParams();
    }, []);

    const fetchOrders = async () => {
        setRefreshing(true);
        try {
            let query = supabase
                .from('ar_albums')
                .select('*')
                .order('created_at', { ascending: false });

            // Build filter based on available user data
            if (user?.id) {
                query = query.eq('user_id', user.id);
            } else if (user?.phone) {
                query = query.eq('phone_number', user.phone);
            }
            // If no user, returns recent public entries (fine for testing)

            const { data, error } = await query;
            if (error) console.error('[History] fetchOrders error:', error);
            if (data) setOrders(data);
        } catch (e) {
            console.error(e);
        } finally {
            setRefreshing(false);
        }
    };

    const handleVerifyPayment = async (orderId: string) => {
        try {
            console.log(`[DEBUG] Verifying payment for: ${orderId}`);
            setRefreshing(true);
            const res = await fetch(`${API_CONFIG.BASE_URL}/api/verify-cashfree-order?orderId=${orderId}`);
            const data = await res.json();
            
            console.log(`[DEBUG] Verification Result:`, data);
            
            const status = data.order_status;
            
            if (status === 'PAID' || status === 'SUCCESS') {
                // ✅ Success
                if (Platform.OS === 'web') {
                    window.alert('✅ Payment Successful! Your Magic Frame has been activated. Refresh to see the updated status.');
                } else {
                    Alert.alert('✅ Payment Successful!', 'Your Magic Frame has been activated successfully.', [
                        { text: 'View My Albums', onPress: () => fetchOrders() }
                    ]);
                }
            } else if (status === 'FAILED' || status === 'CANCELLED') {
                // ❌ Failed — show Try Again option
                if (Platform.OS === 'web') {
                    const retry = window.confirm('❌ Payment Failed or Cancelled.\n\nWould you like to try the payment again?\n\nClick OK to retry, or Cancel to contact support.');
                    if (retry) {
                        router.push('/(user)/create');
                    } else {
                        window.location.href = 'mailto:support@giftmagic.beauty?subject=Payment Issue&body=Order ID: ' + orderId;
                    }
                } else {
                    Alert.alert('Payment Failed', 'Your payment was not successful.', [
                        { text: 'Try Again', onPress: () => router.push('/(user)/create') },
                        { text: 'Contact Support', onPress: () => Linking.openURL('mailto:support@giftmagic.beauty?subject=Payment Issue&body=Order ID: ' + orderId) },
                        { text: 'Dismiss', style: 'cancel' }
                    ]);
                }
            } else if (data.code === 'order_not_found') {
                const msg = 'This payment session was not found. It may have expired. Please create a new order.';
                if (Platform.OS === 'web') window.alert(msg);
                else Alert.alert('Session Expired', msg, [
                    { text: 'Create New Order', onPress: () => router.push('/(user)/create') },
                    { text: 'Dismiss', style: 'cancel' }
                ]);
            } else {
                // ACTIVE / PENDING
                const msg = `Payment is still processing (Status: ${status || 'PENDING'}).\n\nIf you completed the payment, please wait 30 seconds and verify again.`;
                if (Platform.OS === 'web') window.alert(msg);
                else Alert.alert('Processing...', msg, [
                    { text: 'Check Again', onPress: () => handleVerifyPayment(orderId) },
                    { text: 'OK', style: 'cancel' }
                ]);
            }
        } catch (err: any) {
            console.error('[DEBUG] Verification failed:', err);
            const msg = `Could not verify payment. Please check your connection and try again.\n\n${err.message}`;
            if (Platform.OS === 'web') window.alert(msg);
            else Alert.alert('Verification Error', msg);
        } finally {
            setRefreshing(false);
            fetchOrders();
        }
    };


    const getStatusInfo = (status: string, paymentStatus: string) => {
        if (paymentStatus === 'paid') return { color: '#4caf50', icon: CheckCircle, label: 'Success' };
        switch (status) {
            case 'approved':
                return { color: '#4caf50', icon: CheckCircle, label: 'Approved' };
            case 'pending':
                return { color: '#fbbf24', icon: Clock, label: 'Pending' };
            default:
                return { color: 'rgba(255,255,255,0.3)', icon: Clock, label: 'N/A' };
        }
    };

    const renderOrderItem = ({ item }: { item: any }) => {
        const status = getStatusInfo(item.approval_status, item.payment_status);
        
        return (
            <TouchableOpacity onPress={() => {}}>
                <Surface style={styles.orderCard} elevation={1}>
                    <View style={styles.orderHeader}>
                        <View style={styles.titleGroup}>
                            <Text variant="titleMedium" style={styles.albumName}>{item.title}</Text>
                            <View style={styles.dateGroup}>
                                <Calendar size={12} color="rgba(255,255,255,0.4)" />
                                <Text style={styles.dateLabel}>{new Date(item.created_at).toLocaleDateString()}</Text>
                            </View>
                        </View>
                        <View style={styles.priceGroup}>
                            <Text style={styles.priceLabel}>₹{item.amount_paid || 149}</Text>
                        </View>
                    </View>

                    <View style={styles.orderFooter}>
                        <View style={[styles.statusBadge, { backgroundColor: `${status.color}15` }]}>
                            <status.icon size={14} color={status.color} />
                            <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                        </View>
                        
                        {item.payment_status !== 'paid' ? (
                            <TouchableOpacity 
                                style={styles.verifyBtn} 
                                onPress={() => handleVerifyPayment(item.cf_order_id)}
                            >
                                <Text style={styles.verifyBtnText}>Verify Payment</Text>
                                <ChevronRight size={14} color="#f04299" />
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.actionGroup}>
                                <CheckCircle size={14} color="#4caf50" />
                                <Text style={[styles.paymentStatus, { color: '#4caf50' }]}>PAID</Text>
                            </View>
                        )}
                    </View>
                </Surface>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={renderOrderItem}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={fetchOrders} tintColor="#f04299" />
                }
                ListHeaderComponent={() => (
                    <Text variant="bodySmall" style={styles.headerSubtitle}>
                        Your AR Album history and status
                    </Text>
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <CreditCard size={48} color="rgba(255,255,255,0.1)" />
                        <Text style={styles.emptyText}>No orders yet.</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a060a',
    },
    listContent: {
        padding: 20,
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.4)',
        marginBottom: 20,
    },
    orderCard: {
        backgroundColor: '#151015',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    titleGroup: {
        flex: 1,
    },
    albumName: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    dateGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dateLabel: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
    },
    priceGroup: {
        alignItems: 'flex-end',
    },
    priceLabel: {
        color: '#f04299',
        fontSize: 18,
        fontWeight: 'bold',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    actionGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    paymentStatus: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        fontWeight: 'bold',
    },
    verifyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(240,66,153,0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 10,
        gap: 4,
    },
    verifyBtnText: {
        color: '#f04299',
        fontSize: 12,
        fontWeight: 'bold',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 100,
    },
    emptyText: {
        color: 'rgba(255,255,255,0.2)',
        marginTop: 16,
    }
});

export default OrderHistoryScreen;
