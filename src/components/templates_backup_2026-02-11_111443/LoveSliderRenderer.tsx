import React from 'react';
import Page1BuildUp from './love-slider/Page1BuildUp';
import Page2Slider from './love-slider/Page2Slider';
import Page3FinalWord from './love-slider/Page3FinalWord';

interface LoveSliderRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const LoveSliderRenderer: React.FC<LoveSliderRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1BuildUp,
        'p2': Page2Slider,
        'p3': Page3FinalWord,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050510]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Infinity Initializing</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-purple-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default LoveSliderRenderer;
