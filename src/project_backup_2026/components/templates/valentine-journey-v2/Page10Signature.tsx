import { motion } from 'framer-motion';

interface Page10SignatureProps {
    data: {
        heading?: string;
        signatureImage?: string;
        signatureText?: string;
        date?: string;
        sealText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page10Signature = ({ data, onNext, isEditing = false, onUpdate }: Page10SignatureProps) => {
    const defaultData = {
        heading: data.heading || "Sealed With Love",
        signatureImage: data.signatureImage || "https://via.placeholder.com/400x200/FFB6C1/FF1493?text=Signature",
        signatureText: data.signatureText || "With all my heart",
        date: data.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        sealText: data.sealText || "Made with 💕"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-100 via-rose-100 to-pink-200 flex items-center justify-center p-4">
            {/* Vintage Paper Texture Effect */}
            <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1IiAvPjwvc3ZnPg==')]" />

            {/* Floating Vintage Elements */}
            {/* Floating Vintage Elements - Optimized */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`vintage-${i}`}
                    className="absolute text-5xl opacity-10 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {['🖋️', '💌', '📜', '🕊️'][i % 4]}
                </motion.div>
            ))}

            <div className="relative z-10 max-w-3xl w-full">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 relative group"
                >
                    <div
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-black/5 rounded-2xl transition-all border-2 border-transparent hover:border-black/5' : ''}`}
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Heading:", defaultData.heading);
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-gray-800 drop-shadow-xl font-romantic gradient-text-dark leading-tight">
                            {defaultData.heading}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/40 backdrop-blur-md px-3 py-1 rounded-full border border-gray-200">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Heading
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Signature Document */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                    className="bg-[#fffdf8] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] p-16 relative overflow-hidden border-[12px] border-amber-50/50 backdrop-blur-sm"
                    style={{
                        backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')`,
                        backgroundBlendMode: 'multiply'
                    }}
                >
                    {/* Decorative Background Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-rose-50/30 pointer-events-none" />

                    {/* Decorative Corners */}
                    <div className="absolute top-8 left-8 w-32 h-32 border-t-2 border-l-2 border-amber-300 opacity-50 rounded-tl-[2rem]" />
                    <div className="absolute bottom-8 right-8 w-32 h-32 border-b-2 border-r-2 border-amber-300 opacity-50 rounded-br-[2rem]" />

                    {/* Content */}
                    <div className="space-y-12 text-center relative z-10">
                        {/* Signature Text Wrapper */}
                        <div
                            className={`group/sign relative ${isEditing ? 'cursor-pointer p-4 hover:bg-amber-50/50 rounded-2xl transition-all border-2 border-transparent hover:border-amber-200' : ''}`}
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Enter Signature Message:", defaultData.signatureText);
                                    if (val) onUpdate?.('signatureText', val);
                                }
                            }}
                        >
                            <p className="text-3xl text-gray-700 font-lovely italic font-bold">
                                "{defaultData.signatureText}"
                            </p>
                            {isEditing && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200 transaction-opacity">
                                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                                        ✏️ Edit Message
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Signature Area */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.9 }}
                            className="relative h-48 flex items-center justify-center group/name"
                        >
                            <div className="text-8xl md:text-9xl font-romantic text-gray-800 tracking-tighter drop-shadow-sm select-none">
                                {defaultData.signatureText.split(' ').map(word => word[0]).join('')}
                            </div>
                            <div className="absolute w-64 h-[2px] bg-gray-200 bottom-4 left-1/2 -translate-x-1/2" />
                        </motion.div>

                        {/* Date Wrapper */}
                        <div
                            className={`group/date relative inline-block ${isEditing ? 'cursor-pointer px-6 py-2 hover:bg-amber-50/50 rounded-xl transition-all border-2 border-transparent hover:border-amber-200' : ''}`}
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Enter Date:", defaultData.date);
                                    if (val) onUpdate?.('date', val);
                                }
                            }}
                        >
                            <p className="text-xl text-amber-800/60 font-black tracking-widest uppercase">
                                {defaultData.date}
                            </p>
                            {isEditing && (
                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-200 transaction-opacity">
                                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                                        ✏️ Edit Date
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Wax Seal */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 1.5, type: 'spring', bounce: 0.6 }}
                            className="flex justify-center pt-8"
                        >
                            <div className="relative group/seal">
                                <motion.div
                                    className="w-40 h-40 bg-gradient-to-br from-rose-700 via-red-800 to-rose-950 rounded-full shadow-[0_20px_50px_-10px_rgba(159,18,57,0.5)] flex items-center justify-center border-4 border-rose-900 relative cursor-pointer"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                    onClick={() => {
                                        if (isEditing) {
                                            const val = prompt("Enter Seal Text:", defaultData.sealText);
                                            if (val) onUpdate?.('sealText', val);
                                        }
                                    }}
                                >
                                    <div className="text-center">
                                        <div className="text-5xl mb-1 drop-shadow-md">✨</div>
                                        <div className="text-[10px] text-white/80 font-black uppercase tracking-[0.3em] font-lovely italic">
                                            {defaultData.sealText}
                                        </div>
                                    </div>
                                    {/* Seal Texture Overlay */}
                                    <div className="absolute inset-2 border-2 border-white/10 rounded-full opacity-30" />
                                </motion.div>

                                {/* Seal Glow */}
                                <motion.div
                                    className="absolute inset-0 bg-red-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity"
                                    animate={{ scale: [1, 1.5, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {isEditing && (
                                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-rose-200 transaction-opacity shadow-sm  whitespace-nowrap">
                                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                                            ✏️ Edit Seal
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Final Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="flex justify-center mt-24"
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-14 py-7 rounded-full bg-gradient-to-r from-gray-900 via-rose-900 to-gray-900 text-white font-bold text-sm uppercase tracking-[0.25em] shadow-lg shadow-gray-900/30 hover:shadow-gray-900/50 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Complete the Dream
                            <span className="text-xl group-hover:translate-x-1 transition-transform">✨</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Sparkles */}
            {/* Sparkles - Optimized */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-rose-400 rounded-full pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page10Signature;
