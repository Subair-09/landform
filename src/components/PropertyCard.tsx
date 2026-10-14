import React from 'react';
import { MapPin, Bed, Bath, Maximize2, Heart } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  return (
    <div
      onClick={() => onSelectProperty(property)}
      className="bg-white rounded-2xl overflow-hidden border border-[#E3E9EF] shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Property Image with Badge and Heart */}
      <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-gray-100">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white shadow-xs ${
              property.status === 'For Sale' ? 'bg-[#079B68]' : 'bg-[#2563EB]'
            }`}
          >
            {property.status}
          </span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => onToggleFavorite(property.id, e)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${
            isFavorite
              ? 'bg-red-50 text-red-500 shadow-sm'
              : 'bg-black/30 hover:bg-black/50 text-white backdrop-blur-xs'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label="Toggle favorite"
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFavorite ? 'fill-red-500 stroke-red-500 scale-110' : 'stroke-white'
            }`}
          />
        </button>
      </div>

      {/* Property Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h4 className="text-base font-bold text-[#102235] truncate group-hover:text-[#079B68] transition-colors">
            {property.title}
          </h4>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-[#526176] mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{property.location}</span>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-bold text-[#079B68] tracking-tight">
              {property.price}
            </span>
            {property.pricePeriod && (
              <span className="text-xs text-[#526176] font-normal">
                {property.pricePeriod}
              </span>
            )}
          </div>
        </div>

        {/* Amenities Bar */}
        <div className="border-t border-[#E3E9EF] mt-3.5 pt-3 flex items-center justify-between text-xs text-[#526176]">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{property.beds} {property.beds === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-gray-400 shrink-0" />
            <span>{property.baths} {property.baths === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};
