export const fetchHistoryTable = async (setData) => {
    const BASE_URL = 'https://f15045b4c2d4.ngrok-free.app/';
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const data = await response.json();
    setData(data);
  } catch (error) {
    console.error("Gagal mengambil data history:", error);
  }
};