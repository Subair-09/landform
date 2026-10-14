import React, { useState } from 'react';
import { X, Search, Filter } from 'lucide-react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';

interface AllPropertiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  initialCategory?: string | null;
}

export const AllPropertiesModal: React.FC<AllPropertiesModalProps> = ({
  isOpen,
  onClose,
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  initialCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Update if initialCategory changes
  React.useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  if (!isOpen) return null;

  const categories = ['All', 'Houses', 'Apartments', 'Commercial', 'Land', 'Short Lets', 'For Rent'];
  const cities = ['All', 'Lagos', 'Abuja'];

  const filtered = properties.filter((p) => {
    if (activeCategory !== 'All') {
      if (activeCategory === 'For Rent' && p.status !== 'For Rent') return false;
      if (activeCategory !== 'For Rent' && p.category !== activeCategory) return false;
    }
    if (selectedStatus !== 'All' && p.status !== selectedStatus) return false;
    if (selectedCity !== 'All' && !p.location.toLowerCase().includes(selectedCity.toLowerCase())) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match =
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-6xl bg-[#F5F8FC] rounded-2xl shadow-2xl overflow-hidden my-6 border border-[#E3E9EF] flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white p-4 sm:p-6 border-b border-[#E3E9EF] flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#102235]">
              All Properties ({filtered.length})
            </h3>
            <p className="text-xs text-[#526176]">Browse verified listings across prime Nigerian locations</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white px-4 sm:px-6 py-3 border-b border-[#E3E9EF] shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Lekki, Ikoyi, Duplex..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#E3E9EF] rounded-lg focus:outline-none focus:border-[#079B68]"
              />
            </div>

            {/* City & Status Filters */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-1.5 text-xs border border-[#E3E9EF] rounded-lg bg-white text-[#102235] focus:outline-none focus:border-[#079B68]"
              >
                <option value="All">All Cities</option>
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-1.5 text-xs border border-[#E3E9EF] rounded-lg bg-white text-[#102235] focus:outline-none focus:border-[#079B68]"
              >
                <option value="All">All Statuses</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#079B68] text-white'
                    : 'bg-[#F5F8FC] text-[#526176] hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center text-gray-500">
              <p className="text-sm">No properties match your filter criteria.</p>
              <button
                onClick={() => {
                  setActiveCategory('All');
                  setSelectedCity('All');
                  setSelectedStatus('All');
                  setSearchQuery('');
                }}
                className="mt-3 px-4 py-1.5 bg-[#079B68] text-white text-xs font-medium rounded-lg"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  isFavorite={favorites.includes(prop.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={onSelectProperty}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
