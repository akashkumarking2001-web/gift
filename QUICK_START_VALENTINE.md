# Quick Start Guide - Valentine's Day Template

## 🚀 Get Started in 5 Minutes

### Step 1: Access Your Video Frames
Your video has been extracted into 500 frames at:
```
src/Template design and actions example/Valentine Day template/
├── 0001.jpg (Opening scene)
├── 0125.jpg (Quarter point)
├── 0250.jpg (Midpoint)
├── 0375.jpg (Three-quarter)
├── 0500.jpg (Ending scene)
└── video_2026-02-09_02-26-03.mp4 (Original video)
```

### Step 2: Upload Your Video (Choose One Method)

#### Option A: Use Placeholder URLs (Fastest - For Testing)
```
Demo Video: https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4
Thumbnail: https://via.placeholder.com/800x600/FF1493/FFFFFF?text=Valentine+Journey
```

#### Option B: Upload to Supabase Storage (Recommended)
1. Go to your Supabase project
2. Navigate to Storage
3. Create bucket: `template-media`
4. Upload your video file
5. Get public URL
6. Use that URL in admin panel

#### Option C: Use Your Existing Hosting
If you have a CDN or hosting, upload there and use the URL.

### Step 3: Update Template in Admin Panel

1. **Login to Admin**
   - Go to: `http://localhost:5173/admin/login` (or your domain)
   - Use your admin credentials

2. **Navigate to Templates**
   - Click "Templates" in sidebar
   - Find "Romantic Valentine's Journey" (Template ID: 20)

3. **Edit Template**
   - Click "Edit Details" button
   - Scroll to "Media Assets" section

4. **Add Media URLs**
   ```
   Thumbnail/Cover Image URL:
   [Paste your thumbnail URL or use placeholder]

   Demo Video URL:
   [Paste your video URL]

   Preview Images (comma-separated):
   [URL1], [URL2], [URL3], [URL4], [URL5]
   ```

5. **Save Changes**
   - Click "Save Changes" button
   - Verify success message

### Step 4: View Your Template

1. **Go to Homepage**
   - Navigate to: `http://localhost:5173/`

2. **Find Your Template**
   - Look for "Romantic Valentine's Journey"
   - Should show with 💖 icon

3. **Click to View Details**
   - Click on the template card
   - You should see:
     - Demo video playing
     - Preview images below
     - All template information

## 📸 Recommended Frame Selection

### For Character Images:
- **Page 1 (Panda)**: Use frame `0001.jpg` or `0050.jpg`
- **Page 4 (Cat)**: Use frame `0250.jpg` or `0300.jpg`
- **Page 5 (Bear)**: Use frame `0450.jpg` or `0500.jpg`

### For Preview Images:
- **Preview 1**: Frame `0100.jpg`
- **Preview 2**: Frame `0200.jpg`
- **Preview 3**: Frame `0300.jpg`
- **Preview 4**: Frame `0400.jpg`
- **Preview 5**: Frame `0500.jpg`

## 🎨 Example Admin Panel Input

Copy and paste this into your admin panel (replace URLs with your actual URLs):

```
Title: Romantic Valentine's Journey

Price: 199

Original Price: 1999

Category: Valentine's

Icon: 💖

Theme Color: from-pink-500 via-rose-500 to-red-600

Thumbnail/Cover Image URL:
https://via.placeholder.com/800x600/FF1493/FFFFFF?text=Valentine+Journey

Demo Video URL:
https://your-storage-url.com/valentine-demo.mp4

Preview Images:
https://via.placeholder.com/800x600/FFB6C1/FF1493?text=Page+1,
https://via.placeholder.com/800x600/FF69B4/FFFFFF?text=Page+2,
https://via.placeholder.com/800x600/FFC0CB/DC143C?text=Page+3,
https://via.placeholder.com/800x600/FFE4E1/FF1493?text=Page+4,
https://via.placeholder.com/800x600/FF1493/FFFFFF?text=Page+5
```

## ✅ Verification Checklist

After updating the template, verify:

- [ ] Template appears in templates list with 💖 icon
- [ ] Template shows "Premium" tag
- [ ] Price shows ₹199 (88% OFF from ₹1999)
- [ ] Clicking template opens details page
- [ ] Demo video loads and plays
- [ ] Video has play/pause controls
- [ ] Preview images display in grid below video
- [ ] Hover effects work on preview images
- [ ] "Create This Gift Now" button is visible

## 🐛 Troubleshooting

### Video Not Playing?
- Check URL is publicly accessible
- Ensure video format is MP4
- Try opening URL directly in browser
- Check browser console for errors

### Images Not Showing?
- Verify URLs are correct
- Check images are publicly accessible
- Look for CORS errors in console
- Try placeholder URLs first

### Template Not Appearing?
- Refresh the page
- Check template ID is 20
- Verify `isActive` is true
- Check browser console for errors

## 📱 Mobile Testing

To test on mobile:
1. Get your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from phone: `http://YOUR-IP:5173`
3. Verify mobile responsive design
4. Test video playback on mobile
5. Check touch interactions

## 🎯 Next Steps After This

Once you've verified the template displays correctly:

1. **Create Page Components** (See VALENTINE_TEMPLATE_IMPLEMENTATION.md)
2. **Add Customization Logic** (Text editing, image upload)
3. **Test User Flow** (Purchase → Customize → Share)
4. **Deploy to Production** (When ready)

## 💡 Pro Tips

### For Best Results:
- Use high-quality images (800x600 minimum)
- Keep video under 50MB for fast loading
- Use WebP format for images (smaller file size)
- Test on multiple devices
- Optimize video with H.264 codec

### For Development:
- Use placeholder URLs initially
- Replace with real assets later
- Keep original video frames as backup
- Document your media URLs

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Verify all URLs are accessible
3. Review the VALENTINE_SUMMARY.md for detailed info
4. Check the implementation plan in VALENTINE_TEMPLATE_IMPLEMENTATION.md

---

**Quick Links:**
- Implementation Plan: `VALENTINE_TEMPLATE_IMPLEMENTATION.md`
- Image Reference: `VALENTINE_IMAGES_REFERENCE.md`
- Full Summary: `VALENTINE_SUMMARY.md`
- Video Frames: `src/Template design and actions example/Valentine Day template/`

**Status**: ✅ Ready to add media and test!
