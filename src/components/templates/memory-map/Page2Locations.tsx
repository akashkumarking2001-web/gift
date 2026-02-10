import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';

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
        <div className="min-h-screen relative overflow-hidden bg-[#050308] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Pulsing Violet Glow */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.1),transparent_50%)]" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-24">
                <h2 className="text-3xl font-black text-violet-100 uppercase tracking-[0.5em] opacity-40">Our Landmarks</h2>
            </div>

            {/* Vertical Journey Map */}
            <div className="relative z-10 w-full max-w-2xl px-4 md:px-0">
                {/* Connecting Line */}
                <div className="absolute left-[39px] top-4 bottom-4 w-1 bg-gradient-to-b from-violet-600 via-purple-600 to-indigo-600 rounded-full opacity-20" />

                <div className="space-y-20">
                    {defaultData.places.map((place, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className={`relative flex gap-12 group ${isEditing ? 'cursor-pointer' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const name = prompt("Edit Place Name:", place.name);
                                    const desc = prompt("Edit Place Description:", place.description);

                                    if (name !== null || desc !== null) {
                                        const newPlaces = [...defaultData.places];
                                        newPlaces[index] = {
                                            name: name || place.name,
                                            description: desc || place.description
                                        };
                                        onUpdate?.('places', newPlaces);
                                    }
                                }
                            }}
                        >
                            {/* Marker */}
                            <div className="relative z-10 w-20 h-20 bg-violet-600/20 rounded-full border border-violet-500/30 flex items-center justify-center backdrop-blur-3xl group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                                <MapPin className="text-violet-400 w-8 h-8" />
                                <motion.div
                                    className="absolute inset-0 bg-violet-500 rounded-full opacity-0"
                                    whileHover={{ opacity: 0.2 }}
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 pt-4">
                                <h3 className="text-2xl md:text-4xl font-black text-white mb-4 font-lovely tracking-tight">{place.name}</h3>
                                <p className="text-violet-100/40 text-sm md:text-lg leading-relaxed italic">{place.description}</p>

                                {isEditing && (
                                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[8px] font-black text-violet-400 uppercase tracking-widest bg-violet-500/10 px-3 py-1 rounded-full">Double Click to Edit Place</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Add Place (Editor Only) */}
                {isEditing && defaultData.places.length < 6 && (
                    <div className="flex justify-start pl-[14px] pt-12">
                        <button
                            onClick={() => {
                                const name = prompt("Enter Place Name:");
                                if (name) {
                                    onUpdate?.('places', [...defaultData.places, {
                                        name,
                                        description: "A new landmark in our journey..."
                                    }]);
                                }
                            }}
                            className="flex items-center gap-4 px-8 py-3 bg-violet-600/10 border border-violet-500/30 text-violet-400 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-violet-600/20"
                        >
                            <Sparkles size={14} /> Add Landmark
                        </button>
                    </div>
                )}
            </div>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-32 pb-20">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-white font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl shadow-violet-600/30"
                >
                    Final Destination →
                </motion.button>
            </div>
        </div>
    );
};

export default Page2Locations;
