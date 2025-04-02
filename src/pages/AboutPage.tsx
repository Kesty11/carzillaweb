export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-primary-600 tracking-wide uppercase">About Us</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            India's Trusted Car Marketplace
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Connecting car buyers and sellers across India.
          </p>
        </div>
        
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              <p className="mt-4 text-lg text-gray-500">
                At Carzilla, we're committed to making car buying and selling a transparent, hassle-free experience for everyone. Our mission is to create a trusted marketplace where buyers can find their perfect car and sellers can connect with genuine buyers.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              <p className="mt-4 text-lg text-gray-500">
                We envision a future where buying a used car is as reliable and straightforward as buying a new one. We're building a community where trust, transparency, and customer satisfaction are at the heart of every transaction.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose Carzilla?</h3>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary-100 text-primary-700 rounded-md flex items-center justify-center mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900">Verified Listings</h4>
              <p className="mt-2 text-base text-gray-500">
                Every car listing on our platform goes through a verification process to ensure accuracy and reliability.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary-100 text-primary-700 rounded-md flex items-center justify-center mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900">Fair Pricing</h4>
              <p className="mt-2 text-base text-gray-500">
                We provide market insights and pricing guidance to ensure both buyers and sellers get fair deals.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="h-12 w-12 bg-primary-100 text-primary-700 rounded-md flex items-center justify-center mb-4">
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-900">Direct Communication</h4>
              <p className="mt-2 text-base text-gray-500">
                Our platform enables direct communication between buyers and sellers, eliminating middlemen and hidden charges.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Team</h3>
          <p className="text-center text-lg text-gray-500 max-w-3xl mx-auto">
            Carzilla is powered by a dedicated team of automotive enthusiasts, technology experts, and customer service professionals. Together, we're building the most trusted car marketplace in India.
          </p>
        </div>
      </div>
    </div>
  );
} 