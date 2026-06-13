import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { Stack } from 'expo-router';

const LegalPoliciesScreen = () => {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Legal Policies', headerShown: true }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>Privacy Policy</Text>
        <Text variant="bodyMedium" style={styles.paragraph}>
          Giftmagic (www.giftmagic.beauty) values your privacy. We collect your name, phone, and media files solely to provide AR album services. Your media is encrypted and stored on secure cloud servers (Supabase/R2).
        </Text>
        <Text variant="bodySmall" style={styles.subtext}>
          Permissions: We require Camera access for scanning and Storage access for media uploads. For full details, visit our website.
        </Text>

        <Divider style={styles.divider} />

        <Text variant="headlineSmall" style={styles.title}>Terms of Service</Text>
        <Text variant="bodyMedium" style={styles.paragraph}>
          By creating an AR Magic Frame, you agree to our digital content standards. You must own the rights to the photos/videos you upload. We host your content for the duration of your hosting package.
        </Text>

        <Divider style={styles.divider} />

        <Text variant="headlineSmall" style={styles.title}>Refund & Cancellation</Text>
        <Text variant="bodyMedium" style={styles.paragraph}>
          All sales are final. Since our products are digital content delivered instantly, we operate a strict NO REFUND policy once the AR album is generated. Duplicate payments will be refunded upon verification.
        </Text>

        <Divider style={styles.divider} />

        <Text variant="headlineSmall" style={styles.title}>Data Deletion</Text>
        <Text variant="bodyMedium" style={styles.paragraph}>
          You can request account deletion at any time from your profile settings. This will permanently remove your profile and all uploaded media files within 7-14 days.
        </Text>

        <Divider style={styles.divider} />

        <Text variant="headlineSmall" style={styles.title}>Contact & Support</Text>
        <Text variant="bodyMedium" style={styles.paragraph}>
          For any issues, please contact us on WhatsApp at +91 8610381533 or email us at support@giftmagic.beauty
        </Text>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a060a',
  },
  content: {
    padding: 24,
  },
  title: {
    color: '#f04299',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  paragraph: {
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
    marginBottom: 16,
  },
  subtext: {
    color: 'rgba(255,255,255,0.4)',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  divider: {
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
});

export default LegalPoliciesScreen;
