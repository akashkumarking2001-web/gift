import React from 'react';
import C1Loading from './celestial-love/C1Loading';
import C2Intro from './celestial-love/C2Intro';
import C3Connect from './celestial-love/C3Connect';
import C4Saga from './celestial-love/C4Saga';
import C5Nebula from './celestial-love/C5Nebula';
import C6Written from './celestial-love/C6Written';
import C7Cosmic from './celestial-love/C7Cosmic';
import C8Orbit from './celestial-love/C8Orbit';

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
        'p1': C1Loading,
        'p2': C2Intro,
        'p3': C3Connect,
        'p4': C4Saga,
        'p5': C5Nebula,
        'p6': C6Written,
        'p7': C7Cosmic,
        'p8': C8Orbit,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050510]">
                <div className="text-blue-100 text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30 italic">Mapping the Cosmos</h1>
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
