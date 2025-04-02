import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    content:
      'Carzilla made buying my first car incredibly easy. The search tools helped me find exactly what I was looking for within my budget. Highly recommend!',
    author: {
      name: 'Sarah Johnson',
      role: 'First-time Buyer',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    content:
      'As a car enthusiast, I appreciate the detailed specifications and high-quality photos on Carzilla. I found my dream BMW in just two days of searching!',
    author: {
      name: 'Alex Rodriguez',
      role: 'Car Enthusiast',
      imageUrl:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    content:
      'Selling my car was a breeze with Carzilla. I got multiple offers within 48 hours and sold for more than I expected. The process was transparent and secure.',
    author: {
      name: 'Michael Chen',
      role: 'Seller',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 4,
    content:
      'The comparison feature on Carzilla helped me make an informed decision between three different SUVs. I could easily compare prices, features, and specs side by side.',
    author: {
      name: 'Emily Williams',
      role: 'Family Car Buyer',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 5,
    content:
      'The EMI calculator on Carzilla helped me plan my budget effectively. I found a great financing option through one of their partner banks too!',
    author: {
      name: 'David Thompson',
      role: 'Finance-savvy Buyer',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Customers Are Saying
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
            Thousands of happy customers have found their perfect vehicles through Carzilla
          </p>
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="relative h-80 sm:h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="h-full rounded-lg bg-white p-6 shadow-lg sm:p-8 md:p-10">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <svg
                        className="h-10 w-10 text-primary-500"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                      <p className="mt-4 text-lg font-medium text-gray-900 sm:text-xl md:text-2xl">
                        {testimonials[activeIndex].content}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="h-12 w-12 flex-shrink-0">
                        <img
                          className="h-12 w-12 rounded-full"
                          src={testimonials[activeIndex].author.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-base font-medium text-gray-900">
                          {testimonials[activeIndex].author.name}
                        </div>
                        <div className="text-base text-gray-500">
                          {testimonials[activeIndex].author.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-2.5 w-2.5 rounded-full ${
                  activeIndex === index ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                onClick={() => handleDotClick(index)}
                aria-current={activeIndex === index ? 'true' : 'false'}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 