import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://sweylelsqyrcchplwtkx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
