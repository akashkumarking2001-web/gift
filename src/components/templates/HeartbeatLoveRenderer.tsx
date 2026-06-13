import React from 'react';
import Page1Intro from './heartbeat-love/Page1Intro';
import Page2Heartbeat from './heartbeat-love/Page2Heartbeat';
import Page3Celebration from './heartbeat-love/Page3Celebration';

interface HeartbeatLoveRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const HeartbeatLoveRenderer: React.FC<HeartbeatLoveRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Heartbeat,
        'p3': Page3Celebration,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d0505]">
                <div className="text-red-50 text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Synching Rhythm</h1>
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

export default HeartbeatLoveRenderer;
