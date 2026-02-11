
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
    // Media fields for admin panel
    thumbnail_url?: string;
    cover_image_url?: string;
    demo_video_url?: string;
    preview_images?: string[]; // Array of image URLs
}

export const TEMPLATES: TemplateDefinition[] = [
    {
        id: 0,
        slug: 'simple-greeting-free',
        title: 'Simple Heart Greeting (FREE)',
        category: 'Free',
        price: 0,
        originalPrice: 0,
        icon: '🤍',
        color: 'from-gray-400 to-slate-500',
        tag: 'Free',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'Welcome', requiredFields: ['greeting'] },
            { id: 'p2', type: 'message', title: 'Heart Note', requiredFields: ['text'] },
        ],
    },
    {
        id: 101,
        slug: 'simple-photo-free',
        title: 'Your Single Memory (FREE)',
        category: 'Free',
        price: 0,
        originalPrice: 0,
        icon: '📸',
        color: 'from-zinc-400 to-stone-500',
        tag: 'Free',
        isActive: true,
        pages: [
            { id: 'p1', type: 'photo', title: 'Memory', requiredFields: ['photos'] },
            { id: 'p2', type: 'message', title: 'Note', requiredFields: ['text'] },
        ],
    },
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
        isActive: true,
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
        isActive: true,
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
        price: 149,
        originalPrice: 899,
        icon: '💗',
        color: 'from-fuchsia-500 to-purple-600',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'Intro', requiredFields: ['greeting'] },
            { id: 'p2', type: 'message', title: 'Build-up', requiredFields: ['text'] },
            { id: 'p3', type: 'slider', title: 'Interactive Slider', requiredFields: ['m1', 'm2', 'm3', 'm4', 'm5'] },
            { id: 'p4', type: 'photo', title: 'Our Moments', requiredFields: ['photos'], config: { maxPhotos: 5 } },
            { id: 'p5', type: 'message', title: 'Final Word', requiredFields: ['text'] },
        ],
    },
    {
        id: 4,
        slug: '5-things-i-love',
        title: '5 Things I Love About You',
        category: 'Valentine\'s',
        price: 149,
        originalPrice: 799,
        icon: '💕',
        color: 'from-rose-400 to-pink-500',
        isActive: true,
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
        price: 149,
        originalPrice: 899,
        icon: '🐼',
        color: 'from-violet-500 to-purple-600',
        tag: 'Cute',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'Panda Hello', requiredFields: ['greeting', 'subtext', 'characterImage'] },
            { id: 'p2', type: 'photo', title: 'Memories', requiredFields: ['photos', 'heading'] },
            { id: 'p3', type: 'celebration', title: 'Gift Reveal', requiredFields: ['giftHeading', 'revealedHeading', 'giftCharacter'] },
            { id: 'p4', type: 'message', title: 'Forever Note', requiredFields: ['finalHeading', 'finalMessage', 'finalCharacter'] },
        ],
    },
    {
        id: 6,
        slug: 'anniversary-counter',
        title: 'Anniversary Counter',
        category: 'Anniversary',
        price: 149,
        originalPrice: 1699,
        icon: '💍',
        color: 'from-amber-400 to-orange-500',
        isActive: true,
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
        isActive: true,
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
        price: 149,
        originalPrice: 899,
        icon: '🥺',
        color: 'from-blue-400 to-indigo-500',
        isActive: true,
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
        price: 149,
        originalPrice: 799,
        icon: '🔮',
        color: 'from-purple-500 to-indigo-600',
        tag: 'Fun',
        isActive: true,
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
        price: 149,
        originalPrice: 699,
        icon: '🏳️',
        color: 'from-green-400 to-teal-500',
        isActive: true,
        pages: [
            { id: 'p1', type: 'message', title: 'White Flag', requiredFields: ['text'] },
            { id: 'p2', type: 'game', title: 'Mistake Swipe', requiredFields: ['m1', 'm2', 'm3'], config: { gameType: 'swipe' } },
            { id: 'p3', type: 'character', title: 'The Hug', requiredFields: ['text'] },
        ],
    },
    {
        id: 11,
        slug: 'cuteness-scanner',
        title: 'Cuteness Scanner (Interactive)',
        category: 'Fun',
        price: 149,
        originalPrice: 699,
        icon: '🔍',
        color: 'from-cyan-400 to-blue-500',
        isActive: true,
        pages: [
            { id: 'p1', type: 'message', title: 'Calibration', requiredFields: ['text'] },
            { id: 'p2', type: 'game', title: 'Scanning', requiredFields: ['text'] },
            { id: 'p3', type: 'celebration', title: 'Result', requiredFields: ['resultHeading', 'resultText', 'resultPercentage'] },
        ],
    },
    {
        id: 12,
        slug: 'new-year-start',
        title: 'New Year Fresh Start',
        category: 'Fun',
        price: 149,
        originalPrice: 699,
        icon: '🎆',
        color: 'from-yellow-600 to-orange-700',
        isActive: true,
        pages: [
            { id: 'p1', type: 'message', title: 'Countdown', requiredFields: ['heading', 'subtext'] },
            { id: 'p2', type: 'game', title: 'Clear Bad Vibes', requiredFields: ['v1', 'v2', 'v3'], config: { gameType: 'swipe' } },
            { id: 'p3', type: 'message', title: 'Golden Ticket', requiredFields: ['name'] },
            { id: 'p4', type: 'photo', title: 'Year Memories', requiredFields: ['photos'] },
            { id: 'p5', type: 'celebration', title: 'Final Note', requiredFields: ['message'] },
        ],
    },
    {
        id: 13,
        slug: 'friendship-game',
        title: 'Friendship Memory Game',
        category: 'Fun',
        price: 149,
        originalPrice: 899,
        icon: '🤝',
        color: 'from-orange-400 to-red-500',
        isActive: true,
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
        isActive: true,
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
        price: 149,
        originalPrice: 2499,
        icon: '🎁',
        color: 'from-rose-500 to-pink-600',
        isActive: true,
        pages: [
            { id: 'p1', type: 'countdown', title: 'Countdown', requiredFields: ['date'] },
            { id: 'p2', type: 'game', title: 'Candles', requiredFields: ['wish'] },
            { id: 'p3', type: 'photo', title: 'Gallery', requiredFields: ['photos'] },
            { id: 'p4', type: 'message', title: 'Surprise', requiredFields: ['text'] },
        ],
    },
    {
        id: 16,
        slug: 'our-story',
        title: 'Our Interactive Story (Premium)',
        category: 'Romance',
        price: 149,
        originalPrice: 1499,
        icon: '📖',
        color: 'from-indigo-600 to-violet-800',
        tag: 'Premium',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'The Prologue', requiredFields: ['heading'] },
            { id: 'p2', type: 'timeline', title: 'The Timeline', requiredFields: ['milestones'] },
            { id: 'p3', type: 'photo', title: 'The Gallery', requiredFields: ['photos'] },
            { id: 'p4', type: 'celebration', title: 'To Be Continued', requiredFields: ['message'] },
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
        isActive: true,
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
        isActive: true,
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
        price: 149,
        originalPrice: 899,
        icon: '🍾',
        color: 'from-blue-300 to-cyan-400',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'Start Journey', requiredFields: ['greeting', 'subtext'] },
            { id: 'p2', type: 'message', title: 'Floating...', requiredFields: ['text'] },
            { id: 'p3', type: 'game', title: 'Open Bottle', requiredFields: ['wish'], config: { gameType: 'bottle' } },
            { id: 'p4', type: 'letter', title: 'The Note', requiredFields: ['message'] },
            { id: 'p5', type: 'photo', title: 'Memories', requiredFields: ['photos'], config: { maxPhotos: 5 } },
        ],
    },
    {
        id: 20,
        slug: 'romantic-valentines-journey',
        title: 'Romantic Valentine\'s Journey',
        category: 'Valentine\'s',
        price: 149,
        originalPrice: 1999,
        icon: '💖',
        color: 'from-pink-500 via-rose-500 to-red-600',
        tag: 'Premium',
        isActive: true,
        pages: [
            {
                id: 'p1',
                type: 'character',
                title: 'Greeting',
                requiredFields: ['greeting', 'subtext', 'mainImage', 'buttonText'],
                config: { style: 'polaroid', backgroundColor: 'gradient-pink-orange', hasFloatingHearts: true }
            },
            {
                id: 'p2',
                type: 'flip-cards',
                title: 'Why You?',
                requiredFields: ['heading', 'reason1', 'reason2', 'reason3', 'reason4'],
                config: { cardShape: 'heart', cardCount: 4, colors: ['#f04299', '#fb923c', '#f04299', '#a855f7'] }
            },
            {
                id: 'p3',
                type: 'photo',
                title: 'Memories',
                requiredFields: ['heading', 'photos', 'polaroidCaption'],
                config: { style: 'polaroid', minPhotos: 5, maxPhotos: 10, layout: 'single-focus', allowCaptions: true }
            },
            {
                id: 'p4',
                type: 'game',
                title: 'The Question',
                requiredFields: ['question', 'characterImage', 'yesText', 'notSureText', 'pleaseText'],
                config: { gameType: 'valentine-question', noButtonBehavior: 'shrink-and-hide', celebrationOnYes: true }
            },
            {
                id: 'p5',
                type: 'celebration',
                title: 'Final Message',
                requiredFields: ['mainHeading', 'characterImage', 'loveMessage', 'signature', 'shareButtonText', 'backButtonText'],
                config: { hasConfetti: true, hasFloatingHearts: true, characterAnimation: 'heart-float', maxMessageLength: 500 }
            }
        ],
    },
    {
        id: 21,
        slug: 'romantic-valentines-journey-v2',
        title: 'Romantic Valentine\'s Journey V2',
        category: 'Valentine\'s Day',
        price: 149,
        originalPrice: 1499,
        icon: '💖',
        color: 'from-pink-600 to-rose-600',
        tag: 'New',
        isActive: true,
        pages: [
            {
                id: 'p1',
                type: 'character',
                title: 'Greeting',
                requiredFields: ['greeting', 'recipientName', 'subtext', 'mainImage', 'buttonText'],
                config: { hasFloatingHearts: true, heartCount: 30, hasSparkles: true, sparkleCount: 10, animationType: 'polaroid-card' }
            },
            {
                id: 'p2',
                type: 'flip-cards',
                title: 'Why I Love You',
                requiredFields: ['heading', 'reason1', 'reason2', 'reason3', 'reason4'],
                config: { cardCount: 4, flipAnimation: '3d-rotate', hasFloatingHearts: true, heartCount: 15 }
            },
            {
                id: 'p3',
                type: 'photo',
                title: 'Our Memories',
                requiredFields: ['heading', 'photos', 'polaroidCaption'],
                config: { maxPhotos: 5, layout: 'polaroid-grid', hasZoomModal: true, hasFloatingHearts: true }
            },
            {
                id: 'p4',
                type: 'game',
                title: 'The Question',
                requiredFields: ['question', 'characterImage', 'yesText', 'noText', 'pleaseText'],
                config: { gameType: 'moving-no-button', hasConfetti: true, noButtonBehavior: 'move-and-shrink', celebrationOnYes: true }
            },
            {
                id: 'p5',
                type: 'celebration',
                title: 'Celebration',
                requiredFields: ['mainHeading', 'characterImage', 'loveMessage', 'signature'],
                config: { hasConfetti: true, confettiDuration: 5000, hasOrbitingHearts: true, hasFireworks: true }
            },
            {
                id: 'p6',
                type: 'timeline',
                title: 'Our Love Story',
                requiredFields: ['heading', 'milestone1Title', 'milestone1Date', 'milestone1Description', 'milestone2Title', 'milestone2Date', 'milestone2Description', 'milestone3Title', 'milestone3Date', 'milestone3Description', 'milestone4Title', 'milestone4Date', 'milestone4Description'],
                config: { layout: 'vertical-timeline', milestoneCount: 4, hasInteractiveHover: true }
            },
            {
                id: 'p7',
                type: 'timeline',
                title: 'Every Moment Counts',
                requiredFields: ['heading', 'moments'],
                config: { layout: 'grid', defaultMomentCount: 6, hasGradientAccent: true }
            },
            {
                id: 'p8',
                type: 'photo',
                title: 'Photo Gallery',
                requiredFields: ['heading', 'galleryPhotos', 'captions'],
                config: { maxPhotos: 8, layout: 'masonry', hasLightbox: true, hasHoverEffects: true }
            },
            {
                id: 'p9',
                type: 'letter',
                title: 'A Letter From My Heart',
                requiredFields: ['heading', 'letterContent', 'closingLine', 'senderName'],
                config: { maxLength: 1000, hasWaxSeal: true, hasDecorativeHearts: true, fontStyle: 'serif' }
            },
            {
                id: 'p10',
                type: 'character',
                title: 'Sealed With Love',
                requiredFields: ['heading', 'signatureText', 'date', 'sealText'],
                config: { style: 'vintage-document', hasWaxSeal: true, hasDecorativeCorners: true }
            },
            {
                id: 'p11',
                type: 'celebration',
                title: 'Thank You',
                requiredFields: ['thankYouText', 'finalMessage', 'shareText'],
                config: { hasShareButton: true, hasReplayButton: true, hasFireworks: true, hasFloatingHearts: true, heartCount: 40 }
            }
        ],
    },
    {
        id: 22,
        slug: 'happy-birthday-interaction',
        title: 'Happy Birthday (Interactive)',
        category: 'Birthday',
        price: 149,
        originalPrice: 1999,
        icon: '🎂',
        color: 'from-purple-500 to-pink-500',
        tag: 'New',
        isActive: true,
        pages: [
            {
                id: 'p1',
                type: 'loading',
                title: 'Surprise Loading',
                requiredFields: ['subtext'],
                config: { style: 'minimal-purple', icon: 'cake' }
            },
            {
                id: 'p2',
                type: 'character',
                title: 'Intro',
                requiredFields: ['heading', 'subtext', 'buttonText'],
                config: { animation: 'fade-scale' }
            },
            {
                id: 'p3',
                type: 'game',
                title: 'Cake Decor',
                requiredFields: ['congratsText'],
                config: { gameType: 'cake-decor' }
            },
            {
                id: 'p4',
                type: 'game',
                title: 'Balloon Pop',
                requiredFields: ['w1', 'w2', 'w3', 'w4', 'finalMessage'],
                config: { gameType: 'balloon-pop' }
            },
            {
                id: 'p5',
                type: 'photo',
                title: 'Sweet Moments',
                requiredFields: ['photos'],
                config: { style: 'carousel-ghibli' }
            },
            {
                id: 'p6',
                type: 'letter',
                title: 'Special Message',
                requiredFields: ['message'],
                config: { style: 'flip-card' }
            },
            {
                id: 'p7',
                type: 'celebration',
                title: 'Final Gift',
                requiredFields: ['finalText'],
                config: { style: 'gift-box-pop' }
            }
        ],
    },
    {
        id: 23,
        slug: 'small-surprise',
        title: 'Small Surprise (Cute)',
        category: 'Cute',
        price: 149,
        originalPrice: 1899,
        icon: '🎁',
        color: 'from-pink-400 to-rose-500',
        tag: 'New',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'Hello Beautiful', requiredFields: ['heading', 'subtext', 'characterImage'] },
            { id: 'p2', type: 'game', title: 'Cuteness Meter', requiredFields: ['heading'] },
            { id: 'p3', type: 'flip-cards', title: 'Reasons List', requiredFields: ['r1', 'r2', 'r3', 'r4', 'r5'] },
            { id: 'p4', type: 'letter', title: 'Note', requiredFields: ['message'] },
            { id: 'p5', type: 'celebration', title: 'Final Surprise', requiredFields: ['finalHeading'] },
        ],
    },
    {
        id: 24,
        slug: 'memories-together',
        title: 'Memories Together (Cinematic)',
        category: 'Romance',
        price: 149,
        originalPrice: 1599,
        icon: '🎞️',
        color: 'from-blue-600 to-indigo-900',
        tag: 'Premium',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'To Moon & Back', requiredFields: ['heading'] },
            { id: 'p2', type: 'message', title: 'Cinematic Intro', requiredFields: ['cinemaHeading'] },
            { id: 'p3', type: 'photo', title: 'The Gallery', requiredFields: ['photos'] },
            { id: 'p4', type: 'celebration', title: 'Final Thought', requiredFields: ['message'] },
        ],
    },
    {
        id: 25,
        slug: 'love-proposal',
        title: 'Love Proposal (Premium)',
        category: 'Romance',
        price: 149,
        originalPrice: 1599,
        icon: '💍',
        color: 'from-rose-500 to-pink-600',
        tag: 'Premium',
        isActive: true,
        pages: [
            { id: 'p1', type: 'character', title: 'Start', requiredFields: ['heading'] },
            { id: 'p2', type: 'game', title: 'The Question', requiredFields: ['question', 'yesText', 'noText', 'characterImage'] },
            { id: 'p3', type: 'celebration', title: 'Celebrate', requiredFields: ['celebrationHeading', 'celebrationSubtext'] },
            { id: 'p4', type: 'letter', title: 'The Vow', requiredFields: ['letterHeading', 'message'] },
        ],
    },
];
