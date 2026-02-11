import React from 'react';
import Page1Intro from './Page1Intro';
import Page2Game from './Page2Game';
import Page3Memories from './Page3Memories';
import Page4Final from './Page4Final';

interface FriendshipGameRendererProps {
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const FriendshipGameRenderer: React.FC<FriendshipGameRendererProps> = ({
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    const pageComponents: Record<string, React.ComponentType<any>> = {
        'p1': Page1Intro,
        'p2': Page2Game,
        'p3': Page3Memories,
        'p4': Page4Final,
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

export default FriendshipGameRenderer;
