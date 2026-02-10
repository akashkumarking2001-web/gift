import React from 'react';
import Page1Intro from './love-proposal/Page1Intro';
import Page2Question from './love-proposal/Page2Question';
import Page3Celebration from './love-proposal/Page3Celebration';
import Page4Letter from './love-proposal/Page4Letter';

interface LoveProposalRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const LoveProposalRenderer: React.FC<LoveProposalRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Question,
        'p3': Page3Celebration,
        'p4': Page4Letter,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0202]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Preparing Proposal</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-red-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default LoveProposalRenderer;
