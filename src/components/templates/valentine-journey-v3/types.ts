export interface PageContent {
    title: string;
    description: string;
    image?: string;
    actionText?: string;
    quiz?: {
        question: string;
        options: string[];
        correctAnswer: string;
    };
    reasons?: string[];
    timeline?: Array<{
        date: string;
        event: string;
        description: string;
    }>;
    secretMessage?: string;
}

export interface ValentineV3Config {
    coupleName: string;
    themeColor: string;
    musicUrl: string;
    pages: PageContent[];
}
