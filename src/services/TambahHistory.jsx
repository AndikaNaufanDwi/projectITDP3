export const tambahHistory = async ({ token, data }) => {
    const BASE_URL = 'https://a3f8-202-146-38-197.ngrok-free.app';
  const formData = new FormData();
  formData.append('deal_ref', data.deal_ref);
  formData.append('jenis_kegiatan', data.jenis_kegiatan);
  formData.append('keterangan_kegiatan', data.keterangan_kegiatan || '');
  formData.append('tanggal', data.tanggal || '');
  formData.append('status', data.status || '');
  if (data.image) {
    formData.append('image', data.image);
  }

  const response = await fetch(`${BASE_URL}/history`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    },
    body: formData
  });

  let result;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    result = await response.json();
  } else {
    const text = await response.text();
    console.error('Unexpected non-JSON response:', text);
    throw new Error('Server mengembalikan response yang tidak valid');
  }

  if (!response.ok) {
    throw new Error(result.error || 'Gagal menambahkan history');
  }

  return result;
};