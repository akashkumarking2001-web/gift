import { supabase } from "./supabase";

export interface PaymentRequest {
    id: string;
    user_email: string;
    transaction_id: string;
    amount: number;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export const PaymentService = {
    async submitPayment(userEmail: string, transactionId: string, amount: number, screenshotUrl?: string) {
        const { error } = await supabase
            .from('payments')
            .insert({
                user_email: userEmail,
                transaction_id: transactionId,
                amount: amount,
                screenshot_url: screenshotUrl,
                status: 'pending'
            });

        if (error) throw error;
    },

    async getAllPayments(): Promise<PaymentRequest[]> {
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching payments:', error);
            return [];
        }
        return data || [];
    },

    async getPendingPayments(): Promise<PaymentRequest[]> {
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching pending payments:', error);
            return [];
        }
        return data || [];
    },

    async approvePayment(id: string) {
        const { error } = await supabase
            .from('payments')
            .update({ status: 'approved' })
            .eq('id', id);

        if (error) throw error;

        // Logic to grant templates to user would go here or be handled by a Supabase Edge Function
    },

    async rejectPayment(id: string, reason: string) {
        const { error } = await supabase
            .from('payments')
            .update({ status: 'rejected', rejection_reason: reason })
            .eq('id', id);

        if (error) throw error;
    },

    async getUserPayments(userEmail: string): Promise<PaymentRequest[]> {
        const { data, error } = await supabase
            .from('payments')
            .select('*')
            .eq('user_email', userEmail)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching user payments:', error);
            return [];
        }
        return data || [];
    },

    async getUserStats(userEmail: string) {
        const payments = await this.getUserPayments(userEmail);
        const totalSpent = payments
            .filter(p => p.status === 'approved')
            .reduce((sum, p) => sum + p.amount, 0);
        return {
            totalSpent,
            transactionCount: payments.length,
            payments
        };
    }
};
