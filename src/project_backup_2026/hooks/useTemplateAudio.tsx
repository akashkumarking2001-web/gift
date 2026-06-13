import { useEffect } from 'react';
import { useAudioContext } from '../context/AudioContext';

interface AudioOptions {
    bgMusicUrl?: string;
    isEditor?: boolean;
}

export const useTemplateAudio = ({ bgMusicUrl, isEditor = false }: AudioOptions) => {
    const {
        playBGM, pauseBGM, playSFX, toggleMute,
        setBgMusicUrl, isMuted, playClick, playTransition, playReveal
    } = useAudioContext();

    useEffect(() => {
        if (bgMusicUrl && !isEditor) {
            setBgMusicUrl(bgMusicUrl);
        }
    }, [bgMusicUrl, isEditor, setBgMusicUrl]);

    return {
        playClick,
        playTransition,
        playReveal,
        playSFX,
        playBGM,
        pauseBGM,
        toggleMute,
        isMuted
    };
};
