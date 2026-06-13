import { Stack } from 'expo-router';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#f04299',
    secondary: '#8b5cf6',
    background: '#0a060a',
    surface: '#151015',
  },
};

import { AuthProvider } from '../hooks/useAuth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <Stack screenOptions={{ 
          headerShown: false,
        }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(vendor)" />
          <Stack.Screen name="(user)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(userAuth)" />
          <Stack.Screen name="policies" options={{ presentation: 'modal', title: 'Legal Policies', headerShown: true }} />
        </Stack>
      </PaperProvider>
    </AuthProvider>
  );
}
