export const tambahHistory = async ({ token, data }) => {
  const formData = new FormData();
  const BASE_URL = 'https://2dbc-182-253-124-143.ngrok-free.app/';

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
      Authorization: `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    },
    body: formData,
  });

  const contentType = response.headers.get('content-type');
  const result = contentType?.includes('application/json')
    ? await response.json()
    : { error: await response.text() };

  if (!response.ok) {
    throw new Error(result.error || 'Gagal menambahkan history');
  }

  return result;
};
