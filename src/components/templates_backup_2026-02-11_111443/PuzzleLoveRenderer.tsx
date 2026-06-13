import React from 'react';
import Page1Intro from './puzzle-love/Page1Intro';
import Page2Puzzle from './puzzle-love/Page2Puzzle';
import Page3Celebration from './puzzle-love/Page3Celebration';

interface PuzzleLoveRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const PuzzleLoveRenderer: React.FC<PuzzleLoveRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Puzzle,
        'p3': Page3Celebration,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050510]">
                <div className="text-blue-100 text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Fitting Pieces</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-blue-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default PuzzleLoveRenderer;
