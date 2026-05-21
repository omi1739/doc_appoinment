import { fetchAppointment } from "@/lib/appointments/data";
import AppointmentSearch from "@/components/AppointmentSearch";

const AppointmentPage = async () => {
  const appointments = await fetchAppointment();

  return <AppointmentSearch appointments={appointments} />;
};

export default AppointmentPage;
