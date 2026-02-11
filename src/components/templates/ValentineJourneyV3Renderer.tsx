import React from 'react';
import './valentine-journey-v3/v3-premium.css';
import {
    Page1Cover,
    Page2LoveLetter,
    Page3MemoryLane,
    Page4LoveQuiz,
    Page5Reasons,
    Page6Timeline,
    Page7Puzzle,
    Page8SecretMessage,
    Page9Gallery,
    Page10Future,
    Page11Final
} from './valentine-journey-v3/pages';

interface ValentineJourneyV3RendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const ValentineJourneyV3Renderer: React.FC<ValentineJourneyV3RendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Cover,
        'p2': Page2LoveLetter,
        'p3': Page3MemoryLane,
        'p4': Page4LoveQuiz,
        'p5': Page5Reasons,
        'p6': Page6Timeline,
        'p7': Page7Puzzle,
        'p8': Page8SecretMessage,
        'p9': Page9Gallery,
        'p10': Page10Future,
        'p11': Page11Final
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0508]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 tracking-tighter">PREMIUM MODULE</h1>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Initializing Fragment {pageId}...</p>
                    <button
                        onClick={onNext}
                        className="mt-8 border border-white/20 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                        Continue Journey →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <PageComponent
            data={data}
            onNext={onNext}
            isEditing={isEditing}
            onUpdate={onUpdate}
        />
    );
};

export default ValentineJourneyV3Renderer;
