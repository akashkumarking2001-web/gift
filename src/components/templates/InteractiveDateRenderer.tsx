import React from 'react';
import Page1Intro from './interactive-date/Page1Intro';
import Page2Cuisine from './interactive-date/Page2Cuisine';
import Page3Desert from './interactive-date/Page3Desert';
import Page4Conclusion from './interactive-date/Page4Conclusion';

interface InteractiveDateRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const InteractiveDateRenderer: React.FC<InteractiveDateRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Cuisine,
        'p3': Page3Desert,
        'p4': Page4Conclusion,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#051010]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Setting the Table</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-teal-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-teal-600/20 hover:bg-teal-600/30 border border-teal-500/30 text-teal-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default InteractiveDateRenderer;
