export const fetchRoadmap = async (dealRef, setRoadmapList) => {
  const base_url = 'https://a3f8-202-146-38-197.ngrok-free.app';
  const token = localStorage.getItem('token'); 

  try {
    const response = await fetch(`${base_url}/roadmap-events/${dealRef}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setRoadmapList(data);
  } catch (err) {
    console.error('Gagal fetch history:', err);
  }
};
