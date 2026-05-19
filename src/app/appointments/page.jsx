import AppointmentCard from "@/components/AppointmentCard";
import { fetchAppointment } from "@/lib/appointments/data";
import { BriefcaseMedical } from "lucide-react";



const AppointmentPage = async () => {
  const appointments = await fetchAppointment();
  console.log(appointments);

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Available Appointments
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Book your medical consultation
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <AppointmentCard appointment={appointment} key={appointment._id} />
          ))}
        </div>

        {/* Empty State */}
        {appointments.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
            <BriefcaseMedical
              size={48}
              className="mx-auto mb-4 text-gray-400"
            />
            <h3 className="text-xl font-semibold text-gray-600">
              No appointments available
            </h3>
            <p className="mt-2 text-gray-500">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentPage;
