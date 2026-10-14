import React, { useState } from 'react';
import { Home, MapPin, Tag, Search, ChevronDown } from 'lucide-react';
import { SearchFilters } from '../types';

interface HeroSectionProps {
  onSearch: (filters: SearchFilters) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Any Type');
  const [priceRange, setPriceRange] = useState('Any Price');
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);

  const propertyTypes = ['Any Type', 'Houses', 'Apartments', 'Commercial', 'Land', 'Short Lets', 'For Rent'];
  const priceRanges = [
    'Any Price',
    'Under ₦5,000,000',
    '₦5,000,000 - ₦50,000,000',
    '₦50,000,000 - ₦150,000,000',
    'Above ₦150,000,000',
  ];

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      location,
      propertyType,
      priceRange,
    });
  };

  return (
    <section className="relative w-full bg-[#102235] overflow-visible">
      {/* Background Image Container */}
      <div className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] flex items-center">
        {/* Background photo of luxury 2-storey modern house with warm lighting and palm trees */}
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85"
          alt="Modern Luxury Home"
          className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_60%]"
        />

        {/* Dark Navy Overlay - darker on left, translucent to clear on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E1E2E]/95 via-[#0E1E2E]/80 via-50% to-[#0E1E2E]/20 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 pb-24 lg:pt-16 lg:pb-28">
          <div className="max-w-2xl text-left">
            {/* Small outlined badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/25 bg-white/10 backdrop-blur-xs text-white text-xs font-medium mb-6">
              <Home className="w-3.5 h-3.5 text-white stroke-[2.2]" />
              <span>Find Your Dream Home</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white leading-[1.15] tracking-tight mb-5">
              The Right Property <br />
              <span className="text-white">For A </span>
              <span className="text-[#09B87A] text-emerald-400">Better Tomorrow</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-gray-200 font-normal leading-relaxed max-w-xl mb-6">
              Discover, buy, or rent the perfect property. From modern apartments to luxury homes, we make real estate simple.
            </p>
          </div>
        </div>

        {/* Floating Search Bar */}
        <div className="absolute left-0 right-0 -bottom-10 sm:-bottom-9 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <form
              onSubmit={handleSearchClick}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 sm:p-3 lg:p-3.5 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-2 items-center"
            >
              {/* 1. Location */}
              <div className="md:col-span-4 flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <label htmlFor="search-location" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    id="search-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search by city, area or state"
                    className="w-full text-sm text-[#102235] font-medium placeholder-gray-400 focus:outline-none bg-transparent truncate"
                  />
                </div>
              </div>

              {/* 2. Property Type */}
              <div className="relative md:col-span-3 flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                <Home className="w-5 h-5 text-gray-400 shrink-0" />
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    setTypeDropdownOpen(!typeDropdownOpen);
                    setPriceDropdownOpen(false);
                  }}
                >
                  <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Property Type
                  </span>
                  <div className="flex items-center justify-between text-sm text-[#102235] font-medium">
                    <span className="truncate">{propertyType}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
                  </div>
                </div>

                {typeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 max-h-56 overflow-auto">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setPropertyType(type);
                          setTypeDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#F0F9F5] hover:text-[#079B68] transition-colors ${
                          propertyType === type ? 'text-[#079B68] font-bold bg-[#F0F9F5]' : 'text-gray-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 3. Price Range */}
              <div className="relative md:col-span-3 flex items-center gap-3 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                <Tag className="w-5 h-5 text-gray-400 shrink-0" />
                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => {
                    setPriceDropdownOpen(!priceDropdownOpen);
                    setTypeDropdownOpen(false);
                  }}
                >
                  <span className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Price Range
                  </span>
                  <div className="flex items-center justify-between text-sm text-[#102235] font-medium">
                    <span className="truncate">{priceRange}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
                  </div>
                </div>

                {priceDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-30 max-h-56 overflow-auto">
                    {priceRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        onClick={() => {
                          setPriceRange(range);
                          setPriceDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-[#F0F9F5] hover:text-[#079B68] transition-colors ${
                          priceRange === range ? 'text-[#079B68] font-bold bg-[#F0F9F5]' : 'text-gray-700'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Search Button */}
              <div className="md:col-span-2 px-1">
                <button
                  type="submit"
                  className="w-full h-11 bg-[#079B68] hover:bg-[#068458] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
