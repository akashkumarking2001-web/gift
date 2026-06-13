import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioContextType {
    playBGM: () => void;
    pauseBGM: () => void;
    playSFX: (type: string) => void;
    toggleMute: () => void;
    setBgMusicUrl: (url: string) => void;
    isMuted: boolean;
    playClick: () => void;
    playTransition: () => void;
    playReveal: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [bgMusicUrl, setBgMusicUrlState] = useState<string | null>(null);
    const bgMusicRef = useRef<HTMLAudioElement | null>(null);
    const [audioAllowed, setAudioAllowed] = useState(false);
    const [hasStartedBGM, setHasStartedBGM] = useState(false);

    // SFX URLs - Using more reliable stable links
    const SFX = {
        click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
        transition: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
        reveal: 'https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3',
    };

    // User interaction unlock
    useEffect(() => {
        const unlockAudio = () => {
            setAudioAllowed(true);
            // Only mark audio as allowed, do NOT auto-play
            // BGM will only play when explicitly called via playBGM()
        };

        window.addEventListener('click', unlockAudio, { once: true });
        window.addEventListener('touchstart', unlockAudio, { once: true });
        return () => {
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('touchstart', unlockAudio);
        };
    }, []);

    // BGM Management
    useEffect(() => {
        if (bgMusicUrl) {
            if (bgMusicRef.current) {
                bgMusicRef.current.pause();
                bgMusicRef.current = null;
            }
            const audio = new Audio(bgMusicUrl);
            audio.loop = true;
            audio.volume = 0.5;
            audio.muted = isMuted; // Sync mute state
            bgMusicRef.current = audio;

            // DO NOT auto-play here - only play when playBGM() is explicitly called
        }
        return () => {
            if (bgMusicRef.current) {
                bgMusicRef.current.pause();
                bgMusicRef.current = null;
            }
        }
    }, [bgMusicUrl]);

    // Watch mute state changes
    useEffect(() => {
        if (bgMusicRef.current) {
            bgMusicRef.current.muted = isMuted;
            if (!isMuted && audioAllowed && hasStartedBGM) {
                bgMusicRef.current.play().catch(e => console.log("Unmute play failed", e));
            }
        }
    }, [isMuted, audioAllowed, hasStartedBGM]);

    const setBgMusicUrl = (url: string) => {
        if (url !== bgMusicUrl) {
            setBgMusicUrlState(url);
        }
    };

    const playBGM = () => {
        setHasStartedBGM(true);
        if (bgMusicRef.current && audioAllowed && !isMuted) {
            bgMusicRef.current.play().catch(e => console.log("Manual play BGM failed", e));
        }
    };

    const pauseBGM = () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.pause();
        }
    };

    const playSFX = (type: string) => {
        if (isMuted) return;

        // Duck BGM
        if (bgMusicRef.current && !bgMusicRef.current.paused) {
            const originalVol = 0.5;
            bgMusicRef.current.volume = 0.2;
            setTimeout(() => {
                if (bgMusicRef.current) bgMusicRef.current.volume = originalVol;
            }, 1000);
        }

        let src = SFX.click;
        if (type === 'transition' || type === 'celebration') src = SFX.transition;
        if (type === 'reveal' || type === 'pop') src = SFX.reveal;

        const audio = new Audio(src);
        audio.volume = 0.7;
        audio.play().catch(e => console.log("SFX failed", e));
    };

    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <AudioContext.Provider value={{
            playBGM,
            pauseBGM,
            playSFX,
            toggleMute,
            setBgMusicUrl,
            isMuted,
            playClick: () => playSFX('click'),
            playTransition: () => playSFX('transition'),
            playReveal: () => playSFX('reveal')
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudioContext = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudioContext must be used within an AudioProvider');
    }
    return context;
};
