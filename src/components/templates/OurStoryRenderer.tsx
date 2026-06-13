import React from 'react';
import Page1Loading from './our-story/Page1Loading';
import Page2Intro from './our-story/Page2Intro';
import Page3Spark from './our-story/Page3Spark';
import Page4Timeline from './our-story/Page4Timeline';
import Page5Gallery from './our-story/Page5Gallery';
import Page6Favorite from './our-story/Page6Favorite';
import Page7Letter from './our-story/Page7Letter';
import Page8Final from './our-story/Page8Final';

interface OurStoryRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const OurStoryRenderer: React.FC<OurStoryRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Loading,
        'p2': Page2Intro,
        'p3': Page3Spark,
        'p4': Page4Timeline,
        'p5': Page5Gallery,
        'p6': Page6Favorite,
        'p7': Page7Letter,
        'p8': Page8Final,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#faf7f2]">
                <div className="text-[#1e293b] text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.1em] opacity-30 italic font-serif">A Story Untold</h1>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#94a3b8] mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-white hover:bg-[#f1f5f9] border-2 border-[#e5e7eb] text-[#64748b] px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
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

export default OurStoryRenderer;
