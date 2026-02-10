# Valentine's Day Template - User Customization Guide

## Template Overview

**Name**: Romantic Valentine's Journey  
**ID**: 20  
**Price**: ₹199 (88% OFF from ₹1999)  
**Category**: Valentine's  
**Tag**: Premium  
**Pages**: 5 interactive pages  

## Page-by-Page Breakdown

### 📄 Page 1: Greeting (Polaroid Card)

**Visual Design**:
- Polaroid-style card with slight rotation
- Pink-to-orange gradient background
- Floating hearts animation
- Scalloped decorative borders

**User Can Customize**:
```javascript
{
  greeting: "Hey Cutiepie",              // Main heading (50 chars max)
  subtext: "This Valentine, I made...",  // Subtitle (100 chars max)
  mainImage: [Upload File],              // Character image (panda/custom)
  buttonText: "Next"                     // Button label (20 chars max)
}
```

**Editing Interface**:
```
┌─────────────────────────────────────┐
│ Page 1: Greeting                    │
├─────────────────────────────────────┤
│ Greeting Text:                      │
│ [Hey Cutiepie____________] 13/50    │
│                                     │
│ Subtitle:                           │
│ [This Valentine, I made...] 28/100  │
│                                     │
│ Character Image:                    │
│ [📷 Upload] [Current: panda.jpg]    │
│                                     │
│ Button Text:                        │
│ [Next_____________] 4/20            │
│                                     │
│ [← Back] [Preview] [Next →]        │
└─────────────────────────────────────┘
```

---

### 💝 Page 2: Why You? (Heart Grid)

**Visual Design**:
- 4 heart-shaped cards in 2x2 grid
- Each heart has different color
- 3D flip animation on tap
- Wavy background decorations

**User Can Customize**:
```javascript
{
  heading: "Why you?",                   // Main heading (30 chars max)
  reason1: "Because of your smile",      // Heart 1 text (100 chars max)
  reason2: "You make me laugh",          // Heart 2 text (100 chars max)
  reason3: "You are my best friend",     // Heart 3 text (100 chars max)
  reason4: "Your kind heart"             // Heart 4 text (100 chars max)
}
```

**Editing Interface**:
```
┌─────────────────────────────────────┐
│ Page 2: Why You?                    │
├─────────────────────────────────────┤
│ Heading:                            │
│ [Why you?_________] 9/30            │
│                                     │
│ Reason 1 (Pink Heart):              │
│ [Because of your smile___] 22/100   │
│                                     │
│ Reason 2 (Orange Heart):            │
│ [You make me laugh_______] 18/100   │
│                                     │
│ Reason 3 (Pink Heart):              │
│ [You are my best friend__] 23/100   │
│                                     │
│ Reason 4 (Purple Heart):            │
│ [Your kind heart_________] 15/100   │
│                                     │
│ [← Back] [Preview] [Next →]        │
└─────────────────────────────────────┘
```

---

### 📸 Page 3: Memories (Polaroid Gallery)

**Visual Design**:
- Large polaroid frame (single focus)
- Wavy decorative borders
- Handwritten caption style
- Floating hearts background

**User Can Customize**:
```javascript
{
  heading: "Memories",                   // Main heading (30 chars max)
  photos: [                              // 5-10 images (required: min 5)
    { url: "photo1.jpg", caption: "Our first date" },
    { url: "photo2.jpg", caption: "Beach sunset" },
    { url: "photo3.jpg", caption: "Laughing together" },
    { url: "photo4.jpg", caption: "Your birthday" },
    { url: "photo5.jpg", caption: "Forever moment" },
    // ... up to 10 photos
  ],
  polaroidCaption: "Precious moments..."  // Main caption (50 chars max)
}
```

**Editing Interface**:
```
┌─────────────────────────────────────┐
│ Page 3: Memories                    │
├─────────────────────────────────────┤
│ Heading:                            │
│ [Memories_____________] 8/30        │
│                                     │
│ Upload Photos (5-10 required):      │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│ │ 📷 │ │ 📷 │ │ 📷 │ │ 📷 │ │ 📷 ││
│ │ 1  │ │ 2  │ │ 3  │ │ 4  │ │ 5  ││
│ └────┘ └────┘ └────┘ └────┘ └────┘│
│ [+ Add More] (5/10 uploaded)        │
│                                     │
│ Photo 1 Caption (optional):         │
│ [Our first date________] 14/50      │
│                                     │
│ Photo 2 Caption (optional):         │
│ [Beach sunset__________] 12/50      │
│                                     │
│ ... (captions for each photo)       │
│                                     │
│ Polaroid Caption:                   │
│ [Precious moments...___] 18/50      │
│                                     │
│ [← Back] [Preview] [Next →]        │
└─────────────────────────────────────┘
```

---

### ❓ Page 4: The Question (Interactive Game)

**Visual Design**:
- Scalloped top/bottom borders
- Cute character (cat) with heart
- Two buttons (Yes / Not Sure)
- Floating hearts decoration

**User Can Customize**:
```javascript
{
  question: "Will you be my Valentine?", // Main question (60 chars max)
  characterImage: [Upload File],         // Character image (cat/custom)
  yesText: "YES!",                       // Yes button (20 chars max)
  notSureText: "Not Sure",               // Alt button (20 chars max)
  pleaseText: "Please say yes! 💖"      // Plea text (50 chars max)
}
```

**Interactive Behavior**:
- Click "YES!" → Confetti explosion → Next page
- Click "Not Sure" → Button shrinks and fades
- After 3 clicks → Only "YES!" remains

**Editing Interface**:
```
┌─────────────────────────────────────┐
│ Page 4: The Question                │
├─────────────────────────────────────┤
│ Question:                           │
│ [Will you be my Valentine?] 26/60   │
│                                     │
│ Character Image:                    │
│ [📷 Upload] [Current: cat.jpg]      │
│                                     │
│ Yes Button Text:                    │
│ [YES!______________] 4/20           │
│                                     │
│ Not Sure Button Text:               │
│ [Not Sure__________] 8/20           │
│                                     │
│ Please Text:                        │
│ [Please say yes! 💖_] 19/50        │
│                                     │
│ [← Back] [Preview] [Next →]        │
└─────────────────────────────────────┘
```

---

### 🎉 Page 5: Final Message (Celebration)

**Visual Design**:
- Confetti animation
- Character with heart (bear)
- Handwritten letter style
- Share buttons at bottom

**User Can Customize**:
```javascript
{
  mainHeading: "Happy Valentine's Day!", // Main heading (50 chars max)
  characterImage: [Upload File],         // Character image (bear/custom)
  loveMessage: `                         // Long message (500 chars max)
    Every moment with you feels like a beautiful dream.
    You make my heart skip a beat and my world a lot brighter.
    Thank you for being the most incredible person in my life.
    I love you more than words can say!
  `,
  signature: "Yours Forever",            // Signature (30 chars max)
  shareButtonText: "Share My Love",      // Share button (30 chars max)
  backButtonText: "Back to Start"        // Back button (30 chars max)
}
```

**Editing Interface**:
```
┌─────────────────────────────────────┐
│ Page 5: Final Message               │
├─────────────────────────────────────┤
│ Main Heading:                       │
│ [Happy Valentine's Day!] 23/50      │
│                                     │
│ Character Image:                    │
│ [📷 Upload] [Current: bear.jpg]     │
│                                     │
│ Love Message (500 chars max):       │
│ ┌─────────────────────────────────┐ │
│ │Every moment with you feels like │ │
│ │a beautiful dream. You make my   │ │
│ │heart skip a beat and my world   │ │
│ │a lot brighter...                │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ 234/500 characters                  │
│                                     │
│ Signature:                          │
│ [Yours Forever_________] 13/30      │
│                                     │
│ Share Button Text:                  │
│ [Share My Love_________] 14/30      │
│                                     │
│ Back Button Text:                   │
│ [Back to Start_________] 14/30      │
│                                     │
│ [← Back] [Preview] [✓ Complete]    │
└─────────────────────────────────────┘
```

---

## Complete User Journey

### 1. Purchase Template
```
User browses templates → Clicks "Romantic Valentine's Journey"
→ Sees demo video + preview images → Clicks "Create This Gift Now"
→ Completes payment → Admin approves → User gets access
```

### 2. Customize Template
```
User Dashboard → "Create Gift" → Opens Editor

Progress Tracker:
┌──────────────────────────────────┐
│ ⏸️ Page 1: Greeting       0%    │
│ ⏸️ Page 2: Why You?       0%    │
│ ⏸️ Page 3: Memories       0%    │
│ ⏸️ Page 4: The Question   0%    │
│ ⏸️ Page 5: Final Message  0%    │
│                                  │
│ Overall Progress: 0%             │
└──────────────────────────────────┘

After completing all pages:
┌──────────────────────────────────┐
│ ✅ Page 1: Greeting      100%    │
│ ✅ Page 2: Why You?      100%    │
│ ✅ Page 3: Memories      100%    │
│ ✅ Page 4: The Question  100%    │
│ ✅ Page 5: Final Message 100%    │
│                                  │
│ Overall Progress: 100%           │
│                                  │
│ [🎁 Generate Link]               │
└──────────────────────────────────┘
```

### 3. Share Gift
```
Click "Generate Link" → Unique URL created:
https://your-site.com/gift/abc123-def456-ghi789

Share options:
- 📱 WhatsApp
- 📧 Email
- 💬 SMS
- 📋 Copy Link
- 📱 QR Code
```

### 4. Recipient Views Gift
```
Recipient opens link → Loading animation (2s)
→ Page 1 displays → Tap "Next"
→ Page 2 displays → Tap hearts to flip
→ Page 3 displays → Swipe through photos
→ Page 4 displays → Click "YES!" → Confetti!
→ Page 5 displays → Read message → Share

No login required!
Mobile-optimized!
All animations work!
```

---

## Technical Specifications

### Image Requirements:
- **Character Images**: 400x400px minimum, PNG/JPG
- **Memory Photos**: 800x600px minimum, JPG/PNG
- **Max file size**: 5MB per image
- **Formats**: JPG, PNG, WebP

### Text Limits:
- **Short text** (headings, buttons): 20-50 chars
- **Medium text** (reasons, captions): 50-100 chars
- **Long text** (love message): 500 chars

### Supported Features:
- ✅ Text editing with character counters
- ✅ Image upload with preview
- ✅ Drag & drop photo reordering
- ✅ Auto-save every 30 seconds
- ✅ Real-time preview
- ✅ Mobile responsive
- ✅ Share via multiple channels

---

## Default Values (Pre-filled)

When user starts customizing, these defaults are provided:

```javascript
{
  // Page 1
  greeting: "Hey Cutiepie",
  subtext: "This Valentine, I made something special for you",
  buttonText: "Next",
  
  // Page 2
  heading: "Why you?",
  reason1: "Because of your smile",
  reason2: "You make me laugh",
  reason3: "You are my best friend",
  reason4: "Your kind heart",
  
  // Page 3
  heading: "Memories",
  polaroidCaption: "Precious moments...",
  
  // Page 4
  question: "Will you be my Valentine?",
  yesText: "YES!",
  notSureText: "Not Sure",
  pleaseText: "Please say yes! 💖",
  
  // Page 5
  mainHeading: "Happy Valentine's Day!",
  loveMessage: "Every moment with you feels like a beautiful dream...",
  signature: "Yours Forever",
  shareButtonText: "Share My Love",
  backButtonText: "Back to Start"
}
```

Users can edit any of these to personalize their gift!

---

**This template provides a complete, professional Valentine's Day gift experience that users can customize in under 10 minutes!** 💖
