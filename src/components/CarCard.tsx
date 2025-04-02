import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';

interface CarCardProps {
  car: {
    id: string;
    brand: string;
    model: string;
    year: number;
    variant?: string;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType: string;
    location: string;
    images: string[];
    [key: string]: any;
  };
  onClick?: () => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  const { currentUser } = useAuth();
  const { toggleFavoriteCar } = useFirestore();
  const [isFavoriting, setIsFavoriting] = useState(false);
  
  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!currentUser) {
      // Redirect to login page could be handled here
      return;
    }
    
    try {
      setIsFavoriting(true);
      await toggleFavoriteCar(car.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsFavoriting(false);
    }
  };
  
  return (
    <div 
      className="bg-white overflow-hidden shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-48 bg-gray-200 relative">
        {car.images && car.images[0] ? (
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No image available
          </div>
        )}
        
        {currentUser && (
          <button
            onClick={handleFavoriteClick}
            disabled={isFavoriting}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={car.isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg className={`h-5 w-5 ${car.isFavorite ? 'text-red-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {car.featured && (
          <div className="absolute top-0 left-0 bg-yellow-500 text-white px-2 py-1 text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {car.brand} {car.model} {car.year}
            </h3>
            <p className="mt-1 text-sm text-gray-500 truncate">
              {car.variant}
            </p>
          </div>
          <p className="text-lg font-semibold text-primary-600">
            ₹{car.price.toLocaleString()}
          </p>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {car.fuelType}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {car.transmission}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            {car.bodyType}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-1 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {car.mileage.toLocaleString()} km
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {car.location}
          </p>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
            {car.sellerType}
          </span>
        </div>
      </div>
    </div>
  );
} 