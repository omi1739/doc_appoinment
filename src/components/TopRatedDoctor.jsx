import { fetchAppointment } from '@/lib/appointments/data'
import AppointmentCard from './AppointmentCard';
import React from 'react'

const TopRatedDoctor = async () => {
    const appointments = await fetchAppointment();
    
    // Sort by rating and get top 3
    const topDoctors = appointments
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 3);

    return (
        <div className="py-16 px-4 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Top Rated Doctors
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-slate-400">
                        Meet our most trusted medical professionals
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {topDoctors.map((appointment) => (
                        <AppointmentCard 
                            appointment={appointment} 
                            key={appointment._id} 
                        />
                    ))}
                </div>

                {/* Empty State */}
                {topDoctors.length === 0 && (
                    <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 py-16 text-center">
                        <h3 className="text-xl font-semibold text-gray-600 dark:text-slate-400">
                            No doctors available
                        </h3>
                        <p className="mt-2 text-gray-500 dark:text-slate-500">Please check back later</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TopRatedDoctor
