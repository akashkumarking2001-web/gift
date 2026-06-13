# 🎁 COMPLETE MASTER DEVELOPMENT BRIEF
## Interactive Emotional Gift Template Marketplace - Full Specification

---

**Project Name:** Interactive Emotional Gift Template Marketplace  
**Project Type:** Full-Stack SaaS Web Application  
**Document Version:** 1.0 Final  
**Date:** February 9, 2026  
**Estimated Development Time:** 6-8 weeks (Full Platform)

---

## 📋 TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [Product Vision & Market](#product-vision)
3. [Complete Design System](#design-system)
4. [Technical Architecture](#technical-architecture)
5. [Core Features Specification](#core-features)
6. [All 19 Template Breakdowns](#template-breakdowns)
7. [Database Schema](#database-schema)
8. [User Journeys](#user-journeys)
9. [Admin Panel](#admin-panel)
10. [Implementation Roadmap](#implementation-roadmap)

---

<a name="executive-summary"></a>
## 1. EXECUTIVE SUMMARY

### 1.1 What We're Building

A premium web-based SaaS platform where users can purchase, customize, and share interactive digital gift templates. Each template is a multi-page immersive experience featuring animations, games, photo galleries, and personalized messages, optimized for mobile sharing via WhatsApp and social media.

### 1.2 Core Value Proposition

**For Gifters:**
- Create stunning, personalized digital gifts without design skills
- Professional templates for every occasion
- Easy-to-use page-by-page editor
- Shareable links that work perfectly on mobile

**For Recipients:**
- Memorable, interactive experiences on their phones
- Beautifully designed, emotion-evoking content
- No app download required
- Works on any device

**For Business:**
- Scalable SaaS model with minimal operational overhead
- Manual payment verification (low risk)
- High-margin digital product
- Viral sharing potential

### 1.3 Business Model

**Launch Offer:** Valentine's Special - 3 Templates for ₹99 (Regular: ₹1,500)

**Revenue Streams:**
1. Individual template sales (₹50-₹299)
2. Bundle packages (Special occasions)
3. Category bundles (All Birthday templates, etc.)
4. Future: Subscription model (₹299/month - unlimited access)

**Payment Method:** UPI (Manual Verification)
- User makes payment via UPI app
- Submits transaction ID
- Admin manually verifies and approves
- Account activated within 2 hours

### 1.4 Success Metrics (MVP)

- 100 paying users in first month
- 500+ gifts created
- 70%+ purchase completion rate
- < 5% refund rate
- 4.5+ star rating (user feedback)

---

<a name="product-vision"></a>
## 2. PRODUCT VISION & MARKET

### 2.1 Target Market

**Primary Audience:**
- Age: 18-35 years
- Relationship status: In relationships, close friendships
- Tech-savvy, comfortable with digital gifting
- Geography: Initially India, expandable globally
- Income: Middle class and above
- Mobile-first users (WhatsApp primary communication)

**Use Cases:**
- Valentine's Day expressions
- Birthday surprises
- Anniversary celebrations
- Apologies and reconciliations
- Friendship appreciation
- Special announcements (pregnancy, achievements)
- Thank you messages

### 2.2 Market Opportunity

**Problem We Solve:**
- Generic greeting cards feel impersonal
- Creating custom content requires design skills
- Physical gifts have delivery limitations
- Expensive custom designs not accessible to everyone

**Our Solution:**
- Professional templates anyone can customize
- Interactive experiences (not just static images)
- Instant sharing via link (no shipping)
- Affordable pricing (₹99 bundle vs ₹1000+ custom design)

### 2.3 Competitive Advantage

- **Interactive:** Games, animations, real-time countdowns (not just static)
- **Mobile-Optimized:** Built specifically for WhatsApp sharing
- **Easy Customization:** Page-by-page editor (10 minutes to create)
- **Premium Design:** Glassmorphism, soft pastels, romantic aesthetic
- **No Technical Skills:** Anyone can create professional results

---

<a name="design-system"></a>
## 3. COMPLETE DESIGN SYSTEM

### 3.1 Design Philosophy

**Core Principle:** Create a high-end, premium aesthetic using a Soft Pink & Pastel Theme. The design must feel emotional, realistic, and highly attractive.

**Key Elements:**
- 3D Glassmorphism (modern, premium feel)
- Soft shadows and blurs (gentle, romantic)
- Micro-animations (pulsing hearts, floating elements)
- Wavy borders (signature style)
- Grid paper pattern (subtle texture)

### 3.2 Color Palette

```css
/* Primary Colors */
--primary-pink: #FF69B4;          /* Hot Pink - Primary actions */
--soft-pink: #FFB6C1;             /* Light Pink - Backgrounds */
--pastel-purple: #D8BFD8;         /* Lavender - Accents */
--pastel-blue: #B0E0E6;           /* Sky Blue - Secondary elements */
--pastel-yellow: #FFFACD;         /* Soft Yellow - Highlights */
--pastel-green: #98FB98;          /* Mint Green - Success states */

/* Background Colors */
--bg-dark: #1a1a2e;               /* Deep Navy - Primary BG */
--bg-gradient-start: #2d1b3d;     /* Purple-Black - Gradient start */
--bg-gradient-end: #0f0f1e;       /* Deep Black - Gradient end */

/* Text Colors */
--text-primary: #FFFFFF;          /* White - Main text */
--text-secondary: #FFB6C1;        /* Pink - Secondary text */
--text-muted: #B8B8C8;            /* Gray - Subtle text */

/* Glassmorphism */
--glass-bg: rgba(255, 255, 255, 0.08);
--glass-border: rgba(255, 255, 255, 0.18);
--glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);

/* Semantic Colors */
--success: #90EE90;               /* Light Green */
--error: #FF6B6B;                 /* Soft Red */
--warning: #FFD93D;               /* Golden Yellow */
--info: #6C63FF;                  /* Soft Purple */
```

### 3.3 Typography System

**Font Families:**
```css
--font-primary: 'Poppins', 'Inter', -apple-system, sans-serif;
--font-accent: 'Pacifico', 'Satisfy', cursive;  /* Romantic headings */
--font-mono: 'Fira Code', monospace;
```

**Type Scale:**
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px - Main headings */
--text-5xl: 3rem;      /* 48px - Hero text */
```

**Font Weights:**
- Regular: 400 (body text)
- Medium: 500 (sub-headings)
- Semibold: 600 (buttons, emphasis)
- Bold: 700 (main headings)

### 3.4 Spacing & Layout

**Spacing Scale:**
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px - Base unit */
--space-5: 1.5rem;    /* 24px */
--space-6: 2rem;      /* 32px */
--space-8: 3rem;      /* 48px */
--space-10: 4rem;     /* 64px */
--space-12: 6rem;     /* 96px */
```

**Container Widths:**
- Mobile: 100% (with 1rem padding)
- Tablet: 768px max-width
- Desktop: 1200px max-width
- Large Desktop: 1400px max-width

### 3.5 Components & UI Elements

**A. Glassmorphism Cards**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px 0 rgba(31, 38, 135, 0.5);
}
```

**B. Buttons**
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #FF69B4, #FF1493);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 9999px; /* Pill shape */
  font-weight: 600;
  box-shadow: 0 12px 48px rgba(255, 105, 180, 0.18);
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 60px rgba(255, 105, 180, 0.25);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Secondary Button */
.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: var(--primary-pink);
}
```

**C. Input Fields**
```css
.input-field {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.875rem 1.25rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  width: 100%;
}

.input-field:focus {
  border-color: var(--primary-pink);
  box-shadow: 0 0 0 3px rgba(255, 105, 180, 0.1);
  outline: none;
  background: rgba(255, 255, 255, 0.08);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
```

### 3.6 Signature Design Elements

**Wavy Border Effect (SVG Filter):**
```html
<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <filter id="wavy">
      <feTurbulence baseFrequency="0.02" numOctaves="3" result="noise" seed="2"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5"/>
    </filter>
  </defs>
</svg>

<!-- Apply to elements -->
<div class="wavy-border" style="filter: url(#wavy);"></div>
```

**Grid Paper Background:**
```css
.grid-paper-bg {
  background-color: var(--bg-dark);
  background-image:
    linear-gradient(rgba(255, 182, 193, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 182, 193, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### 3.7 Essential Animations

```css
/* Float Animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.float-element {
  animation: float 3s ease-in-out infinite;
}

/* Pulse Heart */
@keyframes pulse-heart {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.pulse-heart {
  animation: pulse-heart 1.2s ease-in-out infinite;
}

/* Fade In Up */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* Gradient Flow */
@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.gradient-animate {
  background-size: 200% 200%;
  animation: gradientFlow 5s ease infinite;
}
```

---

<a name="technical-architecture"></a>
## 4. TECHNICAL ARCHITECTURE

### 4.1 Technology Stack

**Frontend:**
- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS + Custom CSS
- **Animations:** Framer Motion (primary), CSS animations
- **State Management:** Zustand (lightweight)
- **Forms:** React Hook Form + Zod validation
- **Images:** Next/Image + Sharp
- **Icons:** Lucide React
- **Drag & Drop:** @dnd-kit
- **Confetti:** canvas-confetti
- **Characters:** Lottie React
- **Music:** Howler.js
- **QR Code:** qrcode.react
- **Rich Text:** Tiptap
- **Dates:** date-fns

**Backend:**
- **Platform:** Supabase (All-in-one Backend)
  - PostgreSQL Database
  - Authentication (Email/Password)
  - Storage (User photos, template assets)
  - Real-time Subscriptions (Admin panel)
  - Row Level Security (RLS)

**Deployment:**
- **Hosting:** Vercel
- **Domain:** Custom domain with HTTPS
- **CDN:** Vercel Edge Network
- **Analytics:** Vercel Analytics + Google Analytics

### 4.2 URL Structure

```
PUBLIC ROUTES:
/                              Landing page
/templates                      Template gallery
/template/[id]                  Template detail page
/checkout                       Payment page
/login                          Login page
/register                       Registration page
/gift/[uuid]                    Public gift viewer ⭐
/about                          About us
/contact                        Contact/Support

AUTHENTICATED ROUTES:
/dashboard                      User dashboard
/dashboard/templates            My purchased templates
/dashboard/editor/[id]          Template editor ⭐⭐⭐
/dashboard/history              Gift history
/dashboard/account              Account settings
/dashboard/billing              Purchase history

ADMIN ROUTES:
/admin/login                    Admin login
/admin/dashboard                Admin overview
/admin/payments                 Payment approvals ⭐
/admin/users                    User management
/admin/templates                Template CRUD
/admin/analytics                Analytics dashboard

API ROUTES:
/api/auth/register              POST - User registration
/api/auth/login                 POST - User login
/api/templates/list             GET - All templates
/api/templates/[id]             GET - Template details
/api/purchase/create            POST - Create purchase
/api/purchase/verify            POST - Admin verify payment
/api/gifts/create               POST - Create new gift
/api/gifts/update/[id]          PUT - Update gift
/api/gifts/[uuid]               GET - Get gift data
/api/photos/upload              POST - Upload photos
/api/admin/*                    Admin endpoints
```

---

<a name="core-features"></a>
## 5. CORE FEATURES SPECIFICATION

### 5.1 Landing Page (/)

**Layout:**
```
┌──────────────────────────────────────┐
│ Header: [Logo] [Templates] [Login]  │
├──────────────────────────────────────┤
│          HERO SECTION                │
│  💝 Create Unforgettable Digital     │
│     Gift Experiences                 │
│                                      │
│  [ 🎁 Create Your Gift Now → ]      │
│                                      │
│  🎉 Valentine's Special! 🎉         │
│  3 Templates for ₹99                │
│  (Regular: ₹1,500)                  │
├──────────────────────────────────────┤
│         HOW IT WORKS                 │
│  1️⃣ Choose → 2️⃣ Customize → 3️⃣ Share │
├──────────────────────────────────────┤
│      TEMPLATE GALLERY                │
│  [Video 1] [Video 2] [Video 3]      │
│    ₹99       ₹149      ₹199        │
├──────────────────────────────────────┤
│        WHY CHOOSE US                 │
│  ✅ Easy ✅ Mobile ✅ Professional    │
└──────────────────────────────────────┘
```

**Key Features:**
1. Animated gradient background
2. Floating hearts (CSS animation)
3. Animated counters (5000+ Gifts Created)
4. Template cards with video preview on hover
5. Special offer banner (prominent)
6. Smooth scroll animations

### 5.2 Checkout / Payment Page

**Critical Flow:**

1. **Order Summary:**
   - Show selected templates
   - Display original price
   - Show discount
   - Total amount (₹99 for Valentine's Bundle)

2. **User Information:**
   - Full Name (required)
   - Email (required, validated)
   - Mobile (required, 10 digits)
   - Password (required, min 8 chars)
   - Confirm Password (required, must match)

3. **Payment Section:**
   - Display QR Code (scannable)
   - Show UPI ID: `payments@yoursite.upi`
   - Amount: ₹99
   - Instructions: "Scan QR or pay via UPI ID"

4. **Transaction ID Submission:**
   - Input field for 12-digit UTR number
   - Validation (numbers only, 12 digits)
   - Submit button

5. **After Submission:**
   - Create user account (status: pending)
   - Save purchase record (payment_status: pending)
   - Redirect to "Thank You - Pending Approval" page
   - Send confirmation email

### 5.3 Template Editor (MOST CRITICAL FEATURE)

**Editor Layout:**
```
┌──────────┬───────────────────────────────┐
│  PAGES   │      LIVE PREVIEW            │
│  LIST    │      (Mobile View)           │
│          │                              │
│  ✅ P1   │   ┌──────────────┐          │
│  ✅ P2   │   │              │          │
│  🔄 P3   │   │  [Template]  │          │
│  ⏸️ P4   │   │  [Preview]   │          │
│  ⏸️ P5   │   │              │          │
│          │   └──────────────┘          │
│  60%     │                              │
├──────────┴───────────────────────────────┤
│       EDITING PANEL - Page 3            │
│                                         │
│  Heading: [____________] 30/50          │
│  Message: [____________] 100/200        │
│                                         │
│  Photos (4/10):                         │
│  [📷][📷][📷][📷][+][+]                │
│                                         │
│  [← Previous] [Save] [Next →]          │
└─────────────────────────────────────────┘
```

**Core Features:**

**A. Page Navigation (Left Sidebar):**
- List all pages (5-12 pages depending on template)
- Status indicators:
  - ✅ Complete (all required fields filled)
  - 🔄 In Progress (some fields filled)
  - ⏸️ Not Started (no fields filled)
- Progress bar (% complete)
- Click to jump to any page

**B. Live Preview (Center):**
- Mobile-sized container (375px width)
- Real-time rendering as user types
- Can interact with elements
- Desktop/Mobile view toggle
- Fullscreen preview option

**C. Editing Panel (Bottom/Right):**

**For Text Pages:**
```
Heading: [Input field with character limit]
Body: [Textarea with character limit]
Button Text: [Input with character limit]
```

**For Photo Pages:**
```
Upload Photos:
- Drag & drop zone
- Click to browse
- Multiple file selection (1-10 photos)
- Preview thumbnails
- Delete button per photo
- Drag to reorder
- Optional captions
```

**For Interactive Pages:**
```
Question: [Input]
Button 1 Text: [Input]
Button 2 Text: [Input]
Response Messages: [Multiple inputs]
```

**D. Auto-Save:**
- Saves every 30 seconds automatically
- "Saving..." indicator
- "Saved at HH:MM" timestamp
- Manual save button

**E. Generate Link:**
- Button enabled only when 100% complete
- Generates unique UUID
- Creates shareable link
- Shows modal with:
  - Link URL
  - Copy button
  - QR code
  - Share buttons (WhatsApp, Email, SMS)

### 5.4 Public Gift Viewer (/gift/[uuid])

**Critical: No Login Required, Mobile-Optimized**

**Flow:**
1. User opens link
2. Loading screen (2-3 seconds)
3. Template plays page-by-page
4. User can navigate forward/back
5. All interactions work

**Features:**
- No authentication required
- Mobile-optimized (375px-414px width)
- Progressive page loading
- All animations work:
  - Countdown timers tick
  - Buttons clickable
  - Games playable
  - Photos viewable (tap for fullscreen)
  - Confetti triggers
  - Background music toggle

**Controls:**
```
[🔇 Sound] [❤️ Like] Page 3/5 [Share]
```

**Footer:**
- Small branding: "Create your own at YourSite.com"
- Link to landing page

### 5.5 User Dashboard

**After Admin Approval:**

```
┌──────────────────────────────────────┐
│  👋 Welcome back, [Name]!            │
├──────────────────────────────────────┤
│  YOUR TEMPLATES (3)                  │
│                                      │
│  [Template 1]  [Template 2]          │
│  Romantic      Birthday              │
│  [Create Gift] [Create Gift]         │
│                                      │
│  [Template 3]  [+ Buy More]          │
│  Fun Quiz                            │
│  [Create Gift]                       │
├──────────────────────────────────────┤
│  RECENT GIFTS                        │
│                                      │
│  📦 Gift for Sarah (2 days ago)     │
│     🔗 View | 📝 Edit | 🗑️ Delete   │
│     👁️ Viewed 5 times               │
│                                      │
│  💝 Valentine's Gift (1 week ago)   │
│     🔗 View | 📝 Edit | 🗑️ Delete   │
│     👁️ Viewed 12 times              │
└──────────────────────────────────────┘
```

---

<a name="template-breakdowns"></a>
## 6. ALL 19 TEMPLATE BREAKDOWNS

### Template 1: Birthday Countdown Celebration
**Category:** Birthday | **Pages:** 5 | **Price:** ₹149

**Page 1 - Loading (3s auto-advance):**
- Background: Dark gradient
- Icon: Pulsing pink heart
- Text: "Preparing Something Special"
- Editable: Subtext (50 chars max)

**Page 2 - Countdown Timer:**
- Heading: "Birthday Countdown 🎂"
- 4 glassmorphism cards: Days, Hours, Minutes, Seconds
- Real-time JavaScript countdown
- Editable: Heading, Target Date/Time, Bottom text
- Confetti when reaches 00:00:00
- Auto-advances to next page

**Page 3 - Celebration:**
- Full-screen confetti
- 3D gift box animation
- Text: "Time to Celebrate!"
- Button: "🎁 Let's Celebrate! ✨"
- Editable: Main text, Subtext, Button text

**Page 4 - Message Cards:**
- 2 overlapping cards (slight rotation)
- Card 1: Orange-pink gradient, message
- Card 2: Pink, "I remember everything..."
- Editable: Both card texts

**Page 5 - Photo Gallery:**
- Heading: "Precious Memories"
- Polaroid-style frames with wavy borders
- Grid: 2 cols mobile, 3 cols desktop
- Upload: 1-10 photos (required: at least 1)
- Captions per photo (optional)
- Click → fullscreen lightbox

---

### Template 2: Valentine's Interactive Question
**Category:** Valentine's | **Pages:** 4 | **Price:** ₹149

**Page 1 - Entry:**
- Falling hearts animation (20-30 particles)
- 3D rotating heart (center)
- Text: "Hey Beautiful..."
- Subtext: "I have a question for you..."
- Button: "Continue"
- Editable: Greeting, Subtext

**Page 2 - The Question (GAME):**
- Heading: "Will You Be My Valentine?"
- Heart emoji: 💝
- Two buttons: "Yes! ❤️" and "No 💔"

**Interactive Logic:**
- Click "Yes" → Confetti → Next page
- Click "No" → Button moves randomly
- "No" text changes (10 different messages):
  1. "Are you sure? 🥺"
  2. "Think again... 💭"
  ... (customizable)
  10. After 10 clicks → "No" disappears

- Editable: Question, Both button texts, 10 "No" responses

**Page 3 - Celebration:**
- Massive confetti explosion (500+ particles)
- Text: "Yayyy! 🎉"
- 3D heart grows from center
- Subtext: "I knew you'd say yes!"
- Auto-advances after 3 seconds

**Page 4 - Love Letter:**
- Handwritten letter style
- Paper texture background
- "Dear [Name],"
- Long message (1000 chars max, rich text)
- "Love, [Your Name]"
- Decorative hearts
- Editable: Recipient name, Message, Sender name

---

### Template 3: Love Slider
**Category:** Valentine's/Anniversary | **Pages:** 3 | **Price:** ₹99

**Page 1 - Build-up:**
- Sequential text animation (4.5s total):
  - "Do you know..." (fade in/out)
  - "How much..." (fade in/out)
  - "I love you?" (fade in, stay)
- Background color transitions
- Floating hearts
- Auto-advances

**Page 2 - Interactive Slider:**
- Heading: "Let me show you..."
- Large horizontal slider (0% to ∞)
- Heart icon thumb
- Display text updates as user slides:
  - 0-25%: "I love you"
  - 26-50%: "I love you so much"
  - 51-75%: "I love you to the moon"
  - 76-99%: "I love you to the stars"
  - 100%: "I love you to INFINITY! ♾️💗"
- Confetti at 100%
- "Continue" button unlocks at 100%
- Editable: Heading, 5 slider messages

**Page 3 - Final Message:**
- Infinity symbol ♾️ (animated)
- Heading: "My love for you has no limits"
- Body message (500 chars)
- Gradient background animation
- Floating particles

---

### Template 4: 5 Things I Love About You
**Category:** Valentine's/Anniversary | **Pages:** 3 | **Price:** ₹99

**Page 1 - Intro:**
- Header: "There are so many reasons..."
- Subtext: "But here are my favorite 5 ❤️"
- Animated heart
- Button: "Tap to continue"

**Page 2 - Flip Cards:**
- 5 glassmorphism cards (can be 3, 5, or 10)
- Front: Number + heart icon
- Back: Reason + emoji
- Tap to flip (3D flip animation)
- 5 editable reasons (100 chars each):
  1. "Your smile brightens my days ☀️"
  2. "The way you laugh makes everything better 😊"
  3. "Your kindness touches everyone 🌸"
  4. "You make me want to be better 🌟"
  5. "Every moment with you is a treasure 💎"

**Page 3 - Conclusion:**
- Header: "And that's just the beginning..."
- Final message (500 chars)
- Decorative hearts and stars

---

### Template 5: Panda Character Love
**Category:** Valentine's (Cute) | **Pages:** 4 | **Price:** ₹99

**Page 1 - Character Intro:**
- Animated panda (Lottie/SVG)
- Panda waves
- Speech bubble: "Hey cutie! 🐼"
- Text: "I made something for you..."
- Button: "Open it! 🎁"
- Editable: Greeting, Speech bubble

**Page 2 - Gift Box:**
- 3D gift box (closed)
- Shaking animation
- Text: "Tap to open your surprise!"
- Tap → Box opens, confetti
- Reveal: "A special message for you!"
- "Read it" button

**Page 3 - Character with Rose:**
- Panda holding rose
- Speech bubble: Custom message (300 chars)
- Background: Floating hearts
- Character bounce animation
- Configurable: Character (Panda/Bear/Cat), Rose color

**Page 4 - Final Question:**
- "Will you be mine forever?"
- Two buttons (both say yes):
  - "Yes! 💕"
  - "Of course! 💗"
- Both → celebration + heart explosion

---

### Templates 6-19: Summary

**Template 6:** Anniversary Counter - Timeline + counting days together  
**Template 7:** Birthday Cake & Candles - Virtual cake game + balloon pop  
**Template 8:** Apology - Can We Talk - Sad panda + 3 reasons  
**Template 9:** Peace Treaty - Swipe away mistakes + virtual hug  
**Template 10:** Cuteness Scanner - 120% meter + report card  
**Template 11:** Soulmate Matcher - 100% match + reasons  
**Template 12:** New Year - Year transition + golden ticket  
**Template 13:** Friendship Memory Game - Card matching + photo album  
**Template 14:** Valentine's Purple - Alternative color scheme  
**Template 15:** Extended Birthday - 6 pages, most complex  
**Template 16:** Love Story Timeline - Interactive map + milestones  
**Template 17:** Memory Scrapbook Vol 1 - 10+ pages, up to 50 photos  
**Template 18:** Memory Scrapbook Vol 2 - Minimalist, B&W option  
**Template 19:** Message in a Bottle - Simple, elegant, 3 pages  

*Full detailed breakdowns available in Supplementary Requirements document.*

---

<a name="database-schema"></a>
## 7. DATABASE SCHEMA

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Templates table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  preview_video_url TEXT,
  thumbnail_url TEXT,
  page_count INTEGER NOT NULL,
  price_inr INTEGER NOT NULL,
  sale_price_inr INTEGER,
  is_active BOOLEAN DEFAULT true,
  page_config JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  transaction_id VARCHAR(255) UNIQUE NOT NULL,
  amount_inr INTEGER NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  templates_included JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  verified_at TIMESTAMP,
  verified_by UUID
);

-- User templates (access rights)
CREATE TABLE user_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  template_id UUID REFERENCES templates(id),
  purchase_id UUID REFERENCES purchases(id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, template_id)
);

-- Gifts table
CREATE TABLE gifts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  template_id UUID REFERENCES templates(id),
  gift_uuid VARCHAR(36) UNIQUE NOT NULL,
  gift_name VARCHAR(255) DEFAULT 'My Gift',
  gift_data JSONB NOT NULL,
  recipient_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  view_count INTEGER DEFAULT 0
);

-- Gift photos table
CREATE TABLE gift_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  gift_id UUID REFERENCES gifts(id) ON DELETE CASCADE,
  page_number INTEGER NOT NULL,
  photo_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_purchases_user ON purchases(user_id);
CREATE INDEX idx_gifts_uuid ON gifts(gift_uuid);
CREATE INDEX idx_gift_photos_gift ON gift_photos(gift_id);
```

---

<a name="user-journeys"></a>
## 8. USER JOURNEYS

### 8.1 Complete New User Journey

**Step 1: Discovery**
- User lands on homepage
- Sees hero + special offer (3 for ₹99)
- Scrolls through template gallery
- Hovers to see video previews

**Step 2: Exploration**
- Clicks template for details
- Watches full preview video
- Reads features and reviews
- Decides to purchase bundle

**Step 3: Checkout**
- Fills registration form
- Sees QR code + UPI ID
- Makes payment via UPI app
- Enters transaction ID
- Submits

**Step 4: Pending**
- Account created (status: pending)
- Receives confirmation email
- Waits for admin approval

**Step 5: Approval**
- Admin verifies payment
- Clicks "Approve"
- User receives approval email
- Can now login

**Step 6: First Login**
- Logs in with credentials
- Sees dashboard with 3 templates
- Clicks "Create Gift"

**Step 7: Create Gift**
- Opens editor
- Goes through pages 1-5
- Edits text, uploads photos
- Auto-save working
- Previews result

**Step 8: Generate Link**
- All pages complete (✅)
- Clicks "Generate Link"
- UUID created
- Link shown with QR code
- Copies link

**Step 9: Share**
- Shares via WhatsApp
- Recipient opens link
- Template plays beautifully
- Recipient impressed! 🎉

---

<a name="admin-panel"></a>
## 9. ADMIN PANEL

### 9.1 Admin Dashboard

**Overview:**
- Total Revenue (Today, This Week, All Time)
- Active Users count
- Gifts Created (Today, This Week)
- Pending Payments count
- Charts (Revenue over time)

### 9.2 Payment Approvals (CRITICAL)

**Table Columns:**
- Date
- User (Name, Email, Mobile)
- Transaction ID
- Amount
- Templates Included
- Status (Pending/Verified/Rejected)
- Actions

**Actions:**
1. **Approve:**
   - Update payment status → verified
   - Update user status → approved
   - Grant template access
   - Send approval email
   - Show success notification

2. **Reject:**
   - Update payment status → rejected
   - Add rejection reason
   - Send rejection email
   - Show notification

**Real-time Updates:**
- Supabase subscription to purchases table
- New payment notification in admin panel
- Sound alert (optional)

### 9.3 Other Admin Pages

**Users Management:**
- List all users
- Filter by status
- Search by email/name
- View user's gifts
- Manual status change

**Templates Management:**
- List all templates
- Add new template (JSON config)
- Edit template details
- Toggle active/inactive
- View sales stats

**Analytics:**
- Template popularity
- User behavior metrics
- Conversion funnel
- Error logs

---

<a name="implementation-roadmap"></a>
## 10. IMPLEMENTATION ROADMAP

### Week 1: Foundation
- Setup Next.js + Supabase
- Create design system
- Database schema
- Auth system
- Core UI components

### Week 2: Public Pages
- Landing page
- Template detail page
- Checkout page
- Login/Register

### Week 3: First 5 Templates
- Template 1: Birthday Countdown
- Template 2: Valentine's Question
- Template 3: Love Slider
- Template 4: 5 Things
- Template 5: Panda Character

### Week 4: Editor System
- Editor layout
- Page navigation
- Editing panels
- Auto-save
- Photo upload

### Week 5: Gift Viewer & Link
- Link generation
- Public viewer
- All interactions working
- Performance optimization

### Week 6: Remaining 14 Templates
- Templates 6-19 implementation
- Reuse components
- Test all templates

### Week 7: Admin Panel
- Admin auth
- Payment approvals
- User management
- Dashboard analytics

### Week 8: Testing & Launch
- Comprehensive testing
- Bug fixes
- Polish animations
- Deploy to production
- Monitor and support

---

## ✅ SUCCESS CRITERIA

The platform is successful when:
- ✅ Users can purchase in < 3 minutes
- ✅ Users can create gift in < 10 minutes
- ✅ Recipients have delightful mobile experience
- ✅ Admin can approve payments in < 2 minutes
- ✅ 90%+ of gifts load in < 3 seconds
- ✅ No critical bugs
- ✅ Smooth 60fps animations

---

**END OF COMPLETE MASTER DEVELOPMENT BRIEF**

This document provides the complete specification for building the Interactive Emotional Gift Template Marketplace. Use in conjunction with the Supplementary Requirements document for technical implementation details.

**For AI Developer:** Read both documents fully before starting. Follow the 8-week roadmap. Test frequently. Build something amazing! 🚀💝
