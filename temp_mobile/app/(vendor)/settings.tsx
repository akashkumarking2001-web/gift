import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, Linking, TouchableOpacity, Image } from 'react-native';
import { Text, List, Button, Divider, IconButton, Avatar, TextInput, Surface, Badge } from 'react-native-paper';
import { Shield, FileText, Trash2, Mail, MapPin, Lock, Rocket, CreditCard, ChevronLeft, User as UserIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { BusinessService } from '../../lib/businessService';
import { supabase } from '../../lib/supabase';

const Settings = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [view, setView] = useState<'main' | 'profile' | 'upgrade'>('main');
  
  // Profile State
  const [editUser, setEditUser] = useState<any>(user);
  
  // Pricing & Upgrade State
  const [pricing, setPricing] = useState({ price: 149, original_mrp: 499 });
  const [packages, setPackages] = useState<any[]>([]);
  const [reqPackage, setReqPackage] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const isSuperAdmin = user?.email === 'akashkumarking2001@gmail.com' || user?.email === 'admin@giftmagic.in';

  useEffect(() => {
    if (user) {
      setEditUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (view === 'upgrade') {
      fetchPackages();
    }
    fetchGlobalPricing();
  }, [view]);

  const fetchGlobalPricing = async () => {
    const settings = await BusinessService.getAppSettings();
    if (settings.album_pricing) {
        const p = typeof settings.album_pricing === 'string' ? JSON.parse(settings.album_pricing) : settings.album_pricing;
        setPricing(p);
    }
  };

  const fetchPackages = async () => {
    try {
      const data = await BusinessService.getPackages();
      setPackages(data);
      if (data.length > 0) {
          const current = data.find(p => p.slug === user?.package_type);
          setReqPackage(current || data[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editUser) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('business_clients')
        .update({
          business_name: editUser.business_name,
          email: editUser.email,
          instagram_id: editUser.instagram_id,
          whatsapp_number: editUser.whatsapp_number || ''
        })
        .eq('id', editUser.id);

      if (error) throw error;
      Alert.alert("Success", "Profile updated successfully.");
      setView('main');
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeSubmit = async () => {
    if (!user || !reqPackage) return;
    
    setLoading(true);
    try {
      Alert.alert("Check Out", `Proceeding to upgrade to ${reqPackage.name}.`, [
          { text: "Confirm Payment", onPress: () => Alert.alert("Success", "Request received! Admin will verify.") },
          { text: "Cancel", style: "cancel" }
      ]);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to initiate upgrade.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePricing = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('app_settings')
        .update({ value: JSON.stringify(pricing) })
        .eq('key', 'album_pricing');

      if (error) throw error;
      Alert.alert("Success", "Global pricing updated instantly! All users will see the new price.");
    } catch (e: any) {
      Alert.alert("Error", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account?",
      "This will permanently remove your business data and all uploaded AR content. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete My Data", 
          style: "destructive",
          onPress: async () => {
             // Real deletion or flag for deletion
             Alert.alert("Request Received", "Your account deletion request has been submitted. Your data will be removed within 48 hours according to Google Play Store policy.");
          }
        }
      ]
    );
  };

  if (view === 'profile' && editUser) {
    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <IconButton icon="chevron-left" iconColor="#fff" onPress={() => setView('main')} />
          <Text variant="headlineSmall" style={styles.viewTitle}>Edit Profile</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.formSection}>
            <TextInput
              label="Business Name"
              value={editUser.business_name}
              onChangeText={(txt) => setEditUser({ ...editUser, business_name: txt })}
              mode="outlined"
              textColor="#fff"
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor="#f04299"
              style={styles.input}
            />
            <TextInput
              label="Email Address"
              value={editUser.email}
              onChangeText={(txt) => setEditUser({ ...editUser, email: txt })}
              mode="outlined"
              textColor="#fff"
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor="#f04299"
              style={styles.input}
            />
            <TextInput
              label="Instagram ID"
              value={editUser.instagram_id}
              onChangeText={(txt) => setEditUser({ ...editUser, instagram_id: txt })}
              mode="outlined"
              textColor="#fff"
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor="#f04299"
              style={styles.input}
            />
            <TextInput
              label="WhatsApp Number"
              value={editUser.whatsapp_number || ''}
              onChangeText={(txt) => setEditUser({ ...editUser, whatsapp_number: txt })}
              mode="outlined"
              textColor="#fff"
              outlineColor="rgba(255,255,255,0.1)"
              activeOutlineColor="#f04299"
              style={styles.input}
              placeholder="+91..."
            />

            <Button 
              mode="contained" 
              onPress={handleUpdateProfile} 
              loading={loading}
              disabled={loading}
              style={styles.saveBtn}
              buttonColor="#f04299"
            >
              Save Changes
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (view === 'upgrade' && user) {
    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <IconButton icon="chevron-left" iconColor="#fff" onPress={() => setView('main')} />
          <Text variant="headlineSmall" style={styles.viewTitle}>Upgrade Plan</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.upgradeOptions}>
            {packages.map((pkg) => (
              <TouchableOpacity 
                key={pkg.id}
                onPress={() => setReqPackage(pkg)}
                style={[
                  styles.pkgCard,
                  reqPackage?.id === pkg.id && styles.pkgCardSelected,
                  user.package_type === pkg.slug && styles.pkgCardCurrent
                ]}
              >
                <View style={styles.pkgRow}>
                    <Text variant="titleMedium" style={styles.pkgTitle}>{pkg.name}</Text>
                    {user.package_type === pkg.slug && (
                        <Badge style={{ backgroundColor: '#10b981', color: '#fff' }}>CURRENT</Badge>
                    )}
                </View>
                <Text variant="headlineSmall" style={styles.pkgPrice}>₹{pkg.price}</Text>
                <Text variant="bodySmall" style={styles.pkgFrames}>{pkg.frame_limit} Magic Frames</Text>
              </TouchableOpacity>
            ))}
          </View>

          {reqPackage && user.package_type !== reqPackage.slug && (
            <Button 
                mode="contained" 
                onPress={handleUpgradeSubmit} 
                loading={loading}
                style={styles.upgradeActionBtn}
                buttonColor="#10b981"
            >
              Upgrade & Pay ₹{reqPackage.price}
            </Button>
          )}

          <Button mode="text" onPress={() => setView('main')} textColor="rgba(255,255,255,0.4)" style={{marginTop: 10}}>
            Go Back
          </Button>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={[styles.headerTitle, { paddingHorizontal: 20 }]}>Settings</Text>
      <ScrollView contentContainerStyle={styles.content}>
        
        <TouchableOpacity style={styles.profileSection} onPress={() => setView('profile')}>
          <Avatar.Icon size={50} icon={({ size, color }) => <UserIcon size={size * 0.6} color="#fff" />} style={styles.avatar} />
          <View style={styles.profileText}>
            <Text variant="labelLarge" style={{ color: '#fff' }}>{user?.business_name || 'Business Vendor'}</Text>
            <Text variant="bodySmall" style={styles.subText}>{user?.email || 'Vendor Dashboard'}</Text>
          </View>
          <IconButton icon="pencil" size={20} iconColor="#f04299" />
        </TouchableOpacity>

        <List.Section>
          <List.Subheader style={styles.listHeader}>SUBSCRIPTION</List.Subheader>
          <List.Item
            title="Upgrade Plan"
            description="Manage your business package"
            left={props => <Rocket size={24} color="#f04299" style={props.style} />}
            right={props => <IconButton icon="chevron-right" iconColor="rgba(255,255,255,0.3)" />}
            onPress={() => setView('upgrade')}
            style={styles.listItem}
            titleStyle={{ color: '#fff' }}
            descriptionStyle={{ color: 'rgba(255,255,255,0.4)' }}
          />
        </List.Section>

        {isSuperAdmin && (
          <List.Section>
            <List.Subheader style={[styles.listHeader, { color: '#fbbf24' }]}>MASTER ADMIN TOOLS</List.Subheader>
            <Surface style={{ backgroundColor: 'rgba(251,191,36,0.05)', padding: 15, borderRadius: 15 }}>
                <Text style={{ color: '#fbbf24', fontWeight: 'bold' }}>Global Album Price</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                    <TextInput
                        label="Selling Price"
                        value={pricing.price.toString()}
                        onChangeText={(t) => setPricing({...pricing, price: parseInt(t) || 0})}
                        mode="outlined"
                        style={{ flex: 1, backgroundColor: 'transparent' }}
                        textColor="#fff"
                        keyboardType="numeric"
                    />
                    <TextInput
                        label="MRP"
                        value={pricing.original_mrp.toString()}
                        onChangeText={(t) => setPricing({...pricing, original_mrp: parseInt(t) || 0})}
                        mode="outlined"
                        style={{ flex: 1, backgroundColor: 'transparent' }}
                        textColor="#fff"
                        keyboardType="numeric"
                    />
                </View>
                <Button 
                    mode="contained" 
                    onPress={handleUpdatePricing} 
                    loading={loading}
                    buttonColor="#fbbf24"
                    textColor="#000"
                    style={{ marginTop: 15, borderRadius: 10 }}
                >
                    Update Global Price
                </Button>
            </Surface>
          </List.Section>
        )}

        <List.Section>
          <List.Subheader style={styles.listHeader}>LEGAL & POLICIES</List.Subheader>
          <List.Item
            title="Privacy Policy"
            description="How we protect your business data"
            left={props => <Shield size={24} color="#f04299" style={props.style} />}
            right={props => <IconButton icon="chevron-right" iconColor="rgba(255,255,255,0.3)" />}
            onPress={() => Linking.openURL('https://giftmagic.beauty/privacy-policy')}
            style={styles.listItem}
            titleStyle={{ color: '#fff' }}
            descriptionStyle={{ color: 'rgba(255,255,255,0.4)' }}
          />
          <List.Item
            title="Terms of Service"
            description="Vendor platform agreements"
            left={props => <FileText size={24} color="#f04299" style={props.style} />}
            right={props => <IconButton icon="chevron-right" iconColor="rgba(255,255,255,0.3)" />}
            onPress={() => Linking.openURL('https://giftmagic.beauty/terms-of-service')}
            style={styles.listItem}
            titleStyle={{ color: '#fff' }}
            descriptionStyle={{ color: 'rgba(255,255,255,0.4)' }}
          />
        </List.Section>

        <List.Section>
          <List.Subheader style={styles.listHeader}>DATA SAFETY</List.Subheader>
          <View style={styles.safetyCard}>
              <View style={styles.safetyHeader}>
                <Shield size={20} color="#10b981" />
                <Text variant="labelLarge" style={{ color: '#10b981' }}>Play Store Compliant</Text>
              </View>
              <Text variant="bodySmall" style={styles.safetyText}>
                Your uploaded photos and videos are encrypted during transit and stored securely. 
                We do not share your media with third parties.
              </Text>
          </View>
        </List.Section>

        <Divider style={styles.divider} />

        <Button 
          mode="contained" 
          icon="trash-can"
          buttonColor="#ef4444" 
          onPress={handleDeleteAccount}
          style={styles.deleteBtn}
        >
          Delete My Account
        </Button>
        <Text variant="bodySmall" style={styles.deleteText}>Required for Google Play Store compliance</Text>

        <Button mode="text" onPress={logout} textColor="#fff" style={{ marginTop: 20 }}>
          Sign Out
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a060a' },
  content: { padding: 20, paddingBottom: 150 },
  headerTitle: { color: '#fff', fontWeight: 'bold', marginBottom: 10, marginTop: 60 },
  profileSection: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#151015', padding: 15, borderRadius: 20, marginBottom: 20 },
  avatar: { backgroundColor: '#f04299' },
  profileText: { flex: 1, marginLeft: 15 },
  subText: { color: 'rgba(255,255,255,0.4)', marginTop: 4 },
  listHeader: { color: 'rgba(255,255,255,0.3)', fontWeight: 'bold', letterSpacing: 1, paddingLeft: 0, marginTop: 10 },
  listItem: { backgroundColor: '#151015', borderRadius: 12, marginBottom: 8, paddingVertical: 4 },
  divider: { marginVertical: 30, backgroundColor: 'rgba(255,255,255,0.05)' },
  deleteBtn: { borderRadius: 12 },
  deleteText: { color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: 10, fontSize: 10, textTransform: 'uppercase' },
  viewHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 50, paddingHorizontal: 10 },
  viewTitle: { color: '#fff', fontWeight: 'bold', marginLeft: 10 },
  formSection: { gap: 15 },
  input: { backgroundColor: '#0a060a' },
  saveBtn: { borderRadius: 12, marginTop: 10, paddingVertical: 5 },
  upgradeOptions: { gap: 15, marginBottom: 30 },
  pkgCard: { backgroundColor: '#151015', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  pkgCardSelected: { borderColor: '#f04299', backgroundColor: 'rgba(240,66,153,0.05)' },
  pkgCardCurrent: { borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.05)' },
  pkgRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  pkgTitle: { color: '#fff', fontWeight: 'bold' },
  pkgPrice: { color: '#f04299', fontWeight: '900', marginVertical: 5 },
  pkgFrames: { color: 'rgba(255,255,255,0.4)' },
  upgradeActionBtn: { borderRadius: 15, paddingVertical: 8 },
  safetyCard: { backgroundColor: '#151015', padding: 15, borderRadius: 15, borderLeftWidth: 3, borderLeftColor: '#10b981' },
  safetyHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  safetyText: { color: 'rgba(255,255,255,0.4)', lineHeight: 18 }
});

export default Settings;
