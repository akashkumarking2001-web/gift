import React from 'react';
import Page1Loading from './birthday-countdown/Page1Loading';
import Page2Countdown from './birthday-countdown/Page2Countdown';
import Page3Celebration from './birthday-countdown/Page3Celebration';
import Page4MessageCards from './birthday-countdown/Page4MessageCards';
import Page5PhotoGrid from './birthday-countdown/Page5PhotoGrid';

interface BirthdayCountdownRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const BirthdayCountdownRenderer: React.FC<BirthdayCountdownRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Loading,
        'p2': Page2Countdown,
        'p3': Page3Celebration,
        'p4': Page4MessageCards,
        'p5': Page5PhotoGrid
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Module Not Linked</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-pink-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/30 text-pink-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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

export default BirthdayCountdownRenderer;
