import React from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { Text, Surface, Button } from 'react-native-paper';
import { Camera, Image as ImageIcon, ShieldCheck } from 'lucide-react-native';

interface PermissionDisclosureProps {
    visible: boolean;
    onAccept: () => void;
    onCancel: () => void;
    type: 'camera' | 'storage' | 'both';
}

const PermissionDisclosure: React.FC<PermissionDisclosureProps> = ({ visible, onAccept, onCancel, type }) => {
    const getContent = () => {
        switch (type) {
            case 'camera':
                return {
                    title: 'Camera Access',
                    description: 'Giftmagic needs access to your camera to scan QR codes on physical frames and bring your AR experiences to life.',
                    icon: <Camera size={48} color="#f04299" />,
                };
            case 'storage':
                return {
                    title: 'Storage Access',
                    description: 'We need permission to access your gallery so you can select the photos and videos you want to turn into AR Magic Frames.',
                    icon: <ImageIcon size={48} color="#f04299" />,
                };
            default:
                return {
                    title: 'Camera & Storage',
                    description: 'Giftmagic requires camera access to scan QR codes and storage access to let you upload photos and videos for your AR albums.',
                    icon: <ShieldCheck size={48} color="#f04299" />,
                };
        }
    };

    const content = getContent();

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <Surface style={styles.card} elevation={5}>
                    <View style={styles.iconContainer}>
                        {content.icon}
                    </View>
                    
                    <Text variant="headlineSmall" style={styles.title}>{content.title}</Text>
                    <Text variant="bodyMedium" style={styles.description}>
                        {content.description}
                    </Text>

                    <View style={styles.importanceBox}>
                        <Text style={styles.importanceText}>
                            This permission is only used within the app for the features mentioned above. We do not use your camera or files in the background.
                        </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            mode="text" 
                            onPress={onCancel} 
                            style={styles.btn}
                            textColor="rgba(255,255,255,0.4)"
                        >
                            Not Now
                        </Button>
                        <Button 
                            mode="contained" 
                            onPress={onAccept} 
                            style={styles.btn}
                            buttonColor="#f04299"
                        >
                            Continue
                        </Button>
                    </View>
                </Surface>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        backgroundColor: '#151015',
        borderRadius: 32,
        padding: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(240,66,153,0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 16,
    },
    description: {
        color: 'rgba(255,255,255,0.6)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 24,
    },
    importanceBox: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 16,
        borderRadius: 16,
        marginBottom: 30,
    },
    importanceText: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    btn: {
        flex: 1,
        borderRadius: 12,
    }
});

export default PermissionDisclosure;
