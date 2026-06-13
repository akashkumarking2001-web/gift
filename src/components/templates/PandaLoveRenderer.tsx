import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTemplateAudio } from '../../hooks/useTemplateAudio';

// Import Specific Pages
import Page1Hello from './panda-love/Page1Hello';
import Page2Memories from './panda-love/Page2Memories';
import Page3Gift from './panda-love/Page3Gift';
import Page4Final from './panda-love/Page4Final';

interface PandaLoveRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const PandaLoveRenderer: React.FC<PandaLoveRendererProps> = ({
    pageId,
    data,
    onNext
}) => {
    const { playBGM, playSFX } = useTemplateAudio({});

    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Hello,
        'p2': Page2Memories,
        'p3': Page3Gift,
        'p4': Page4Final,
        'p5': Page4Final, // Fallback
        'p6': Page4Final, // Fallback
    };

    const PageComponent = pageComponents[pageId] || Page1Hello;

    React.useEffect(() => {
        if (pageId === 'p1') {
            playBGM();
        } else if (pageId === 'p3') {
            playSFX('celebration');
        }
    }, [pageId, playBGM, playSFX]);

    return (
        <div className="min-h-screen bg-[#0a0515] transition-colors duration-1000">
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

export default PandaLoveRenderer;
