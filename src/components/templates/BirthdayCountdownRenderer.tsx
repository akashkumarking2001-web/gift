import React from 'react';
import Page1Loading from './birthday-countdown/Page1Loading';
import Page2Countdown from './birthday-countdown/Page2Countdown';
import Page3Celebration from './birthday-countdown/Page3Celebration';
import Page4MessageCards from './birthday-countdown/Page4MessageCards';
import Page5PhotoGrid from './birthday-countdown/Page5PhotoGrid';
import Page6Letter from './birthday-countdown/Page6Letter';
import Page7Celebration from './birthday-countdown/Page7Celebration';

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
        'p5': Page5PhotoGrid,
        'p6': Page6Letter,
        'p7': Page7Celebration,
    };

    const PageComponent = pageComponents[pageId] || Page1Loading;

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
