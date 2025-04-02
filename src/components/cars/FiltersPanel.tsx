import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';

export type FilterOption = {
  id: string;
  name: string;
  count?: number;
};

export type FilterGroup = {
  id: string;
  name: string;
  options: FilterOption[];
};

export type Filters = {
  brand: string[];
  model: string[];
  bodyType: string[];
  fuelType: string[];
  transmission: string[];
  yearRange: string;
  priceRange: string;
};

interface FiltersPanelProps {
  filterGroups: FilterGroup[];
  activeFilters: Filters;
  onFilterChange: (groupId: string, filterId: string, checked: boolean) => void;
  onYearRangeChange: (value: string) => void;
  onPriceRangeChange: (value: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export default function FiltersPanel({
  filterGroups,
  activeFilters,
  onFilterChange,
  onYearRangeChange,
  onPriceRangeChange,
  onClearFilters,
  className = '',
}: FiltersPanelProps) {
  // Count total number of applied filters
  const countActiveFilters = () => {
    let count = 0;
    count += activeFilters.brand.length;
    count += activeFilters.model.length;
    count += activeFilters.bodyType.length;
    count += activeFilters.fuelType.length;
    count += activeFilters.transmission.length;
    if (activeFilters.yearRange) count += 1;
    if (activeFilters.priceRange) count += 1;
    return count;
  };
  
  const totalActiveFilters = countActiveFilters();

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, groupId: string, optionId: string) => {
    onFilterChange(groupId, optionId, e.target.checked);
  };

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {totalActiveFilters > 0 && (
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500"
              onClick={onClearFilters}
            >
              Clear all
            </button>
          )}
        </div>
        {totalActiveFilters > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {activeFilters.priceRange && (
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                Price: {activeFilters.priceRange.replace('-', ' - ').replace('+', '+')}
                <button
                  type="button"
                  className="ml-1 inline-flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  onClick={() => onPriceRangeChange('')}
                >
                  <span className="sr-only">Remove price filter</span>
                  <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}
            {activeFilters.yearRange && (
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                Year: {activeFilters.yearRange.replace('-', ' - ')}
                <button
                  type="button"
                  className="ml-1 inline-flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  onClick={() => onYearRangeChange('')}
                >
                  <span className="sr-only">Remove year filter</span>
                  <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            )}
            {/* For arrays like brand, model, etc. */}
            {Object.entries(activeFilters).map(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                return value.map((filterId) => {
                  const group = filterGroups.find((g) => g.id === key);
                  const option = group?.options.find((o) => o.id === filterId);
                  if (!option) return null;
                  
                  return (
                    <span 
                      key={`${key}-${filterId}`}
                      className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                    >
                      {option.name}
                      <button
                        type="button"
                        className="ml-1 inline-flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                        onClick={() => onFilterChange(key, filterId, false)}
                      >
                        <span className="sr-only">Remove {option.name} filter</span>
                        <XMarkIcon className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </span>
                  );
                });
              }
              return null;
            })}
          </div>
        )}
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
        <div className="mt-2">
          <select
            id="priceRange"
            name="priceRange"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            value={activeFilters.priceRange}
            onChange={(e) => onPriceRangeChange(e.target.value)}
          >
            <option value="">Any Price</option>
            <option value="0-500000">Under ₹5,00,000</option>
            <option value="500000-1000000">₹5,00,000 - ₹10,00,000</option>
            <option value="1000000-1500000">₹10,00,000 - ₹15,00,000</option>
            <option value="1500000-2500000">₹15,00,000 - ₹25,00,000</option>
            <option value="2500000+">₹25,00,000+</option>
          </select>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900">Year</h3>
        <div className="mt-2">
          <select
            id="yearRange"
            name="yearRange"
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500"
            value={activeFilters.yearRange}
            onChange={(e) => onYearRangeChange(e.target.value)}
          >
            <option value="">Any Year</option>
            <option value="2023-2024">2023 - 2024</option>
            <option value="2020-2022">2020 - 2022</option>
            <option value="2015-2019">2015 - 2019</option>
            <option value="2010-2014">2010 - 2014</option>
            <option value="2000-2009">2000 - 2009</option>
            <option value="1990-1999">1990 - 1999</option>
          </select>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filterGroups.map((group) => (
          <Disclosure as="div" key={group.id} defaultOpen={true} className="border-b border-gray-200">
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none">
                  <span>{group.name}</span>
                  <ChevronDownIcon
                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="px-4 pb-4 pt-2">
                  <div className="space-y-2">
                    {group.options.map((option) => (
                      <div key={option.id} className="flex items-center">
                        <input
                          id={`filter-${group.id}-${option.id}`}
                          name={`${group.id}[]`}
                          value={option.id}
                          type="checkbox"
                          checked={
                            group.id in activeFilters && 
                            Array.isArray(activeFilters[group.id as keyof Filters]) && 
                            (activeFilters[group.id as keyof Filters] as string[]).includes(option.id)
                          }
                          onChange={(e) => handleFilterChange(e, group.id, option.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <label
                          htmlFor={`filter-${group.id}-${option.id}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.name}
                          {option.count !== undefined && (
                            <span className="ml-1 text-xs text-gray-400">({option.count})</span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
    </div>
  );
} 