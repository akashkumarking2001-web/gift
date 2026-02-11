import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, ShieldCheck, Zap, Star, ChevronRight, Compass, Route, MoveRight } from 'lucide-react';

interface Page2LocationsProps {
    data: {
        places?: Array<{
            name: string;
            description: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Locations = ({ data, onNext, isEditing = false, onUpdate }: Page2LocationsProps) => {
    const defaultData = {
        places: data.places && data.places.length > 0 ? data.places : [
            { name: "First Date Cafe", description: "Where we first met and talked for hours until the staff started cleaning." },
            { name: "Sunset Beach", description: "The beautiful evening we watched the sun dip below the horizon together." },
            { name: "City Park", description: "Walking through the trees on a lazy Sunday afternoon." }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050805] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* Hyper-Realistic Cartographic Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_70%)]" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[size:100px_100px] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">

                {/* Visual Anchor Header */}
                <div className="text-center space-y-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-emerald-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-emerald-800/20 shadow-2xl mx-auto"
                    >
                        <ShieldCheck size={16} className="text-emerald-500" />
                        <span className="text-emerald-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Transmission Parameter 02</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <Route size={40} className="text-emerald-700/40" />
                        <h2 className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] drop-shadow-2xl">
                            The Landmarks
                        </h2>
                    </motion.div>
                </div>

                {/* HIGH-FIDELITY VERTICAL JOURNEY MAP */}
                <div className="relative w-full max-w-4xl px-4 md:px-0 pb-40">
                    {/* Animated Connecting Path */}
                    <div className="absolute left-[39px] md:left-[59px] top-10 bottom-10 w-1 bg-gradient-to-b from-emerald-600 via-emerald-400 to-emerald-900 rounded-full opacity-20" />

                    <div className="space-y-32">
                        {defaultData.places.map((place, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative flex gap-12 group/item"
                            >
                                {/* HIGH-END MARKER UNIT */}
                                <div className="relative z-10 w-20 h-20 md:w-32 md:h-32 bg-[#0a150f] rounded-full border-4 border-emerald-500/20 flex items-center justify-center backdrop-blur-3xl group-hover/item:border-emerald-500 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
                                    <MapPin className={`w-8 h-8 md:w-12 md:h-12 transition-all duration-700 ${index % 2 === 0 ? 'text-emerald-400' : 'text-emerald-500'}`} />
                                    <motion.div
                                        animate={{ scale: [1, 2], opacity: [0.1, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-emerald-500 rounded-full"
                                    />
                                </div>

                                {/* Content Unit */}
                                <div className="flex-1 pt-6 md:pt-10 space-y-6">
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/40 py-2 px-6 bg-emerald-900/10 rounded-full border border-emerald-500/10">Location 0{index + 1}</span>
                                        <div className="h-[1px] flex-1 bg-emerald-900/10 group-hover/item:bg-emerald-500/20 transition-all duration-1000" />
                                    </div>
                                    <h3 className="text-3xl md:text-6xl font-black text-white font-romantic leading-tight tracking-tight">{place.name}</h3>
                                    <p className="text-emerald-100/30 text-lg md:text-2xl leading-[1.6] italic font-romantic tracking-wide drop-shadow-xl max-w-2xl">
                                        "{place.description}"
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Editor Action Unit */}
                    {isEditing && defaultData.places.length < 6 && (
                        <motion.div whileHover={{ scale: 1.02 }} className="pt-24 pl-[12px] md:pl-[38px] flex justify-start">
                            <button
                                onClick={() => {
                                    const name = prompt("Landmark Identification:");
                                    if (name) onUpdate?.('places', [...defaultData.places, { name, description: "Record new geographical memoir..." }]);
                                }}
                                className="group px-12 py-5 bg-emerald-900/10 backdrop-blur-2xl border-2 border-dashed border-emerald-800/40 rounded-full text-emerald-400 font-black text-xs uppercase tracking-[0.6em] hover:bg-emerald-900/20 shadow-2xl transition-all flex items-center gap-4"
                            >
                                <Sparkles size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                                Inject New Landmark
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Professional Action Footer */}
                <div className="relative z-10 w-full max-w-2xl mx-auto pt-20 pb-40 flex flex-col items-center gap-12">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-24 py-9 bg-[#050805] border-2 border-emerald-900/30 rounded-[3.5rem] text-emerald-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                        <span className="relative z-10">Archive This Chapter</span>
                        <MoveRight className="relative z-10 w-6 h-6 border-2 border-emerald-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                    </motion.button>

                    <div className="flex items-center gap-4 opacity-10">
                        <Zap size={14} className="text-emerald-500 fill-current" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase text-white">Grid Finalized</span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Page2Locations;
