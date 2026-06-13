// Common types for Valentine Journey V2 Template

export interface BasePageProps {
    data: Record<string, any>;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

export interface TemplateData {
    // Page 1: Greeting
    greeting?: string;
    recipientName?: string;
    subtext?: string;
    mainImage?: string;
    buttonText?: string;

    // Page 2: Why You
    heading?: string;
    reason1?: string;
    reason2?: string;
    reason3?: string;
    reason4?: string;

    // Page 3: Memories
    photos?: string[];
    polaroidCaption?: string;

    // Page 4: Question
    question?: string;
    characterImage?: string;
    yesText?: string;
    noText?: string;
    pleaseText?: string;

    // Page 5: Celebration
    mainHeading?: string;
    loveMessage?: string;
    signature?: string;

    // Page 6: Love Story
    milestone1Title?: string;
    milestone1Date?: string;
    milestone1Description?: string;
    milestone2Title?: string;
    milestone2Date?: string;
    milestone2Description?: string;
    milestone3Title?: string;
    milestone3Date?: string;
    milestone3Description?: string;
    milestone4Title?: string;
    milestone4Date?: string;
    milestone4Description?: string;

    // Page 7: Timeline
    moments?: Array<{
        date: string;
        title: string;
        description: string;
    }>;

    // Page 8: Photo Gallery
    galleryPhotos?: string[];
    captions?: string[];

    // Page 9: Final Message
    letterContent?: string;
    closingLine?: string;
    senderName?: string;

    // Page 10: Signature
    signatureImage?: string;
    signatureText?: string;
    date?: string;
    sealText?: string;

    // Page 11: Ending
    thankYouText?: string;
    finalMessage?: string;
    shareText?: string;
}

export interface Milestone {
    id: number;
    title: string;
    date: string;
    description: string;
    emoji: string;
    color: string;
}

export interface Moment {
    date: string;
    title: string;
    description: string;
}

export interface PhotoWithCaption {
    url: string;
    caption: string;
}
