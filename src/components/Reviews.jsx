import React from "react";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Regular Patient",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      content: "Booking my cardiologist appointment was incredibly easy. The platform is seamless, and the doctor was extremely professional."
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Verified Patient",
      image: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      content: "I love how I can manage all my bookings in one place. The dark mode feature is a nice touch too! Highly recommend."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Verified Patient",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 4,
      content: "Great experience overall. The doctors are highly qualified, and the consultation fees are very transparent."
    }
  ];

  return (
    <section className="py-20 bg-linear-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Patient <span className="text-cyan-600 dark:text-cyan-400">Feedback</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-slate-400">
            Hear from our community of patients who have experienced exceptional care through our platform.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id}
              className="relative bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg dark:shadow-slate-900/40 border border-gray-100 dark:border-slate-700/50 hover:shadow-xl transition-shadow duration-300"
            >
              <Quote size={40} className="absolute top-6 right-6 text-gray-100 dark:text-slate-700/50" />
              
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200 dark:fill-slate-700 dark:text-slate-700"} 
                  />
                ))}
              </div>

              <p className="text-gray-600 dark:text-slate-300 mb-8 relative z-10 leading-relaxed italic">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-100 dark:border-cyan-900/50">
                  <Image 
                    src={review.image} 
                    alt={review.name} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{review.name}</h4>
                  <p className="text-sm text-cyan-600 dark:text-cyan-400 font-medium">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
