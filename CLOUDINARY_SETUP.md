# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image uploads in your project.

## 📋 Prerequisites

1. A Cloudinary account (sign up at https://cloudinary.com/users/register/free)
2. Your Cloudinary credentials

## 🔧 Setup Steps

### Step 1: Get Your Cloudinary Credentials

1. Log in to your [Cloudinary Dashboard](https://console.cloudinary.com/)
2. Go to the **Dashboard** section
3. You'll find your credentials:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### Step 2: Create an Upload Preset

1. In Cloudinary Dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Configure the preset:
   - **Preset name**: `unsigned_upload` (or any name you prefer)
   - **Signing mode**: Select **Unsigned** (for client-side uploads)
   - **Folder**: Optional - set a default folder (e.g., `caravans`)
   - **Allowed formats**: Select image formats you want to allow
   - Click **Save**

### Step 3: Add Credentials to .env.local

Open your `.env.local` file and add your Cloudinary credentials:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name
```

**Important Notes:**
- `NEXT_PUBLIC_` prefix is required for client-side access
- `CLOUDINARY_API_SECRET` should NOT have `NEXT_PUBLIC_` prefix (server-side only)
- Replace the placeholder values with your actual credentials

### Step 4: Restart Your Dev Server

After adding the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## 🎯 Usage

### In Admin Dashboard

The ImageUpload component is already integrated into:
- **Blog Management**: For featured images and author avatars
- Upload images directly from your computer
- Images are automatically uploaded to Cloudinary
- URLs are saved to your database

### Image Upload Component

The `ImageUpload` component can be used anywhere:

```tsx
import { ImageUpload } from "@/components/admin/ImageUpload";

<ImageUpload
  value={imageUrl}
  onChange={(url) => setImageUrl(url)}
  folder="blogs" // Optional: Cloudinary folder
  label="Upload Image" // Optional: Custom label
/>
```

### Programmatic Upload

You can also upload images programmatically:

```tsx
import { uploadImage } from "@/lib/cloudinary";

const handleUpload = async (file: File) => {
  try {
    const imageUrl = await uploadImage(file, "blogs");
    console.log("Image URL:", imageUrl);
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
```

## 📁 Folder Structure

Images are organized in Cloudinary folders:
- `blogs/` - Blog post featured images
- `avatars/` - Author profile pictures
- `caravans/` - Caravan images (if needed)

## 🔒 Security Best Practices

1. **Upload Preset**: Use unsigned upload presets for client-side uploads
2. **API Secret**: Never expose `CLOUDINARY_API_SECRET` in client-side code
3. **File Validation**: The component validates file type and size (max 10MB)
4. **Rate Limiting**: Consider implementing rate limiting for uploads

## 🐛 Troubleshooting

### "Upload preset not found"
- Make sure the preset name in `.env.local` matches exactly
- Ensure the preset is set to "Unsigned" mode

### "Invalid API key"
- Double-check your API key in `.env.local`
- Make sure there are no extra spaces

### "Cloud name is invalid"
- Verify your cloud name in `.env.local`
- Cloud name is case-sensitive

### Images not uploading
- Check browser console for errors
- Verify all environment variables are set correctly
- Ensure you've restarted the dev server after adding env variables

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Cloudinary Upload Presets](https://cloudinary.com/documentation/upload_presets)










