// services/UpdateAgunan.js
export const updateAgunan = async (dealRef, agunanList, token) => {
  const base_url = 'https://726c-210-210-144-170.ngrok-free.app';

  try {
    const response = await fetch(`${base_url}/fasilitas/${dealRef}/agunan`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      },
      body: JSON.stringify({
        agunan_list: agunanList,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update agunan');
    }

    return data;
  } catch (error) {
    console.error('Update error:', error.message);
    throw error;
  }
};
