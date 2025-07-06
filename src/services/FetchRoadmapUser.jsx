export const fetchUserRoadmapPlans = async () => {
  const BASE_URL = 'https://608c-210-210-144-170.ngrok-free.app/';
  const token = localStorage.getItem('token');

  try {
    const response = await fetch(`${BASE_URL}/roadmap-plans/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil data roadmap');
    }

    return data;
  } catch (err) {
    console.error("Fetch Roadmap Plans Error:", err);
    return [];
  }
};
