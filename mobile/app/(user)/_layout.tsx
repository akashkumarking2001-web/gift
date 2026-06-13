import React from 'react';
import { Tabs } from 'expo-router';
import { History, User, LayoutDashboard } from 'lucide-react-native';
import { View, Image, StyleSheet } from 'react-native';

export default function UserLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        backgroundColor: '#1a141a',
        borderTopWidth: 0,
        height: 75,
        paddingBottom: 20,
        paddingTop: 12,
        position: 'absolute',
        bottom: 25,
        left: 20,
        right: 20,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
      },
      tabBarLabelStyle: {
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: -5,
      },
      tabBarActiveTintColor: '#f04299',
      tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
      headerStyle: {
        backgroundColor: '#0a060a',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        height: 80,
      },
      headerTitle: () => (
        <View style={headerStyles.container}>
          <Image 
            source={require('../../assets/icon.png')} 
            style={headerStyles.logo} 
            resizeMode="contain"
          />
        </View>
      ),
      headerTintColor: '#fff',
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <LayoutDashboard size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => <History size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      {/* Hide create and scanner from bottom tabs but allow navigation */}
      <Tabs.Screen
        name="create"
        options={{
          href: null,
          title: 'Create Magic',
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          href: null,
          title: 'Scanner',
        }}
      />
    </Tabs>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    height: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 28,
    width: 100,
  }
});
