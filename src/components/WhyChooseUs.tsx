import React from 'react';
import { ShieldCheck, Headset, Shield, Clock, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onGetStarted: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onGetStarted }) => {
  const benefits = [
    {
      id: 'verified',
      icon: <ShieldCheck className="w-5 h-5 text-white stroke-[2.2]" />,
      heading: 'Verified Listings',
      text: 'All properties are verified for your safety.',
    },
    {
      id: 'agents',
      icon: <Headset className="w-5 h-5 text-white stroke-[2.2]" />,
      heading: 'Trusted Agents',
      text: 'Work with professional and responsive agents.',
    },
    {
      id: 'security',
      icon: <Shield className="w-5 h-5 text-white stroke-[2.2]" />,
      heading: 'Secure Transactions',
      text: 'Your data and payments are always protected.',
    },
    {
      id: 'support',
      icon: <Clock className="w-5 h-5 text-white stroke-[2.2]" />,
      heading: '24/7 Support',
      text: "We're here whenever you need us.",
    },
  ];

  return (
    <section id="about" className="w-full bg-[#F0F9F5] py-14 border-b border-[#E3E9EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Left Column: Heading + 4 Benefits */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102235] tracking-tight">
              Why Choose HomeFind?
            </h2>
            <p className="text-sm text-[#526176] mt-2 mb-8 font-normal">
              We make finding the right property easier, faster, and safer.
            </p>

            {/* 4 Benefits Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
              {benefits.map((b) => (
                <div key={b.id} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-full bg-[#079B68] flex items-center justify-center mb-3 shadow-2xs">
                    {b.icon}
                  </div>
                  <h4 className="text-sm font-bold text-[#102235] mb-1.5">
                    {b.heading}
                  </h4>
                  <p className="text-xs text-[#526176] leading-relaxed">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Promotional Card */}
          <div className="lg:col-span-4">
            <div className="relative rounded-2xl overflow-hidden shadow-lg min-h-[220px] sm:min-h-[240px] flex flex-col justify-end p-6 group">
              {/* Background House Image */}
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                alt="Find your dream home"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1E2E]/95 via-[#0E1E2E]/80 to-[#0E1E2E]/50" />

              {/* Text and CTA */}
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
                  Ready to Find <br />
                  Your Dream Home?
                </h3>
                <p className="text-xs text-gray-200 leading-relaxed mb-4 max-w-xs">
                  Join thousands of happy clients who found their perfect property with HomeFind.
                </p>
                <button
                  onClick={onGetStarted}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#079B68] hover:bg-[#068458] text-white text-xs font-semibold rounded-lg shadow-sm transition-all duration-200 hover:gap-2 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
