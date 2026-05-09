const storage = require('../config/supabase');

const uploadFile = async (bucket, file) => {
  const ext = file.originalname.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await storage
    .from(bucket)
    .upload(path, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw new Error(`Supabase upload error: ${error.message}`);

  const { data } = storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const deleteFile = async (bucket, url) => {
  if (!url) return;
  const marker = `/public/${bucket}/`;
  const idx = url.indexOf(marker);
  if (idx === -1) return;
  const path = url.slice(idx + marker.length);
  await storage.from(bucket).remove([path]);
};

module.exports = { uploadFile, deleteFile };
