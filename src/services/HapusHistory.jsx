export const deleteHistory = async (event_history_id, token) => {
  const base_url = 'https://f15045b4c2d4.ngrok-free.app/';

  try {
    const response = await fetch(`${base_url}/history/${event_history_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420',
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Gagal menghapus event");
    return result;
  } catch (err) {
    console.error('Delete failed:', err);
    throw err;
  }
};
