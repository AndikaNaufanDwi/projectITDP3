export const fetchHistoryTable = async (setData, page = 1, setTotalPages) => {
const BASE_URL = 'https://608c-210-210-144-170.ngrok-free.app/';
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/history?page=${page}&limit=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const result = await response.json();
    setData(result.data);
    setTotalPages(result.totalPages);
  } catch (error) {
    console.error("Gagal mengambil data history:", error);
  }
};
