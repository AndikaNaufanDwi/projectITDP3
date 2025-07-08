export const fetchUserHistory = async (setData) => {
  const BASE_URL = 'https://f15045b4c2d4.ngrok-free.app/';

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/history/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mengambil history user");
    }

    setData(data);
  } catch (error) {
    console.error("Gagal mengambil history user:", error);
  }
};
