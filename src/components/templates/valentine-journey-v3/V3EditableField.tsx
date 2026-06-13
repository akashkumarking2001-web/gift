import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { GiftService } from '../../../lib/gifts';

interface V3EditableFieldProps {
    value: any;
    onUpdate: (value: any) => void;
    isEditing: boolean;
    type?: 'text' | 'textarea' | 'image' | 'multi-image';
    className?: string;
    label?: string;
    placeholder?: string;
    children?: React.ReactNode;
}

const V3EditableField: React.FC<V3EditableFieldProps> = ({
    value,
    onUpdate,
    isEditing,
    type = 'text',
    className = "",
    label,
    placeholder = "Type here...",
    children
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

    if (!isEditing) return <>{children || value}</>;

    const handleTextChange = (e: React.FocusEvent<HTMLDivElement>) => {
        onUpdate(e.currentTarget.innerText);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploading(true);
            try {
                const url = await GiftService.uploadMedia(e.target.files[0]);
                if (url) {
                    onUpdate(url);
                }
            } catch (error) {
                console.error("Upload failed", error);
            } finally {
                setUploading(false);
            }
        }
    };

    if (type === 'image') {
        return (
            <div className={`relative group ${className}`}>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-pink-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center cursor-pointer"
                >
                    <div className="bg-white p-4 rounded-2xl shadow-2xl text-pink-600 hover:scale-110 transition-transform">
                        {uploading ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8" />
                        )}
                    </div>
                </div>
                {children}
                <div className="absolute -top-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                    <span className="bg-pink-600 text-white text-[8px] px-3 py-1 rounded-full uppercase font-black tracking-widest flex items-center gap-1.5 shadow-lg">
                        <ImageIcon className="w-2.5 h-2.5" /> {label || 'Replace Image'}
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative group min-w-[50px] ${className}`}>
            <div
                contentEditable
                suppressContentEditableWarning
                onBlur={handleTextChange}
                className="outline-none focus:ring-4 focus:ring-pink-500/30 rounded-2xl px-3 -mx-3 transition-all block w-full bg-white/5 hover:bg-white/10"
                data-placeholder={placeholder}
            >
                {value || placeholder}
            </div>
            <div className="absolute -top-6 left-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                <span className="bg-pink-600 text-white text-[8px] px-3 py-1 rounded-full uppercase font-black tracking-widest flex items-center gap-1.5 shadow-lg">
                    <Pencil className="w-2.5 h-2.5" /> {label || 'Edit Text'}
                </span>
            </div>
        </div>
    );
};

export default V3EditableField;
