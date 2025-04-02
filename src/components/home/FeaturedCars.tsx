import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// Sample data for featured cars
const featuredCars = [
  {
    id: 1,
    name: 'Toyota Camry',
    year: 2023,
    price: 2755000, // Converted to rupees (approx ₹82/$ rate)
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dG95b3RhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 2,
    name: 'Honda Accord',
    year: 2023,
    price: 2615800, // Converted to rupees
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1631722891895-c2ba7b26f5d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG9uZGElMjBhY2NvcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 3,
    name: 'BMW 3 Series',
    year: 2023,
    price: 3895000, // Converted to rupees
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym13fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 4,
    name: 'Tesla Model 3',
    year: 2023,
    price: 3976180, // Converted to rupees
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1561995619-7d6bd32bdac8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 5,
    name: 'Audi A4',
    year: 2023,
    price: 3435800, // Converted to rupees
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF1ZGl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 6,
    name: 'Mercedes-Benz C-Class',
    year: 2023,
    price: 3821200, // Converted to rupees
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

// Function to format prices in Indian number format (with lakhs and crores)
const formatIndianPrice = (price: number): string => {
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

export default function FeaturedCars() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trending Car Models
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Discover our most popular cars and find your perfect match
          </p>
        </div>

        <div className="mt-12 relative">
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 z-10 -mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredCars.map((car) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex-none w-80 rounded-lg shadow-md overflow-hidden"
              >
                <div className="aspect-w-16 aspect-h-9 h-48">
                  <img
                    src={car.imageUrl}
                    alt={car.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {car.year} {car.name}
                  </h3>
                  <p className="mt-1 text-lg font-semibold text-primary-600">
                    {formatIndianPrice(car.price)}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <span>{car.mileage.toLocaleString()} km</span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-400"></span>
                      <span>{car.fuelType}</span>
                      <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-400"></span>
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/cars/${car.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 z-10 -mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 focus:outline-none"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/cars"
            className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
} 