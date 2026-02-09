
export interface TemplatePage {
    id: string;
    type: 'loading' | 'countdown' | 'celebration' | 'message' | 'photo' | 'game' | 'letter' | 'slider' | 'flip-cards' | 'timeline' | 'character';
    title: string;
    description?: string;
    requiredFields: string[];
    config?: any;
}

export interface TemplateDefinition {
    id: number;
    slug: string;
    title: string;
    category: string;
    price: number;
    originalPrice: number;
    offerEndsAt?: string; // ISO timestamp for 24-hour countdown
    icon: string;
    color: string;
    pages: TemplatePage[];
    tag?: string;
    isActive?: boolean;
}

export const TEMPLATES: TemplateDefinition[] = [
    {
        id: 1,
        slug: 'birthday-countdown',
        title: 'Birthday Countdown Celebration',
        category: 'Birthday',
        price: 149,
        originalPrice: 1299,
        icon: '🎂',
        color: 'from-pink-500 to-rose-600',
        tag: 'Popular',
        pages: [
            { id: 'p1', type: 'loading', title: 'Loading Screen', requiredFields: ['subtext'] },
            { id: 'p2', type: 'countdown', title: 'Countdown', requiredFields: ['targetDate', 'heading'] },
            { id: 'p3', type: 'celebration', title: 'Celebration', requiredFields: ['mainText'] },
            { id: 'p4', type: 'message', title: 'Message Cards', requiredFields: ['card1Heading', 'card1Body'] },
            { id: 'p5', type: 'photo', title: 'Memory Gallery', requiredFields: ['photos'], config: { maxPhotos: 10 } },
        ],
    },
    {
        id: 2,
        slug: 'valentines-question',
        title: 'Valentine\'s Interactive Question',
        category: 'Valentine\'s',
        price: 149,
        originalPrice: 1499,
        icon: '💝',
        color: 'from-red-500 to-pink-600',
        tag: 'Best Seller',
        pages: [
            { id: 'p1', type: 'character', title: 'Intro', requiredFields: ['greeting'] },
            { id: 'p2', type: 'game', title: 'The Question', requiredFields: ['question', 'yesText', 'noText'], config: { gameType: 'moving-no' } },
            { id: 'p3', type: 'celebration', title: 'Yayyy!', requiredFields: ['mainText'] },
            { id: 'p4', type: 'letter', title: 'Love Letter', requiredFields: ['message'] },
        ],
    },
    {
        id: 3,
        slug: 'love-slider',
        title: 'Love Slider — Infinity',
        category: 'Romance',
        price: 99,
        originalPrice: 899,
        icon: '💗',
        color: 'from-fuchsia-500 to-purple-600',
        pages: [
            { id: 'p1', type: 'message', title: 'Build-up', requiredFields: ['text'] },
            { id: 'p2', type: 'slider', title: 'Interactive Slider', requiredFields: ['m1', 'm2', 'm3', 'm4', 'm5'] },
            { id: 'p3', type: 'message', title: 'Final Word', requiredFields: ['text'] },
        ],
    },
    {
        id: 4,
        slug: '5-things-i-love',
        title: '5 Things I Love About You',
        category: 'Valentine\'s',
        price: 99,
        originalPrice: 799,
        icon: '💕',
        color: 'from-rose-400 to-pink-500',
        pages: [
            { id: 'p1', type: 'message', title: 'Intro', requiredFields: ['text'] },
            { id: 'p2', type: 'flip-cards', title: 'Reasons List', requiredFields: ['r1', 'r2', 'r3', 'r4', 'r5'] },
            { id: 'p3', type: 'message', title: 'Conclusion', requiredFields: ['text'] },
        ],
    },
    {
        id: 5,
        slug: 'panda-love',
        title: 'Panda Character Love',
        category: 'Cute',
        price: 99,
        originalPrice: 899,
        icon: '🐼',
        color: 'from-violet-500 to-purple-600',
        tag: 'Cute',
        pages: [
            { id: 'p1', type: 'character', title: 'Panda Hello', requiredFields: ['greeting'] },
            { id: 'p2', type: 'celebration', title: 'Gift Reveal', requiredFields: ['text'] },
            { id: 'p3', type: 'message', title: 'Secret Note', requiredFields: ['text'] },
        ],
    },
    {
        id: 6,
        slug: 'anniversary-counter',
        title: 'Anniversary Counter',
        category: 'Anniversary',
        price: 199,
        originalPrice: 1699,
        icon: '💍',
        color: 'from-amber-400 to-orange-500',
        pages: [
            { id: 'p1', type: 'message', title: 'Intro', requiredFields: ['text'] },
            { id: 'p2', type: 'countdown', title: 'Time Together', requiredFields: ['startDate'] },
            { id: 'p3', type: 'timeline', title: 'Our Journey', requiredFields: ['milestones'] },
            { id: 'p4', type: 'letter', title: 'My Vow', requiredFields: ['message'] },
        ],
    },
    {
        id: 7,
        slug: 'cake-candles',
        title: 'Birthday Cake & Candles',
        category: 'Birthday',
        price: 149,
        originalPrice: 1199,
        icon: '🕯️',
        color: 'from-yellow-400 to-orange-500',
        tag: 'Interactive',
        pages: [
            { id: 'p1', type: 'message', title: 'Age Count', requiredFields: ['age'] },
            { id: 'p2', type: 'game', title: 'Blow Candles', requiredFields: ['wish'], config: { gameType: 'candles' } },
            { id: 'p3', type: 'game', title: 'Balloon Pop', requiredFields: ['message'], config: { gameType: 'balloons' } },
            { id: 'p4', type: 'photo', title: 'Memories', requiredFields: ['photos'] },
            { id: 'p5', type: 'celebration', title: 'Surprise!', requiredFields: ['text'] },
        ],
    },
    {
        id: 8,
        slug: 'apology-talk',
        title: 'Apology — Can We Talk?',
        category: 'Apology',
        price: 99,
        originalPrice: 899,
        icon: '🥺',
        color: 'from-blue-400 to-indigo-500',
        pages: [
            { id: 'p1', type: 'character', title: 'Sad Panda', requiredFields: ['text'] },
            { id: 'p2', type: 'message', title: 'My Apology', requiredFields: ['text'] },
            { id: 'p3', type: 'flip-cards', title: '3 Reasons', requiredFields: ['r1', 'r2', 'r3'] },
            { id: 'p4', type: 'game', title: 'Forgive?', requiredFields: ['question'] },
        ],
    },
    {
        id: 9,
        slug: 'soulmate-matcher',
        title: 'Soulmate Matcher',
        category: 'Fun',
        price: 99,
        originalPrice: 799,
        icon: '🔮',
        color: 'from-purple-500 to-indigo-600',
        tag: 'Fun',
        pages: [
            { id: 'p1', type: 'message', title: 'Analysis', requiredFields: ['n1', 'n2'] },
            { id: 'p2', type: 'celebration', title: 'Match Found', requiredFields: ['text'] },
            { id: 'p3', type: 'message', title: 'Why Us', requiredFields: ['reasons'] },
            { id: 'p4', type: 'letter', title: 'Forever Note', requiredFields: ['message'] },
        ],
    },
    {
        id: 10,
        slug: 'peace-treaty',
        title: 'Peace Treaty',
        category: 'Apology',
        price: 99,
        originalPrice: 699,
        icon: '🏳️',
        color: 'from-green-400 to-teal-500',
        pages: [
            { id: 'p1', type: 'message', title: 'White Flag', requiredFields: ['text'] },
            { id: 'p2', type: 'game', title: 'Mistake Swipe', requiredFields: ['m1', 'm2', 'm3'], config: { gameType: 'swipe' } },
            { id: 'p3', type: 'character', title: 'The Hug', requiredFields: ['text'] },
        ],
    },
    {
        id: 11,
        slug: 'cuteness-scanner',
        title: 'Cuteness Scanner',
        category: 'Fun',
        price: 99,
        originalPrice: 699,
        icon: '🔍',
        color: 'from-cyan-400 to-blue-500',
        pages: [
            { id: 'p1', type: 'message', title: 'Initializing', requiredFields: ['text'] },
            { id: 'p2', type: 'game', title: 'Scanning', requiredFields: ['text'], config: { gameType: 'scanner' } },
            { id: 'p3', type: 'message', title: 'Report', requiredFields: ['v1', 'v2', 'v3'] },
        ],
    },
    {
        id: 12,
        slug: 'new-year-start',
        title: 'New Year Fresh Start',
        category: 'Fun',
        price: 99,
        originalPrice: 699,
        icon: '🎆',
        color: 'from-yellow-600 to-orange-700',
        pages: [
            { id: 'p1', type: 'message', title: 'Countdown', requiredFields: ['year'] },
            { id: 'p2', type: 'game', title: 'Clear Bad Vibes', requiredFields: ['v1', 'v2', 'v3'], config: { gameType: 'swipe' } },
            { id: 'p3', type: 'message', title: 'Golden Ticket', requiredFields: ['name'] },
        ],
    },
    {
        id: 13,
        slug: 'friendship-game',
        title: 'Friendship Memory Game',
        category: 'Fun',
        price: 99,
        originalPrice: 899,
        icon: '🤝',
        color: 'from-orange-400 to-red-500',
        pages: [
            { id: 'p1', type: 'message', title: 'To My Friend', requiredFields: ['name'] },
            { id: 'p2', type: 'game', title: 'Memory Match', requiredFields: ['text'], config: { gameType: 'memory' } },
            { id: 'p3', type: 'photo', title: 'Our Photos', requiredFields: ['photos'] },
            { id: 'p4', type: 'message', title: 'Thanks', requiredFields: ['text'] },
        ],
    },
    {
        id: 14,
        slug: 'purple-romance',
        title: 'Valentine\'s Purple Edition',
        category: 'Valentine\'s',
        price: 149,
        originalPrice: 1399,
        icon: '💜',
        color: 'from-purple-600 to-indigo-700',
        pages: [
            { id: 'p1', type: 'message', title: 'Intro', requiredFields: ['text'] },
            { id: 'p2', type: 'game', title: 'Love Quiz', requiredFields: ['q1', 'q2', 'q3'] },
            { id: 'p3', type: 'celebration', title: 'Score!', requiredFields: ['text'] },
        ],
    },
    {
        id: 15,
        slug: 'extended-birthday',
        title: 'Ultimate Birthday Pack',
        category: 'Birthday',
        price: 199,
        originalPrice: 2499,
        icon: '🎁',
        color: 'from-rose-500 to-pink-600',
        pages: [
            { id: 'p1', type: 'countdown', title: 'Countdown', requiredFields: ['date'] },
            { id: 'p2', type: 'game', title: 'Candles', requiredFields: ['wish'] },
            { id: 'p3', type: 'photo', title: 'Gallery', requiredFields: ['photos'] },
            { id: 'p4', type: 'message', title: 'Surprise', requiredFields: ['text'] },
        ],
    },
    {
        id: 16,
        slug: 'love-story',
        title: 'Our Love Story',
        category: 'Romance',
        price: 199,
        originalPrice: 2800,
        icon: '📖',
        color: 'from-red-600 to-rose-700',
        pages: [
            { id: 'p1', type: 'timeline', title: 'How we met', requiredFields: ['date', 'place'] },
            { id: 'p2', type: 'timeline', title: 'First Date', requiredFields: ['date', 'place'] },
            { id: 'p3', type: 'timeline', title: 'Going Official', requiredFields: ['date'] },
            { id: 'p4', type: 'photo', title: 'Best moments', requiredFields: ['photos'] },
        ],
    },
    {
        id: 17,
        slug: 'memory-scrapbook-1',
        title: 'Memory Scrapbook Vol 1',
        category: 'Fun',
        price: 149,
        originalPrice: 1199,
        icon: '📒',
        color: 'from-amber-300 to-orange-400',
        pages: [
            { id: 'p1', type: 'photo', title: 'Page 1', requiredFields: ['photos'] },
            { id: 'p2', type: 'photo', title: 'Page 2', requiredFields: ['photos'] },
            { id: 'p3', type: 'photo', title: 'Page 3', requiredFields: ['photos'] },
        ],
    },
    {
        id: 18,
        slug: 'memory-scrapbook-2',
        title: 'Memory Scrapbook Vol 2',
        category: 'Fun',
        price: 149,
        originalPrice: 1199,
        icon: '📓',
        color: 'from-slate-400 to-gray-500',
        pages: [
            { id: 'p1', type: 'photo', title: 'Page 1', requiredFields: ['photos'] },
            { id: 'p2', type: 'photo', title: 'Page 2', requiredFields: ['photos'] },
            { id: 'p3', type: 'photo', title: 'Page 3', requiredFields: ['photos'] },
        ],
    },
    {
        id: 19,
        slug: 'message-bottle',
        title: 'Message in a Bottle',
        category: 'Romance',
        price: 99,
        originalPrice: 899,
        icon: '🍾',
        color: 'from-blue-300 to-cyan-400',
        pages: [
            { id: 'p1', type: 'message', title: 'Floating...', requiredFields: ['text'] },
            { id: 'p2', type: 'game', title: 'Open Bottle', requiredFields: ['wish'], config: { gameType: 'bottle' } },
            { id: 'p3', type: 'letter', title: 'The Note', requiredFields: ['message'] },
        ],
    },
];
