export const fetchDraftPlans = async (token, setPlans) => {
  const base_url = 'https://2b07-210-210-144-170.ngrok-free.app'; 

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

    const draftOnly = data.filter(plan => plan.status === "Draft");
    setPlans(draftOnly);
  } catch (err) {
    console.error("Fetch Draft Plans Error:", err);
  }
};
