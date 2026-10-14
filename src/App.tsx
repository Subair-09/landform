/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PropertyCategories } from './components/PropertyCategories';
import { FeaturedProperties } from './components/FeaturedProperties';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { AuthModal } from './components/AuthModal';
import { AllPropertiesModal } from './components/AllPropertiesModal';
import { ReviewsModal } from './components/ReviewsModal';
import { PROPERTIES } from './data/mockData';
import { Property, SearchFilters } from './types';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [favorites, setFavorites] = useState<string[]>(['prop-1']);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [allPropertiesModalOpen, setAllPropertiesModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeFilterLabel, setActiveFilterLabel] = useState<string | null>(null);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(PROPERTIES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle favorite property
  const handleToggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((item) => item !== id));
      showToast('Removed from favorites');
    } else {
      setFavorites((prev) => [...prev, id]);
      showToast('Added to favorites!');
    }
  };

  // Hero Search filtering
  const handleHeroSearch = (filters: SearchFilters) => {
    let result = [...PROPERTIES];
    let filterLabels: string[] = [];

    if (filters.location.trim() !== '') {
      const loc = filters.location.toLowerCase();
      result = result.filter(
        (p) =>
          p.location.toLowerCase().includes(loc) ||
          p.city.toLowerCase().includes(loc) ||
          p.title.toLowerCase().includes(loc)
      );
      filterLabels.push(`"${filters.location}"`);
    }

    if (filters.propertyType !== 'Any Type') {
      if (filters.propertyType === 'For Rent') {
        result = result.filter((p) => p.status === 'For Rent');
      } else {
        result = result.filter((p) => p.category === filters.propertyType);
      }
      filterLabels.push(filters.propertyType);
    }

    if (filters.priceRange !== 'Any Price') {
      if (filters.priceRange === 'Under ₦5,000,000') {
        result = result.filter((p) => p.numericPrice < 5000000);
      } else if (filters.priceRange === '₦5,000,000 - ₦50,000,000') {
        result = result.filter((p) => p.numericPrice >= 5000000 && p.numericPrice <= 50000000);
      } else if (filters.priceRange === '₦50,000,000 - ₦150,000,000') {
        result = result.filter((p) => p.numericPrice >= 50000000 && p.numericPrice <= 150000000);
      } else if (filters.priceRange === 'Above ₦150,000,000') {
        result = result.filter((p) => p.numericPrice > 150000000);
      }
      filterLabels.push(filters.priceRange);
    }

    setDisplayedProperties(result);
    setSelectedCategory(null);
    setActiveFilterLabel(filterLabels.length > 0 ? filterLabels.join(' · ') : null);

    // Scroll to properties section smoothly
    const propertiesEl = document.getElementById('properties');
    if (propertiesEl) {
      propertiesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Category selection filtering
  const handleCategorySelect = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setActiveFilterLabel(categoryTitle);

    let filtered: Property[] = [];
    if (categoryTitle === 'For Rent') {
      filtered = PROPERTIES.filter((p) => p.status === 'For Rent');
    } else {
      filtered = PROPERTIES.filter((p) => p.category === categoryTitle);
    }

    // If no exact match in mock data, show all matching or related
    if (filtered.length === 0) {
      filtered = PROPERTIES.filter((p) => p.category === 'Houses' || p.category === 'Apartments');
    }

    setDisplayedProperties(filtered);

    // Scroll down to properties
    const propertiesEl = document.getElementById('properties');
    if (propertiesEl) {
      propertiesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Clear active filters
  const handleClearFilter = () => {
    setSelectedCategory(null);
    setActiveFilterLabel(null);
    setDisplayedProperties(PROPERTIES);
  };

  // Navigation handlers
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'properties') {
      const el = document.getElementById('properties');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'about') {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'agents') {
      showToast('Connecting to verified HomeFind agents...');
    } else if (sectionId === 'contact') {
      const el = document.getElementById('about');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#526176] flex flex-col font-sans selection:bg-[#E8F7F0] selection:text-[#079B68]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-[#102235] text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs font-medium border border-gray-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#079B68]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header & Navigation */}
      <Header
        favoriteCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenAuth={handleOpenAuth}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Content Sections strictly in reference order */}
      <main className="flex-1 w-full">
        {/* 2. Hero Section with Floating Search Panel */}
        <HeroSection onSearch={handleHeroSearch} />

        {/* 3. Property Categories (6 pastel rounded icons in a row) */}
        <PropertyCategories
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* 4. Featured Properties (4 cards in desktop row) */}
        <FeaturedProperties
          properties={displayedProperties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onViewAll={() => setAllPropertiesModalOpen(true)}
          activeFilter={activeFilterLabel}
          onClearFilter={handleClearFilter}
        />

        {/* 5. Why Choose HomeFind Section */}
        <WhyChooseUs
          onGetStarted={() => {
            const el = document.getElementById('properties');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. Testimonials Section */}
        <Testimonials
          onViewAllReviews={() => setReviewsModalOpen(true)}
        />
      </main>

      {/* 7. Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Drawers */}
      <PropertyModal
        property={selectedProperty}
        isOpen={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        properties={PROPERTIES}
        onRemoveFavorite={(id) => handleToggleFavorite(id)}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
      />

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(name) => showToast(`Welcome to HomeFind, ${name}!`)}
      />

      <AllPropertiesModal
        isOpen={allPropertiesModalOpen}
        onClose={() => setAllPropertiesModalOpen(false)}
        properties={PROPERTIES}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectProperty={(prop) => setSelectedProperty(prop)}
        initialCategory={selectedCategory}
      />

      <ReviewsModal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
      />
    </div>
  );
}
