export const downloadDocxFile = async (cif) => {
  const token = localStorage.getItem("token");
  const base_url = "https://2b07-210-210-144-170.ngrok-free.app";

  try {
    const response = await fetch(`${base_url}/perusahaan/${cif}/docx`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "69420",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `perusahaan_${cif}.docx`;
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download error:", error);
    throw error;
  }
};
