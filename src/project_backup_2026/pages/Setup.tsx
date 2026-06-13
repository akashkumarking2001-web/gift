import { useState } from 'react';
import { TemplateService } from '../lib/templateService';
import { TEMPLATES } from '../lib/templates';
import { supabase } from '../lib/supabase';

const SetupPage = () => {
    const [syncing, setSyncing] = useState(false);
    const [result, setResult] = useState<string>('');

    const syncTemplates = async () => {
        setSyncing(true);
        setResult('Syncing templates...\n');

        try {
            await TemplateService.syncFromLocal();
            setResult(prev => prev + `✅ Successfully synced ${TEMPLATES.length} templates!\n`);
        } catch (error) {
            setResult(prev => prev + `❌ Error: ${error}\n`);
        }

        setSyncing(false);
    };

    const createTestAccounts = async () => {
        setResult(prev => prev + '\n📧 Creating test accounts...\n');

        // Admin account
        const { data: adminData, error: adminError } = await supabase.auth.signUp({
            email: 'admin@giftmagic.com',
            password: 'Admin@123456',
        });

        if (adminError) {
            setResult(prev => prev + `❌ Admin error: ${adminError.message}\n`);
        } else {
            setResult(prev => prev + `✅ Admin created: admin@giftmagic.com / Admin@123456\n`);
        }

        // User account
        const { data: userData, error: userError } = await supabase.auth.signUp({
            email: 'user@giftmagic.com',
            password: 'User@123456',
        });

        if (userError) {
            setResult(prev => prev + `❌ User error: ${userError.message}\n`);
        } else {
            setResult(prev => prev + `✅ User created: user@giftmagic.com / User@123456\n`);
        }
    };

    const runFullSetup = async () => {
        setSyncing(true);
        setResult('🚀 Starting full setup...\n\n');

        await syncTemplates();
        await createTestAccounts();

        setResult(prev => prev + '\n✅ Setup complete!\n');
        setSyncing(false);
    };

    return (
        <div className="min-h-screen bg-[#0a060a] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">🛠️ GiftMagic Setup</h1>

                <div className="space-y-4 mb-8">
                    <button
                        onClick={runFullSetup}
                        disabled={syncing}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl disabled:opacity-50"
                    >
                        {syncing ? '⏳ Running Setup...' : '🚀 Run Full Setup (Templates + Accounts)'}
                    </button>

                    <button
                        onClick={syncTemplates}
                        disabled={syncing}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50"
                    >
                        Sync Templates Only
                    </button>

                    <button
                        onClick={createTestAccounts}
                        disabled={syncing}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50"
                    >
                        Create Test Accounts Only
                    </button>
                </div>

                <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                    <h2 className="text-xl font-bold mb-4">📋 Setup Log</h2>
                    <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
                        {result || 'Click a button above to start...'}
                    </pre>
                </div>

                <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">📝 Credentials (After Setup)</h3>
                    <div className="space-y-2 text-sm">
                        <p><strong>Admin:</strong> admin@giftmagic.com / Admin@123456</p>
                        <p><strong>User:</strong> user@giftmagic.com / User@123456</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SetupPage;
