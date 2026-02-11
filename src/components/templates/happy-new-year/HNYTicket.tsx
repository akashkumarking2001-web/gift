import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Star, Sparkles, ArrowRight } from 'lucide-react';

const HNYTicket = ({ data, onNext }: any) => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#09050f] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg"
            >
                {/* PREMIUM GOLDEN TICKET */}
                <div className="relative bg-black rounded-[2rem] border-2 border-amber-500/50 p-1 shadow-[0_0_40px_rgba(245,158,11,0.2)] overflow-hidden">

                    {/* Inner Pattern & Border */}
                    <div className="relative bg-[#0a0a0a] rounded-[1.8rem] p-10 md:p-14 border border-amber-500/20 overflow-hidden">

                        {/* Shimmer Effect */}
                        <motion.div
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent skew-x-[45deg] pointer-events-none"
                        />

                        {/* Ticket Header */}
                        <div className="flex justify-between items-center mb-12 border-b border-amber-500/20 pb-8">
                            <div className="flex flex-col">
                                <span className="text-amber-500 font-black text-2xl tracking-tighter italic">GOLDEN TICKET</span>
                                <span className="text-amber-500/40 text-[8px] uppercase font-bold tracking-[0.4em] mt-1">Authentic Member Edition</span>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                                <span className="text-amber-500 font-black text-2xl">B</span>
                            </div>
                        </div>

                        {/* Ticket Content */}
                        <div className="space-y-10 mb-12 relative z-10 text-center md:text-left">
                            <div className="space-y-2">
                                <p className="text-amber-100 font-bold uppercase tracking-[0.2em] text-[10px]">Validity Period</p>
                                <h3 className="text-white text-3xl font-black">VALID FOR EVERY DAY AHEAD</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-1">
                                    <p className="text-amber-100/40 font-bold uppercase tracking-[0.2em] text-[8px]">Access Granted</p>
                                    <p className="text-white font-medium italic">Unlimited Love & Smiles</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-amber-100/40 font-bold uppercase tracking-[0.2em] text-[8px]">Terms</p>
                                    <p className="text-white font-medium italic">No expiration date</p>
                                </div>
                            </div>
                        </div>

                        {/* Footer / QR Code Placeholder Visual */}
                        <div className="flex justify-between items-end border-t border-amber-500/20 pt-8">
                            <div className="flex gap-1">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className={`w-[2px] bg-amber-500/30 ${i % 3 === 0 ? 'h-6' : 'h-4'}`} />
                                ))}
                            </div>
                            <div className="text-amber-500/20 font-mono text-[8px]">
                                #0101-2026-FOREVER
                            </div>
                        </div>
                    </div>
                </div>

                {/* CLAIM BUTTON */}
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(245,158,11,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full mt-12 py-5 rounded-2xl bg-amber-500 text-black font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all duration-300"
                >
                    Claim Ticket
                    <ArrowRight size={16} />
                </motion.button>
            </motion.div>

            {/* BACKGROUND DECOR */}
            <div className="absolute top-10 right-10 opacity-20">
                <Sparkles className="text-amber-500 w-24 h-24 animate-pulse" />
            </div>
            <div className="absolute bottom-10 left-10 opacity-20">
                <Star className="text-amber-500 w-24 h-24 animate-bounce" />
            </div>
        </div>
    );
};

export default HNYTicket;
