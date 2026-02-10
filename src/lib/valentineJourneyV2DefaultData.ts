/**
 * Default data for Valentine Journey V2 Template
 * Used for previews, testing, and as placeholder values
 */

export const getValentineJourneyV2DefaultData = () => {
    return {
        // Page 1: Greeting
        greeting: "Hey Beautiful",
        recipientName: "Cutiepie",
        subtext: "I made something special for you this Valentine's Day",
        mainImage: "https://via.placeholder.com/500x500/FFB6C1/FF1493?text=💖",
        buttonText: "Open Your Gift",

        // Page 2: Why I Love You
        heading: "Why I Love You",
        reason1: "Your smile lights up my world",
        reason2: "You make every day special",
        reason3: "Your kindness inspires me",
        reason4: "You're my best friend",

        // Page 3: Memories
        photos: [
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Memory+1',
            'https://via.placeholder.com/400x500/FFC0CB/FF69B4?text=Memory+2',
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Memory+3',
            'https://via.placeholder.com/400x500/FFC0CB/FF69B4?text=Memory+4',
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Memory+5'
        ],
        polaroidCaption: "Every moment with you is precious",

        // Page 4: Question
        question: "Will you be my Valentine?",
        characterImage: "https://via.placeholder.com/300x300/FFB6C1/FF1493?text=💖",
        yesText: "Yes! 💕",
        noText: "No",
        pleaseText: "Please? 🥺",

        // Page 5: Celebration
        mainHeading: "Yay! You said Yes!",
        loveMessage: "You've made me the happiest person in the world! I promise to always cherish you, make you smile, and love you with all my heart. Thank you for being mine! 💕",
        signature: "Forever yours",

        // Page 6: Love Story
        milestone1Title: "First Meeting",
        milestone1Date: "January 2024",
        milestone1Description: "The day our eyes met and everything changed",
        milestone2Title: "First Date",
        milestone2Date: "February 2024",
        milestone2Description: "Coffee turned into hours of conversation",
        milestone3Title: "First Kiss",
        milestone3Date: "March 2024",
        milestone3Description: "Under the stars, a moment I'll never forget",
        milestone4Title: "Together Forever",
        milestone4Date: "Now & Always",
        milestone4Description: "Every day with you is a new adventure",

        // Page 7: Timeline
        moments: [
            { date: "Day 1", title: "First Hello", description: "You smiled and my world lit up" },
            { date: "Week 1", title: "First Laugh", description: "Your laugh became my favorite sound" },
            { date: "Month 1", title: "First Adventure", description: "We explored the city together" },
            { date: "Month 3", title: "First 'I Love You'", description: "Three words that changed everything" },
            { date: "Month 6", title: "First Trip", description: "Creating memories across the world" },
            { date: "Today", title: "Forever Starts", description: "Every day is a new beginning with you" }
        ],

        // Page 8: Photo Gallery
        galleryPhotos: [
            'https://via.placeholder.com/600x400/FFB6C1/FF1493?text=Photo+1',
            'https://via.placeholder.com/400x600/FFC0CB/FF69B4?text=Photo+2',
            'https://via.placeholder.com/600x600/FFB6C1/FF1493?text=Photo+3',
            'https://via.placeholder.com/500x400/FFC0CB/FF69B4?text=Photo+4',
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Photo+5',
            'https://via.placeholder.com/600x400/FFC0CB/FF69B4?text=Photo+6',
            'https://via.placeholder.com/400x600/FFB6C1/FF1493?text=Photo+7',
            'https://via.placeholder.com/500x500/FFC0CB/FF69B4?text=Photo+8'
        ],
        captions: [
            'Our first adventure',
            'Sunset together',
            'Silly moments',
            'Coffee dates',
            'Beach day',
            'City lights',
            'Cozy nights',
            'Forever memories'
        ],

        // Page 9: Final Message
        letterContent: "My dearest love,\n\nEvery moment with you feels like a dream come true. You've brought so much joy, laughter, and love into my life. I can't imagine my days without your smile, your warmth, and your beautiful soul.\n\nThank you for being you. Thank you for choosing me. Thank you for making every day an adventure worth living.\n\nI love you more than words can express, and I promise to show you every single day just how much you mean to me.",
        closingLine: "Forever and always,",
        senderName: "Your Valentine",

        // Page 10: Signature
        signatureText: "With all my heart",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        sealText: "Made with 💕",

        // Page 11: Ending
        thankYouText: "Thank You For Being Mine",
        finalMessage: "This is just the beginning of our forever story. Here's to many more beautiful moments together! 💕",
        shareText: "Share this love story"
    };
};

/**
 * Get default data for a specific page
 */
export const getPageDefaultData = (pageId: string): Record<string, any> => {
    const allData = getValentineJourneyV2DefaultData();

    const pageDataMap: Record<string, string[]> = {
        'p1': ['greeting', 'recipientName', 'subtext', 'mainImage', 'buttonText'],
        'p2': ['heading', 'reason1', 'reason2', 'reason3', 'reason4'],
        'p3': ['heading', 'photos', 'polaroidCaption'],
        'p4': ['question', 'characterImage', 'yesText', 'noText', 'pleaseText'],
        'p5': ['mainHeading', 'characterImage', 'loveMessage', 'signature'],
        'p6': ['heading', 'milestone1Title', 'milestone1Date', 'milestone1Description', 'milestone2Title', 'milestone2Date', 'milestone2Description', 'milestone3Title', 'milestone3Date', 'milestone3Description', 'milestone4Title', 'milestone4Date', 'milestone4Description'],
        'p7': ['heading', 'moments'],
        'p8': ['heading', 'galleryPhotos', 'captions'],
        'p9': ['heading', 'letterContent', 'closingLine', 'senderName'],
        'p10': ['heading', 'signatureText', 'date', 'sealText'],
        'p11': ['thankYouText', 'finalMessage', 'shareText']
    };

    const fields = pageDataMap[pageId] || [];
    const pageData: Record<string, any> = {};

    fields.forEach(field => {
        if (field in allData) {
            pageData[field] = allData[field as keyof typeof allData];
        }
    });

    return pageData;
};
