import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplateAudio } from '../../../hooks/useTemplateAudio';

// Import Specific Pages
import HNYEntrance from './HNYEntrance';
import HNYDistractions from './HNYDistractions';
import HNYTicket from './HNYTicket';
import HNYPhotoStack from './HNYPhotoStack';
import HNYFinal from './HNYFinal';

export default function HappyNewYearRenderer({
    pageId,
    data,
    onNext
}: {
    pageId: string,
    data: any,
    onNext: () => void
}) {
    const { playBGM, playSFX } = useTemplateAudio({});

    const pageMapping: Record<string, React.ComponentType<any>> = {
        'p1': HNYEntrance,
        'p2': HNYDistractions,
        'p3': HNYTicket,
        'p4': HNYPhotoStack,
        'p5': HNYFinal
    };

    const Component = pageMapping[pageId] || HNYEntrance;

    useEffect(() => {
        if (pageId === 'p1') {
            playBGM();
        } else if (pageId === 'p2') {
            playSFX('transition');
        } else if (pageId === 'p5') {
            playSFX('celebration');
        }
    }, [pageId, playBGM, playSFX]);

    return (
        <div className="min-h-screen bg-[#09050f] transition-colors duration-1000">
            <AnimatePresence mode="wait">
                <motion.div
                    key={pageId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 w-full relative"
                >
                    <Component data={data} onNext={onNext} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
