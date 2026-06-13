import React from 'react';
import Page1Intro from './memories-together/Page1Intro';
import Page2Gallery from './memories-together/Page2Gallery';
import Page3Final from './memories-together/Page3Final';

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
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Gallery,
        'p3': Page3Final,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0508]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Developing Prints</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-pink-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 text-pink-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default MemoriesTogetherRenderer;
