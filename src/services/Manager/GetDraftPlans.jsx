export const fetchDraftPlans = async (token) => {
  const base_url = 'https://608c-210-210-144-170.ngrok-free.app/';

  try {
    const response = await fetch(`${base_url}/roadmap-plans`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Gagal fetch draft plans');
    }

    return data.filter(plan => plan.status === "Pending" || plan.status === "Rejected");
  } catch (err) {
    console.error("Fetch Draft Plans Error:", err);
    return [];
  }
};
