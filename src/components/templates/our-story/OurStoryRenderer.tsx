import React from 'react';
import Page1Intro from './Page1Intro';
import Page2Timeline from './Page2Timeline';
import Page3Gallery from './Page3Gallery';
import Page4Conclusion from './Page4Conclusion';

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

    const PageComponent = pageComponents[pageId] || Page1Intro;

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
