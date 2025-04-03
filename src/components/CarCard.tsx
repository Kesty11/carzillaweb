import { Car } from '../firebase/firestore';

interface CarCardProps {
  car: Car;
  onFavoriteClick?: (carId: string) => void;
  isFavorite?: boolean;
}

export default function CarCard({ car, onFavoriteClick, isFavorite = false }: CarCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src={car.images[0] || '/placeholder-car.jpg'}
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        {onFavoriteClick && (
          <button
            onClick={() => onFavoriteClick(car.id!)}
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-500'
            }`}
          >
            <svg
              className="w-6 h-6"
              fill={isFavorite ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-500">{car.year}</p>
        <p className="mt-2 text-xl font-bold text-primary-600">
          ₹{car.price.toLocaleString()}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            {car.specifications.mileage}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {car.location}
          </div>
        </div>
      </div>
    </div>
  );
} 