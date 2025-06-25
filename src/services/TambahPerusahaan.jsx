const base_url = 'https://2dbc-182-253-124-143.ngrok-free.app/';

export const submitPerusahaan = async (data) => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${base_url}/perusahaan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Submit failed:', errText);
      return { success: false, error: errText };
    }
    const result = await res.json();
    return { success: true, data: result };

  } catch (error) {
    console.error('Submit error:', error);
    return { success: false, error };
  }
};
