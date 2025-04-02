import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HeartIcon, ShareIcon, ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon, TagIcon, TruckIcon, ClockIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, ChevronRightIcon as ChevronRightIconSolid } from '@heroicons/react/24/solid';

// Types
type CarDetail = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  oldPrice?: number;
  location: string;
  kilometers: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  owners: number;
  isNew: boolean;
  isFeatured: boolean;
  isReduced: boolean;
  rating: number;
  sellerType: 'dealer' | 'individual';
  sellerName: string;
  sellerContact: string;
  sellerAvatar?: string;
  sellerRating: number;
  sellerJoined: string;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    maxPower: string;
    maxTorque: string;
    fuelTank: string;
    seatingCapacity: number;
    bootSpace: string;
    mileage: string;
    groundClearance: string;
    color: string;
  };
  images: string[];
  postedDate: string;
};

// Mock data for a car
const carDetailData: CarDetail = {
  id: "1",
  title: "2023 Maruti Suzuki Baleno Alpha CVT - Premium Hatchback",
  brand: "Maruti Suzuki",
  model: "Baleno",
  year: 2023,
  price: 1049000,
  oldPrice: 1149000,
  location: "Mumbai, Maharashtra",
  kilometers: 1200,
  fuelType: "Petrol",
  transmission: "Automatic",
  bodyType: "Hatchback",
  owners: 1,
  isNew: true,
  isFeatured: true,
  isReduced: true,
  rating: 4.5,
  sellerType: "dealer",
  sellerName: "Premium Cars Mumbai",
  sellerContact: "+91 98765 43210",
  sellerAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
  sellerRating: 4.8,
  sellerJoined: "2018",
  description: "Presenting the 2023 Maruti Suzuki Baleno Alpha CVT in pristine condition with just 1,200 km on the odometer. This top-end variant comes loaded with features including a 360-degree camera, heads-up display, and premium Arkamys sound system. The car is under manufacturer warranty until December 2028, with free servicing available for the next 3 services. The Alpha variant offers the best combination of style, comfort, and efficiency with its advanced CVT transmission providing a smooth driving experience and excellent fuel economy. This particular unit is in immaculate condition, maintained like new, and comes with all original documentation.",
  features: [
    "360° Camera",
    "ABS with EBD",
    "Airbags (6)",
    "Alloy Wheels",
    "Android Auto & Apple CarPlay",
    "Automatic Climate Control",
    "Cruise Control",
    "Heads-up Display",
    "Hill Hold Control",
    "Keyless Entry & Push Button Start",
    "LED Headlamps with DRLs",
    "Leather Seats",
    "Parking Sensors (Front & Rear)",
    "Premium Arkamys Sound System",
    "Rain-sensing Wipers",
    "Sunroof",
    "Touchscreen Infotainment (9-inch)",
    "Vehicle Stability Control"
  ],
  specifications: {
    engine: "1.2L K-Series Petrol Engine",
    maxPower: "89 bhp @ 6000 rpm",
    maxTorque: "113 Nm @ 4400 rpm",
    fuelTank: "37 liters",
    seatingCapacity: 5,
    bootSpace: "318 liters",
    mileage: "22.35 km/l",
    groundClearance: "170 mm",
    color: "Pearl Arctic White"
  },
  images: [
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ],
  postedDate: "2 days ago"
};

// Similar cars mock data
const similarCars = [
  {
    id: "2",
    title: "2022 Hyundai i20 Asta - Premium Hatchback",
    brand: "Hyundai",
    model: "i20",
    price: 929000,
    year: 2022,
    kilometers: 8500,
    fuelType: "Petrol",
    transmission: "Manual",
    location: "Mumbai, Maharashtra",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "3",
    title: "2023 Toyota Glanza V - Luxury Hatchback",
    brand: "Toyota",
    model: "Glanza",
    price: 979000,
    year: 2023,
    kilometers: 3200,
    fuelType: "Petrol",
    transmission: "Automatic",
    location: "Pune, Maharashtra",
    image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "4",
    title: "2022 Tata Altroz XZ Plus - Premium Hatchback",
    brand: "Tata",
    model: "Altroz",
    price: 899000,
    year: 2022,
    kilometers: 12000,
    fuelType: "Diesel",
    transmission: "Manual",
    location: "Delhi, NCR",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

// Format price to Indian format
const formatIndianPrice = (price: number): string => {
  const priceString = price.toString();
  const length = priceString.length;
  
  if (length <= 3) {
    return `₹${priceString}`;
  }
  
  let formattedPrice = '';
  
  // Handle last 3 digits
  formattedPrice = priceString.substring(length - 3);
  
  // Handle the rest of the digits with commas after every 2 digits
  let remainingDigits = priceString.substring(0, length - 3);
  let remainingLength = remainingDigits.length;
  
  while (remainingLength > 0) {
    const chunkSize = remainingLength > 2 ? 2 : remainingLength;
    const chunk = remainingDigits.substring(remainingLength - chunkSize);
    formattedPrice = `${chunk},${formattedPrice}`;
    remainingLength -= chunkSize;
  }
  
  return `₹${formattedPrice}`;
};

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<CarDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    // In a real app, fetch the car data based on the ID
    // For demo, we'll use the mock data
    setLoading(true);
    setTimeout(() => {
      setCar(carDetailData);
      setLoading(false);
      
      // Scroll to top when car changes
      window.scrollTo(0, 0);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h1>
            <p className="text-gray-600 mb-8">The car you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/cars" 
              className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-white hover:bg-primary-700"
            >
              Browse Cars
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length);
  };

  const displayedFeatures = showAllFeatures ? car.features : car.features.slice(0, 8);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-500">
            <Link to="/" className="hover:text-primary-600">Home</Link>
            <ChevronRightIconSolid className="h-4 w-4 mx-2" />
            <Link to="/cars" className="hover:text-primary-600">Cars</Link>
            <ChevronRightIconSolid className="h-4 w-4 mx-2" />
            <span className="text-gray-700">{car.brand} {car.model}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Car images and details */}
          <div className="lg:w-2/3">
            {/* Car title on mobile */}
            <div className="lg:hidden mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{car.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {car.location}
                </span>
                <span className="mx-2">•</span>
                <span>ID: {car.id}</span>
                <span className="mx-2">•</span>
                <span>Posted {car.postedDate}</span>
              </div>
              <div className="flex items-center text-2xl font-bold text-primary-600 mb-2">
                {formatIndianPrice(car.price)}
                {car.oldPrice && (
                  <span className="ml-2 text-sm font-normal text-gray-500 line-through">
                    {formatIndianPrice(car.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Image gallery */}
            <div className="relative rounded-lg overflow-hidden bg-white shadow-md mb-8">
              <div className="relative h-64 sm:h-96 bg-gray-200">
                <img 
                  src={car.images[activeImageIndex]} 
                  alt={`${car.brand} ${car.model}`} 
                  className="w-full h-full object-cover"
                />

                {/* New/Featured tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {car.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
                      New
                    </span>
                  )}
                  {car.isFeatured && (
                    <span className="bg-primary-600 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
                      Featured
                    </span>
                  )}
                  {car.isReduced && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
                      Reduced
                    </span>
                  )}
                </div>

                {/* Navigation arrows */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
                >
                  <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
                >
                  <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                </button>

                {/* Fullscreen button */}
                <button 
                  className="absolute bottom-4 right-4 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100"
                >
                  <ArrowsPointingOutIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>

              {/* Thumbnail navigation */}
              <div className="flex p-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden mx-1 ${
                      index === activeImageIndex ? 'ring-2 ring-primary-600' : 'opacity-70'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${car.brand} ${car.model} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Car details */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              {/* Desktop title - hidden on mobile */}
              <div className="hidden lg:block p-6 border-b border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.title}</h1>
                <div className="flex items-center text-sm text-gray-500">
                  <span>
                    {car.location}
                  </span>
                  <span className="mx-2">•</span>
                  <span>ID: {car.id}</span>
                  <span className="mx-2">•</span>
                  <span>Posted {car.postedDate}</span>
                </div>
              </div>

              {/* Overview */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Year</span>
                    <span className="font-medium">{car.year}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Kilometers</span>
                    <span className="font-medium">{car.kilometers.toLocaleString()} km</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Fuel Type</span>
                    <span className="font-medium">{car.fuelType}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Transmission</span>
                    <span className="font-medium">{car.transmission}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Body Type</span>
                    <span className="font-medium">{car.bodyType}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Owners</span>
                    <span className="font-medium">{car.owners === 1 ? '1st Owner' : `${car.owners} Owners`}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Color</span>
                    <span className="font-medium">{car.specifications.color}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Seating</span>
                    <span className="font-medium">{car.specifications.seatingCapacity} People</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">{car.description}</p>
              </div>

              {/* Features */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {displayedFeatures.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                {car.features.length > 8 && (
                  <button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    {showAllFeatures ? 'Show Less' : `Show All (${car.features.length})`}
                  </button>
                )}
              </div>

              {/* Specifications */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Engine</span>
                    <span className="font-medium">{car.specifications.engine}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Max Power</span>
                    <span className="font-medium">{car.specifications.maxPower}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Max Torque</span>
                    <span className="font-medium">{car.specifications.maxTorque}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Fuel Tank Capacity</span>
                    <span className="font-medium">{car.specifications.fuelTank}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Boot Space</span>
                    <span className="font-medium">{car.specifications.bootSpace}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Mileage</span>
                    <span className="font-medium">{car.specifications.mileage}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Ground Clearance</span>
                    <span className="font-medium">{car.specifications.groundClearance}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Price and contact */}
          <div className="lg:w-1/3 space-y-6">
            {/* Price card - desktop only */}
            <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary-600">
                      {formatIndianPrice(car.price)}
                    </div>
                    {car.oldPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {formatIndianPrice(car.oldPrice)}
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-gray-500'}`}
                  >
                    {isFavorite ? (
                      <HeartIconSolid className="h-6 w-6" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <button 
                  onClick={() => setShowContactInfo(!showContactInfo)}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-md font-medium hover:bg-primary-700 mb-4"
                >
                  {showContactInfo ? 'Hide Contact Info' : 'Show Contact Info'}
                </button>
                
                <a 
                  href={`tel:${car.sellerContact}`} 
                  className="w-full flex items-center justify-center bg-white border border-primary-600 text-primary-600 py-3 px-4 rounded-md font-medium hover:bg-primary-50"
                >
                  Call Seller
                </a>
                
                {showContactInfo && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <div className="flex items-start mb-3">
                      <div className="flex-shrink-0">
                        {car.sellerAvatar ? (
                          <img 
                            src={car.sellerAvatar} 
                            alt={car.sellerName}
                            className="h-10 w-10 rounded-full"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                            {car.sellerName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{car.sellerName}</div>
                        <div className="text-xs text-gray-500">{car.sellerType === 'dealer' ? 'Dealer' : 'Individual Seller'}</div>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="text-sm font-medium text-gray-700">Phone:</div>
                      <div className="text-sm text-primary-600">{car.sellerContact}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium text-gray-700">Member Since:</div>
                      <div className="text-sm text-gray-600">{car.sellerJoined}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Safety tips */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Safety Tips</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Inspect the car thoroughly before making a purchase</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Verify all documents including RC, insurance, and service history</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Meet in a public place during daytime for viewing and test drive</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Consider getting a professional inspection before buying</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Finance calculator (simplified) */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">EMI Calculator</h2>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount
                  </label>
                  <input
                    type="text"
                    value={formatIndianPrice(Math.round(car.price * 0.8))}
                    readOnly
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 bg-gray-50"
                  />
                  <div className="text-xs text-gray-500 mt-1">80% of vehicle price</div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interest Rate (%)
                  </label>
                  <input
                    type="text"
                    defaultValue="9.5"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Term (years)
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    defaultValue="5"
                  >
                    <option value="1">1 year</option>
                    <option value="2">2 years</option>
                    <option value="3">3 years</option>
                    <option value="4">4 years</option>
                    <option value="5">5 years</option>
                    <option value="6">6 years</option>
                    <option value="7">7 years</option>
                  </select>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md mb-4">
                  <div className="text-sm font-medium text-gray-700">Estimated Monthly EMI:</div>
                  <div className="text-xl font-bold text-primary-600">{formatIndianPrice(Math.round(car.price * 0.8 / 60 * 1.3))}</div>
                </div>
                
                <button 
                  className="w-full bg-white border border-primary-600 text-primary-600 py-2 px-4 rounded-md font-medium hover:bg-primary-50"
                >
                  Apply for Loan
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom mobile price and actions - visible only on mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between z-10">
          <div>
            <div className="text-xl font-bold text-primary-600">
              {formatIndianPrice(car.price)}
            </div>
            {car.oldPrice && (
              <div className="text-xs text-gray-500 line-through">
                {formatIndianPrice(car.oldPrice)}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full border ${
                isFavorite ? 'text-red-500 border-red-500' : 'text-gray-400 border-gray-300'
              }`}
            >
              {isFavorite ? (
                <HeartIconSolid className="h-5 w-5" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </button>
            <a 
              href={`tel:${car.sellerContact}`} 
              className="bg-primary-600 text-white py-2 px-4 rounded-md font-medium hover:bg-primary-700"
            >
              Call Seller
            </a>
          </div>
        </div>
        
        {/* Similar cars section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Similar Cars</h2>
            <Link 
              to="/cars" 
              className="text-primary-600 hover:text-primary-800 flex items-center text-sm font-medium"
            >
              View All <ChevronRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarCars.map((similarCar) => (
              <Link key={similarCar.id} to={`/cars/${similarCar.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={similarCar.image} 
                      alt={similarCar.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 mb-1">{similarCar.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <span>{similarCar.location}</span>
                    </div>
                    <div className="text-primary-600 font-bold mb-2">
                      {formatIndianPrice(similarCar.price)}
                    </div>
                    <div className="flex flex-wrap text-xs text-gray-600 gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{similarCar.year}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{similarCar.kilometers.toLocaleString()} km</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{similarCar.fuelType}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded-full">{similarCar.transmission}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 