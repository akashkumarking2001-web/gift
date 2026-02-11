import { useState } from 'react';
import { TemplateService } from '../lib/templateService';
import { TEMPLATES } from '../lib/templates';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

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
        <div className="min-h-screen bg-[#0a060a] text-white p-8 font-outfit">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img
                                src="/logo.svg"
                                alt="Gift Magic"
                                className="h-12 w-12 object-contain group-hover:scale-110 transition-transform"
                                onError={(e: any) => {
                                    e.currentTarget.src = "/logo.png";
                                }}
                            />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-3xl font-black tracking-tight flex items-center">
                                <span className="gradient-text">Gift</span>
                                <span className="text-white ml-2">Magic</span>
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#f04299]/60 uppercase mt-1">Digital Experience</span>
                        </div>
                    </Link>
                    <div className="h-12 w-px bg-white/10 mx-4" />
                    <h1 className="text-2xl font-black uppercase tracking-widest text-white/30">System Setup</h1>
                </div>

                <div className="space-y-4 mb-8">
                    <button
                        onClick={runFullSetup}
                        disabled={syncing}
                        className="w-full gradient-primary hover:opacity-90 text-white font-black py-5 px-6 rounded-2xl disabled:opacity-50 shadow-xl shadow-primary/20 uppercase tracking-widest text-sm"
                    >
                        {syncing ? '⏳ Running Setup...' : '🚀 Run Full Setup (Templates + Accounts)'}
                    </button>

                    <div className="grid md:grid-cols-2 gap-4">
                        <button
                            onClick={syncTemplates}
                            disabled={syncing}
                            className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-6 rounded-xl border border-white/10 transition-colors uppercase tracking-widest text-xs"
                        >
                            Sync Templates Only
                        </button>

                        <button
                            onClick={createTestAccounts}
                            disabled={syncing}
                            className="bg-white/5 hover:bg-white/10 text-white font-bold py-4 px-6 rounded-xl border border-white/10 transition-colors uppercase tracking-widest text-xs"
                        >
                            Create Test Accounts Only
                        </button>
                    </div>
                </div>

                <div className="glass-card p-8 rounded-3xl border border-white/10">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/20 mb-6 flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        System Initialization Log
                    </h2>
                    <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono bg-black/50 p-6 rounded-2xl border border-white/5 max-h-[400px] overflow-y-auto">
                        {result || 'Waiting for instruction...'}
                    </pre>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/login" className="text-xs font-black uppercase tracking-widest text-white/20 hover:text-primary transition-colors">
                        Go to Authenticate Hub →
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SetupPage;
