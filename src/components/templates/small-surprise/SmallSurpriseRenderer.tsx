import React from 'react';
import SSSLoading from './SSSLoading';
import SSSIntro from './SSSIntro';
import SSSMeter from './SSSMeter';
import SSSPrediction from './SSSPrediction';
import SSSGallery from './SSSGallery';
import SSSRevealList from './SSSRevealList';
import SSSGate from './SSSGate';
import SSSNote from './SSSNote';
import SSSFinal from './SSSFinal';

interface SmallSurpriseRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const SmallSurpriseRenderer: React.FC<SmallSurpriseRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': SSSLoading,
        'p2': SSSIntro,
        'p3': SSSMeter,
        'p4': SSSPrediction,
        'p5': SSSGallery,
        'p6': SSSRevealList,
        'p7': SSSGate,
        'p8': SSSNote,
        'p9': SSSFinal,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Protocol Not Found</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-8">Page ID: {pageId}</p>
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

export default SmallSurpriseRenderer;
