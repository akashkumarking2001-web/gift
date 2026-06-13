import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, TouchableOpacity, Image, Platform } from 'react-native';
import { Text, TextInput, Button, IconButton, ProgressBar, ActivityIndicator, Surface } from 'react-native-paper';
import { Upload, Plus, Trash2, ScanLine, Info } from 'lucide-react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '../../hooks/useAuth';
import { BusinessService } from '../../lib/businessService';
import { supabase } from '../../lib/supabase';
import { uploadFileToR2 } from '../../lib/r2Client';
import { nanoid } from 'nanoid';

const MagicFrame = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState("");
  const [syncProgress, setSyncProgress] = useState(0);

  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [groupImages, setGroupImages] = useState<any[]>([]);
  const [mappings, setMappings] = useState<any[]>([
    { id: nanoid(), targetIndex: 0, videoFile: null, playerType: "normal" }
  ]);

  const pickImages = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*',
        multiple: true
      });
      if (!result.canceled) {
        setGroupImages([...groupImages, ...result.assets]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const pickVideo = async (id: string) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*'
      });
      if (!result.canceled) {
        setMappings(prev => prev.map(m => m.id === id ? { ...m, videoFile: result.assets[0] } : m));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async () => {
    if (!title || !phone || groupImages.length === 0 || mappings.some(m => !m.videoFile)) {
      Alert.alert("Error", "Please fill all required fields and upload files.");
      return;
    }

    setLoading(true);
    setSyncStatus("Preparing upload...");

    try {
      // 1. Upload Target Images
      const folderName = `${Date.now()}_${title.replace(/\s/g, '_')}`;
      const imagePaths = [];
      for (let i = 0; i < groupImages.length; i++) {
         setSyncStatus(`Uploading Image ${i+1}/${groupImages.length}...`);
         setSyncProgress(20 + (i / groupImages.length) * 30);
         const url = await uploadFileToR2(groupImages[i], `${folderName}/image_${i}.jpg`);
         imagePaths.push(url);
      }

      await supabase.from('ar_albums').insert({
        title,
        phone_number: phone,
        username: username || null,
        client_id: user?.id,
        album_type: 'group',
        payment_status: 'pending',
        approval_status: 'pending'
      });

      setSyncProgress(100);
      setSyncStatus("Complete!");
      
      Alert.alert(
        "Payment Required", 
        "Magic Frame uploaded! To activate it, please complete the payment of ₹499.",
        [
          { text: "Pay Now", onPress: () => setShowPayment(true) },
          { text: "Later", onPress: () => {
            setTitle(""); setPhone(""); setUsername(""); setGroupImages([]);
            setMappings([{ id: nanoid(), targetIndex: 0, videoFile: null, playerType: "normal" }]);
          }}
        ]
      );
    } catch (e: any) {
      Alert.alert("Upload Failed", e.message);
    } finally {
      setLoading(false);
      setSyncStatus("");
      setSyncProgress(0);
    }
  };

  const [showPayment, setShowPayment] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handleConfirmPayment = async () => {
    if (!transactionId) {
      Alert.alert("Error", "Please enter the Transaction ID.");
      return;
    }
    // Update the last album with the transaction ID
    const { data: lastAlbum } = await supabase
      .from('ar_albums')
      .select('id')
      .eq('client_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (lastAlbum) {
      await supabase
        .from('ar_albums')
        .update({ manual_transaction_id: transactionId })
        .eq('id', lastAlbum.id);
    }

    Alert.alert("Payment Submitted", "Our team will verify your transaction and activate the album within 24 hours.");
    setShowPayment(false);
    setTitle(""); setPhone(""); setUsername(""); setGroupImages([]);
    setMappings([{ id: nanoid(), targetIndex: 0, videoFile: null, playerType: "normal" }]);
  };


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall" style={styles.headerTitle}>Create Magic Frame</Text>
      
      <View style={styles.infoCard}>
        <Info size={20} color="#f04299" />
        <Text variant="bodySmall" style={styles.infoText}>
           Magic Frames allow your customers to scan physical photos and reveal hidden videos. 
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Album Title"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
          outlineColor="rgba(255,255,255,0.1)"
          activeOutlineColor="#f04299"
          textColor="#fff"
        />

        <TextInput
          label="Customer Phone Number"
          value={phone}
          onChangeText={setPhone}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
          outlineColor="rgba(255,255,255,0.1)"
          activeOutlineColor="#f04299"
          textColor="#fff"
        />

        <TextInput
          label="Custom Slug (Optional)"
          value={username}
          onChangeText={setUsername}
          mode="outlined"
          style={styles.input}
          outlineColor="rgba(255,255,255,0.1)"
          activeOutlineColor="#f04299"
          textColor="#fff"
          placeholder="e.g. wedding-gift"
        />

        <Text variant="labelLarge" style={styles.label}>Target Images</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickImages}>
          <Upload size={32} color="rgba(255,255,255,0.3)" />
          <Text style={styles.uploadText}>
            {groupImages.length > 0 ? `${groupImages.length} Images Selected` : "Select Photographs"}
          </Text>
        </TouchableOpacity>

        <View style={styles.mappingHeader}>
          <Text variant="labelLarge" style={styles.label}>Video Mappings</Text>
          <IconButton 
            icon={() => <Plus size={20} color="#f04299" />} 
            onPress={() => setMappings([...mappings, { id: nanoid(), targetIndex: mappings.length, videoFile: null, playerType: "normal" }])}
          />
        </View>

        {mappings.map((m) => (
          <View key={m.id} style={styles.mappingCard}>
            <View style={styles.mappingRow}>
               <TextInput
                label="Idx"
                value={String(m.targetIndex)}
                onChangeText={(v) => setMappings(prev => prev.map(x => x.id === m.id ? { ...x, targetIndex: parseInt(v) || 0 } : x))}
                mode="outlined"
                style={[styles.input, { width: 60 }]}
                textColor="#fff"
               />
               <TouchableOpacity style={styles.videoPicker} onPress={() => pickVideo(m.id)}>
                 <Text style={styles.videoText} numberOfLines={1}>
                    {m.videoFile ? m.videoFile.name : "Pick Video"}
                 </Text>
               </TouchableOpacity>
               <IconButton 
                 icon={() => <Trash2 size={20} color="#ef4444" />} 
                 onPress={() => setMappings(prev => prev.filter(x => x.id !== m.id))}
               />
            </View>
          </View>
        ))}

        {loading && (
          <View style={styles.progressContainer}>
            <Text style={styles.syncStatus}>{syncStatus}</Text>
            <ProgressBar progress={syncProgress / 100} color="#f04299" style={styles.progressBar} />
          </View>
        )}

        <Button 
          mode="contained" 
          onPress={handleCreate} 
          loading={loading}
          disabled={loading}
          style={styles.createBtn}
          buttonColor="#f04299"
        >
          {loading ? "Processing..." : "Create Magic Frame"}
        </Button>
      </View>

      {showPayment && (
        <View style={styles.paymentModalOverlay}>
          <Surface style={styles.paymentCard} elevation={5}>
            <Text variant="titleLarge" style={styles.modalTitle}>Final Step: Payment</Text>
            <Text variant="bodyMedium" style={styles.modalSubtitle}>Please pay ₹499 to activate this magic frame.</Text>
            
            <View style={styles.qrPlaceholder}>
              <Text style={{color: '#aaa'}}>UPI QR Code Image</Text>
            </View>

            <Text style={styles.upiId}>UPI ID: giftmagic@upi</Text>

            <TextInput
                label="Transaction ID"
                value={transactionId}
                onChangeText={setTransactionId}
                mode="outlined"
                style={styles.modalInput}
                textColor="#fff"
                placeholder="Enter 12-digit UPI Txn ID"
            />

            <Button 
                mode="contained" 
                onPress={handleConfirmPayment}
                style={styles.confirmButton}
                buttonColor="#f04299"
            >
                Confirm Payment
            </Button>
            <Button mode="text" onPress={() => setShowPayment(false)} textColor="rgba(255,255,255,0.4)">
                Close
            </Button>
          </Surface>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a060a' },
  content: { padding: 20, paddingBottom: 150 },
  headerTitle: { color: '#fff', fontWeight: 'bold', marginBottom: 20, marginTop: 40 },
  infoCard: { flexDirection: 'row', backgroundColor: 'rgba(240,66,153,0.1)', padding: 15, borderRadius: 15, gap: 10, marginBottom: 25 },
  infoText: { color: 'rgba(255,255,255,0.6)', flex: 1, lineHeight: 18 },
  form: { gap: 15 },
  input: { backgroundColor: '#0a060a' },
  label: { color: 'rgba(255,255,255,0.5)', marginTop: 10, fontWeight: 'bold' },
  uploadBox: { 
    height: 120, 
    borderWidth: 2, 
    borderStyle: 'dashed', 
    borderColor: 'rgba(255,255,255,0.1)', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)'
  },
  uploadText: { color: 'rgba(255,255,255,0.4)', marginTop: 10, fontWeight: 'bold' },
  mappingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mappingCard: { backgroundColor: '#151015', borderRadius: 15, padding: 10, marginBottom: 10 },
  mappingRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  videoPicker: { flex: 1, backgroundColor: 'rgba(240,66,153,0.1)', borderRadius: 10, padding: 12, justifyContent: 'center' },
  videoText: { color: '#f04299', fontWeight: 'bold', fontSize: 12 },
  createBtn: { borderRadius: 15, paddingVertical: 8, marginTop: 20 },
  progressContainer: { marginTop: 20, gap: 8 },
  syncStatus: { color: 'rgba(255,255,255,0.4)', fontSize: 12, textAlign: 'center' },
  progressBar: { height: 6, borderRadius: 3 },
  paymentModalOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
    zIndex: 1000
  },
  paymentCard: {
    backgroundColor: '#151015',
    borderRadius: 24,
    padding: 24,
    gap: 16,
  },
  modalTitle: { color: '#fff', fontWeight: 'bold', textAlign: 'center' },
  modalSubtitle: { color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 8 },
  qrPlaceholder: { height: 200, backgroundColor: '#fff', borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginHorizontal: 20 },
  upiId: { color: '#f04299', textAlign: 'center', fontWeight: 'bold' },
  modalInput: { backgroundColor: '#0a060a', marginTop: 10 },
  confirmButton: { borderRadius: 12, height: 48, marginTop: 10 }
});

export default MagicFrame;
