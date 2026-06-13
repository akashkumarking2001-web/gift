import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Loader2, Plus, Trash2, Upload, Copy, Eye, ScanLine } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { nanoid } from "nanoid";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

import { BusinessService } from "../../lib/businessService";
import { uploadFileToR2, deleteFileFromR2 } from "../../lib/r2Client";

interface Album {
    id: string;
    title: string;
    created_at: string;
    mind_file_url: string;
    username?: string;
    phone_number?: string;
}

// ── IndexedDB Cache for Fast AR Sync ────────────────────────────────
const CACHE_DB = 'GiftMagicCache';
const STORE_NAME = 'ar_assets';

async function getCachedAsset(url: string): Promise<Blob | null> {
    try {
        const db = await openDB();
        return new Promise((res) => {
            const tx = db.transaction(STORE_NAME, 'readonly');
            const store = tx.objectStore(STORE_NAME);
            const req = store.get(url);
            req.onsuccess = () => res(req.result || null);
            req.onerror = () => res(null);
        });
    } catch (e) { return null; }
}

async function setCachedAsset(url: string, blob: Blob) {
    try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.put(blob, url);
    } catch (e) {}
}

function openDB(): Promise<IDBDatabase> {
    return new Promise((res, rej) => {
        const req = indexedDB.open(CACHE_DB, 1);
        req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
        req.onsuccess = () => res(req.result);
        req.onerror = () => rej(req.error);
    });
}
// ───────────────────────────────────────────────────────────────────

interface ARUploadProps {
  clientId?: string;
  userId?: string;
  isBusiness?: boolean;
}

const ARUpload = ({ clientId, userId, isBusiness }: ARUploadProps) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [title, setTitle] = useState("");
    const [albumType, setAlbumType] = useState<'solo' | 'group'>('solo');
    const [isCompiling, setIsCompiling] = useState(false);
    const [mindFile, setMindFile] = useState<File | null>(null);
    const [groupImages, setGroupImages] = useState<File[]>([]);
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [mappings, setMappings] = useState<{ id: string; targetIndex: number; videoFile: File | null; playerType: string }[]>([
        { id: nanoid(), targetIndex: 0, videoFile: null, playerType: "normal" }
    ]);

    const [selectedAlbumMappings, setSelectedAlbumMappings] = useState<any[]>([]);
    const [selectedAlbumImages, setSelectedAlbumImages] = useState<any[]>([]);
    const [isMappingsModalOpen, setIsMappingsModalOpen] = useState(false);
    const [isFetchingMappings, setIsFetchingMappings] = useState(false);
    const [syncProgress, setSyncProgress] = useState(0);
    const [syncStatus, setSyncStatus] = useState("");

    // Custom Delete State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [albumToDelete, setAlbumToDelete] = useState<string | null>(null);

    const fetchAndOpenMappings = async (albumId: string) => {
        setIsFetchingMappings(true);
        try {
            const { data: mappingsData } = await supabase.from("ar_targets").select("*").eq("album_id", albumId).order("target_index", { ascending: true });
            const { data: imagesData } = await supabase.from("ar_group_images").select("*").eq("album_id", albumId).order("target_index", { ascending: true });

            console.log(`[DEBUG] Mappings for fetchAndOpenMappings ${albumId}:`, mappingsData);
            console.log(`[DEBUG] Images for fetchAndOpenMappings ${albumId}:`, imagesData);

            setSelectedAlbumMappings(mappingsData || []);
            setSelectedAlbumImages(imagesData || []);
            setIsMappingsModalOpen(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetchingMappings(false);
        }
    };

    useEffect(() => {
        fetchAlbums();
        return () => {
            // Cleanup any hanging object URLs if component unmounts during sync
            setAlbums([]);
        };
    }, []);

    const compileImagesToMind = async (files: File[]): Promise<File> => {
        return new Promise(async (resolve, reject) => {
            try {
                // Dynamically load MindAR Compiler for creation compiles on-demand using ES Module import
                let CompilerClass = (window as any).MINDAR?.Compiler;
                if (!CompilerClass) {
                    // @ts-ignore
                    const MINDARMod = await import("https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image.prod.js" /* @vite-ignore */);
                    CompilerClass = MINDARMod.Compiler || MINDARMod.default?.Compiler;

                    if (CompilerClass) {
                        if (!(window as any).MINDAR) (window as any).MINDAR = {};
                        (window as any).MINDAR.Compiler = CompilerClass; // Cache for next loads
                    }
                }

                if (!CompilerClass) {
                    throw new Error("MindAR Compiler could not be resolved from loaded bundle.");
                }

                const images = await Promise.all(files.map((file, idx) => {
                    return new Promise<HTMLCanvasElement | HTMLImageElement>((res) => {
                        const img = new Image();
                        const objectUrl = URL.createObjectURL(file);
                        img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const maxDim = 480; 
                            let width = img.naturalWidth;
                            let height = img.naturalHeight;

                            if (width > height && width > maxDim) {
                                height = Math.round((height * maxDim) / width);
                                width = maxDim;
                            } else if (height > maxDim) {
                                width = Math.round((width * maxDim) / height);
                                height = maxDim;
                            }

                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            if (ctx) {
                                ctx.drawImage(img, 0, 0, width, height);
                                URL.revokeObjectURL(objectUrl);
                                setTimeout(() => res(canvas), 1);
                            } else {
                                URL.revokeObjectURL(objectUrl);
                                res(img);
                            }
                        };
                        img.onerror = () => {
                            URL.revokeObjectURL(objectUrl);
                            res(document.createElement('canvas'));
                        };
                        img.src = objectUrl;
                    });
                }));

                const compiler = new (window as any).MINDAR.Compiler();
                await compiler.compileImageTargets(images, (progress: number) => {
                    setSyncProgress(Math.floor(progress));
                    setSyncStatus("Converting Photos to AR...");
                });

                const buffer = compiler.exportData();
                const mindFile = new File([buffer], 'targets.mind', { type: 'application/octet-stream' });
                
                // Cleanup canvases to free GPU memory
                images.forEach(img => {
                    if (img instanceof HTMLCanvasElement) {
                        img.width = 1;
                        img.height = 1;
                    }
                });
                
                resolve(mindFile);
            } catch (err) {
                reject(err);
            }
        });
    };

    const fetchAlbums = async () => {
        setLoading(true);
        let query = supabase
            .from("ar_albums")
            .select("*, business_clients (business_slug, business_name)")
            .order("created_at", { ascending: false });

        if (clientId) {
            query = query.eq('client_id', clientId);
        } else if (userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;
        if (data) setAlbums(data);
        if (error) console.error("Error fetching albums:", error);
        setLoading(false);
    };

    /**
     * Fetch a URL via the r2proxy with up to `maxRetries` attempts and
     * exponential back-off. Throws only after all attempts are exhausted.
     */
    const fetchWithRetry = async (rawUrl: string, maxRetries = 3): Promise<Blob> => {
        const proxyUrl = `/api/r2proxy?url=${encodeURIComponent(rawUrl)}`;
        let lastErr: unknown;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const res = await fetch(proxyUrl);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const blob = await res.blob();
                // Basic sanity check for valid image/file blob
                if (blob.size < 50) throw new Error('Response too small');
                return blob;
            } catch (e) {
                lastErr = e;
                if (attempt < maxRetries) {
                    const delay = 800 * attempt; // 800ms, 1600ms …
                    console.warn(`[fetchWithRetry] Attempt ${attempt} failed, retrying in ${delay}ms…`, e);
                    await new Promise(r => setTimeout(r, delay));
                }
            }
        }
        throw lastErr;
    };

    /**
     * ─── 🛠 POWER TOOL: HEAL & REBUILD UNIVERSAL SCANNER ───
     * This fixes all "Wrong Video" or "Scanning Dead" issues.
     * It re-indexes EVERY image in the database to be perfectly contiguous starting from 0,
     * updates all target mappings, and compiles a fresh Master .mind file.
     */
    const handleRepairMaster = async () => {
        console.log("[Repair] Starting Universal Scanner repair...");
        setLoading(true);
        setIsCompiling(true);
        setSyncStatus("Preparing Repair...");

        try {
            console.log("[Repair] Fetching all images from database...");
            const { data: allImages, error: fetchErr } = await supabase
                .from("ar_group_images")
                .select("*")
                .order("id", { ascending: true });

            if (fetchErr) {
                console.error("[Repair] Database fetch error:", fetchErr);
                throw new Error("Could not fetch targets for repair from DB.");
            }
            if (!allImages || allImages.length === 0) {
                console.warn("[Repair] No images found to repair.");
                throw new Error("No images found in the system to rebuild the scanner.");
            }

            console.log(`[Repair] Found ${allImages.length} images. Downloading in parallel (concurrency=6)...`);

            const fullFileSet: File[] = new Array(allImages.length);
            const indexUpdates: any[] = [];

            // ── Parallel download with a concurrency limit ────────────────────
            const CONCURRENCY = 8;
            setSyncStatus("Creating Magic Frame from Photo...");
            let nextIdx = 0;
            let completed = 0;

            const downloadWorker = async () => {
                while (nextIdx < allImages.length) {
                    const i = nextIdx++;
                    const img = allImages[i];
                    const newIndex = i;

                    try {
                        const blob = await fetchWithRetry(img.file_path);
                        const filename = img.file_path.split('/').pop() || `img_${newIndex}.jpg`;
                        console.log(`[Repair] ✅ Downloaded ${newIndex + 1}/${allImages.length}: ${filename} (${blob.size}b)`);
                        fullFileSet[newIndex] = new File([blob], filename, { type: blob.type });
                    } catch (e) {
                        console.error(`[Repair] ❌ Failed downloading index ${newIndex}, using placeholder:`, e);
                        const canvas = document.createElement('canvas');
                        canvas.width = 128; canvas.height = 128;
                        const ctx = canvas.getContext('2d')!;
                        const idata = ctx.createImageData(128, 128);
                        for (let p = 0; p < idata.data.length; p += 4) {
                            idata.data[p]   = (Math.random() * 255) | 0;
                            idata.data[p+1] = (Math.random() * 255) | 0;
                            idata.data[p+2] = (Math.random() * 255) | 0;
                            idata.data[p+3] = 255;
                        }
                        ctx.putImageData(idata, 0, 0);
                        ctx.fillStyle = 'white'; ctx.font = '20px sans-serif';
                        ctx.fillText(`#${newIndex}`, 4, 24);
                        const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!), 'image/png'));
                        fullFileSet[newIndex] = new File([blob], `fallback_${newIndex}.png`, { type: 'image/png' });
                    }

                    if (img.target_index !== newIndex) {
                        indexUpdates.push(
                            supabase.from("ar_group_images").update({ target_index: newIndex }).eq("id", img.id),
                            supabase.from("ar_targets").update({ target_index: newIndex }).eq("album_id", img.album_id).eq("target_index", img.target_index)
                        );
                    }

                    completed++;
                    setSyncProgress(Math.floor((completed / allImages.length) * 100));
                    setSyncStatus(`Creating Magic Frame from Photo... (${completed}/${allImages.length})`);
                }
            };

            // Launch CONCURRENCY workers simultaneously
            await Promise.all(
                Array.from({ length: Math.min(CONCURRENCY, allImages.length) }, downloadWorker)
            );

            console.log(`[Repair] All ${allImages.length} images downloaded.`);

            console.log("[Repair] Re-indexing target mappings in DB...");
            if (indexUpdates.length > 0) {
                for (let i = 0; i < indexUpdates.length; i += 50) {
                    await Promise.all(indexUpdates.slice(i, i + 50));
                }
            }

            console.log("[Repair] Compiling new Master Mind file...");
            const repairedMind = await compileImagesToMind(fullFileSet);
            console.log("[Repair] Uploading Master Mind file to R2...");
            const mindUrl = await uploadFile(repairedMind, `master/targets_master.mind`);

            console.log("[Repair] Updating Master Config URL:", mindUrl);
            const { error: updateErr } = await supabase.from("ar_master_config").update({
                master_mind_file_url: mindUrl,
                last_updated: new Date().toISOString()
            }).eq("id", 1);

            if (updateErr) throw updateErr;

            toast({ title: "✅ System Repaired", description: "Universal Scanner is now perfectly synchronized." });
            fetchAlbums();
        } catch (error: any) {
            console.error("[Repair] Fatal Crash:", error);
            toast({ title: "Repair Failed", description: error.message, variant: "destructive" });
        } finally {
            document.body.classList.remove('is-compiling-ar');
            setLoading(false);
            setIsCompiling(false);
            setSyncProgress(0);
            setSyncStatus("");
        }
    };

    const handleAddMapping = () => {
        setMappings([...mappings, { id: nanoid(), targetIndex: mappings.length, videoFile: null, playerType: "normal" }]);
    };

    const handleRemoveMapping = (id: string) => {
        setMappings(mappings.filter(m => m.id !== id));
    };

    const handleMappingChange = (id: string, field: 'targetIndex' | 'videoFile' | 'playerType', value: any) => {
        setMappings(mappings.map(m => m.id === id ? { ...m, [field]: value } : m));
    };

    const copyToClipboard = (album: Album) => {
        const slug = (album as any).business_clients?.business_slug;
        const idOrUsername = album.username || album.id;
        let urlToCopy = "";

        if (slug) {
            const hostname = window.location.hostname;
            const isLocal = ['localhost', '127.0.0.1'].some(h => hostname.includes(h));

            if (isLocal) {
                // If local e.g. localhost:5173 or client.localhost:5173
                urlToCopy = `http://${slug}.localhost:5173/?albumId=${idOrUsername}`;
            } else {
                // Production e.g. options.site.com -> client.site.com
                const parts = hostname.split('.');
                const mainDomain = parts.slice(-2).join('.'); // grabs 'site.com' from 'admin.site.com' or 'www.site.com'
                urlToCopy = `https://${slug}.${mainDomain}/?albumId=${idOrUsername}`;
            }
        } else {
            // Fallback to absolute local scanner if client slug absent
            urlToCopy = `${window.location.origin}/scan?albumId=${idOrUsername}`;
        }

        navigator.clipboard.writeText(urlToCopy);
        toast({ title: "Copied", description: "Public landing link copied to clipboard." });
    };

    const handleDeleteAlbum = async (id: string) => {
        setLoading(true);
        try {
            // 1. Fetch files associated for storage deletion
            const { data: targets } = await supabase.from("ar_targets").select("video_url").eq("album_id", id);
            const { data: images } = await supabase.from("ar_group_images").select("file_path").eq("album_id", id);
            const { data: album } = await supabase.from("ar_albums").select("mind_file_url").eq("id", id).single();

            const getKeyFromUrl = (url: string) => {
                try { return new URL(url).pathname.substring(1); } catch (e) { return ""; }
            };

            const deleteFiles: Promise<any>[] = [];
            if (album?.mind_file_url) {
                const k = getKeyFromUrl(album.mind_file_url);
                if (k) deleteFiles.push(deleteFileFromR2(k));
            }
            if (targets) {
                targets.forEach(t => { const k = getKeyFromUrl(t.video_url); if (k) deleteFiles.push(deleteFileFromR2(k)); });
            }
            if (images) {
                images.forEach(img => { const k = getKeyFromUrl(img.file_path); if (k) deleteFiles.push(deleteFileFromR2(k)); });
            }
            await Promise.all(deleteFiles).catch(e => console.error("R2 deletion sub-error:", e));

            // 2. Cascade DB updates
            await supabase.from("ar_targets").delete().eq("album_id", id);
            await supabase.from("ar_group_images").delete().eq("album_id", id);
            const { error } = await supabase.from("ar_albums").delete().eq("id", id);
            if (error) throw error;
            toast({ title: "Success", description: "Album and all media files deleted." });
            fetchAlbums();
        } catch (error: any) {
            console.error("Delete error:", error);
            toast({ title: "Error", description: error.message || "Failed to delete album.", variant: "destructive" });
        } finally {
            document.body.classList.remove('is-compiling-ar');
            setLoading(false);
        }
    };

    const handleUpdateUsername = async (id: string, newUsername: string) => {
        if (!newUsername.trim()) return;
        const { error } = await supabase
            .from("ar_albums")
            .update({ username: newUsername.trim() })
            .eq("id", id);

        if (error) {
            toast({ title: "Update Failed", description: error.message, variant: "destructive" });
        } else {
            toast({ title: "Success", description: "Username updated!" });
            fetchAlbums(); // Refresh
        }
    };

    const uploadFile = async (file: File, path: string) => {
        // Sanitize path to avoid "Invalid Key" errors from S3/R2 Storage
        const sanitizedPath = path.replace(/[^a-zA-Z0-9_\-\./]/g, '_');
        return await uploadFileToR2(file, sanitizedPath);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title) {
            toast({ title: "Validation Error", description: "Please enter an Album Title.", variant: "destructive" });
            return;
        }
        if (!phone) {
            toast({ title: "Validation Error", description: "Please enter a Phone Number.", variant: "destructive" });
            return;
        }
        if (albumType === 'solo' && !mindFile) {
            toast({ title: "Validation Error", description: "Please upload a .mind target file for Solo mode.", variant: "destructive" });
            return;
        }

        if (albumType === 'group' && groupImages.length === 0) {
            toast({ title: "Validation Error", description: "Please upload at least one image file for Group mode.", variant: "destructive" });
            return;
        }

        if (mappings.some(m => !m.videoFile)) {
            toast({ title: "Validation Error", description: "All video keyframes must have a video file selected.", variant: "destructive" });
            return;
        }

        setLoading(true);
        setIsCompiling(true);
        document.body.classList.add('is-compiling-ar');

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user && !clientId) throw new Error("Not authenticated to create albums.");

            if (clientId) {
                const { data: b } = await supabase.from('business_clients').select('frames_used, frame_limit').eq('id', clientId).single();
                if (b && b.frames_used >= b.frame_limit) {
                    throw new Error("You have reached your package limit. Please upgrade dashboard.");
                }
            }

            const safeTitle = title.replace(/[^a-zA-Z0-9]/g, '_');
            const folderName = `${Date.now()}_${safeTitle}`;
            const previousFiles: File[] = [];

            // 🛡️ BATTLE-HARDENED SYNC PROCESS (Auto-Repair Integrated)
            try {
                setSyncStatus("Creating Magic Frame from Photo...");
                const { data: prevImagesData, error: fetchErr } = await supabase
                    .from("ar_group_images")
                    .select("*")
                    .order("target_index", { ascending: true });

                if (fetchErr) throw fetchErr;

                const indexUpdates: any[] = [];
                const finalFileArray: File[] = [];
                
                if (prevImagesData && prevImagesData.length > 0) {
                    const CONCURRENCY = 8;
                    const downloadedFiles: File[] = new Array(prevImagesData.length);
                    let nextIdx = 0;
                    let completed = 0;
                    
                    const downloadWorker = async () => {
                        while (nextIdx < prevImagesData.length) {
                            const i = nextIdx++;
                            const img = prevImagesData[i];
                            const correctIndex = i;

                            try {
                                // Try Cache First
                                let blob = await getCachedAsset(img.file_path);
                                if (!blob) {
                                    blob = await fetchWithRetry(img.file_path);
                                    await setCachedAsset(img.file_path, blob);
                                }
                                downloadedFiles[i] = new File([blob], `prev_${i}.jpg`, { type: blob.type });
                            } catch (e) {
                                const canvas = document.createElement('canvas');
                                canvas.width = 128; canvas.height = 128;
                                const ctx = canvas.getContext('2d')!;
                                ctx.fillStyle = '#000'; ctx.fillRect(0,0,128,128);
                                const blob = await new Promise<Blob>(res => canvas.toBlob(b => res(b!), 'image/png'));
                                downloadedFiles[i] = new File([blob], `noise_${i}.png`, { type: 'image/png' });
                            }

                            if (img.target_index !== correctIndex) {
                                indexUpdates.push(
                                    supabase.from("ar_group_images").update({ target_index: correctIndex }).eq("id", img.id),
                                    supabase.from("ar_targets").update({ target_index: correctIndex }).eq("album_id", img.album_id).eq("target_index", img.target_index)
                                );
                            }

                            completed++;
                            setSyncProgress(Math.floor((completed / prevImagesData.length) * 100));
                        }
                    };

                    await Promise.all(
                        Array.from({ length: Math.min(CONCURRENCY, prevImagesData.length) }, downloadWorker)
                    );
                    finalFileArray.push(...downloadedFiles);
                }

                const newImageStartIndex = finalFileArray.length;
                const currentImages = albumType === 'group' ? groupImages : [mindFile!];
                finalFileArray.push(...currentImages);

                setSyncStatus("Creating Magic Frame from Photo...");
                const masterFile = await compileImagesToMind(finalFileArray);
                const masterUrl = await uploadFile(masterFile, `master/targets_master.mind`);

                await supabase.from("ar_master_config").update({
                    master_mind_file_url: masterUrl,
                    last_updated: new Date().toISOString()
                }).eq("id", 1);

                // Apply dynamic index repairs to keep system healthy
                if (indexUpdates.length > 0) {
                    await Promise.all(indexUpdates);
                }

                // Create Album Record
                const { data: album, error: albumError } = await supabase
                    .from("ar_albums")
                    .insert({
                        title,
                        mind_file_url: masterUrl,
                        user_id: user ? user.id : null,
                        client_id: clientId || null,
                        username: username.trim() || null,
                        phone_number: phone.trim(),
                        album_type: albumType
                    })
                    .select()
                    .single();

                if (albumError) throw albumError;

                // 📸 Store NEW source images and 📹 Videos in parallel
                setSyncStatus("Creating Magic Frame from Photo...");
                const assetPromises: Promise<any>[] = [];

                currentImages.forEach((file, index) => {
                    assetPromises.push((async () => {
                        const imgUrl = await uploadFile(file, `${folderName}/source_${index}.jpg`);
                        await supabase.from("ar_group_images").insert({
                            album_id: album.id,
                            file_path: imgUrl,
                            target_index: newImageStartIndex + index
                        });
                    })());
                });

                mappings.forEach(mapping => {
                    if (mapping.videoFile) {
                        assetPromises.push((async () => {
                            const videoUrl = await uploadFile(mapping.videoFile, `${folderName}/video_${mapping.targetIndex}.mp4`);
                            await supabase.from("ar_targets").insert({
                                album_id: album.id,
                                target_index: newImageStartIndex + mapping.targetIndex,
                                video_url: videoUrl,
                                player_type: mapping.playerType
                            });
                        })());
                    }
                });

                await Promise.all(assetPromises);

                if (clientId) await BusinessService.incrementFrameUsage(clientId);

                toast({ title: "✅ Success!", description: "Photo Upload Successfully!" });
                fetchAlbums();
                setTitle(""); setUsername(""); setPhone(""); setMindFile(null); setGroupImages([]);
                setMappings([{ id: nanoid(), targetIndex: 0, videoFile: null, playerType: "normal" }]);

            } catch (innerErr: any) {
                console.error("[SYNC INNER ERROR]", innerErr);
                throw innerErr;
            }
        } catch (error: any) {
            console.error(error);
            toast({ title: "Upload Failed", description: error.message || "Failed.", variant: "destructive" });
        } finally {
            document.body.classList.remove('is-compiling-ar');
            setLoading(false);
            setIsCompiling(false);
            setSyncProgress(0);
            setSyncStatus("");
        }
    };


    return (
        <div className="space-y-8">
            {isCompiling && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl overflow-hidden">
                    {/* Futuristic Glass Scanner Effect */}
                    <div className="relative w-72 h-72 mb-12">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-[10px] border border-white/5 rounded-full"></div>
                        
                        {/* Inner scanner bar (CSS animation to avoid JS lag) */}
                        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scanner-bar"></div>
                            <div className="absolute inset-0 bg-primary/5 animate-pulse-slow"></div>
                        </div>

                        {/* Centered Percentage */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl font-black text-white tracking-widest pointer-events-none drop-shadow-2xl">
                                {syncProgress}%
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-4 max-w-sm px-6">
                        <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic flex items-center justify-center gap-3">
                            <span className="w-2 h-2 bg-primary animate-ping rounded-full"></span>
                            {syncStatus}
                        </h3>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
                            PLEASE WAIT A MOMENT... <br/>
                            PREPARING YOUR MAGIC EXPERIENCE
                        </p>
                    </div>

                    {/* Progress Track (Static background, CSS fill) */}
                    <div className="mt-12 w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div 
                            className="h-full bg-gradient-to-r from-primary via-white to-primary transition-all duration-300 ease-out"
                            style={{ width: `${syncProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}
            {/* Creation Form */}
            <div className="glass-card p-8 max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white">AR Management</h2>
                    <p className="text-muted-foreground text-xs">Create albums, link videos, and manage your universal AR scanner.</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    {!clientId && (
                        <button
                            type="button"
                            onClick={handleRepairMaster}
                            disabled={loading}
                            className="px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 text-xs font-bold rounded-xl border border-amber-500/20 flex items-center gap-2 transition-all disabled:opacity-50"
                        >
                            <ScanLine className="w-3 h-3" /> Repair Universal Scanner
                        </button>
                    )}
                    <div className="bg-black/40 border border-white/10 p-1 rounded-xl flex items-center gap-1 self-start md:self-center">
                        <button
                            type="button"
                            onClick={() => setAlbumType('solo')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${albumType === 'solo' ? 'bg-primary text-white shadow-md' : 'text-white/40 hover:text-white'}`}
                        >
                            Solo Mode
                        </button>
                        <button
                            type="button"
                            onClick={() => setAlbumType('group')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${albumType === 'group' ? 'bg-primary text-white shadow-md' : 'text-white/40 hover:text-white'}`}
                        >
                            Group Mode
                        </button>
                    </div>
                </div>
            </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Album Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-colors"
                                placeholder="e.g. Wedding 2024"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Unique Username / Slug (Optional)</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-colors font-mono"
                                placeholder="e.g. wedding123"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Phone Number (Mandatory)</label>
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={e => setPhone(e.target.value.replace(/[^0-9+]/g, ''))}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-colors font-mono"
                            placeholder="e.g. +919876543210"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-white/50 font-bold">
                            {albumType === 'solo' ? "Target Image (Solo)" : "Group Targets (Images)"}
                        </label>
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors bg-white/5">
                            {albumType === 'solo' ? (
                                <>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required={!mindFile && albumType === 'solo'}
                                        onChange={e => setMindFile(e.target.files?.[0] || null)}
                                        className="hidden"
                                        id="mind-file-upload"
                                    />
                                    <label htmlFor="mind-file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                        <Upload className="w-8 h-8 text-white/40" />
                                        <span className="text-sm font-bold text-white">
                                            {mindFile ? mindFile.name : "Click to upload image"}
                                        </span>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        required={groupImages.length === 0 && (albumType === 'group' || albumType === 'master')}
                                        onChange={e => {
                                            const files = Array.from(e.target.files || []);
                                            setGroupImages(files);
                                        }}
                                        className="hidden"
                                        id="group-files-upload"
                                    />
                                    <label htmlFor="group-files-upload" className="cursor-pointer flex flex-col items-center gap-2">
                                        <Upload className="w-8 h-8 text-white/40" />
                                        <span className="text-sm font-bold text-white">
                                            {groupImages.length > 0 ? `${groupImages.length} images selected` : "Click to select multiple photographs"}
                                        </span>
                                    </label>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-xs uppercase tracking-widest text-white/50 font-bold">Video Mappings</label>
                            <button
                                type="button"
                                onClick={handleAddMapping}
                                className="text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-1"
                            >
                                <Plus className="w-3 h-3" /> Add Target
                            </button>
                        </div>

                        <div className="space-y-3">
                            {mappings.map((mapping, index) => (
                                <div key={mapping.id} className="flex flex-col md:flex-row gap-4 bg-white/5 p-4 rounded-xl items-start md:items-center">
                                    <div className="w-full md:w-24">
                                        <label className="text-[10px] text-white/40 font-bold block mb-1">Target Index</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={mapping.targetIndex}
                                            onChange={e => handleMappingChange(mapping.id, 'targetIndex', parseInt(e.target.value))}
                                            className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-2 text-white text-center font-mono text-sm"
                                        />
                                    </div>

                                    <div className="flex-1 w-full flex flex-col md:flex-row gap-4">
                                        <div className="flex-1">
                                            <label className="text-[10px] text-white/40 font-bold block mb-1">Video File</label>
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={e => handleMappingChange(mapping.id, 'videoFile', e.target.files?.[0] || null)}
                                                className="w-full text-xs text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all"
                                            />
                                        </div>
                                        <div className="w-full md:w-36">
                                            <label className="text-[10px] text-white/40 font-bold block mb-1">Player Type</label>
                                            <select
                                                value={mapping.playerType}
                                                onChange={e => handleMappingChange(mapping.id, 'playerType', e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-2 text-white text-xs outline-none focus:border-primary/50"
                                            >
                                                <option value="normal" className="bg-neutral-900">Normal Magic Frame</option>
                                                <option value="video_player" className="bg-neutral-900">Video Player</option>
                                            </select>
                                        </div>
                                    </div>

                                    {mappings.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveMapping(mapping.id)}
                                            className="p-2 text-white/40 hover:text-red-500 transition-colors mt-4 md:mt-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full gradient-primary py-4 rounded-xl text-white font-black uppercase tracking-widest text-sm shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {loading ? "Creating & Uploading..." : "Create AR Album"}
                    </button>
                </form>
            </div>

            {/* List of Existing Albums */}
            <div className="glass-card p-8 max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <ScanLine className="w-5 h-5 text-primary" /> Existing AR Albums
                    </h3>

                    <div className="flex-1 max-w-xs w-full">
                        <input
                            type="text"
                            placeholder="Search by Phone / Title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:border-primary/50 outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {albums.length === 0 ? (
                        <p className="text-white/40 text-sm text-center py-4">No AR albums found.</p>
                    ) : (
                        albums.filter(album => {
                            if (!searchQuery) return true;
                            const phoneMatch = album.phone_number?.includes(searchQuery);
                            const titleMatch = album.title.toLowerCase().includes(searchQuery.toLowerCase());
                            const userMatch = album.username?.toLowerCase().includes(searchQuery.toLowerCase());
                            return phoneMatch || titleMatch || userMatch;
                        }).map(album => (
                            <div key={album.id} className="bg-white/5 border border-white/5 hover:border-white/10 transition-colors rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                <div className="flex-1 w-full space-y-2">
                                    <h4 className="font-bold text-white text-lg">{album.title}</h4>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">ID:</span>
                                        <code className="text-xs font-mono bg-black/40 px-2 py-1 rounded text-primary/80 border border-primary/10">{album.id}</code>
                                        <button
                                            onClick={() => copyToClipboard(album)}
                                            className="text-white/40 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
                                            title="Copy Link"
                                        >
                                            <Copy className="w-3 h-3" />
                                        </button>
                                    </div>

                                    {/* Phone Number Display */}
                                    {album.phone_number && (
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Phone:</span>
                                            <span className="text-xs text-white/70 font-mono">{album.phone_number}</span>
                                        </div>
                                    )}

                                    {/* Username Edit Field */}
                                    <div className="flex items-center gap-2 mt-2 w-full max-w-sm">
                                        <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Username:</span>
                                        <input
                                            type="text"
                                            defaultValue={(album as any).username || ''}
                                            placeholder="Set Code (e.g. john123)"
                                            onBlur={(e) => {
                                                if (e.target.value !== (album as any).username) {
                                                    handleUpdateUsername(album.id, e.target.value);
                                                }
                                            }}
                                            className="flex-1 bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white placeholder:text-white/20 font-mono focus:border-primary/50 outline-none"
                                        />
                                    </div>

                                    <span className="text-[10px] text-white/30 block mt-1">Created: {new Date(album.created_at).toLocaleDateString()}</span>
                                </div>

                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <button
                                        onClick={() => copyToClipboard(album)}
                                        className="flex-1 md:flex-none px-3 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 border border-blue-500/20"
                                    >
                                        <Copy className="w-3 h-3" /> Copy Link
                                    </button>
                                    <button
                                        onClick={() => fetchAndOpenMappings(album.id)}
                                        disabled={isFetchingMappings}
                                        className="flex-1 md:flex-none px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 border border-purple-500/20 disabled:opacity-50"
                                    >
                                        {isFetchingMappings ? <Loader2 className="w-3 h-3 animate-spin" /> : <Eye className="w-3 h-3" />}
                                        View Mappings
                                    </button>

                                    <a
                                        href={`/scan?albumId=${(album as any).username || album.id}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 md:flex-none px-3 py-2 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 border border-primary/20"
                                    >
                                        <Eye className="w-3 h-3" /> Test Scanner
                                    </a>
                                    <button
                                        onClick={() => {
                                            setAlbumToDelete(album.id);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-xl transition-colors flex items-center gap-2 border border-red-500/20"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {/* Target Mappings Modal */}
            <Dialog open={isMappingsModalOpen} onOpenChange={setIsMappingsModalOpen}>
                <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto bg-neutral-950 border border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Album target Previews & Mappings</DialogTitle>
                        <DialogDescription className="text-white/40 text-xs">Verify your uploaded photographs mapped indexing linking trigger positions.</DialogDescription>
                    </DialogHeader>

                    {selectedAlbumImages.length === 0 ? (
                        <p className="text-white/40 text-center py-8">No source images backed up for this album layout previews.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {selectedAlbumImages.map((img) => {
                                const map = selectedAlbumMappings.find(m => Number(m.target_index) === Number(img.target_index));
                                return (
                                    <div key={img.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-primary">Target Index {img.target_index}</span>
                                            {map && <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{map.player_type.toUpperCase()}</span>}
                                        </div>

                                        <div className="aspect-video w-full bg-black/40 rounded-lg overflow-hidden flex items-center justify-center relative">
                                            <img src={img.file_path} alt={`Target ${img.target_index}`} className="w-full h-full object-cover" />
                                        </div>

                                        {map && (
                                            <div className="space-y-1">
                                                <span className="text-[10px] text-white/40 block">Mapped Video:</span>
                                                <video
                                                    src={map.video_url}
                                                    controls
                                                    className="w-full aspect-video rounded-lg bg-black object-cover mt-1"
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Custom Delete Confirmation Dialog */}
            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                <DialogContent className="sm:max-w-md bg-neutral-950 border border-white/10 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-red-500 flex items-center gap-2">
                            <Trash2 className="w-5 h-5" /> Confirm Deletion
                        </DialogTitle>
                        <DialogDescription className="text-white/60 text-sm pt-2">
                            Are you sure you want to delete this album? This action is permanent and will remove all uploaded images, video assets and target mappings from both target database layouts and AR scanners indefinitely.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <button
                            onClick={() => {
                                setIsDeleteModalOpen(false);
                                setAlbumToDelete(null);
                            }}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-colors border border-white/10"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={async () => {
                                if (albumToDelete) {
                                    await handleDeleteAlbum(albumToDelete);
                                    setIsDeleteModalOpen(false);
                                    setAlbumToDelete(null);
                                }
                            }}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg"
                        >
                            Confirm Delete
                        </button>
                    </div>
                </DialogContent>
            </Dialog>

            {isCompiling && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex flex-col items-center justify-center text-center space-y-6">
                    <div className="relative">
                        <Loader2 className="w-20 h-20 animate-spin text-primary opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-black text-white">{syncProgress}%</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-xl font-black text-white tracking-widest uppercase italic">{syncStatus || "Syncing..."}</h2>
                        <p className="text-white/40 text-[10px] max-w-xs uppercase tracking-widest font-bold">Please keep this tab open. Updating global universal scanner.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ARUpload;
