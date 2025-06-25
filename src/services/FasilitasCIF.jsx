const BASE_URL = 'https://2dbc-182-253-124-143.ngrok-free.app/';

export const fetchFasilitasByCIF = async (cif, setFacilities) => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${BASE_URL}/perusahaan/${cif}/fasilitas`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': '69420'
      }
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok || !contentType?.includes('application/json')) {
      const text = await res.text();
      console.error('Invalid response:', text);
      return;
    }

    const data = await res.json();
    console.log('Fasilitas data:', data);
    setFacilities(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
