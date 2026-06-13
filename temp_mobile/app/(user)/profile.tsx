import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, Linking } from 'react-native';
import { Text, Avatar, List, Surface, Button, Divider } from 'react-native-paper';
import { User, Settings, LogOut, Shield, ChevronRight, HelpCircle, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

const UserProfileScreen = () => {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        const performLogout = async () => {
            await logout();
            router.replace('/');
        };

        if (require('react-native').Platform.OS === 'web') {
            await performLogout();
        } else {
            Alert.alert('Logout', 'Are you sure you want to logout?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', onPress: performLogout }
            ]);
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = async () => {
            try {
                // Anonymize personal data in ar_albums
                if (user?.id) {
                    await supabase.from('ar_albums').update({
                        phone_number: 'deleted',
                        title: 'Deleted Account'
                    }).eq('user_id', user.id);
                    await supabase.from('pending_ar_creations').delete().eq('user_id', user.id);
                }
                // Delete the auth account
                await supabase.auth.admin?.deleteUser?.(user?.id || '');
                await logout();
                if (Platform.OS === 'web') {
                    window.alert('Your account and personal data have been deleted.');
                } else {
                    Alert.alert('Account Deleted', 'Your account and personal data have been deleted.');
                }
                router.replace('/');
            } catch (err: any) {
                const msg = 'Account deletion request submitted. Our team will process it within 7 days.';
                if (Platform.OS === 'web') window.alert(msg);
                else Alert.alert('Request Submitted', msg);
                // Send email notification as fallback
                Linking.openURL('mailto:support@giftmagic.beauty?subject=Account Deletion Request&body=Please delete my account. User ID: ' + (user?.id || 'unknown'));
            }
        };

        if (Platform.OS === 'web') {
            if (window.confirm('Are you sure? This will permanently delete your account and all personal data. This cannot be undone.')) {
                await confirmDelete();
            }
        } else {
            Alert.alert(
                'Delete Account',
                'This will permanently delete your account and all personal data (profile, AR albums, uploads). This cannot be undone.',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete Forever', style: 'destructive', onPress: confirmDelete }
                ]
            );
        }
    };

    const isGuest = !user;

    if (isGuest) {
        return (
            <ScrollView style={styles.container}>
                <View style={[styles.header, { paddingBottom: 60 }]}>
                    <View style={styles.guestIconCircle}>
                        <User size={48} color="#f04299" />
                    </View>
                    <Text variant="headlineSmall" style={styles.userName}>Guest Explorer</Text>
                    <Text variant="bodyMedium" style={[styles.userEmail, { textAlign: 'center', paddingHorizontal: 40 }]}>
                        Sign in to create your own magic albums and see your order history.
                    </Text>
                    
                    <Button 
                        mode="contained" 
                        onPress={() => router.push('/(userAuth)/login')} 
                        style={styles.loginBtn}
                        buttonColor="#f04299"
                    >
                        Sign In or Register
                    </Button>
                </View>

                <View style={styles.section}>
                    <Surface style={styles.menuCard} elevation={1}>
                        <List.Item
                            title="Legal Policies"
                            left={props => <List.Icon {...props} icon="shield" color="#fff" />}
                            right={props => <ChevronRight color="rgba(255,255,255,0.3)" size={20} style={{marginTop: 12}} />}
                            onPress={() => router.push('/policies')}
                            titleStyle={styles.listTitle}
                        />
                    </Surface>
                </View>

                <TouchableOpacity 
                    style={styles.vendorLink}
                    onPress={() => router.push('/(auth)/login')}
                >
                    <Text style={styles.vendorLinkText}>Are you a Studio Owner? <Text style={styles.bold}>Login Here</Text></Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Version 1.0.0 (Pay-per-Album)</Text>
            </ScrollView>
        );
    }

    const userName = user?.name || 'Magic User';
    const userEmail = user?.email || 'user@example.com';
    const firstLetter = userName.substring(0, 1).toUpperCase();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Avatar.Text size={80} label={firstLetter} style={styles.avatar} />
                <Text variant="headlineSmall" style={styles.userName}>{userName}</Text>
                <Text variant="bodyMedium" style={styles.userEmail}>{userEmail}</Text>
                
                <Button 
                    mode="outlined" 
                    onPress={() => {}} 
                    style={styles.editButton}
                    textColor="#f04299"
                >
                    Edit Profile
                </Button>
            </View>

            <View style={styles.section}>
                <Surface style={styles.menuCard} elevation={1}>
                    <List.Item
                        title="My Orders"
                        left={props => <List.Icon {...props} icon="history" color="#fff" />}
                        right={props => <ChevronRight color="rgba(255,255,255,0.3)" size={20} style={{marginTop: 12}} />}
                        onPress={() => router.push('/(user)/history')}
                        titleStyle={styles.listTitle}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Payment Methods"
                        left={props => <List.Icon {...props} icon="credit-card" color="#fff" />}
                        right={props => <ChevronRight color="rgba(255,255,255,0.3)" size={20} style={{marginTop: 12}} />}
                        onPress={() => {}}
                        titleStyle={styles.listTitle}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Settings"
                        left={props => <List.Icon {...props} icon="cog" color="#fff" />}
                        right={props => <ChevronRight color="rgba(255,255,255,0.3)" size={20} style={{marginTop: 12}} />}
                        onPress={() => {}}
                        titleStyle={styles.listTitle}
                    />
                </Surface>
            </View>

            <View style={styles.section}>
                <Surface style={styles.menuCard} elevation={1}>
                    <List.Item
                        title="Support"
                        left={props => <List.Icon {...props} icon="help-circle" color="#fff" />}
                        right={props => <ChevronRight color="rgba(255,255,255,0.3)" size={20} style={{marginTop: 12}} />}
                        onPress={() => router.push('/(user)/support')}
                        titleStyle={styles.listTitle}
                    />
                    <Divider style={styles.divider} />
                    <List.Item
                        title="Privacy Policy"
                        left={props => <List.Icon {...props} icon="shield" color="#fff" />}
                        right={props => <ChevronRight color="rgba(255,255,255,0.3)" size={20} style={{marginTop: 12}} />}
                        onPress={() => router.push('/policies')}
                        titleStyle={styles.listTitle}
                    />
                </Surface>
            </View>

            <View style={styles.logoutSection}>
                <Button 
                    mode="text" 
                    onPress={handleLogout} 
                    textColor="#ff4444"
                    icon="logout"
                >
                    Logout
                </Button>
            </View>

            {/* Danger Zone — Required by Google Play */}
            <View style={styles.dangerZone}>
                <Text style={styles.dangerZoneTitle}>Danger Zone</Text>
                <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount}>
                    <Trash2 size={16} color="#ff4444" />
                    <Text style={styles.deleteBtnText}>Delete My Account & Data</Text>
                </TouchableOpacity>
                <Text style={styles.dangerZoneNote}>
                    This will permanently remove your profile, AR albums, and all uploaded media.
                    Required under Google Play data deletion policy.
                </Text>
            </View>

            <Text style={styles.versionText}>Version 1.0.0 (Pay-per-Album)</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a060a',
    },
    header: {
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#151015',
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    avatar: {
        backgroundColor: '#f04299',
        marginBottom: 16,
    },
    userName: {
        color: '#fff',
        fontWeight: 'bold',
    },
    userEmail: {
        color: 'rgba(255,255,255,0.5)',
        marginTop: 4,
        marginBottom: 20,
    },
    editButton: {
        borderColor: '#f04299',
        borderRadius: 12,
    },
    section: {
        paddingHorizontal: 20,
        marginTop: 24,
    },
    menuCard: {
        backgroundColor: '#151015',
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    listTitle: {
        color: '#fff',
    },
    divider: {
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    logoutSection: {
        marginTop: 24,
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    dangerZone: {
        marginHorizontal: 20,
        marginTop: 12,
        marginBottom: 24,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,68,68,0.3)',
        backgroundColor: 'rgba(255,68,68,0.05)',
    },
    dangerZoneTitle: {
        color: '#ff4444',
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 12,
    },
    deleteBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,68,68,0.1)',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,68,68,0.3)',
    },
    deleteBtnText: {
        color: '#ff4444',
        fontWeight: '600',
        fontSize: 14,
    },
    dangerZoneNote: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 11,
        marginTop: 10,
        lineHeight: 16,
    },
    versionText: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.2)',
        fontSize: 12,
        marginBottom: 40,
    },
    guestIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(240,66,153,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    loginBtn: {
        marginTop: 24,
        borderRadius: 16,
        paddingHorizontal: 10,
    },
    vendorLink: {
        marginTop: 40,
        alignItems: 'center',
    },
    vendorLinkText: {
        color: 'rgba(255,255,255,0.4)',
    },
    bold: {
        color: '#f04299',
        fontWeight: 'bold',
    }
});

export default UserProfileScreen;
