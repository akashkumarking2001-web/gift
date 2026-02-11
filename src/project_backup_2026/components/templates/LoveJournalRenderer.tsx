import React from 'react';
import Page1Intro from './love-journal/Page1Intro';
import Page2Journals from './love-journal/Page2Journals';
import Page3Final from './love-journal/Page3Final';

interface LoveJournalRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const LoveJournalRenderer: React.FC<LoveJournalRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Journals,
        'p3': Page3Final,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0905]">
                <div className="text-orange-900 text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Writing Memories</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-orange-900/60 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-orange-900/10 hover:bg-orange-900/20 border border-orange-900/30 text-orange-900 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default LoveJournalRenderer;
