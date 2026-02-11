# Valentine Journey V2 - Integration Guide

## 🎯 Overview

This guide explains how to integrate the Valentine Journey V2 template into your application.

## ✅ What's Already Done

1. ✅ **11 Page Components Created** - All in `src/components/templates/valentine-journey-v2/`
2. ✅ **Template Definition Added** - Added to `src/lib/templates.ts` (ID: 21)
3. ✅ **Renderer Component** - `ValentineJourneyV2Renderer.tsx` created
4. ✅ **Default Data Helper** - `valentineJourneyV2DefaultData.ts` created
5. ✅ **TypeScript Types** - Full type definitions in `types.ts`

## 📁 File Structure

```
src/
├── components/
│   └── templates/
│       ├── valentine-journey-v2/
│       │   ├── Page1Greeting.tsx
│       │   ├── Page2WhyYou.tsx
│       │   ├── Page3Memories.tsx
│       │   ├── Page4Question.tsx
│       │   ├── Page5Celebration.tsx
│       │   ├── Page6LoveStory.tsx
│       │   ├── Page7Timeline.tsx
│       │   ├── Page8PhotoGallery.tsx
│       │   ├── Page9FinalMessage.tsx
│       │   ├── Page10Signature.tsx
│       │   ├── Page11Ending.tsx
│       │   ├── index.ts
│       │   └── types.ts
│       └── ValentineJourneyV2Renderer.tsx
└── lib/
    ├── templates.ts (updated)
    └── valentineJourneyV2DefaultData.ts
```

## 🔌 Integration Steps

### Step 1: Update Template Renderer

Find your main template renderer (likely in `src/pages/` or `src/components/`) and add the Valentine Journey V2 renderer:

```typescript
import ValentineJourneyV2Renderer from '@/components/templates/ValentineJourneyV2Renderer';

// In your template renderer component
const renderTemplate = (templateSlug: string, pageId: string, data: any) => {
    switch (templateSlug) {
        case 'romantic-valentines-journey-v2':
            return (
                <ValentineJourneyV2Renderer
                    pageId={pageId}
                    data={data}
                    onNext={handleNextPage}
                    isEditing={isEditMode}
                    onUpdate={handleDataUpdate}
                />
            );
        // ... other templates
        default:
            return <DefaultRenderer />;
    }
};
```

### Step 2: Add Preview Support (Optional)

For admin panel preview functionality:

```typescript
import { getValentineJourneyV2DefaultData } from '@/lib/valentineJourneyV2DefaultData';

// In your preview component
const PreviewTemplate = ({ templateId }: { templateId: number }) => {
    if (templateId === 21) {
        const defaultData = getValentineJourneyV2DefaultData();
        return (
            <ValentineJourneyV2Renderer
                pageId="p1"
                data={defaultData}
                onNext={() => console.log('Next page')}
                isEditing={false}
            />
        );
    }
    // ... other templates
};
```

### Step 3: Database Setup (If Needed)

If you need to add the template to your database:

```sql
INSERT INTO templates (
    id,
    slug,
    title,
    category,
    price,
    original_price,
    icon,
    color,
    tag,
    is_active,
    created_at
) VALUES (
    21,
    'romantic-valentines-journey-v2',
    'Romantic Valentine''s Journey V2',
    'Valentine''s Day',
    199,
    1499,
    '💖',
    'from-pink-600 to-rose-600',
    'New',
    true,
    NOW()
);
```

### Step 4: Add to Navigation/Dashboard

Update your template selection UI to include the new template:

```typescript
import { TEMPLATES } from '@/lib/templates';

// The template is already in the TEMPLATES array
const valentineV2 = TEMPLATES.find(t => t.id === 21);

// Display in your UI
<TemplateCard
    template={valentineV2}
    onClick={() => selectTemplate(21)}
/>
```

## 🎨 Customization Guide

### Editing Template Data

Users can customize all text and images. The `isEditing` prop enables edit mode:

```typescript
<ValentineJourneyV2Renderer
    pageId="p1"
    data={userData}
    onNext={handleNext}
    isEditing={true}  // Enable edit mode
    onUpdate={(field, value) => {
        // Update your state/database
        updateTemplateData(field, value);
    }}
/>
```

### Data Structure

Each page expects specific fields. See `types.ts` for complete definitions:

```typescript
// Example for Page 1
const page1Data = {
    greeting: "Hey Beautiful",
    recipientName: "Cutiepie",
    subtext: "I made something special for you",
    mainImage: "/uploads/photo.jpg",
    buttonText: "Open Your Gift"
};
```

## 🧪 Testing

### Test Individual Pages

```typescript
import { Page1Greeting } from '@/components/templates/valentine-journey-v2';

// Test component
<Page1Greeting
    data={{
        greeting: "Test Greeting",
        recipientName: "Test Name",
        // ... other fields
    }}
    onNext={() => console.log('Next clicked')}
    isEditing={false}
/>
```

### Test Full Template Flow

```typescript
import ValentineJourneyV2Renderer from '@/components/templates/ValentineJourneyV2Renderer';
import { getValentineJourneyV2DefaultData } from '@/lib/valentineJourneyV2DefaultData';

const TestTemplate = () => {
    const [currentPage, setCurrentPage] = useState('p1');
    const defaultData = getValentineJourneyV2DefaultData();

    return (
        <ValentineJourneyV2Renderer
            pageId={currentPage}
            data={defaultData}
            onNext={() => {
                // Navigate to next page
                const pages = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11'];
                const currentIndex = pages.indexOf(currentPage);
                if (currentIndex < pages.length - 1) {
                    setCurrentPage(pages[currentIndex + 1]);
                }
            }}
        />
    );
};
```

## 🚀 Deployment Checklist

- [ ] All components build without errors
- [ ] Template appears in dashboard
- [ ] Preview works in admin panel
- [ ] Users can customize all fields
- [ ] Images upload correctly
- [ ] Animations run smoothly (60 FPS)
- [ ] Mobile responsive on all devices
- [ ] Share functionality works
- [ ] Confetti library loaded (canvas-confetti)
- [ ] Database entry created (if applicable)

## 📊 Performance Optimization

### Lazy Loading (Recommended)

```typescript
import { lazy, Suspense } from 'react';

const ValentineJourneyV2Renderer = lazy(() => 
    import('@/components/templates/ValentineJourneyV2Renderer')
);

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
    <ValentineJourneyV2Renderer {...props} />
</Suspense>
```

### Image Optimization

- Use Next.js Image component for uploaded images
- Compress images before upload
- Use WebP format when possible
- Implement lazy loading for photo galleries

## 🐛 Troubleshooting

### Issue: Confetti not working
**Solution:** Install canvas-confetti
```bash
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti
```

### Issue: TypeScript errors
**Solution:** Ensure all dependencies are installed
```bash
npm install framer-motion
npm install --save-dev @types/react
```

### Issue: Images not loading
**Solution:** Check image URLs and CORS settings

### Issue: Animations laggy
**Solution:** 
- Check if GPU acceleration is enabled
- Reduce number of floating hearts/particles
- Use `will-change` CSS property

## 📝 Required Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "framer-motion": "^11.0.0",
    "canvas-confetti": "^1.9.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/canvas-confetti": "^1.6.0",
    "typescript": "^5.0.0"
  }
}
```

## 🎯 Next Steps

1. **Test the template** - Run through all 11 pages
2. **Add to production** - Deploy when ready
3. **Monitor performance** - Check analytics and user feedback
4. **Iterate** - Make improvements based on data

## 💡 Tips

- **Default Data**: Use `getValentineJourneyV2DefaultData()` for quick testing
- **Page-Specific Data**: Use `getPageDefaultData(pageId)` for individual pages
- **Edit Mode**: Toggle `isEditing` prop to enable/disable editing
- **Custom Styling**: All components use Tailwind CSS classes
- **Animation Control**: Adjust animation durations in component files

## 📞 Support

For issues or questions:
1. Check the component source code
2. Review the types.ts file for data structure
3. Test with default data first
4. Check browser console for errors

---

**Template ID:** 21  
**Slug:** romantic-valentines-journey-v2  
**Status:** ✅ Ready for Production  
**Last Updated:** February 10, 2026
