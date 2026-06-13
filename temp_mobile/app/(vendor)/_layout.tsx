import { Tabs } from 'expo-router';
import { Home, Scan, CreditCard, Settings as SettingsIcon, Sparkles } from 'lucide-react-native';
import { useTheme } from 'react-native-paper';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#f04299',
      tabBarInactiveTintColor: 'rgba(255,255,255,0.3)',
      tabBarStyle: {
        backgroundColor: '#0a060a',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 5,
        height: 70,
        paddingBottom: 15,
      },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }: any) => <Home size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="magic_frame"
        options={{
          title: 'Magic Frame',
          tabBarIcon: ({ color }: any) => <Sparkles size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          title: 'Support',
          tabBarIcon: ({ color }: any) => <Scan size={22} color={color} />,
          href: null, // Hiding this for now as it's merged into settings/separate view
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }: any) => <SettingsIcon size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
