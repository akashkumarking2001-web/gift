-- Create AR Albums table
CREATE TABLE IF NOT EXISTS public.ar_albums (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    mind_file_url TEXT NOT NULL -- URL to the compiled .mind file in storage
);

-- Create AR Targets table (Links an image index in the .mind file to a video)
CREATE TABLE IF NOT EXISTS public.ar_targets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    album_id UUID REFERENCES public.ar_albums(id) ON DELETE CASCADE NOT NULL,
    target_index INTEGER NOT NULL, -- The 0-based index of the image in the .mind file
    video_url TEXT NOT NULL, -- URL to the video file to play
    label TEXT, -- Optional label for the target (e.g., "Wedding Photo 1")
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(album_id, target_index)
);

-- Enable RLS
ALTER TABLE public.ar_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar_targets ENABLE ROW LEVEL SECURITY;

-- Policies for ar_albums
-- Public read access (needed for the scanner to work without auth)
CREATE POLICY "Public albums are viewable by everyone" 
ON public.ar_albums FOR SELECT 
USING (true);

-- Admin/User creating the album can insert/update/delete
CREATE POLICY "Users can manage their own albums" 
ON public.ar_albums FOR ALL 
USING (auth.uid() = user_id);

-- Policies for ar_targets
-- Public read access
CREATE POLICY "Public targets are viewable by everyone" 
ON public.ar_targets FOR SELECT 
USING (true);

-- Admin/User can manage targets for their albums
CREATE POLICY "Users can manage targets for their albums" 
ON public.ar_targets FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.ar_albums 
        WHERE id = public.ar_targets.album_id 
        AND user_id = auth.uid()
    )
);

-- Storage bucket for AR Assets (if not exists)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('ar-assets', 'ar-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'ar-assets' );

CREATE POLICY "Authenticated users can upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'ar-assets' AND auth.role() = 'authenticated' );

CREATE POLICY "Users can update their own files"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'ar-assets' AND auth.uid() = owner );

CREATE POLICY "Users can delete their own files"
ON storage.objects FOR DELETE
USING ( bucket_id = 'ar-assets' AND auth.uid() = owner );
