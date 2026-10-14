import React, { useState } from 'react';
import { Heart, Menu, X, Home as HomeIcon } from 'lucide-react';

interface HeaderProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  onOpenFavorites,
  onOpenAuth,
  onNavigate,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Properties', id: 'properties' },
    { label: 'About', id: 'about' },
    { label: 'Agents', id: 'agents' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-[#E3E9EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#079B68] transition-transform group-hover:scale-105">
            <svg
              className="w-7 h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#079B68"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 10.5L12 3l9 7.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 21 9 12 15 12 15 21" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-[#102235]">Home</span>
            <span className="text-[#079B68]">Find</span>
          </span>
        </button>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#079B68]'
                    : 'text-[#102235] hover:text-[#079B68]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#079B68] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-3.5">
          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-[#526176] hover:text-[#079B68] hover:bg-gray-50 rounded-lg transition-colors"
            title="Saved Properties"
            aria-label="Favorites"
          >
            <Heart className="w-5 h-5" />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#079B68] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Login Button */}
          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-1.5 text-sm font-medium text-[#102235] bg-white border border-[#E3E9EF] rounded-lg hover:bg-gray-50 transition-colors shadow-2xs"
          >
            Login
          </button>

          {/* Sign Up Button */}
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-4 py-1.5 text-sm font-medium text-white bg-[#079B68] rounded-lg hover:bg-[#068458] transition-colors shadow-2xs cursor-pointer"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile menu and favorites button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenFavorites}
            className="relative p-2 text-[#526176] hover:text-[#079B68] rounded-lg"
            aria-label="Favorites"
          >
            <Heart className="w-5 h-5" />
            {favoriteCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#079B68] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#102235] hover:bg-gray-100 rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E3E9EF] px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeSection === link.id
                    ? 'bg-[#F0F9F5] text-[#079B68]'
                    : 'text-[#102235] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-[#E3E9EF] flex gap-2">
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-sm font-medium text-[#102235] border border-[#E3E9EF] rounded-lg text-center"
            >
              Login
            </button>
            <button
              onClick={() => {
                onOpenAuth('signup');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-sm font-medium text-white bg-[#079B68] rounded-lg text-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
