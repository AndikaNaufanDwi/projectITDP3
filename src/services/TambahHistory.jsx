export const tambahHistory = async ({ token, data }) => {
  const BASE_URL = 'https://2b07-210-210-144-170.ngrok-free.app';

  const response = await fetch(`${BASE_URL}/history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': '69420'
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || 'Gagal menambahkan history');
  }

  return result;
};
