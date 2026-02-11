import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplateAudio } from '../../../hooks/useTemplateAudio';

// Import Specific Pages
import SSSIntro from './SSSIntro';
import SSSMeter from './SSSMeter';
import SSSRevealList from './SSSRevealList';
import SSSNote from './SSSNote';
import SSSFinal from './SSSFinal';

export default function SmallSurpriseRenderer({
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
        'p1': SSSIntro,
        'p2': SSSMeter,
        'p3': SSSRevealList,
        'p4': SSSNote,
        'p5': SSSFinal
    };

    const Component = pageMapping[pageId] || SSSIntro;

    useEffect(() => {
        if (pageId === 'p1') {
            playBGM();
        } else if (pageId === 'p2') {
            playSFX('reveal');
        } else if (pageId === 'p5') {
            playSFX('celebration');
        }
    }, [pageId, playBGM, playSFX]);

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
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
