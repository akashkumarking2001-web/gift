import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { Text, Card, Button, Avatar, IconButton, ActivityIndicator } from 'react-native-paper';
import { Sparkles, Rocket, Eye, EyeOff, AlertTriangle, CreditCard, ChevronRight, User as UserIcon, Plus } from 'lucide-react-native';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'expo-router';
import { BusinessService } from '../../lib/businessService';
import { supabase } from '../../lib/supabase';
import MeshBackground from '../../components/MeshBackground';
import FloatingHearts from '../../components/FloatingHearts';

export default function Dashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [bizData, setBizData] = useState(user);
  const [albumStats, setAlbumStats] = useState({ total: 0, pending: 0, active: 0 });
  const [appSettings, setAppSettings] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      if (!user) return;
      
      // Fetch Stats
      const { data: albums } = await supabase
        .from('ar_albums')
        .select('approval_status')
        .eq('client_id', user.id);
      
      if (albums) {
        const stats = albums.reduce((acc, alb) => {
          acc.total++;
          if (alb.approval_status === 'pending') acc.pending++;
          else if (alb.approval_status === 'approved') acc.active++;
          return acc;
        }, { total: 0, pending: 0, active: 0 });
        setAlbumStats(stats);
      }

      // Fetch Dynamic Pricing
      try {
          const settings = await BusinessService.getAppSettings();
          setAppSettings(settings);
      } catch (e) {
          console.error(e);
      }
    };
    init();
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/login');
    }
  }, [user, loading]);

  const onRefresh = async () => {
    if (!user) return;
    setRefreshing(true);
    try {
      const refreshed = await BusinessService.getClientById(user.id);
      if (refreshed) {
        setBizData(refreshed);
      }
      const settings = await BusinessService.getAppSettings();
      setAppSettings(settings);
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#f04299" size="large" />
        <Text style={{ color: '#fff', marginTop: 10 }}>Loading Dashboard...</Text>
      </View>
    );
  }

  const biz = bizData || user;

  return (
    <View style={{ flex: 1, backgroundColor: '#0a060a' }}>
      <MeshBackground />
      <FloatingHearts />
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f04299" />
        }
      >
        <View style={styles.header}>
          <View>
            <Text variant="headlineMedium" style={styles.welcomeText}>Hello, {biz.business_name}</Text>
            <Text variant="bodySmall" style={styles.statusLabel}>
              SYSTEM STATUS: <Text style={{ color: '#10b981' }}>OPERATIONAL</Text>
            </Text>
          </View>
          <Avatar.Icon size={48} icon="account-tie" style={{ backgroundColor: 'rgba(240,66,153,0.1)' }} />
        </View>

        <Card style={styles.statsCard}>
          <Card.Content>
            <View style={styles.planHeader}>
              <View>
                <Text style={styles.label}>PLATFORM PRICING</Text>
                <Text variant="headlineLarge" style={styles.price}>₹{appSettings?.pay_per_creation_price || 499}<Text style={styles.perMonth}> / Album</Text></Text>
              </View>
              <Avatar.Icon size={48} icon={() => <Sparkles color="#f04299" size={24} />} style={{ backgroundColor: 'rgba(240,66,153,0.1)' }} />
            </View>

            <View style={styles.renewalBox}>
              <Text style={styles.renewalText}>
                 {appSettings?.maintenance_message || "Pay per creation. No monthly subscription required!"}
              </Text>
            </View>

            <View style={styles.statsGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Total Albums</Text>
                <Text style={styles.statValue}>{albumStats.total}</Text>
              </View>
              <View style={[styles.statBox, styles.statBoxBorder]}>
                <Text style={styles.statLabel}>Active Now</Text>
                <Text style={[styles.statValue, { color: '#10b981' }]}>{albumStats.active}</Text>
              </View>
              <View style={[styles.statBox, styles.statBoxBorder]}>
                <Text style={styles.statLabel}>Pending</Text>
                <Text style={[styles.statValue, { color: '#fbbf24' }]}>{albumStats.pending}</Text>
              </View>
            </View>

            <Button 
                mode="contained" 
                onPress={() => router.push('/(vendor)/magic_frame')}
                style={styles.upgradeBtn}
                buttonColor="#f04299"
                icon={() => <Plus size={18} color="#fff" />}
            >
                Create New Album
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.sectionHeader}>
          <Text variant="titleMedium" style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(vendor)/magic_frame')}>
          <View style={styles.actionIconContainer}>
              <Sparkles size={20} color="#f04299" />
          </View>
          <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>New Magic Frame</Text>
              <Text style={styles.actionDesc}>Create a new AR experience</Text>
          </View>
          <ChevronRight size={20} color="rgba(255,255,255,0.3)" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(vendor)/settings')}>
          <View style={styles.actionIconContainer}>
              <CreditCard size={20} color="#f04299" />
          </View>
          <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Billing & Upgrade</Text>
              <Text style={styles.actionDesc}>Manage your plan and usage</Text>
          </View>
          <ChevronRight size={20} color="rgba(255,255,255,0.3)" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(vendor)/settings')}>
          <View style={styles.actionIconContainer}>
              <Avatar.Icon size={32} icon={({ size, color }) => <UserIcon size={size * 0.6} color="#f04299" />} style={{ backgroundColor: 'transparent' }} />
          </View>
          <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Profile Settings</Text>
              <Text style={styles.actionDesc}>Update business details</Text>
          </View>
          <ChevronRight size={20} color="rgba(255,255,255,0.3)" />
        </TouchableOpacity>

        <Button mode="text" onPress={logout} textColor="#ef4444" style={styles.logoutBtn}>
          Sign Out
        </Button>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1, backgroundColor: '#0a060a', justifyContent: 'center', alignItems: 'center' },
  header: { padding: 25, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { color: '#fff', fontWeight: 'bold' },
  statusLabel: { color: 'rgba(255,255,255,0.4)', marginTop: 4, letterSpacing: 1 },
  statsCard: { margin: 20, marginTop: 0, backgroundColor: '#110c11', borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  planHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  label: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  price: { color: '#fff', fontWeight: '900', marginTop: 5 },
  perMonth: { fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 'normal' },
  renewalBox: { marginBottom: 20 },
  renewalText: { color: '#f04299', fontSize: 12, fontWeight: 'bold' },
  statsGrid: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 5, marginBottom: 20 },
  statBox: { flex: 1, padding: 15, alignItems: 'center' },
  statBoxBorder: { borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.05)' },
  statLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  statValue: { color: '#f04299', fontSize: 24, fontWeight: '900', marginTop: 5 },
  upgradeBtn: { borderRadius: 15, paddingVertical: 8 },
  sectionHeader: { paddingHorizontal: 25, marginTop: 10, marginBottom: 15 },
  sectionTitle: { color: '#fff', fontWeight: 'bold' },
  actionItem: { flexDirection: 'row', alignItems: 'center', padding: 15, marginHorizontal: 25, backgroundColor: '#151015', borderRadius: 20, marginBottom: 12 },
  actionIconContainer: { width: 45, height: 45, borderRadius: 15, backgroundColor: 'rgba(240,66,153,0.05)', justifyContent: 'center', alignItems: 'center' },
  actionTextContainer: { flex: 1, marginLeft: 15 },
  actionTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  actionDesc: { color: 'rgba(255,255,255,0.4)', fontSize: 12, marginTop: 2 },
  logoutBtn: { marginTop: 20, marginHorizontal: 25 }
});
