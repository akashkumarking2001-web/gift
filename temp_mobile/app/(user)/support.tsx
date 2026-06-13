import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { Text, Surface, Button, List } from 'react-native-paper';
import { Stack } from 'expo-router';
import { MessageSquare, Mail, Phone, ExternalLink, HelpCircle, ShieldCheck, Heart } from 'lucide-react-native';

const SupportScreen = () => {
    const contactWhatsApp = () => {
        const message = 'Hello Giftmagic Support, I need help with my AR Magic Frame.';
        const url = `whatsapp://send?phone=918610381533&text=${encodeURIComponent(message)}`;
        const browserUrl = `https://wa.me/918610381533?text=${encodeURIComponent(message)}`;
        
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Linking.openURL(browserUrl);
            }
        });
    };

    const contactEmail = () => {
        Linking.openURL('mailto:support@giftmagic.beauty?subject=Support Request&body=Order ID (if any): ');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Customer Support', headerShown: true }} />
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <View style={styles.iconCircle}>
                        <Heart size={40} color="#f04299" fill="#f04299" />
                    </View>
                    <Text variant="headlineSmall" style={styles.title}>How can we help?</Text>
                    <Text variant="bodyMedium" style={styles.subtitle}>
                        Our magic team is here to assist you with your digital experiences.
                    </Text>
                </View>

                <Surface style={styles.contactCard} elevation={2}>
                    <Text style={styles.sectionLabel}>Direct Contact</Text>
                    
                    <TouchableOpacity style={styles.contactItem} onPress={contactWhatsApp}>
                        <View style={[styles.contactIcon, { backgroundColor: '#25D36620' }]}>
                            <MessageSquare size={20} color="#25D366" />
                        </View>
                        <View style={styles.contactText}>
                            <Text style={styles.itemTitle}>WhatsApp Support</Text>
                            <Text style={styles.itemSub}>Chat with us for instant help</Text>
                        </View>
                        <ExternalLink size={16} color="rgba(255,255,255,0.2)" />
                    </TouchableOpacity>

                    <View style={styles.divider} />

                    <TouchableOpacity style={styles.contactItem} onPress={contactEmail}>
                        <View style={[styles.contactIcon, { backgroundColor: '#f0429920' }]}>
                            <Mail size={20} color="#f04299" />
                        </View>
                        <View style={styles.contactText}>
                            <Text style={styles.itemTitle}>Email Support</Text>
                            <Text style={styles.itemSub}>support@giftmagic.beauty</Text>
                        </View>
                        <ExternalLink size={16} color="rgba(255,255,255,0.2)" />
                    </TouchableOpacity>
                </Surface>

                <View style={styles.faqSection}>
                    <Text style={styles.sectionLabel}>Frequently Asked Questions</Text>
                    <Surface style={styles.faqCard} elevation={1}>
                        <List.Accordion
                            title="How do I scan my frame?"
                            titleStyle={styles.faqTitle}
                            style={styles.accordion}
                        >
                            <Text style={styles.faqAnswer}>
                                Open the app, and from the home screen, click "Scan QR & Experience". Once your camera opens, point it directly at your physical frame. The AR experience will start automatically.
                            </Text>
                        </List.Accordion>
                        <View style={styles.divider} />
                        <List.Accordion
                            title="Payment Successful but frame not working?"
                            titleStyle={styles.faqTitle}
                            style={styles.accordion}
                        >
                            <Text style={styles.faqAnswer}>
                                Go to "My Orders" in your profile and click "Verify Payment". Sometimes it takes 30 seconds for the database to update. If it still doesn't work, contact us on WhatsApp.
                            </Text>
                        </List.Accordion>
                        <View style={styles.divider} />
                        <List.Accordion
                            title="I lost my QR code"
                            titleStyle={styles.faqTitle}
                            style={styles.accordion}
                        >
                            <Text style={styles.faqAnswer}>
                                Log in to the app, go to your profile, and select "My Orders". You can view all your created magic frames and their associated links/QR codes there.
                            </Text>
                        </List.Accordion>
                    </Surface>
                </View>

                <View style={styles.footer}>
                    <ShieldCheck size={16} color="rgba(255,255,255,0.3)" />
                    <Text style={styles.footerText}>Secure Digital Hosting by Giftmagic</Text>
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
    content: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(240,66,153,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        paddingHorizontal: 30,
    },
    contactCard: {
        backgroundColor: '#151015',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    sectionLabel: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
        marginLeft: 4,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    contactIcon: {
        width: 44,
        height: 44,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    contactText: {
        flex: 1,
    },
    itemTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    itemSub: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 13,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 4,
    },
    faqSection: {
        marginTop: 30,
    },
    faqCard: {
        backgroundColor: '#151015',
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    accordion: {
        backgroundColor: 'transparent',
    },
    faqTitle: {
        color: '#fff',
        fontSize: 15,
    },
    faqAnswer: {
        padding: 20,
        paddingTop: 0,
        color: 'rgba(255,255,255,0.6)',
        lineHeight: 20,
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 40,
        marginBottom: 20,
    },
    footerText: {
        color: 'rgba(255,255,255,0.2)',
        fontSize: 12,
    }
});

export default SupportScreen;
