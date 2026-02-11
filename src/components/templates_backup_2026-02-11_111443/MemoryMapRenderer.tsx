import React from 'react';
import Page1Intro from './memory-map/Page1Intro';
import Page2Locations from './memory-map/Page2Locations';
import Page3Final from './memory-map/Page3Final';

interface MemoryMapRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const MemoryMapRenderer: React.FC<MemoryMapRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Locations,
        'p3': Page3Final,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0510]">
                <div className="text-violet-100 text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Mapping Memories</h1>
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

export default MemoryMapRenderer;
