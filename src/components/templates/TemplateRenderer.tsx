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
    // Standard Terminal/Mock Renderer for non-integrated templates
    const DefaultRenderer = () => (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8">
            <div className="max-w-md w-full glass-card p-12 text-center border-white/5">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <h2 className="text-xl font-black text-white uppercase tracking-[0.3em] mb-4">Module Initialized</h2>
                <p className="text-xs text-white/40 uppercase tracking-widest leading-loose mb-12">
                    Template: <span className="text-primary">{templateSlug}</span><br />
                    Page: {pageId}<br />
                    Status: Pending Premium Revamp
                </p>
                <button
                    onClick={onNext}
                    className="w-full py-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all rounded-2xl"
                >
                    Continue to Next →
                </button>
            </div>
        </div>
    );

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
        // Future templates will be added here
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

    return <DefaultRenderer />;
};

export default TemplateRenderer;
