import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplateAudio } from '../../hooks/useTemplateAudio';

// Import Specific Pages
import Page1Intro from './memories-together/Page1Intro';
import Page2Cinema from './memories-together/Page2Cinema';
import Page3Gallery from './memories-together/Page3Gallery';
import Page4Final from './memories-together/Page4Final';

interface MemoriesTogetherRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const MemoriesTogetherRenderer: React.FC<MemoriesTogetherRendererProps> = ({
    pageId,
    data,
    onNext
}) => {
    const { playBGM, playSFX } = useTemplateAudio({});

    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Cinema,
        'p3': Page3Gallery,
        'p4': Page4Final,
    };

    const PageComponent = pageComponents[pageId] || Page1Intro;

    React.useEffect(() => {
        if (pageId === 'p1') {
            playBGM();
        } else if (pageId === 'p4') {
            playSFX('celebration');
        }
    }, [pageId, playBGM, playSFX]);

    return (
        <div className="min-h-screen bg-black transition-colors duration-1000">
            <AnimatePresence mode="wait">
                <motion.div
                    key={pageId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 w-full relative"
                >
                    <PageComponent data={data} onNext={onNext} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MemoriesTogetherRenderer;
