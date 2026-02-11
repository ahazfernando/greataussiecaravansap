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

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  accept?: string;
}

export function ImageUpload({
  value,
  onChange,
  folder = "caravans",
  label = "Upload Image",
  accept = "image/*",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const validateAndUpload = useCallback(async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const imageUrl = await uploadImage(file, folder);
      onChange(imageUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image. Please try again.",
        variant: "destructive",
      });
      setPreview(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [folder, onChange, toast]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await validateAndUpload(file);
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

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await validateAndUpload(file);
  }, [validateAndUpload]);

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Update preview when value changes externally
  useEffect(() => {
    if (value && value !== preview) {
      setPreview(value);
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {preview ? (
        <Card>
          <CardContent className="p-0">
            <div className="relative group">
              <div className="relative w-full h-64 rounded-lg overflow-hidden border border-border bg-muted">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 shadow-lg"
                onClick={handleRemove}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                  <div className="flex flex-col items-center gap-2 text-white">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`cursor-pointer transition-all ${
            isDragging
              ? "border-primary border-2 bg-primary/5"
              : "border-dashed hover:border-primary/50"
          }`}
          onClick={handleClick}
        >
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              {uploading ? (
                <>
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                  <div className="text-center">
                    <p className="text-sm font-medium">Uploading image...</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Please wait
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-full bg-primary/10 p-4">
                    {isDragging ? (
                      <ImageIcon className="h-8 w-8 text-primary" />
                    ) : (
                      <Upload className="h-8 w-8 text-primary" />
                    )}
                  </div>
                  <div className="text-center">
                    <Label className="cursor-pointer text-base font-medium">
                      <span className="text-primary hover:underline">
                        {isDragging ? "Drop image here" : "Click to upload"}
                      </span>
                      {!isDragging && " or drag and drop"}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG, GIF, WEBP up to 10MB
                    </p>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    onChange={handleFileSelect}
                    disabled={uploading}
                    className="hidden"
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
      {value && !preview && !uploading && (
        <div className="text-sm text-muted-foreground">
          Current image:{" "}
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-all"
          >
            {value}
          </a>
        </div>
      )}
    </div>
  );
}

