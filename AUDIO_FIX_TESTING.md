# Audio Playback Fix - Testing Guide

## Changes Made

### 1. AudioContext.tsx
**File**: `src/context/AudioContext.tsx`

**Changes**:
- **Line 31-44**: Removed auto-play logic from `unlockAudio` event handler
  - Previously: BGM would auto-play when user clicked/touched anywhere
  - Now: Only marks audio as allowed, does NOT auto-play
  - Added `{ once: true }` to event listeners to prevent multiple triggers

- **Line 46-69**: Removed auto-play from BGM initialization
  - Previously: BGM would auto-play when URL was set if `audioAllowed && !isMuted`
  - Now: BGM is only loaded and prepared, NOT played automatically
  - Music only plays when `playBGM()` is explicitly called

### 2. GiftViewer.tsx
**File**: `src/pages/GiftViewer.tsx`

**Existing Logic** (No changes needed):
- **Line 84**: `if (currentPage === 0) playBGM();`
- This ensures BGM plays only when transitioning FROM page 0 TO page 1
- Triggered by clicking the "Action Button" on the first page
- Music starts playing as page 2 loads

## Testing Checklist

### Desktop Testing
- [ ] **Chrome**: Load gift page → No auto-play on load
- [ ] **Chrome**: Scroll on page 1 → No music starts
- [ ] **Chrome**: Click anywhere on page 1 (not button) → No music starts
- [ ] **Chrome**: Click "Action Button" → Music starts as page 2 loads
- [ ] **Firefox**: Repeat above tests
- [ ] **Edge**: Repeat above tests

### Tablet Testing
- [ ] **iPad Safari**: Load gift page → No auto-play
- [ ] **iPad Safari**: Touch/scroll page 1 → No music
- [ ] **iPad Safari**: Tap "Action Button" → Music starts on page 2
- [ ] **Android Tablet Chrome**: Repeat above tests

### Mobile Testing
- [ ] **iOS Safari**: Load gift page → No auto-play
- [ ] **iOS Safari**: Touch/scroll page 1 → No music
- [ ] **iOS Safari**: Tap "Action Button" → Music starts on page 2
- [ ] **Android Chrome**: Repeat above tests

### Additional Tests
- [ ] Mute button works correctly
- [ ] Music continues across page transitions
- [ ] Music loops correctly
- [ ] Volume is set to 50% (0.5)
- [ ] No console errors related to audio

## Expected Behavior

### ✅ Correct Behavior
1. User opens gift link
2. Page 1 loads with NO music
3. User can scroll, touch, or click anywhere on page 1 → NO music
4. User clicks the "Action Button" (e.g., "Open Your Gift")
5. Page transition animation plays
6. **Music starts playing as Page 2 loads**
7. Music continues playing on subsequent pages
8. User can mute/unmute at any time

### ❌ Incorrect Behavior (Fixed)
1. ~~Music starts on initial page load~~
2. ~~Music starts on first touch/scroll~~
3. ~~Music starts when clicking anywhere on page 1~~

## Technical Details

### Audio Unlock Mechanism
- Modern browsers require user interaction before playing audio
- We use `click` and `touchstart` events to unlock audio capability
- **Important**: Unlocking ≠ Playing
- Audio is "unlocked" (browser allows playback) but NOT played automatically

### BGM Playback Flow
```
1. Page loads → AudioContext initializes
2. User clicks/touches → audioAllowed = true (unlock only)
3. BGM URL is set → Audio object created and prepared
4. User clicks "Action Button" on Page 1 → handleNext() called
5. handleNext() checks: if (currentPage === 0) → playBGM()
6. playBGM() explicitly calls audio.play()
7. Music starts playing as Page 2 loads
```

## Troubleshooting

### Issue: Music still auto-plays
**Check**:
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check console for errors
- Verify AudioContext.tsx changes are applied

### Issue: Music doesn't play at all
**Check**:
- Ensure `audioAllowed` is true (click anywhere first)
- Check if muted
- Verify BGM URL is valid
- Check browser console for playback errors

### Issue: Music plays on wrong page
**Check**:
- Verify GiftViewer.tsx line 84: `if (currentPage === 0) playBGM();`
- Ensure page indexing starts at 0
- Check template page configuration

## Code References

### AudioContext.tsx - unlockAudio
```typescript
const unlockAudio = () => {
    setAudioAllowed(true);
    // Only mark audio as allowed, do NOT auto-play
    // BGM will only play when explicitly called via playBGM()
};

window.addEventListener('click', unlockAudio, { once: true });
window.addEventListener('touchstart', unlockAudio, { once: true });
```

### AudioContext.tsx - BGM Management
```typescript
useEffect(() => {
    if (bgMusicUrl) {
        if (bgMusicRef.current) {
            bgMusicRef.current.pause();
            bgMusicRef.current = null;
        }
        const audio = new Audio(bgMusicUrl);
        audio.loop = true;
        audio.volume = 0.5;
        audio.muted = isMuted;
        bgMusicRef.current = audio;

        // DO NOT auto-play here - only play when playBGM() is explicitly called
    }
    // ...
}, [bgMusicUrl]);
```

### GiftViewer.tsx - handleNext
```typescript
const handleNext = () => {
    playTransition();
    if (currentPage === 0) playBGM(); // ← Music starts here

    if (template && currentPage < template.pages.length - 1) {
        setCurrentPage(prev => prev + 1);
    }
    // ...
};
```

## Success Criteria

✅ **Phase 1 Complete** when:
1. No auto-play on page load (all devices)
2. No auto-play on touch/scroll (all devices)
3. BGM plays only after "Action Button" click
4. BGM starts as Page 2 loads
5. Consistent behavior across Desktop, Tablet, Mobile
6. No console errors
7. Mute/unmute functionality works
8. Music loops correctly

---

**Status**: ✅ Audio Fix Implemented
**Next Phase**: Bundle Purchase & Admin Workflow
**Date**: 2026-02-12
