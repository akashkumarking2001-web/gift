# Valentine's Day Template Implementation Plan

## Overview
Creating a premium Valentine's Day interactive template based on the provided 5-page design with full customization capabilities.

## Template Structure

### Template ID: 20
- **Slug**: `romantic-valentines-journey`
- **Title**: Romantic Valentine's Journey
- **Category**: Valentine's
- **Price**: ₹199
- **Original Price**: ₹1999
- **Tag**: Premium
- **Icon**: 💖
- **Color**: from-pink-500 via-rose-500 to-red-600

### Pages Breakdown

#### Page 1: Greeting (Polaroid Card)
- **Type**: `character`
- **Title**: Hey Cutiepie
- **Required Fields**:
  - `greeting`: "Hey Cutiepie" (editable)
  - `subtext`: "This Valentine, I made something special for you" (editable)
  - `mainImage`: Panda/character image (uploadable)
  - `buttonText`: "Next" (editable)

#### Page 2: Why You? (Heart Grid)
- **Type**: `flip-cards`
- **Title**: Why You?
- **Required Fields**:
  - `heading`: "Why you?" (editable)
  - `reason1`: "Because of your smile" (editable)
  - `reason2`: "You make me laugh" (editable)
  - `reason3`: "You are my best friend" (editable)
  - `reason4`: "Your kind heart" (editable)
  - `heartColor1`: #f04299 (customizable)
  - `heartColor2`: #fb923c (customizable)
  - `heartColor3`: #a855f7 (customizable)

#### Page 3: Memories (Polaroid Gallery)
- **Type**: `photo`
- **Title**: Memories
- **Required Fields**:
  - `heading`: "Memories" (editable)
  - `photos`: Array of 5-10 images (uploadable)
  - `captions`: Optional captions per photo (editable)
  - `polaroidCaption`: "Precious moments..." (editable)

#### Page 4: The Question (Interactive Game)
- **Type**: `game`
- **Title**: Will You Be My Valentine?
- **Required Fields**:
  - `question`: "Will you be my Valentine?" (editable)
  - `characterImage`: Cat/character image (uploadable)
  - `yesText`: "YES!" (editable)
  - `notSureText`: "Not Sure" (editable)
  - `pleaseText`: "Please say yes! 💖" (editable)
- **Config**: 
  - `gameType`: 'valentine-question'
  - `noButtonBehavior`: 'shrink-and-hide'

#### Page 5: Final Message (Celebration)
- **Type**: `celebration`
- **Title**: Happy Valentine's Day!
- **Required Fields**:
  - `mainHeading`: "Happy Valentine's Day!" (editable)
  - `characterImage`: Bear with heart (uploadable)
  - `loveMessage`: Long personalized message (editable, 500 chars)
  - `signature`: "Yours Forever" (editable)
  - `shareButtonText`: "Share My Love" (editable)
  - `backButtonText`: "Back to Start" (editable)

## Database Schema Updates

### Templates Table - Add Media Fields
```sql
ALTER TABLE templates ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE templates ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE templates ADD COLUMN IF NOT EXISTS demo_video_url TEXT;
ALTER TABLE templates ADD COLUMN IF NOT EXISTS preview_images JSONB DEFAULT '[]';
```

### Template Media Table (New)
```sql
CREATE TABLE IF NOT EXISTS template_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id INTEGER REFERENCES templates(id),
  media_type VARCHAR(50) NOT NULL, -- 'thumbnail', 'cover', 'demo_video', 'preview_image'
  media_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_template_media_template ON template_media(template_id);
```

## Admin Panel Enhancements

### Template Edit Modal - New Fields
1. **Thumbnail/Cover Image**
   - Upload button
   - Preview
   - URL input (fallback)

2. **Demo Video**
   - Upload button (MP4, max 50MB)
   - URL input
   - Preview player

3. **Preview Images** (4-5 images)
   - Multi-upload
   - Drag to reorder
   - Delete individual images
   - Preview thumbnails

### File Upload Service
```typescript
// lib/uploadService.ts
export const UploadService = {
  async uploadTemplateMedia(
    templateId: number,
    file: File,
    mediaType: 'thumbnail' | 'cover' | 'demo_video' | 'preview_image'
  ): Promise<string> {
    // Upload to Supabase Storage
    // Return public URL
  },
  
  async deleteTemplateMedia(url: string): Promise<void> {
    // Delete from Supabase Storage
  }
}
```

## Customization Panel Features

### User Customization Interface
When user edits this template, they see:

**Page 1 - Greeting**
- Text input: Greeting
- Text input: Subtext
- Image upload: Main character image
- Text input: Button text

**Page 2 - Why You**
- Text input: Heading
- 4x Text inputs: Reasons (with character counter)
- Color pickers: Heart colors (optional)

**Page 3 - Memories**
- Text input: Heading
- Multi-image upload: 5-10 photos
- Text inputs: Captions (one per photo, optional)
- Text input: Polaroid caption

**Page 4 - The Question**
- Text input: Question
- Image upload: Character image
- Text input: Yes button text
- Text input: Not sure button text
- Text input: Please text

**Page 5 - Final Message**
- Text input: Main heading
- Image upload: Character image
- Textarea: Love message (500 chars)
- Text input: Signature
- Text input: Share button text
- Text input: Back button text

## Implementation Files

### 1. Template Definition
File: `src/lib/templates.ts`
- Add Template 20 definition
- Define all pages and required fields

### 2. Template Components
Files to create:
- `src/components/templates/valentine-journey/Page1Greeting.tsx`
- `src/components/templates/valentine-journey/Page2WhyYou.tsx`
- `src/components/templates/valentine-journey/Page3Memories.tsx`
- `src/components/templates/valentine-journey/Page4Question.tsx`
- `src/components/templates/valentine-journey/Page5Final.tsx`

### 3. Template Renderer
File: `src/components/templates/TemplateRenderer.tsx`
- Add cases for new page types
- Handle valentine-specific interactions

### 4. Admin Panel Updates
File: `src/pages/AdminDashboard.tsx`
- Add media upload fields to edit modal
- Implement file upload handlers
- Add preview functionality

### 5. Template Details Page
File: `src/pages/TemplateDetails.tsx`
- Display demo video
- Display preview images (4-5 images)
- Use template media from database

## Sample Valentine Images

### Placeholder Images to Add
1. **Panda with heart gift** - Page 1
2. **Cute cat with heart** - Page 4
3. **Bear hugging heart** - Page 5
4. **Valentine's Day themed photos** (5-10 samples for memories section):
   - Couple holding hands
   - Heart-shaped balloons
   - Romantic dinner
   - Sunset together
   - Gift exchange
   - Flowers bouquet
   - Love letter
   - Chocolate hearts
   - Candlelight
   - Dancing couple

## Testing Checklist

- [ ] Template appears in admin panel
- [ ] Can edit title, price, category
- [ ] Can upload thumbnail image
- [ ] Can upload demo video
- [ ] Can upload 4-5 preview images
- [ ] Changes reflect on template details page
- [ ] User can customize all text fields
- [ ] User can upload 5-10 memory photos
- [ ] User can upload character images
- [ ] All pages render correctly
- [ ] Animations work smoothly
- [ ] Interactive elements respond
- [ ] Mobile responsive
- [ ] Link generation works
- [ ] Public gift viewer displays correctly

## Next Steps

1. ✅ Create implementation plan (this document)
2. ⏳ Update database schema
3. ⏳ Add template definition to templates.ts
4. ⏳ Create 5 page components
5. ⏳ Update admin panel with media upload
6. ⏳ Update template details page
7. ⏳ Add sample Valentine images
8. ⏳ Test full flow
9. ⏳ Deploy and verify

## Notes

- All text must be editable
- All images must be uploadable
- Maintain the exact design aesthetic from provided HTML
- Use Tailwind CSS classes from the original designs
- Preserve all animations and interactions
- Ensure mobile-first responsive design
- Follow the existing template pattern in the codebase
