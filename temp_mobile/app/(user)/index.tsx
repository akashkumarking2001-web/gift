import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, Surface, Button, Avatar } from 'react-native-paper';
import { Camera, Sparkles, History, ShoppingBag, CreditCard, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

const UserDashboard = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [recentMagic, setRecentMagic] = useState<any[]>([]);

    useEffect(() => {
        const fetchRecent = async () => {
            if (!user) return;
            const { data } = await supabase
                .from('ar_albums')
                .select('*')
                .eq('phone_number', user.email)
                .order('created_at', { ascending: false })
                .limit(1);
            if (data) setRecentMagic(data);
        };
        fetchRecent();
    }, [user]);

    const userName = user?.name || 'Guest User';
    const firstLetter = userName.substring(0, 1).toUpperCase();
    const isGuest = !user;

    const handleAction = (route: string) => {
        if (isGuest && route !== '/(user)/scanner') {
            router.push('/(userAuth)/login');
            return;
        }
        router.push(route as any);
    };

    const quickActions = [
        { 
            title: 'Scan AR', 
            subtitle: 'Free Guest Mode', 
            icon: Camera, 
            color: '#f04299', 
            route: '/(user)/scanner' 
        },
        { 
            title: 'My Orders', 
            subtitle: 'Track magic', 
            icon: History, 
            color: '#8b5cf6', 
            route: '/(user)/history' 
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.welcomeSection}>
                <View style={{ flex: 1, marginRight: 16 }}>
                    <Text variant="headlineSmall" style={styles.welcomeText} numberOfLines={1} ellipsizeMode="tail">
                        {isGuest ? 'Welcome to Magic! ✨' : `Hello, ${userName.split(' ')[0]}! ✨`}
                    </Text>
                    <Text variant="bodyMedium" style={styles.subText} numberOfLines={1} ellipsizeMode="tail">
                        {isGuest ? 'Try our free AR scanner below' : user?.email}
                    </Text>
                </View>
                <Avatar.Text size={48} label={firstLetter} style={styles.avatar} />
            </View>

            <Surface style={styles.promoCard} elevation={2}>
                <View style={styles.promoContent}>
                    <Sparkles size={24} color="#f04299" />
                    <Text variant="titleMedium" style={styles.promoTitle}>New: Pay-per-Album!</Text>
                    <Text variant="bodySmall" style={styles.promoDescription}>
                        No subscriptions needed. Pay only for what you create.
                    </Text>
                    <Button 
                        mode="contained" 
                        onPress={() => handleAction('/(user)/create')}
                        style={styles.promoButton}
                    >
                        Create Now
                    </Button>
                </View>
            </Surface>

            <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.actionGrid}>
                    {quickActions.map((action, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={styles.actionCard}
                            onPress={() => handleAction(action.route)}
                        >
                            <Surface style={styles.actionSurface} elevation={1}>
                                <View style={[styles.iconContainer, { backgroundColor: `${action.color}15` }]}>
                                    <action.icon size={24} color={action.color} />
                                </View>
                                <Text variant="titleSmall" style={styles.actionText}>{action.title}</Text>
                                <Text variant="labelSmall" style={styles.actionSubtext}>{action.subtitle}</Text>
                            </Surface>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text variant="titleMedium" style={styles.sectionTitle}>Recent Magic</Text>
                    <TouchableOpacity onPress={() => router.push('/(user)/history')}>
                        <Text style={styles.viewAll}>View All</Text>
                    </TouchableOpacity>
                </View>
                
                {/* Empty State or Recent Activity */}
                {recentMagic.length > 0 ? (
                    <TouchableOpacity onPress={() => router.push('/(user)/history')}>
                        <Surface style={styles.recentItem} elevation={1}>
                            <View style={styles.recentInfo}>
                                <Text style={styles.recentTitle}>{recentMagic[0].title}</Text>
                                <Text style={styles.recentStatus}>{recentMagic[0].approval_status.toUpperCase()}</Text>
                            </View>
                            <ChevronRight size={20} color="rgba(255,255,255,0.3)" />
                        </Surface>
                    </TouchableOpacity>
                ) : (
                    <Surface style={styles.emptyCard} elevation={0}>
                        <ShoppingBag size={40} color="rgba(255,255,255,0.1)" />
                        <Text style={styles.emptyText}>No recent albums found.</Text>
                        <Button mode="text" textColor="#f04299" onPress={() => router.push('/(user)/create')}>Start Creating</Button>
                    </Surface>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a060a',
    },
    content: {
        padding: 20,
    },
    welcomeSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
        marginTop: 10,
    },
    welcomeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    subText: {
        color: 'rgba(255,255,255,0.5)',
    },
    avatar: {
        backgroundColor: '#f04299',
    },
    promoCard: {
        backgroundColor: '#1a141a',
        borderRadius: 24,
        padding: 24,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'rgba(240,66,153,0.2)',
    },
    promoContent: {
        alignItems: 'flex-start',
    },
    promoTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 12,
    },
    promoDescription: {
        color: 'rgba(255,255,255,0.6)',
        marginTop: 4,
        marginBottom: 16,
    },
    promoButton: {
        borderRadius: 12,
    },
    section: {
        marginBottom: 32,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    viewAll: {
        color: '#f04299',
        fontSize: 14,
    },
    actionGrid: {
        flexDirection: 'row',
        gap: 16,
    },
    actionCard: {
        flex: 1,
    },
    actionSurface: {
        backgroundColor: '#151015',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    actionText: {
        color: '#fff',
        fontWeight: '600',
    },
    actionSubtext: {
        color: 'rgba(255,255,255,0.4)',
        marginTop: 2,
    },
    emptyCard: {
        backgroundColor: '#151015',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    emptyText: {
        color: 'rgba(255,255,255,0.3)',
        marginTop: 12,
        marginBottom: 8,
    },
    recentItem: {
        backgroundColor: '#151015',
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    recentInfo: {
        flex: 1,
    },
    recentTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    recentStatus: {
        color: '#f04299',
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: 4,
    }
});

export default UserDashboard;
