import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { BusinessService } from '../lib/businessService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  user: any | null;
  loading: boolean;
  login: (email: string, password_hash: string) => Promise<{ success: boolean; error?: string }>;
  loginIndividual: (individualUser: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkInitialAuth();
    
    // Auth state listener for Real Supabase Auth (e.g. Google Login)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
          authType: 'individual'
        };
        setUser(u);
        await AsyncStorage.setItem('individual_user', JSON.stringify(u));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        await AsyncStorage.removeItem('individual_user');
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkInitialAuth = async () => {
    try {
      const storedBiz = await AsyncStorage.getItem('business_user');
      const storedIndie = await AsyncStorage.getItem('individual_user');
      
      if (storedBiz) {
        setUser({ ...JSON.parse(storedBiz), authType: 'business' });
      } else if (storedIndie) {
        setUser({ ...JSON.parse(storedIndie), authType: 'individual' });
      }
    } catch (e) {
      console.error('Initial auth check failed:', e);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password_hash: string) => {
    setLoading(true);
    try {
      const business = await BusinessService.verifyLogin(email, password_hash);
      if (business) {
        const u = { ...business, authType: 'business' };
        await AsyncStorage.setItem('business_user', JSON.stringify(business));
        setUser(u);
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const loginIndividual = async (individualUser: any) => {
     const u = { ...individualUser, authType: 'individual' };
     await AsyncStorage.setItem('individual_user', JSON.stringify(individualUser));
     setUser(u);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Supabase sign out error:', e);
    }
    await AsyncStorage.removeItem('business_user');
    await AsyncStorage.removeItem('individual_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginIndividual, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
