
export const fetchAppointment = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`);
    if (!res.ok) {
      console.error(`Backend returned ${res.status} for appointments fetch`);
      return [];
    }
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return [];
  }
};