import React from 'react';
import UniversalTemplateRenderer from './UniversalTemplateRenderer';
import { TEMPLATES } from '../../lib/templates';

// Specific Renderers
import ValentineJourneyV2Renderer from './ValentineJourneyV2Renderer';
import ValentineQuestionRenderer from './ValentineQuestionRenderer';
import BirthdayCountdownRenderer from './BirthdayCountdownRenderer';
import LoveSliderRenderer from './LoveSliderRenderer';
import FiveReasonsRenderer from './FiveReasonsRenderer';
import PandaLoveRenderer from './PandaLoveRenderer';
import AnniversaryCounterRenderer from './AnniversaryCounterRenderer';
import MemoriesTogetherRenderer from './MemoriesTogetherRenderer';
import LoveProposalRenderer from './LoveProposalRenderer';
import OurStoryRenderer from './OurStoryRenderer';
import InteractiveDateRenderer from './InteractiveDateRenderer';
import RomanticCouponsRenderer from './RomanticCouponsRenderer';
import LoveJournalRenderer from './LoveJournalRenderer';
import ValentineCardCollectionRenderer from './ValentineCardCollectionRenderer';
import PuzzleLoveRenderer from './PuzzleLoveRenderer';
import MemoryMapRenderer from './MemoryMapRenderer';
import HeartbeatLoveRenderer from './HeartbeatLoveRenderer';
import CelestialLoveRenderer from './CelestialLoveRenderer';

interface TemplateRendererProps {
    templateSlug: string;
    pageId: string;
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({
    templateSlug,
    pageId,
    data,
    onNext,
    isEditing = false,
    onUpdate
}) => {
    // Determine the specific renderer for this template
    const renderers: Record<string, React.ComponentType<any>> = {
        'romantic-valentines-journey-v2': ValentineJourneyV2Renderer,
        'valentines-question': ValentineQuestionRenderer,
        'birthday-countdown': BirthdayCountdownRenderer,
        'love-slider': LoveSliderRenderer,
        '5-things-i-love': FiveReasonsRenderer,
        'panda-love': PandaLoveRenderer,
        'anniversary-counter': AnniversaryCounterRenderer,
        'memories-together': MemoriesTogetherRenderer,
        'love-proposal': LoveProposalRenderer,
        'our-story': OurStoryRenderer,
        'interactive-date': InteractiveDateRenderer,
        'romantic-coupons': RomanticCouponsRenderer,
        'love-journal': LoveJournalRenderer,
        'valentine-card-collection': ValentineCardCollectionRenderer,
        'puzzle-love': PuzzleLoveRenderer,
        'memory-map': MemoryMapRenderer,
        'heartbeat-love': HeartbeatLoveRenderer,
        'celestial-love': CelestialLoveRenderer,
    };

    const SpecificRenderer = renderers[templateSlug];

    if (SpecificRenderer) {
        return (
            <SpecificRenderer
                pageId={pageId}
                data={data}
                onNext={onNext}
                isEditing={isEditing}
                onUpdate={onUpdate}
            />
        );
    }

    // --- Fallback Mechanism: Universal Renderer ---

    // 1. Look up the page type definition from the static TEMPLATES config
    const templateDef = TEMPLATES.find(t => t.slug === templateSlug);
    const pageDef = templateDef?.pages.find(p => p.id === pageId);

    // 2. Inject the type into the data so UniversalRenderer knows what to render
    const enrichedData = {
        ...data,
        _type: pageDef?.type || 'message' // Fallback to message if type not found
    };

    // 3. Render the universal component
    return (
        <UniversalTemplateRenderer
            pageId={pageId}
            data={enrichedData}
            onNext={onNext}
            isEditing={isEditing}
        // onUpdate isn't fully supported by Universal yet, but could be added later
        />
    );
};

export default TemplateRenderer;
