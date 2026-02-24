"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadImage } from "@/lib/cloudinary";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface MultiImageUploadProps {
    value?: string[];
    onChange: (urls: string[]) => void;
    folder?: string;
    label?: string;
    accept?: string;
    maxFiles?: number;
}

export function MultiImageUpload({
    value = [],
    onChange,
    folder = "warranty_claims",
    label = "Upload Images",
    accept = "image/*",
    maxFiles = 5,
}: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [previews, setPreviews] = useState<string[]>(value);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    const validateAndUpload = useCallback(
        async (files: File[]) => {
            if (previews.length + files.length > maxFiles) {
                toast({
                    title: "Too many files",
                    description: `You can only upload up to ${maxFiles} images.`,
                    variant: "destructive",
                });
                return;
            }

            const validFiles = files.filter((file) => {
                if (!file.type.startsWith("image/")) {
                    toast({
                        title: "Invalid file type",
                        description: `${file.name} is not a valid image file.`,
                        variant: "destructive",
                    });
                    return false;
                }
                if (file.size > 10 * 1024 * 1024) {
                    toast({
                        title: "File too large",
                        description: `${file.name} is larger than 10MB.`,
                        variant: "destructive",
                    });
                    return false;
                }
                return true;
            });

            if (validFiles.length === 0) return;

            setUploading(true);

            const newPreviews = [...previews];
            const newUrls = [...value];

            try {
                await Promise.all(
                    validFiles.map(async (file) => {
                        // Optimistic preview
                        const reader = new FileReader();
                        const previewPromise = new Promise<string>((resolve) => {
                            reader.onloadend = () => {
                                resolve(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                        });
                        const localPreview = await previewPromise;
                        newPreviews.push(localPreview);
                        setPreviews([...newPreviews]); // Update state early for fast feedback

                        // Actual Cloudinary upload
                        const imageUrl = await uploadImage(file, folder);
                        newUrls.push(imageUrl);

                        // Swap out the local preview for the real Cloudinary URL
                        const previewIndex = newPreviews.indexOf(localPreview);
                        if (previewIndex !== -1) {
                            newPreviews[previewIndex] = imageUrl;
                        }
                    })
                );

                setPreviews([...newPreviews]);
                onChange(newUrls);

                toast({
                    title: "Success",
                    description: `Successfully uploaded ${validFiles.length} image(s).`,
                });
            } catch (error: any) {
                toast({
                    title: "Upload failed",
                    description: error.message || "Failed to upload images. Please try again.",
                    variant: "destructive",
                });
                // Revert previews to Match actual uploaded URLs on failure
                setPreviews([...value]);
            } finally {
                setUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            }
        },
        [folder, onChange, maxFiles, previews, toast, value]
    );

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        await validateAndUpload(files);
    };

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        async (e: React.DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragging(false);

            const files = Array.from(e.dataTransfer.files || []);
            if (files.length === 0) return;
            await validateAndUpload(files);
        },
        [validateAndUpload]
    );

    const handleRemove = (indexToRemove: number) => {
        const newPreviews = previews.filter((_, index) => index !== indexToRemove);
        const newUrls = value.filter((_, index) => index !== indexToRemove);
        setPreviews(newPreviews);
        onChange(newUrls);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    // Sync internal preview state if external value changes (e.g. form reset)
    useEffect(() => {
        if (value.length === 0 && previews.length > 0) {
            setPreviews([]);
        }
    }, [value, previews]);

    return (
        <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-300 ml-1">{label}</Label>

            {/* Upload Dropzone */}
            {previews.length < maxFiles && (
                <Card
                    ref={dropZoneRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`cursor-pointer transition-all bg-black/40 border-gray-800 hover:bg-black/60 ${isDragging
                            ? "border-accent border-2"
                            : "border-dashed hover:border-accent/50"
                        }`}
                    onClick={handleClick}
                >
                    <CardContent className="p-8">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            {uploading ? (
                                <>
                                    <Loader2 className="h-10 w-10 text-accent animate-spin" />
                                    <div className="text-center">
                                        <p className="text-sm text-white font-medium">Uploading images...</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="rounded-full bg-accent/10 p-4">
                                        {isDragging ? (
                                            <ImageIcon className="h-8 w-8 text-accent" />
                                        ) : (
                                            <Upload className="h-8 w-8 text-accent" />
                                        )}
                                    </div>
                                    <div className="text-center">
                                        <Label className="cursor-pointer text-base font-medium">
                                            <span className="text-accent hover:underline">
                                                {isDragging ? "Drop images here" : "Click to upload files"}
                                            </span>
                                            {!isDragging && " or drag and drop"}
                                        </Label>
                                        <p className="text-xs text-gray-400 mt-2">
                                            PNG, JPG, up to 10MB (Max {maxFiles} images)
                                        </p>
                                    </div>
                                    <Input
                                        ref={fileInputRef}
                                        type="file"
                                        accept={accept}
                                        onChange={handleFileSelect}
                                        disabled={uploading}
                                        className="hidden"
                                        multiple
                                    />
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Image Previews Grid */}
            {previews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {previews.map((previewUrl, index) => (
                        <div key={index} className="relative group w-full aspect-square rounded-lg overflow-hidden border border-gray-800 bg-black/50">
                            <Image
                                src={previewUrl}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity scale-75 hover:scale-100"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemove(index);
                                }}
                                disabled={uploading}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
