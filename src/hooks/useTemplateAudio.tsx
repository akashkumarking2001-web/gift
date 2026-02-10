import { useEffect, useRef, useState } from 'react';

interface AudioOptions {
    bgMusicUrl?: string;
    isEditor?: boolean;
}

export const useTemplateAudio = ({ bgMusicUrl, isEditor = false }: AudioOptions) => {
    const [isMuted, setIsMuted] = useState(false);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const bgMusicRef = useRef<HTMLAudioElement | null>(null);
    const sfxGainNode = useRef<GainNode | null>(null);
    const bgmGainNode = useRef<GainNode | null>(null);

    // Default SFX URLs (Royalty Free / Github hosted or similar reliable source)
    const SFX = {
        click: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=click-124467.mp3', // Subtle click
        transition: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=whoosh-6316.mp3', // Soft whoosh
        reveal: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=pop-39222.mp3', // Pop
    };

    useEffect(() => {
        if (isEditor) return;

        // Initialize Audio Context on first interaction
        const initAudio = () => {
            if (!audioContext) {
                const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
                setAudioContext(ctx);

                // Create Gain Nodes for Volume Control
                sfxGainNode.current = ctx.createGain();
                bgmGainNode.current = ctx.createGain();

                sfxGainNode.current.connect(ctx.destination);
                bgmGainNode.current.connect(ctx.destination);

                // Initial Volumes
                sfxGainNode.current.gain.value = 0.8; // High SFX volume initially
                bgmGainNode.current.gain.value = 0.7; // Standard BGM volume
            }
        };

        const handleInteraction = () => {
            initAudio();
            if (audioContext?.state === 'suspended') {
                audioContext.resume();
            }
            // Try to play BGM if available and not playing
            if (bgMusicRef.current && bgMusicRef.current.paused && !isMuted) {
                // Auto-play removed to allow precise control
                // bgMusicRef.current.play().catch(e => console.log("Autoplay blocked", e));
            }
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            if (audioContext) audioContext.close();
        };
    }, [isEditor, audioContext, isMuted]);

    // Handle BGM Element
    useEffect(() => {
        if (bgMusicUrl && !isEditor) {
            const audio = new Audio(bgMusicUrl);
            audio.loop = true;
            audio.volume = 0.7;
            bgMusicRef.current = audio;

            // If context already exists, connect it for better control (optional, staying simply with HTML5 Audio for BGM to avoid complex buffer loading)
            // We will stick to HTML5 Audio for BGM for streaming large files logic.
            // Ducking logic will manually adjust volume.

            return () => {
                audio.pause();
                bgMusicRef.current = null;
            };
        }
    }, [bgMusicUrl, isEditor]);

    // Ducking Logic
    const duckBGM = (duration = 1000) => {
        if (!bgMusicRef.current) return;

        // Lower BGM
        const originalVolume = 0.7;
        const duckedVolume = 0.3;

        // Smooth fade out
        let steps = 10;
        let currentStep = 0;
        const fadeOut = setInterval(() => {
            if (bgMusicRef.current) {
                currentStep++;
                const vol = originalVolume - ((originalVolume - duckedVolume) * (currentStep / steps));
                bgMusicRef.current.volume = Math.max(duckedVolume, vol);
                if (currentStep >= steps) clearInterval(fadeOut);
            }
        }, 20);

        // Restore after duration
        setTimeout(() => {
            currentStep = 0;
            const fadeIn = setInterval(() => {
                if (bgMusicRef.current) {
                    currentStep++;
                    const vol = duckedVolume + ((originalVolume - duckedVolume) * (currentStep / steps));
                    bgMusicRef.current.volume = Math.min(originalVolume, vol);
                    if (currentStep >= steps) clearInterval(fadeIn);
                }
            }, 20);
        }, duration);
    };

    const playSFX = (type: 'click' | 'transition' | 'reveal') => {
        if (isEditor || isMuted) return;

        // Duck BGM if playing
        if (bgMusicRef.current && !bgMusicRef.current.paused) {
            duckBGM(1500); // Duck for 1.5s
        }

        const soundUrl = type === 'click' ? SFX.click : type === 'transition' ? SFX.transition : SFX.reveal;
        const audio = new Audio(soundUrl);

        // SFX Volume calculation
        // If BGM is playing, SFX is 0.4 (clear but not overpowering)
        // If BGM is NOT playing, SFX is 0.8 (crisp and loud)
        const isBgmPlaying = bgMusicRef.current && !bgMusicRef.current.paused;
        audio.volume = isBgmPlaying ? 0.4 : 0.8;

        audio.play().catch(e => console.log("SFX Play failed", e));
    };

    const toggleMute = () => {
        setIsMuted(prev => {
            const newState = !prev;
            if (bgMusicRef.current) {
                bgMusicRef.current.muted = newState;
            }
            return newState;
        });
    };

    const playBGM = () => {
        if (bgMusicRef.current && !isMuted) {
            bgMusicRef.current.play().catch(e => console.log("BGM Play failed", e));
        }
    };

    const pauseBGM = () => {
        if (bgMusicRef.current) {
            bgMusicRef.current.pause();
        }
    };

    return {
        playClick: () => playSFX('click'),
        playTransition: () => playSFX('transition'),
        playReveal: () => playSFX('reveal'),
        playBGM,
        pauseBGM,
        toggleMute,
        isMuted
    };
};
