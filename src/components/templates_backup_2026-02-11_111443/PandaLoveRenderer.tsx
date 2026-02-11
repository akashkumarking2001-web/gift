import React from 'react';
import Page1Hello from './panda-love/Page1Hello';
import Page2Reveal from './panda-love/Page2Reveal';
import Page3Note from './panda-love/Page3Note';

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
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Hello,
        'p2': Page2Reveal,
        'p3': Page3Note,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0515]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Panda's Nap Time</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-violet-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default PandaLoveRenderer;
