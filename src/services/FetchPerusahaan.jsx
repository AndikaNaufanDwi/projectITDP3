export const fetchPerusahaan = async (setCompanies) => {
  const token = localStorage.getItem('token');
  const base_url = 'https://f15045b4c2d4.ngrok-free.app/';

  try {
    const res = await fetch(`${base_url}/perusahaan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '123',
      },
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok || !contentType?.includes('application/json')) {
      const errText = await res.text();
      console.error('Invalid response format or content-type:', errText);
      return;
    }

    const data = await res.json();
    console.log('Data fetched:', data);
    setCompanies(data);
  } catch (err) {
    console.error('Fetch error:', err);
  }
};
