import React from 'react';
import Page1Intro from './valentines-question/Page1Intro';
import Page2Game from './valentines-question/Page2Game';
import Page3Celebration from './valentines-question/Page3Celebration';
import Page4Letter from './valentines-question/Page4Letter';

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
        'p4': Page4Letter
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Page Not Linked</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-primary/60 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-primary/20 hover:bg-primary/30 border border-primary/30 text-primary px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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
