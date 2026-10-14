import React from 'react';
import { PropertyCard } from './PropertyCard';
import { Property } from '../types';
import { ArrowRight, X } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onViewAll: () => void;
  activeFilter?: string | null;
  onClearFilter?: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onViewAll,
  activeFilter,
  onClearFilter,
}) => {
  return (
    <section id="properties" className="w-full bg-[#F5F8FC] py-14 border-b border-[#E3E9EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102235] tracking-tight">
                Featured Properties
              </h2>
              {activeFilter && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8F7F0] text-[#079B68]">
                  Filter: {activeFilter}
                  {onClearFilter && (
                    <button
                      onClick={onClearFilter}
                      className="hover:bg-[#079B68] hover:text-white rounded-full p-0.5 transition-colors"
                      title="Clear filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              )}
            </div>
            <p className="text-sm text-[#526176] mt-1 font-normal">
              Handpicked properties just for you.
            </p>
          </div>

          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#079B68] hover:text-[#068458] transition-colors group self-start sm:self-auto cursor-pointer"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Cards Grid - 4 in a row on desktop */}
        {properties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E3E9EF]">
            <p className="text-gray-500 text-sm">No properties found matching your filter criteria.</p>
            {onClearFilter && (
              <button
                onClick={onClearFilter}
                className="mt-3 px-4 py-2 bg-[#079B68] text-white text-xs font-medium rounded-lg hover:bg-[#068458]"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {properties.slice(0, 4).map((prop) => (
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
    </section>
  );
};
