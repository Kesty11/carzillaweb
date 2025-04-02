import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, Popover, Menu } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const navigation = {
  categories: [
    {
      id: 'cars',
      name: 'Cars',
      featured: [
        { name: 'New Arrivals', href: '/cars?category=new' },
        { name: 'Used Cars', href: '/cars?category=used' },
        { name: 'Best Sellers', href: '/cars?sort=popularity' },
      ],
      sections: [
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Toyota', href: '/cars?brand=toyota' },
            { name: 'Honda', href: '/cars?brand=honda' },
            { name: 'BMW', href: '/cars?brand=bmw' },
            { name: 'Mercedes-Benz', href: '/cars?brand=mercedes' },
            { name: 'Audi', href: '/cars?brand=audi' },
            { name: 'Tesla', href: '/cars?brand=tesla' },
          ],
        },
        {
          id: 'categories',
          name: 'Categories',
          items: [
            { name: 'SUV', href: '/cars?bodyType=suv' },
            { name: 'Sedan', href: '/cars?bodyType=sedan' },
            { name: 'Hatchback', href: '/cars?bodyType=hatchback' },
            { name: 'Convertible', href: '/cars?bodyType=convertible' },
            { name: 'Truck', href: '/cars?bodyType=truck' },
            { name: 'Van', href: '/cars?bodyType=van' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Cars', href: '/cars' },
    { name: 'Sell Your Car', href: '/sell-car' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
  ],
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-600">Carzilla</span>
            </Link>
            <div className="hidden md:ml-10 md:block">
              <div className="flex space-x-4">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-primary-600"
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link
                to="/signin"
                className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 text-sm font-medium rounded-md"
              >
                Sign up
              </Link>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-40 bg-black bg-opacity-25" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-2xl font-bold text-primary-600">Carzilla</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    to={page.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  to="/signin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
} 