export const fetchUserRoadmapPlans = async () => {
  const BASE_URL = 'https://f15045b4c2d4.ngrok-free.app/';
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
