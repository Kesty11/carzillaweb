import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bars4Icon, Squares2X2Icon, FunnelIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import CarCard, { Car, formatIndianPrice } from '../components/cars/CarCard';
import FiltersPanel, { FilterGroup, Filters } from '../components/cars/FiltersPanel';

// Sample car data
const cars: Car[] = [
  {
    id: 1,
    name: 'Toyota Camry',
    year: 2023,
    price: 2755000,
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    location: 'Mumbai, Maharashtra',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dG95b3RhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    features: ['Parking Sensors', 'Backup Camera', 'Bluetooth', 'Navigation', 'Sunroof'],
    isNew: true,
  },
  {
    id: 2,
    name: 'Honda Accord',
    year: 2023,
    price: 2615800,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Delhi, NCR',
    imageUrl: 'https://images.unsplash.com/photo-1631722891895-c2ba7b26f5d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aG9uZGElMjBhY2NvcmR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    features: ['Parking Sensors', 'Backup Camera', 'Bluetooth', 'Navigation'],
    isNew: true,
  },
  {
    id: 3,
    name: 'BMW 3 Series',
    year: 2023,
    price: 3895000,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Bengaluru, Karnataka',
    imageUrl: 'https://images.unsplash.com/photo-1556189250-72ba954cfc2b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Ym13fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    features: ['Leather Seats', 'Backup Camera', 'Bluetooth', 'Navigation', 'Sunroof', 'Apple CarPlay'],
    isNew: true,
  },
  {
    id: 4,
    name: 'Tesla Model 3',
    year: 2023,
    price: 3976180,
    mileage: 0,
    fuelType: 'Electric',
    transmission: 'Automatic',
    location: 'Pune, Maharashtra',
    imageUrl: 'https://images.unsplash.com/photo-1561995619-7d6bd32bdac8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGElMjBtb2RlbCUyMDN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    features: ['Autopilot', 'Supercharging', 'Premium Sound', 'Navigation', 'Glass Roof'],
    isNew: true,
  },
  {
    id: 5,
    name: 'Audi A4',
    year: 2023,
    price: 3435800,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Chennai, Tamil Nadu',
    imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGF1ZGl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    features: ['Leather Seats', 'Parking Sensors', 'Backup Camera', 'Bluetooth', 'Navigation'],
    isNew: true,
  },
  {
    id: 6,
    name: 'Mercedes-Benz C-Class',
    year: 2023,
    price: 3821200,
    mileage: 0,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    location: 'Hyderabad, Telangana',
    imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fG1lcmNlZGVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    features: ['Leather Seats', 'Parking Sensors', 'Backup Camera', 'Bluetooth', 'Navigation', 'Sunroof'],
    isNew: true,
  },
  {
    id: 7,
    name: 'Maruti Suzuki Swift',
    year: 2022,
    price: 850000,
    mileage: 5000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Kolkata, West Bengal',
    imageUrl: 'https://images.unsplash.com/photo-1571561944392-89193d2c4c1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c3V6dWtpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    features: ['Air Conditioning', 'Power Windows', 'Power Steering', 'AM/FM Radio'],
  },
  {
    id: 8,
    name: 'Hyundai i20',
    year: 2021,
    price: 920000,
    mileage: 12000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Ahmedabad, Gujarat',
    imageUrl: 'https://images.unsplash.com/photo-1631931413024-35a5e1a3e38e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8aHl1bmRhaXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    features: ['Air Conditioning', 'Power Windows', 'Power Steering', 'AM/FM Radio', 'Bluetooth'],
  },
  {
    id: 9,
    name: 'Mahindra XUV700',
    year: 2022,
    price: 1850000,
    mileage: 8000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    location: 'Jaipur, Rajasthan',
    imageUrl: 'https://images.unsplash.com/photo-1651817226577-935d79c8b71e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFoaW5kcmF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    features: ['Power Windows', 'Power Steering', 'Air Conditioning', 'Cruise Control', 'Bluetooth', 'Navigation'],
  },
  {
    id: 10,
    name: 'Tata Nexon',
    year: 2021,
    price: 1250000,
    mileage: 15000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Lucknow, Uttar Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1647613077580-fb201ac188cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHRhdGElMjBjYXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    features: ['Air Conditioning', 'Power Windows', 'Power Steering', 'AM/FM Radio', 'Bluetooth'],
  },
  {
    id: 11,
    name: 'Toyota Fortuner',
    year: 2020,
    price: 3100000,
    mileage: 25000,
    fuelType: 'Diesel',
    transmission: 'Automatic',
    location: 'Mumbai, Maharashtra',
    imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c3V2fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    features: ['Leather Seats', 'Parking Sensors', 'Backup Camera', 'Bluetooth', 'Navigation', 'Sunroof'],
  },
  {
    id: 12,
    name: 'Honda City',
    year: 2019,
    price: 980000,
    mileage: 32000,
    fuelType: 'Petrol',
    transmission: 'Manual',
    location: 'Delhi, NCR',
    imageUrl: 'https://images.unsplash.com/photo-1605816988069-b11383b50717?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aG9uZGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    features: ['Air Conditioning', 'Power Windows', 'Power Steering', 'AM/FM Radio', 'Bluetooth'],
  },
];

// Filter groups for sidebar
const filterGroups: FilterGroup[] = [
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { id: 'toyota', name: 'Toyota', count: 2 },
      { id: 'honda', name: 'Honda', count: 2 },
      { id: 'bmw', name: 'BMW', count: 1 },
      { id: 'tesla', name: 'Tesla', count: 1 },
      { id: 'audi', name: 'Audi', count: 1 },
      { id: 'mercedes', name: 'Mercedes-Benz', count: 1 },
      { id: 'maruti', name: 'Maruti Suzuki', count: 1 },
      { id: 'hyundai', name: 'Hyundai', count: 1 },
      { id: 'mahindra', name: 'Mahindra', count: 1 },
      { id: 'tata', name: 'Tata', count: 1 },
    ],
  },
  {
    id: 'bodyType',
    name: 'Body Type',
    options: [
      { id: 'sedan', name: 'Sedan', count: 7 },
      { id: 'suv', name: 'SUV', count: 3 },
      { id: 'hatchback', name: 'Hatchback', count: 2 },
    ],
  },
  {
    id: 'fuelType',
    name: 'Fuel Type',
    options: [
      { id: 'petrol', name: 'Petrol', count: 8 },
      { id: 'diesel', name: 'Diesel', count: 2 },
      { id: 'electric', name: 'Electric', count: 1 },
      { id: 'hybrid', name: 'Hybrid', count: 1 },
    ],
  },
  {
    id: 'transmission',
    name: 'Transmission',
    options: [
      { id: 'automatic', name: 'Automatic', count: 8 },
      { id: 'manual', name: 'Manual', count: 4 },
    ],
  },
];

// Sorting options
const sortOptions = [
  { name: 'Newest First', value: 'newest' },
  { name: 'Price: Low to High', value: 'price_asc' },
  { name: 'Price: High to Low', value: 'price_desc' },
  { name: 'Mileage: Low to High', value: 'mileage_asc' },
];

export default function CarsListPage() {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    brand: [],
    model: [],
    bodyType: [],
    fuelType: [],
    transmission: [],
    yearRange: '',
    priceRange: '',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 6;

  // Apply filters and sorting
  useEffect(() => {
    let result = [...cars];
    
    // Apply brand filter
    if (activeFilters.brand.length > 0) {
      result = result.filter(car => {
        const carBrand = car.name.split(' ')[0].toLowerCase();
        return activeFilters.brand.some(brand => carBrand.includes(brand));
      });
    }
    
    // Apply body type filter
    if (activeFilters.bodyType.length > 0) {
      // This would need real data with body type information
      // For now, we'll just demonstrate the concept
      const bodyTypeMap: Record<string, string[]> = {
        'sedan': ['camry', 'accord', '3 series', 'a4', 'c-class', 'city'],
        'suv': ['fortuner', 'xuv700', 'nexon'],
        'hatchback': ['swift', 'i20'],
      };
      
      result = result.filter(car => {
        const carName = car.name.toLowerCase();
        return activeFilters.bodyType.some(bodyType => 
          bodyTypeMap[bodyType]?.some(model => carName.includes(model))
        );
      });
    }
    
    // Apply fuel type filter
    if (activeFilters.fuelType.length > 0) {
      result = result.filter(car => 
        activeFilters.fuelType.includes(car.fuelType.toLowerCase())
      );
    }
    
    // Apply transmission filter
    if (activeFilters.transmission.length > 0) {
      result = result.filter(car => 
        activeFilters.transmission.includes(car.transmission.toLowerCase())
      );
    }
    
    // Apply year range filter
    if (activeFilters.yearRange) {
      const [minYear, maxYear] = activeFilters.yearRange.split('-').map(Number);
      result = result.filter(car => car.year >= minYear && car.year <= maxYear);
    }
    
    // Apply price range filter
    if (activeFilters.priceRange) {
      if (activeFilters.priceRange.includes('+')) {
        const minPrice = parseInt(activeFilters.priceRange.replace('+', ''));
        result = result.filter(car => car.price >= minPrice);
      } else {
        const [minPrice, maxPrice] = activeFilters.priceRange.split('-').map(Number);
        result = result.filter(car => car.price >= minPrice && car.price <= maxPrice);
      }
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'mileage_asc':
        result.sort((a, b) => a.mileage - b.mileage);
        break;
      default:
        break;
    }
    
    setFilteredCars(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [activeFilters, sortBy]);

  // Handle filter changes
  const handleFilterChange = (groupId: string, filterId: string, checked: boolean) => {
    setActiveFilters(prev => {
      const groupFilters = [...prev[groupId as keyof Filters]] as string[];
      
      if (checked) {
        if (!groupFilters.includes(filterId)) {
          return {
            ...prev,
            [groupId]: [...groupFilters, filterId],
          };
        }
      } else {
        return {
          ...prev,
          [groupId]: groupFilters.filter(id => id !== filterId),
        };
      }
      
      return prev;
    });
  };

  // Handle year range change
  const handleYearRangeChange = (value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      yearRange: value,
    }));
  };

  // Handle price range change
  const handlePriceRangeChange = (value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      priceRange: value,
    }));
  };

  // Clear all filters
  const handleClearFilters = () => {
    setActiveFilters({
      brand: [],
      model: [],
      bodyType: [],
      fuelType: [],
      transmission: [],
      yearRange: '',
      priceRange: '',
    });
  };

  // Calculate pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Cars for Sale</h1>
          <Link
            to="/sell-car"
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Sell Your Car
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Filters - Desktop */}
          <div className="hidden lg:block lg:col-span-3">
            <FiltersPanel
              filterGroups={filterGroups}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onYearRangeChange={handleYearRangeChange}
              onPriceRangeChange={handlePriceRangeChange}
              onClearFilters={handleClearFilters}
              className="sticky top-6"
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {/* Filter and sort controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow px-4 py-3 mb-6 rounded-lg">
              <div className="flex items-center">
                <button
                  type="button"
                  className="lg:hidden mr-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="text-sm text-gray-700">
                  {filteredCars.length} results
                </span>
              </div>
              
              <div className="mt-3 sm:mt-0 flex items-center space-x-4">
                <div className="relative">
                  <select
                    id="sort-by"
                    name="sort-by"
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex border border-gray-300 rounded-md p-1">
                  <button
                    type="button"
                    className={`p-1.5 rounded ${layout === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                    onClick={() => setLayout('grid')}
                  >
                    <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={`p-1.5 rounded ${layout === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                    onClick={() => setLayout('list')}
                  >
                    <Bars4Icon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile filters (off-canvas) */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-40 lg:hidden">
                <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
                <div className="relative w-full max-w-xs p-4 h-full bg-white overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <FiltersPanel
                    filterGroups={filterGroups}
                    activeFilters={activeFilters}
                    onFilterChange={handleFilterChange}
                    onYearRangeChange={handleYearRangeChange}
                    onPriceRangeChange={handlePriceRangeChange}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </div>
            )}

            {/* Car listing */}
            {filteredCars.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-500">Try adjusting your filters to find cars that match your criteria.</p>
                <button
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  onClick={handleClearFilters}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className={layout === 'grid' 
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
                  : "space-y-6"
                }>
                  {currentCars.map((car) => (
                    <CarCard key={car.id} car={car} layout={layout} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center">
                    <nav className="inline-flex rounded-md shadow">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                            currentPage === i + 1
                              ? 'bg-primary-50 text-primary-600 border-primary-500 z-10'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 