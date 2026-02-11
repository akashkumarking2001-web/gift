import React from 'react';
import {
    Page1Greeting,
    Page2WhyYou,
    Page3Memories,
    Page4Question,
    Page5Celebration,
    Page6LoveStory,
    Page7Timeline,
    Page8PhotoGallery,
    Page9FinalMessage,
    Page10Signature,
    Page11Ending
} from './valentine-journey-v2';

interface ValentineJourneyV2RendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const ValentineJourneyV2Renderer: React.FC<ValentineJourneyV2RendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Greeting,
        'p2': Page2WhyYou,
        'p3': Page3Memories,
        'p4': Page4Question,
        'p5': Page5Celebration,
        'p6': Page6LoveStory,
        'p7': Page7Timeline,
        'p8': Page8PhotoGallery,
        'p9': Page9FinalMessage,
        'p10': Page10Signature,
        'p11': Page11Ending
    };

    const PageComponent = pageComponents[pageId];

    if (!PageComponent) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-rose-600">
                <div className="text-white text-center">
                    <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
                    <p className="text-xl">Page ID: {pageId}</p>
                    <button
                        onClick={onNext}
                        className="mt-6 bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        Continue →
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

export default ValentineJourneyV2Renderer;
