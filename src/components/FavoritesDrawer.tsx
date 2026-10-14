import React from 'react';
import { X, Trash2, ArrowRight, Home } from 'lucide-react';
import { Property } from '../types';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  properties: Property[];
  onRemoveFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  properties,
  onRemoveFavorite,
  onSelectProperty,
}) => {
  if (!isOpen) return null;

  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3E9EF] flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#102235]">
              Saved Properties ({favoriteProperties.length})
            </h3>
            <p className="text-xs text-[#526176]">Your shortlisted dream homes</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {favoriteProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Home className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-1">No saved properties yet</p>
              <p className="text-xs text-gray-400 max-w-xs">
                Click the heart icon on any property card to save it here for quick reference.
              </p>
            </div>
          ) : (
            favoriteProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-[#E3E9EF] hover:border-[#079B68]/40 transition-colors bg-white group cursor-pointer"
                onClick={() => {
                  onSelectProperty(prop);
                  onClose();
                }}
              >
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#102235] truncate group-hover:text-[#079B68]">
                    {prop.title}
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">{prop.location}</p>
                  <p className="text-xs font-bold text-[#079B68] mt-1">{prop.price}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveFavorite(prop.id);
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 border-t border-[#E3E9EF] bg-gray-50">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-[#079B68] hover:bg-[#068458] text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Continue Exploring</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
