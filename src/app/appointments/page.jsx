import { fetchAppointment } from "@/lib/appointments/data";
import AppointmentSearch from "@/components/AppointmentSearch";

export const metadata = {
  title: "All Appointments | DocAppoint",
  description: "Browse and search through all available doctors to find the perfect specialist for your needs.",
};

const AppointmentPage = async () => {
  const appointments = await fetchAppointment();

  return <AppointmentSearch appointments={appointments} />;
};

export default AppointmentPage;
