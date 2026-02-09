import { supabase } from "./supabase";

export const SettingsService = {
    async getSettings() {
        const { data: records, error } = await supabase
            .from('system_settings')
            .select('*');

        if (error) {
            console.error('Error fetching settings:', error);
            return {};
        }

        const settings: Record<string, string> = {};
        if (records) {
            records.forEach((r: any) => {
                settings[r.key] = r.value;
            });
        }
        return settings;
    },

    async updateSetting(key: string, value: string) {
        const { error } = await supabase
            .from('system_settings')
            .upsert({ key, value });

        if (error) throw error;
    }
};
