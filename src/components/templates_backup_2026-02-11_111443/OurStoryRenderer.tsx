import React from 'react';
import Page1Intro from './our-story/Page1Intro';
import Page2Timeline from './our-story/Page2Timeline';
import Page3Gallery from './our-story/Page3Gallery';
import Page4Conclusion from './our-story/Page4Conclusion';

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
        'p1': Page1Intro,
        'p2': Page2Timeline,
        'p3': Page3Gallery,
        'p4': Page4Conclusion,
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050510]">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-black mb-4 uppercase tracking-[0.2em] opacity-30">Writing Chapters</h1>
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-8">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-500 px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all"
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
