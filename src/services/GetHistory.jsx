export const fetchHistory = async (dealRef, setHistoryList) => {
  const base_url = 'https://a3f8-202-146-38-197.ngrok-free.app';
  const token = localStorage.getItem('token'); 

  try {
    const response = await fetch(`${base_url}/history/${dealRef}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setHistoryList(data);
  } catch (err) {
    console.error('Gagal fetch history:', err);
  }
};
