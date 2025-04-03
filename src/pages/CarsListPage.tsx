import { useState, useEffect } from 'react';
import { Bars4Icon, Squares2X2Icon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import CarCard from '../components/CarCard';
import { useFirestore } from '../contexts/FirestoreContext';
import { Car } from '../firebase/firestore';

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'mileage_asc' | 'price-low' | 'price-high' | 'mileage-low' | 'mileage-high' | 'year-new' | 'year-old';

export default function CarsListPage() {
  const { getCars } = useFirestore();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    const loadCars = async () => {
      try {
        setLoading(true);
        const result = await getCars();
        setCars(result);
      } catch (err) {
        setError('Failed to load cars');
        console.error('Error loading cars:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, [getCars]);

  const sortCars = (cars: Car[], sortOption: SortOption) => {
    const sortedCars = [...cars];
    switch (sortOption) {
      case 'price-low':
        return sortedCars.sort((a, b) => (a.price || 0) - (b.price || 0));
      case 'price-high':
        return sortedCars.sort((a, b) => (b.price || 0) - (a.price || 0));
      case 'mileage-low':
        return sortedCars.sort((a, b) => {
          const mileageA = a.specifications?.mileage ? Number(a.specifications.mileage) : 0;
          const mileageB = b.specifications?.mileage ? Number(b.specifications.mileage) : 0;
          return mileageA - mileageB;
        });
      case 'mileage-high':
        return sortedCars.sort((a, b) => {
          const mileageA = a.specifications?.mileage ? Number(a.specifications.mileage) : 0;
          const mileageB = b.specifications?.mileage ? Number(b.specifications.mileage) : 0;
          return mileageB - mileageA;
        });
      case 'year-new':
        return sortedCars.sort((a, b) => (b.year || 0) - (a.year || 0));
      case 'year-old':
        return sortedCars.sort((a, b) => (a.year || 0) - (b.year || 0));
      default:
        return sortedCars;
    }
  };

  const sortedCars = sortCars(cars, sortBy);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Available Cars</h1>
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="mileage_asc">Mileage: Low to High</option>
          </select>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${
              viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-500'
            }`}
          >
            <Squares2X2Icon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${
              viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-500'
            }`}
          >
            <Bars4Icon className="w-6 h-6" />
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded ${
              showFilters ? 'bg-primary-100 text-primary-600' : 'text-gray-500'
            }`}
          >
            <FunnelIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          {/* Add filter controls here */}
        </div>
      )}

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {sortedCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
} 