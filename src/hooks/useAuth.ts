import { create } from 'zustand';
import { supabase } from '../lib/supabase';

type User = Awaited<ReturnType<typeof supabase.auth.getUser>>['data']['user'];

interface AuthState {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    setUser: (user) => set({ user, loading: false }),
    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, loading: false });
    },
}));
