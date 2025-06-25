export const fetchAgunanSummaryPerAO = async (token) => {
  const BASE_URL = 'https://2dbc-182-253-124-143.ngrok-free.app/';

  try {
    const response = await fetch(`${BASE_URL}/agunan/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const data = await response.json();

    return data.map(item => ({
      id: item.ao_id,
      name: item.ao_name,
      sold: item.terjual,
      notSold: item.belum_terjual,
      totalValue: item.total_jumlah_terjual,
    }));
  } catch (err) {
    console.error("Error fetching agunan summary:", err);
    return [];
  }
};
