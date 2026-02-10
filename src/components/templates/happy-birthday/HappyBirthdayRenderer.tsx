import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplateAudio } from '../../../hooks/useTemplateAudio';

// Import Specific Pages
import HBDLoading from './HBDLoading';
import HBDIntro from './HBDIntro';
import HBDCake from './HBDCake';
import HBDBalloons from './HBDBalloons';
import HBDMemories from './HBDMemories';
import HBDLetter from './HBDLetter';
import HBDFinal from './HBDFinal';

export default function HappyBirthdayRenderer({
    pageId,
    data,
    onNext
}: {
    pageId: string,
    data: any,
    onNext: () => void
}) {
    // Audio Hook integration
    const { playBGM, playSFX } = useTemplateAudio();

    // Map page IDs to components
    const pageMapping: Record<string, React.ComponentType<any>> = {
        'p1': HBDLoading,
        'p2': HBDIntro,
        'p3': HBDCake,
        'p4': HBDBalloons,
        'p5': HBDMemories,
        'p6': HBDLetter,
        'p7': HBDFinal
    };

    const Component = pageMapping[pageId] || HBDLoading;

    // Effect to trigger audio based on page transitions
    useEffect(() => {
        if (pageId === 'p2') {
            playBGM(); // Start music on Intro
            playSFX('transition');
        } else if (pageId === 'p3') {
            playSFX('pop'); // Cake entry sound? or just standard transition
        } else if (pageId === 'p7') {
            playSFX('celebration');
        }
    }, [pageId, playBGM, playSFX]);

    return (
        <div className="font-sans antialiased text-gray-900 selection:bg-pink-200 selection:text-pink-900">
            <AnimatePresence mode="wait">
                <motion.div
                    key={pageId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <Component data={data} onNext={onNext} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
