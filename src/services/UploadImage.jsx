export const uploadImage = async (file) => {
  const formData = new FormData();
  const base_url = 'https://a3f8-202-146-38-197.ngrok-free.app'; 
  formData.append('image', file);

  try {
    const response = await fetch(`${base_url}/upload-image`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Gagal mengunggah gambar');
    }

    return data.url;
  } catch (err) {
    console.error('Upload image error:', err.message);
    throw err;
  }
};