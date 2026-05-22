import React from "react";
import { ShieldCheck, HeartPulse, Clock, Users } from "lucide-react";

export default function AboutUs() {
  const features = [
    {
      title: "Trusted Professionals",
      description: "Our platform connects you with highly qualified and experienced medical experts.",
      icon: <ShieldCheck size={32} className="text-cyan-500" />
    },
    {
      title: "Patient-Centric Care",
      description: "We prioritize your health, offering personalized guidance and care for every patient.",
      icon: <HeartPulse size={32} className="text-pink-500" />
    },
    {
      title: "24/7 Availability",
      description: "Book appointments seamlessly at any time, from the comfort of your own home.",
      icon: <Clock size={32} className="text-blue-500" />
    },
    {
      title: "Community Focused",
      description: "We are committed to building a healthier community through accessible healthcare.",
      icon: <Users size={32} className="text-purple-500" />
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            About <span className="text-cyan-600 dark:text-cyan-400">DocAppoint</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-slate-400">
            Dedicated to transforming healthcare accessibility. We bring expert doctors and advanced booking technologies directly to your fingertips.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl dark:hover:shadow-cyan-900/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
