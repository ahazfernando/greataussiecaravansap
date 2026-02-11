// Upload image to Cloudinary (client-side)
export const uploadImage = async (file: File | Blob, folder?: string): Promise<string> => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  // Support both variable names for backward compatibility
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 
                       process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary configuration is missing. Please check your environment variables. Cloud Name and Upload Preset are required.');
  }

  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    if (folder) {
      formData.append('folder', folder);
    }

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          reject(new Error(data.error.message));
        } else {
          resolve(data.secure_url);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// Get Cloudinary URL from public ID
export const getCloudinaryUrl = (publicId: string, options?: {
  width?: number;
  height?: number;
  crop?: string;
  quality?: number;
}): string => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  
  let transformations = '';
  if (options) {
    const params: string[] = [];
    if (options.width) params.push(`w_${options.width}`);
    if (options.height) params.push(`h_${options.height}`);
    if (options.crop) params.push(`c_${options.crop}`);
    if (options.quality) params.push(`q_${options.quality}`);
    if (params.length > 0) {
      transformations = params.join(',') + '/';
    }
  }
  
  return `${baseUrl}/${transformations}${publicId}`;
};

