import { Link } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export type Car = {
  id: number;
  name: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  location?: string;
  imageUrl: string;
  features?: string[];
  isNew?: boolean;
};

// Function to format prices in Indian number format (with lakhs and crores)
export const formatIndianPrice = (price: number): string => {
  const priceString = price.toString();
  let result = '';
  
  // Handle the part before decimal
  const integerPart = priceString.split('.')[0];
  
  // For numbers less than 1000
  if (integerPart.length <= 3) {
    return `₹${integerPart}`;
  }
  
  // Last 3 digits
  result = integerPart.slice(-3);
  
  // Rest of the digits with commas after every 2 digits
  let remaining = integerPart.slice(0, integerPart.length - 3);
  
  // Insert commas every 2 digits from the right
  while (remaining.length > 0) {
    const chunk = remaining.slice(Math.max(0, remaining.length - 2));
    result = `${chunk},${result}`;
    remaining = remaining.slice(0, Math.max(0, remaining.length - 2));
  }
  
  return `₹${result}`;
};

interface CarCardProps {
  car: Car;
  layout?: 'grid' | 'list';
}

export default function CarCard({ car, layout = 'grid' }: CarCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  if (layout === 'list') {
    return (
      <div className="card hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-64 h-48 flex-shrink-0">
            {car.isNew && (
              <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
                New
              </span>
            )}
            <img
              src={car.imageUrl}
              alt={car.name}
              className="h-full w-full object-cover object-center"
            />
            <button 
              onClick={toggleFavorite}
              className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100 z-10"
            >
              {isFavorite ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  {car.year} {car.name}
                </h3>
                <p className="text-lg font-semibold text-primary-600">
                  {formatIndianPrice(car.price)}
                </p>
              </div>
              
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <span>{car.mileage.toLocaleString()} km</span>
                <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                <span>{car.fuelType}</span>
                <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                <span>{car.transmission}</span>
                {car.location && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                    <span>{car.location}</span>
                  </>
                )}
              </div>
              
              {car.features && car.features.length > 0 && (
                <div className="mt-3">
                  <ul className="flex flex-wrap gap-2">
                    {car.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {feature}
                      </li>
                    ))}
                    {car.features.length > 3 && (
                      <li className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        +{car.features.length - 3} more
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <Link
                to={`/cars/${car.id}`}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                View Details
              </Link>
              <button className="btn-outline text-sm">
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (default)
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        {car.isNew && (
          <span className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded-md z-10">
            New
          </span>
        )}
        <div className="aspect-w-16 aspect-h-9 h-48">
          <img
            src={car.imageUrl}
            alt={car.name}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <button 
          onClick={toggleFavorite}
          className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-gray-100"
        >
          {isFavorite ? (
            <HeartSolidIcon className="h-5 w-5 text-red-500" />
          ) : (
            <HeartIcon className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {car.year} {car.name}
          </h3>
          <p className="text-lg font-semibold text-primary-600">
            {formatIndianPrice(car.price)}
          </p>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
          <span>{car.mileage.toLocaleString()} km</span>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span>{car.fuelType}</span>
          <span className="h-1 w-1 rounded-full bg-gray-400"></span>
          <span>{car.transmission}</span>
        </div>
        {car.location && (
          <div className="mt-2 text-xs text-gray-500">{car.location}</div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <Link
            to={`/cars/${car.id}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View Details
          </Link>
          <button className="btn-outline text-sm">
            Compare
          </button>
        </div>
      </div>
    </div>
  );
} 