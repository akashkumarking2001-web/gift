# QR Code Generation Feature - Implementation Plan

## Overview
Implement QR code generation with two options:
1. **Standard QR Code** - Clean, traditional QR code
2. **AI Artistic QR Code** - QR code integrated into user's uploaded photo

## Features

### 1. Link Generation
- Unique URL for each completed gift
- Format: `https://your-domain.com/gift/{unique-id}`
- Shareable via multiple channels

### 2. Standard QR Code
- Clean, scannable QR code
- Downloadable as PNG
- Customizable size and colors
- Error correction level: High

### 3. AI Artistic QR Code
- User uploads a photo
- AI generates QR code integrated into the photo
- Maintains scannability
- Artistic and visually appealing
- Downloadable as high-res image

## Technical Implementation

### Libraries Needed
1. `qrcode` - Standard QR code generation
2. `qrcode-styled` - Styled QR codes
3. AI QR Code API (options):
   - Hugging Face API (Stable Diffusion + ControlNet)
   - QR Code Monster API
   - Custom implementation with Canvas API

### Database Schema
```sql
-- Add to gifts table
ALTER TABLE gifts ADD COLUMN unique_link_id VARCHAR(255) UNIQUE;
ALTER TABLE gifts ADD COLUMN qr_code_url TEXT;
ALTER TABLE gifts ADD COLUMN ai_qr_code_url TEXT;
ALTER TABLE gifts ADD COLUMN ai_qr_source_image TEXT;
```

### API Endpoints
1. `POST /api/generate-link` - Generate unique link
2. `POST /api/generate-qr` - Generate standard QR
3. `POST /api/generate-ai-qr` - Generate AI artistic QR
4. `GET /gift/:id` - Public gift viewer

## Implementation Steps

### Phase 1: Standard QR Code (Immediate)
1. Install dependencies
2. Create QR generation service
3. Add download functionality
4. Integrate into gift completion flow

### Phase 2: AI Artistic QR Code (Advanced)
1. Set up AI service (Hugging Face or custom)
2. Create image upload component
3. Implement AI QR generation
4. Add preview and download

### Phase 3: UI/UX
1. Share modal with options
2. QR code preview
3. Download buttons
4. Social sharing integration

## Files to Create
1. `src/lib/qrCodeService.ts` - QR generation logic
2. `src/lib/aiQrService.ts` - AI QR generation
3. `src/components/ShareModal.tsx` - Share UI
4. `src/components/QRCodeGenerator.tsx` - QR display
5. `src/components/AIQRCodeGenerator.tsx` - AI QR UI
6. `src/api/generate-link.ts` - Link generation API
7. `src/api/generate-ai-qr.ts` - AI QR API

## Cost Considerations
- Standard QR: Free (client-side)
- AI QR Code: 
  - Hugging Face: Free tier available
  - QR Code Monster: Paid API
  - Custom: Free but complex

## Recommended Approach
Start with standard QR codes (free, immediate), then add AI QR as premium feature.
