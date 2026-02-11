import React from 'react';
import Page1Intro from './valentines-question/Page1Intro';
import Page2Game from './valentines-question/Page2Game';
import Page3Celebration from './valentines-question/Page3Celebration';
import Page4PhotoGrid from './valentines-question/Page4PhotoGrid';
import Page5Timeline from './valentines-question/Page5Timeline';
import Page6Letter from './valentines-question/Page6Letter';
import Page7Final from './valentines-question/Page7Final';

interface ValentineQuestionRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const ValentineQuestionRenderer: React.FC<ValentineQuestionRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Game,
        'p3': Page3Celebration,
        'p4': Page4PhotoGrid,
        'p5': Page5Timeline,
        'p6': Page6Letter,
        'p7': Page7Final,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#8b0000]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Page Not Linked</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-primary/60 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
                    >
                        Skip Module →
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

export default ValentineQuestionRenderer;
