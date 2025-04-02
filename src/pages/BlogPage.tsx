import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Types
type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
};

type Category = {
  id: string;
  name: string;
  count: number;
};

// Mock Data
const categories: Category[] = [
  { id: 'all', name: 'All Categories', count: 12 },
  { id: 'car-reviews', name: 'Car Reviews', count: 4 },
  { id: 'buying-guides', name: 'Buying Guides', count: 3 },
  { id: 'maintenance', name: 'Maintenance & Service', count: 2 },
  { id: 'news', name: 'Automotive News', count: 2 },
  { id: 'technology', name: 'Car Technology', count: 1 },
];

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Tips for Buying a Used Car in India',
    excerpt: 'Buying a used car can be a smart financial decision, but it requires careful research and inspection. Here are our top tips for making a wise purchase.',
    content: 'Full content here...',
    category: 'buying-guides',
    author: 'Raj Sharma',
    date: 'June 15, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['used cars', 'buying guides', 'tips'],
  },
  {
    id: '2',
    title: 'Maruti Suzuki Fronx vs Hyundai Venue: Which Sub-Compact SUV Should You Buy?',
    excerpt: 'We compare two popular sub-compact SUVs in the Indian market to help you decide which one suits your needs better.',
    content: 'Full content here...',
    category: 'car-reviews',
    author: 'Priya Patel',
    date: 'July 3, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['comparisons', 'SUVs', 'Maruti Suzuki', 'Hyundai'],
  },
  {
    id: '3',
    title: 'Electric Vehicles in India: Current State and Future Prospects',
    excerpt: 'As the world moves towards sustainable transportation, we look at the current state of electric vehicles in India and their future outlook.',
    content: 'Full content here...',
    category: 'news',
    author: 'Amit Kumar',
    date: 'August 10, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['electric vehicles', 'sustainability', 'future trends'],
  },
  {
    id: '4',
    title: 'Essential Monsoon Car Maintenance Tips for Indian Drivers',
    excerpt: 'The monsoon season in India can be tough on your vehicle. Learn how to protect and maintain your car during the rainy months.',
    content: 'Full content here...',
    category: 'maintenance',
    author: 'Neha Singh',
    date: 'September 5, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['car maintenance', 'monsoon', 'tips'],
  },
  {
    id: '5',
    title: 'Tata Nexon EV: A Comprehensive Review',
    excerpt: 'A detailed review of the Tata Nexon EV, one of India\'s popular electric vehicles, covering performance, features, and value for money.',
    content: 'Full content here...',
    category: 'car-reviews',
    author: 'Vikram Desai',
    date: 'October 12, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['Tata', 'electric vehicles', 'car reviews'],
  },
  {
    id: '6',
    title: 'Understanding Car Insurance in India: A Beginner\'s Guide',
    excerpt: 'Navigate the complexities of car insurance in India with our comprehensive guide for new car owners.',
    content: 'Full content here...',
    category: 'buying-guides',
    author: 'Anjali Verma',
    date: 'November 8, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['insurance', 'buying guides', 'new owners'],
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Paginate posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get a featured post (in this case, the first one)
  const featuredPost = blogPosts[0];

  return (
    <div className="bg-white">
      {/* Header section */}
      <div className="bg-primary-700 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Car&zilla Blog</h1>
          <p className="text-primary-100 text-lg max-w-3xl mx-auto">
            Stay updated with the latest automotive news, reviews, and tips to make informed decisions about your next car purchase.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content area */}
          <div className="lg:w-2/3">
            {/* Featured post */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={featuredPost.imageUrl} 
                  alt={featuredPost.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>By {featuredPost.author}</span>
                    <span>•</span>
                    <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                      {categories.find(cat => cat.id === featuredPost.category)?.name}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
                  <Link 
                    to={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800"
                  >
                    Read more <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* All blog posts */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Latest Articles</h2>
                <div className="text-sm text-gray-500">
                  Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
                </div>
              </div>
              
              {currentPosts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {currentPosts.map((post) => (
                      <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                              {categories.find(cat => cat.id === post.category)?.name}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 flex-grow">{post.excerpt}</p>
                          <Link 
                            to={`/blog/${post.id}`}
                            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-800 text-sm"
                          >
                            Read more <ChevronRightIcon className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <nav className="inline-flex rounded-md shadow">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                              currentPage === page
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500 mb-4">No articles found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-primary-600 font-medium hover:text-primary-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Search box */}
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Search Articles</h3>
              <form onSubmit={handleSearch}>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-r-md shadow-sm text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li 
                    key={category.id}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-md"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <div 
                      className={`${
                        selectedCategory === category.id ? 'text-primary-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {category.name}
                    </div>
                    <div className="bg-gray-100 text-gray-600 text-sm px-2 py-0.5 rounded-full">
                      {category.count}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular tags */}
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter signup */}
            <div className="bg-primary-50 rounded-lg shadow-md p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest automotive news and updates delivered straight to your inbox.
              </p>
              <form className="space-y-3">
                <div>
                  <input
                    type="email"
                    placeholder="Your email address"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 