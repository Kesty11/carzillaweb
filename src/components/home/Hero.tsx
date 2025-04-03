import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { motion } from 'framer-motion';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type SearchCriteria = {
  brand: string;
  model: string;
  priceRange: string;
  fuelType: string;
  bodyType: string;
};

const initialSearchCriteria: SearchCriteria = {
  brand: '',
  model: '',
  priceRange: '',
  fuelType: '',
  bodyType: '',
};

export default function Hero() {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>(initialSearchCriteria);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search criteria:', searchCriteria);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative bg-slate-100">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
          alt="Cars background"
          className="h-full w-full object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/80" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Dream Car <span className="text-primary-500">Today</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-300">
            Search from thousands of cars and get the best deals in your area
          </p>
        </motion.div>

        <div className="mx-auto mt-12 max-w-3xl rounded-xl bg-white p-4 shadow-xl sm:p-6">
          <Tab.Group>
            <Tab.List className="flex space-x-4 rounded-xl bg-gray-100 p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    selected
                      ? 'bg-primary-600 text-white shadow'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  )
                }
              >
                New Cars
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    selected
                      ? 'bg-primary-600 text-white shadow'
                      : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  )
                }
              >
                Used Cars
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              <Tab.Panel>
                <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                      Brand
                    </label>
                    <select
                      id="brand"
                      name="brand"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      value={searchCriteria.brand}
                      onChange={handleInputChange}
                    >
                      <option value="">Any Brand</option>
                      <option value="toyota">Toyota</option>
                      <option value="honda">Honda</option>
                      <option value="ford">Ford</option>
                      <option value="bmw">BMW</option>
                      <option value="mercedes">Mercedes-Benz</option>
                      <option value="audi">Audi</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                      Model
                    </label>
                    <select
                      id="model"
                      name="model"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      value={searchCriteria.model}
                      onChange={handleInputChange}
                    >
                      <option value="">Any Model</option>
                      <option value="camry">Camry</option>
                      <option value="corolla">Corolla</option>
                      <option value="civic">Civic</option>
                      <option value="accord">Accord</option>
                      <option value="3-series">3 Series</option>
                      <option value="c-class">C-Class</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">
                      Price Range
                    </label>
                    <select
                      id="priceRange"
                      name="priceRange"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      value={searchCriteria.priceRange}
                      onChange={handleInputChange}
                    >
                      <option value="">Any Price</option>
                      <option value="0-500000">Under ₹5,00,000</option>
                      <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
                      <option value="1000000-1500000">₹10,00,000 - ₹15,00,000</option>
                      <option value="1500000-2500000">₹15,00,000 - ₹25,00,000</option>
                      <option value="2500000+">₹25,00,000+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
                      Fuel Type
                    </label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      value={searchCriteria.fuelType}
                      onChange={handleInputChange}
                    >
                      <option value="">Any Fuel Type</option>
                      <option value="petrol">Petrol</option>
                      <option value="diesel">Diesel</option>
                      <option value="electric">Electric</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="bodyType" className="block text-sm font-medium text-gray-700">
                      Body Type
                    </label>
                    <select
                      id="bodyType"
                      name="bodyType"
                      className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                      value={searchCriteria.bodyType}
                      onChange={handleInputChange}
                    >
                      <option value="">Any Body Type</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="convertible">Convertible</option>
                      <option value="truck">Truck</option>
                      <option value="van">Van</option>
                    </select>
                  </div>
                  
                  <div className="sm:col-span-2 md:col-span-3 lg:col-span-5">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-primary-600 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Search Cars
                    </button>
                  </div>
                </form>
              </Tab.Panel>
              <Tab.Panel>
                <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                  {/* Same form fields as above */}
                  <div className="sm:col-span-2 md:col-span-3 lg:col-span-5">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-primary-600 py-2.5 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Search Used Cars
                    </button>
                  </div>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
} 