import React from 'react';
import { Home, Building, Building2, Briefcase, KeyRound, Compass, Trees } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface PropertyCategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export const PropertyCategories: React.FC<PropertyCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'houses':
        return <Home className="w-5 h-5 text-[#079B68] stroke-[2.2]" />;
      case 'apartments':
        return <Building className="w-5 h-5 text-[#2563EB] stroke-[2.2]" />;
      case 'commercial':
        return <Building2 className="w-5 h-5 text-[#8B5CF6] stroke-[2.2]" />;
      case 'land':
        return (
          <svg className="w-5 h-5 text-[#D97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        );
      case 'short-lets':
        return (
          <svg className="w-5 h-5 text-[#EF4444]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        );
      case 'for-rent':
        return (
          <svg className="w-5 h-5 text-[#079B68]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5L12 3l9 7.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <circle cx="12" cy="13" r="2" />
            <path d="M12 15v3" />
          </svg>
        );
      default:
        return <Home className="w-5 h-5 text-[#079B68]" />;
    }
  };

  return (
    <section className="w-full bg-white pt-16 pb-12 border-b border-[#E3E9EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-4 lg:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.title || (cat.id === 'for-rent' && selectedCategory === 'For Rent');
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.title)}
                className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl transition-all duration-200 cursor-pointer group ${
                  isSelected
                    ? 'ring-2 ring-[#079B68] bg-[#F0F9F5]/40 shadow-xs'
                    : 'hover:bg-gray-50/80 hover:translate-y-[-2px]'
                }`}
              >
                {/* Rounded-square pastel icon background */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-transform duration-200 group-hover:scale-110 ${cat.bgColor}`}
                >
                  {getIcon(cat.id)}
                </div>

                {/* Bold Label */}
                <h3 className="text-sm font-bold text-[#102235] mb-1 group-hover:text-[#079B68] transition-colors">
                  {cat.title}
                </h3>

                {/* Smaller descriptive subtitle */}
                <p className="text-xs text-[#526176] font-normal leading-tight">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
