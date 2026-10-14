import React, { useState } from 'react';
import { X, MapPin, Bed, Bath, Maximize2, ShieldCheck, Heart, Phone, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';

interface PropertyModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
}

export const PropertyModal: React.FC<PropertyModalProps> = ({
  property,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('11:00 AM');
  const [tourName, setTourName] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourBooked, setTourBooked] = useState(false);

  if (!isOpen || !property) return null;

  const images = property.gallery && property.gallery.length > 0
    ? property.gallery
    : [property.image];

  const handleBookTour = (e: React.FormEvent) => {
    e.preventDefault();
    setTourBooked(true);
    setTimeout(() => {
      setTourBooked(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Image Main */}
        <div className="relative w-full h-64 sm:h-80 bg-gray-900">
          <img
            src={images[activeImageIndex] || property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute top-4 left-4 flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white shadow-xs ${
                property.status === 'For Sale' ? 'bg-[#079B68]' : 'bg-[#2563EB]'
              }`}
            >
              {property.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-[#102235] shadow-xs flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#079B68]" />
              Verified
            </span>
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => onToggleFavorite(property.id, e)}
            className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              isFavorite
                ? 'bg-red-50 text-red-600 shadow-sm'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-white'}`} />
            <span>{isFavorite ? 'Saved' : 'Save'}</span>
          </button>
        </div>

        {/* Gallery Thumbnails (if multiple) */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 bg-gray-50 border-b border-[#E3E9EF] overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#079B68] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Header & Price */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#E3E9EF]">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#102235]">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-xs text-[#526176] mt-1.5">
                <MapPin className="w-4 h-4 text-[#079B68]" />
                <span>{property.location}</span>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-2xl font-extrabold text-[#079B68] block">
                {property.price}
                {property.pricePeriod && (
                  <span className="text-sm text-[#526176] font-normal ml-1">
                    {property.pricePeriod}
                  </span>
                )}
              </span>
              <span className="text-[11px] text-gray-400">Guaranteed secure escrow</span>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="grid grid-cols-3 gap-4 py-4 border-b border-[#E3E9EF] text-center">
            <div className="bg-[#F5F8FC] p-3 rounded-xl">
              <Bed className="w-5 h-5 text-[#079B68] mx-auto mb-1" />
              <span className="text-xs font-bold text-[#102235] block">{property.beds} Bedrooms</span>
              <span className="text-[10px] text-gray-400">En-suite</span>
            </div>
            <div className="bg-[#F5F8FC] p-3 rounded-xl">
              <Bath className="w-5 h-5 text-[#079B68] mx-auto mb-1" />
              <span className="text-xs font-bold text-[#102235] block">{property.baths} Bathrooms</span>
              <span className="text-[10px] text-gray-400">Fitted fixtures</span>
            </div>
            <div className="bg-[#F5F8FC] p-3 rounded-xl">
              <Maximize2 className="w-5 h-5 text-[#079B68] mx-auto mb-1" />
              <span className="text-xs font-bold text-[#102235] block">{property.sqft} sqft</span>
              <span className="text-[10px] text-gray-400">Total area</span>
            </div>
          </div>

          {/* Description */}
          <div className="py-4 border-b border-[#E3E9EF]">
            <h4 className="text-sm font-bold text-[#102235] mb-2">About this Property</h4>
            <p className="text-xs sm:text-sm text-[#526176] leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features & Amenities */}
          <div className="py-4 border-b border-[#E3E9EF]">
            <h4 className="text-sm font-bold text-[#102235] mb-3">Key Amenities</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#526176]">
              {['24/7 Electricity', 'Gated Community Security', 'Treated Water', 'Landscaped Garden', 'Ample Parking', 'Fitted Kitchen'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#079B68]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Tour Form */}
          <div className="pt-4">
            <h4 className="text-sm font-bold text-[#102235] mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#079B68]" />
              Schedule a Physical or Virtual Tour
            </h4>

            {tourBooked ? (
              <div className="p-4 bg-[#E8F7F0] rounded-xl text-center text-[#079B68] font-medium text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Tour scheduled successfully! Our assigned agent will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleBookTour} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={tourName}
                  onChange={(e) => setTourName(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68]"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number / WhatsApp"
                  value={tourPhone}
                  onChange={(e) => setTourPhone(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68]"
                />
                <input
                  type="date"
                  required
                  value={tourDate}
                  onChange={(e) => setTourDate(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68]"
                />
                <select
                  value={tourTime}
                  onChange={(e) => setTourTime(e.target.value)}
                  className="px-3 py-2 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68] bg-white"
                >
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>02:00 PM</option>
                  <option>04:00 PM</option>
                </select>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#079B68] hover:bg-[#068458] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm Tour Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
