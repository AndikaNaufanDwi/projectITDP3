export const fetchRoadmapEventsById = async (planId) => {
  const token = localStorage.getItem('token');
  const BASE_URL = 'https://608c-210-210-144-170.ngrok-free.app/';

  try {
    const res = await fetch(`${BASE_URL}/roadmap-plans/${planId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Gagal mengambil data roadmap');

    return data;
  } catch (error) {
    console.error('Gagal fetch roadmap events:', error);
    return [];
  }
};


export const UpdateRoadmap = async (id, status) => {
  const token = localStorage.getItem('token');
  const BASE_URL = 'https://608c-210-210-144-170.ngrok-free.app/';

  const res = await fetch(`${BASE_URL}/roadmap/${id}/status`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
    },
    body: JSON.stringify({ status }),
  });
  return await res.json();
};

export const updateRoadmapStatus = async (planId, newStatus) => {
  const token = localStorage.getItem('token');
  const BASE_URL = 'https://608c-210-210-144-170.ngrok-free.app/';

  try {
    const res = await fetch(`${BASE_URL}/roadmap-plans/${planId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Update status gagal');

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Update roadmap status failed:', error);
    return { success: false, message: error.message };
  }
};
