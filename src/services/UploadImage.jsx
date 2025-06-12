export const uploadImage = async (file) => {
  const formData = new FormData();
  const base_url = 'https://2b07-210-210-144-170.ngrok-free.app'; 
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