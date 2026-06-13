import React from 'react';
import Page1Intro from './anniversary-counter/Page1Intro';
import Page2Counter from './anniversary-counter/Page2Counter';
import Page3Timeline from './anniversary-counter/Page3Timeline';
import Page4Vow from './anniversary-counter/Page4Vow';

interface AnniversaryCounterRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const AnniversaryCounterRenderer: React.FC<AnniversaryCounterRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Counter,
        'p3': Page3Timeline,
        'p4': Page4Vow
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0805]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Time Calibrating</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-amber-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default AnniversaryCounterRenderer;
