import React from 'react';
import Page1Intro from './valentine-card-collection/Page1Intro';
import Page2CardPicker from './valentine-card-collection/Page2CardPicker';
import Page3Celebration from './valentine-card-collection/Page3Celebration';

interface ValentineCardCollectionRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const ValentineCardCollectionRenderer: React.FC<ValentineCardCollectionRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2CardPicker,
        'p3': Page3Celebration,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0508]">
                <div className="text-rose-50 text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Sealing Envelopes</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-rose-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default ValentineCardCollectionRenderer;
