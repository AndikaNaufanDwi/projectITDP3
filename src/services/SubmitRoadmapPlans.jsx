export const submitRoadmapPlan = async ({ cif, deal_ref, roadmap }) => {
  const BASE_URL = 'https://2dbc-182-253-124-143.ngrok-free.app/';
  const token = localStorage.getItem('token');

  const payload = {
    deal_ref,
    cif,
    events: roadmap.map(item => ({
      jenis_kegiatan: item.kegiatan,
      keterangan_kegiatan: item.detail,
      tanggal: item.tanggal
    }))
  };

  try {
    const response = await fetch(`${BASE_URL}/roadmap-plans`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || result.error || 'Gagal membuat roadmap plan');
    }

    return { success: true, data: result };
  } catch (err) {
    console.error('Submit Roadmap Error:', err);
    return { success: false, error: err.message };
  }
};
