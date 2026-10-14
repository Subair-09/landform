export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: string;
  numericPrice: number;
  pricePeriod?: string;
  status: 'For Sale' | 'For Rent';
  category: 'Houses' | 'Apartments' | 'Commercial' | 'Land' | 'Short Lets' | 'For Rent';
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery?: string[];
  description: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
}

export interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: string;
}
