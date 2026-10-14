import React from 'react';
import { Star, ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

interface TestimonialsProps {
  onViewAllReviews: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onViewAllReviews }) => {
  return (
    <section className="w-full bg-white py-14 border-b border-[#E3E9EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102235] tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-sm text-[#526176] mt-1 font-normal">
              Real stories from real people.
            </p>
          </div>

          <button
            onClick={onViewAllReviews}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#079B68] hover:text-[#068458] transition-colors group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3 Testimonial Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-5 border border-[#E3E9EF] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3.5">
                {/* Circular Profile Avatar */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-100 shadow-2xs"
                  loading="lazy"
                />

                {/* Testimonial Quote & Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#526176] italic leading-relaxed mb-3">
                    {t.quote}
                  </p>
                  <div>
                    <h5 className="text-xs font-bold text-[#102235]">
                      {t.name}
                    </h5>
                    <span className="text-[11px] text-[#8A9BA8] block">
                      {t.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Gold Stars */}
              <div className="flex justify-end items-center gap-1 mt-3">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
