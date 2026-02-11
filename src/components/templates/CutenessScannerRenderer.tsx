import React from 'react';
import Page1Intro from './cuteness-scanner/Page1Intro';
import Page2Scanning from './cuteness-scanner/Page2Scanning';
import Page3Result from './cuteness-scanner/Page3Result';

interface CutenessScannerRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const CutenessScannerRenderer: React.FC<CutenessScannerRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Scanning,
        'p3': Page3Result
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Scanner Offline</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-cyan-500 mb-8">Component Reference: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default CutenessScannerRenderer;
