import React from 'react';
import Page1Intro from './Page1Intro';
import Page2Counter from './Page2Counter';
import Page3Photos from './Page3Photos';
import Page4Conclusion from './Page4Conclusion';

interface AnniversaryLightRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const AnniversaryLightRenderer: React.FC<AnniversaryLightRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Counter,
        'p3': Page3Photos,
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

export default AnniversaryLightRenderer;
