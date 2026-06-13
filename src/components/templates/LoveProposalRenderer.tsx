import React from 'react';
import LP1Loading from './love-proposal/LP1Loading';
import LP2Intro from './love-proposal/LP2Intro';
import LP3Key from './love-proposal/LP3Key';
import LP4Question from './love-proposal/LP4Question';
import LP5Celebrate from './love-proposal/LP5Celebrate';
import LP6Letter from './love-proposal/LP6Letter';
import LP7Final from './love-proposal/LP7Final';

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
        'p1': LP1Loading,
        'p2': LP2Intro,
        'p3': LP3Key,
        'p4': LP4Question,
        'p5': LP5Celebrate,
        'p6': LP6Letter,
        'p7': LP7Final,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#2b0303]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30 italic font-serif">A Vow Unspoken</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-amber-500 mb-8">Page ID: {pageId}</p>
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

export default LoveProposalRenderer;
