import React, { useState } from 'react';
import { X, Star, ThumbsUp, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReviewsModal: React.FC<ReviewsModalProps> = ({ isOpen, onClose }) => {
  const [newReviewText, setNewReviewText] = useState('');
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setNewReviewText('');
      setNewName('');
      setNewCity('');
    }, 2000);
  };

  const additionalReviews = [
    {
      id: 'rev-4',
      quote: '“Verified titles gave us complete peace of mind when buying our duplex in Ikoyi.”',
      name: 'Dr. Kunle O.',
      location: 'Lagos',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    },
    {
      id: 'rev-5',
      quote: '“Transparent pricing with no hidden developer fees. Truly unmatched service!”',
      name: 'Amaka N.',
      location: 'Enugu',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 5,
    },
  ];

  const allReviews = [...TESTIMONIALS, ...additionalReviews];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden my-6 border border-[#E3E9EF] flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E3E9EF] flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold text-[#102235]">Client Reviews & Ratings</h3>
            <p className="text-xs text-[#526176]">Average rating: 4.9/5 from 1,200+ verified buyers & tenants</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {allReviews.map((t) => (
            <div key={t.id} className="p-4 rounded-xl border border-[#E3E9EF] bg-[#F5F8FC]/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h5 className="text-xs font-bold text-[#102235]">{t.name}</h5>
                    <span className="text-[11px] text-gray-400">{t.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-[#526176] italic mt-2">{t.quote}</p>
            </div>
          ))}

          {/* Leave a review section */}
          <div className="pt-4 border-t border-[#E3E9EF]">
            <h4 className="text-xs font-bold text-[#102235] mb-2">Leave a Review</h4>
            {submitted ? (
              <div className="p-3 bg-[#E8F7F0] text-[#079B68] rounded-lg text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Thank you! Your review has been submitted for verification.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="p-2 text-xs border border-[#E3E9EF] rounded-lg"
                  />
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="p-2 text-xs border border-[#E3E9EF] rounded-lg"
                  />
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Share your experience with HomeFind..."
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  className="w-full p-2 text-xs border border-[#E3E9EF] rounded-lg"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#079B68] text-white text-xs font-semibold rounded-lg hover:bg-[#068458]"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
