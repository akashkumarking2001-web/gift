import React from 'react';
import Page1Intro from './celestial-love/Page1Intro';
import Page2Constellations from './celestial-love/Page2Constellations';
import Page3Final from './celestial-love/Page3Final';

interface CelestialLoveRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const CelestialLoveRenderer: React.FC<CelestialLoveRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Constellations,
        'p3': Page3Final,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050510]">
                <div className="text-blue-100 text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Mapping the Cosmos</h1>
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

export default CelestialLoveRenderer;
