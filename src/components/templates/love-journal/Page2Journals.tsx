import { motion } from 'framer-motion';
import { PenTool, Calendar } from 'lucide-react';

interface Page2JournalsProps {
    data: {
        entries?: Array<{
            date: string;
            text: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Journals = ({ data, onNext, isEditing = false, onUpdate }: Page2JournalsProps) => {
    const defaultData = {
        entries: data.entries && data.entries.length > 0 ? data.entries : [
            { date: "Oct 12, 2023", text: "Today I realized how much you mean to me. It's the small things, like the way you smile when you're thinking." },
            { date: "Dec 25, 2023", text: "Our first Christmas. I never thought I'd find someone who makes the holidays feel so magical." },
            { date: "Feb 14, 2024", text: "Writing this as I wait for you. Every second feels like a lifetime when you're not here." }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0705] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[#1a130e]/20" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-24">
                <div className="flex justify-center mb-8">
                    <PenTool className="text-orange-950 opacity-20 w-16 h-16" />
                </div>
                <h2 className="text-2xl font-black text-orange-950 uppercase tracking-[0.4em]">Personal Entries</h2>
            </div>

            {/* Journal Pages (Stacked Sheets) */}
            <div className="relative z-10 w-full max-w-2xl px-4 md:px-0 space-y-16">
                {defaultData.entries.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, rotate: index % 2 === 0 ? -2 : 2, y: 30 }}
                        whileInView={{ opacity: 1, rotate: 0, y: 0 }}
                        viewport={{ once: true }}
                        className={`group relative bg-[#fdfaf3] border border-orange-200 p-12 md:p-16 shadow-[0_20px_50px_-15px_rgba(45,30,15,0.3)] min-h-[400px] flex flex-col transform transition-transform hover:scale-[1.02] ${isEditing ? 'cursor-pointer' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const date = prompt("Edit Entry Date:", item.date);
                                const text = prompt("Edit Entry Text:", item.text);

                                if (date !== null || text !== null) {
                                    const newEntries = [...defaultData.entries];
                                    newEntries[index] = {
                                        date: date || item.date,
                                        text: text || item.text
                                    };
                                    onUpdate?.('entries', newEntries);
                                }
                            }
                        }}
                    >
                        {/* Lined Paper Effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(#000 0 1px, transparent 1px 32px)', backgroundPosition: '0 40px' }} />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-10 pb-4 border-b-2 border-orange-100">
                                <Calendar size={18} className="text-orange-900/30" />
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-orange-900/40 font-inter">{item.date}</span>
                            </div>

                            <p className="text-orange-950 text-xl md:text-3xl font-romantic leading-[1.8] italic text-justify">
                                {item.text}
                            </p>

                            {/* Decorative Ink Splat or Blot (Optional) */}
                            <div className="mt-auto pt-16 flex justify-end">
                                <div className="w-12 h-1 bg-orange-900/10 rounded-full" />
                            </div>
                        </div>

                        {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black text-orange-900 uppercase tracking-widest bg-[#fdfaf3] px-4 py-2 border border-orange-200 shadow-xl">Double Click to Edit Entry</span>
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Add Entry (Editor Only) */}
                {isEditing && defaultData.entries.length < 5 && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => {
                                const date = prompt("Enter Entry Date:");
                                if (date) {
                                    onUpdate?.('entries', [...defaultData.entries, {
                                        date,
                                        text: "Start writing your heart out..."
                                    }]);
                                }
                            }}
                            className="px-12 py-5 bg-[#fdfaf3] border border-orange-200 text-orange-900 font-black text-xs uppercase tracking-[0.3em] hover:bg-orange-50 shadow-lg"
                        >
                            + Write New Entry
                        </button>
                    </div>
                )}
            </div>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-32 pb-20">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 bg-[#1a130e] text-orange-800 border border-orange-900/30 hover:bg-[#251b14] rounded-full font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl transition-all"
                >
                    Final Chapter →
                </motion.button>
            </div>

            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />
        </div>
    );
};

export default Page2Journals;
