import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, ClockIcon, UserIcon, ChatBubbleLeftIcon, ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';

// Import same types from BlogPage
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

// Mock Data - same as in BlogPage.tsx
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
    content: `<p class="mb-4">Buying a used car can be a smart financial decision. Unlike new cars that depreciate significantly the moment they leave the dealership, used cars have already undergone their major depreciation, allowing you to get more value for your money. However, purchasing a pre-owned vehicle comes with its own set of challenges and considerations, especially in the Indian market.</p>

    <p class="mb-4">In this comprehensive guide, we'll walk you through 10 essential tips to ensure you make a wise used car purchase in India.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">1. Set a Realistic Budget</h3>

    <p class="mb-4">Before you begin your search, determine how much you can afford to spend. Remember to account not just for the purchase price, but also for registration transfer fees, insurance, potential repairs, and ongoing maintenance costs. As a general rule, your car expenses should not exceed 20% of your monthly income.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">2. Research Car Models and Their Common Issues</h3>

    <p class="mb-4">Different car models have different reliability ratings and common problems. Research thoroughly about the models you're interested in. Websites, forums, and owner groups can provide valuable insights about long-term reliability, maintenance costs, and common issues specific to certain models or manufacturing years.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">3. Check the Car's History</h3>

    <p class="mb-4">A car's past can significantly affect its future performance. Ask for the service history and verify if the car has been involved in any accidents or has undergone major repairs. In India, you can check the registration details, ownership history, and hypothecation status through the Vahan e-services portal or by contacting the RTO where the car is registered.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">4. Verify the Documentation</h3>

    <p class="mb-4">Ensure all paperwork is in order. This includes:</p>
    <ul class="list-disc pl-6 mb-4">
      <li>Registration Certificate (RC)</li>
      <li>Insurance policy</li>
      <li>Pollution Under Control (PUC) certificate</li>
      <li>Road tax receipts</li>
      <li>NOC (No Objection Certificate) if the car is from another state</li>
      <li>Form 28, 29, and 30 for transfer of ownership</li>
    </ul>

    <h3 class="text-xl font-bold mb-3 mt-6">5. Inspect the Car Thoroughly</h3>

    <p class="mb-4">A comprehensive physical inspection is crucial. Check for signs of rust, dents, or mismatched paint that might indicate repairs after an accident. Inspect the tires for wear, test all electronics, and look for leaks under the car. Don't forget to check the condition of the upholstery and the functionality of comfort features.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">6. Take a Test Drive</h3>

    <p class="mb-4">A test drive is non-negotiable. During the drive, pay attention to how the car accelerates, brakes, and handles turns. Listen for unusual noises, check if the car pulls to one side, and ensure all gears shift smoothly. Test the car on different road conditions if possible.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">7. Get a Professional Inspection</h3>

    <p class="mb-4">While your inspection is valuable, having a mechanic check the car can uncover issues you might miss. They can assess the engine, transmission, suspension, and other critical components more thoroughly. Many authorized service centers offer pre-purchase inspection services.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">8. Compare Prices</h3>

    <p class="mb-4">Use online marketplaces, classifieds, and dealership listings to get a sense of the fair market value for the specific make, model, year, and condition of the car you're interested in. This research will empower you during negotiations.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">9. Consider the Resale Value</h3>

    <p class="mb-4">Some cars retain their value better than others. Brands like Maruti Suzuki, Hyundai, and Toyota generally have good resale value in India due to their reliability and widespread service networks. Consider this factor, especially if you plan to sell the car after a few years.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">10. Negotiate Effectively</h3>

    <p class="mb-4">Armed with information about the car's condition, fair market value, and potential repair costs, you're in a strong position to negotiate. Be willing to walk away if the deal doesn't feel right – there are always other cars available.</p>

    <h3 class="text-xl font-bold mb-3 mt-6">Conclusion</h3>

    <p class="mb-4">Buying a used car requires diligence, research, and often patience. By following these ten tips, you'll navigate the used car market in India with confidence and increase your chances of finding a reliable vehicle that offers good value for your money.</p>

    <p>Remember that a car is a significant investment, and taking the time to make an informed decision will pay off in the long run. Happy car hunting!</p>`,
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
    content: 'Full detailed comparison article here...',
    category: 'car-reviews',
    author: 'Priya Patel',
    date: 'July 3, 2023',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    tags: ['comparisons', 'SUVs', 'Maruti Suzuki', 'Hyundai'],
  },
  // Other blog posts are the same as in BlogPage.tsx
];

// Mock related posts based on same category or tags
const getRelatedPosts = (currentPost: BlogPost): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPost.id && 
      (post.category === currentPost.category || 
       post.tags.some(tag => currentPost.tags.includes(tag))))
    .slice(0, 3);
};

export default function BlogArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // In a real app, you would fetch the post data from an API
    // For now, we'll use our mock data
    const foundPost = blogPosts.find(post => post.id === id);
    
    if (foundPost) {
      setPost(foundPost);
      setRelatedPosts(getRelatedPosts(foundPost));
      
      // Scroll to top when post changes
      window.scrollTo(0, 0);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="bg-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/blog" 
              className="inline-flex items-center px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-white hover:bg-primary-700"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Article header */}
      <div className="bg-primary-700 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-primary-100 mb-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                {categories.find(cat => cat.id === post.category)?.name}
              </span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">{post.title}</h1>
            <div className="flex items-center justify-center text-primary-100 text-sm">
              <div className="flex items-center">
                <UserIcon className="h-4 w-4 mr-1" />
                <span>By {post.author}</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>5 min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-80 object-cover"
              />
              
              <div className="p-6">
                {/* Social sharing and bookmarking */}
                <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
                  <Link 
                    to="/blog" 
                    className="inline-flex items-center text-gray-600 hover:text-primary-700"
                  >
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Back to Blog
                  </Link>
                  
                  <div className="flex items-center gap-3">
                    <button className="text-gray-500 hover:text-gray-700">
                      <ShareIcon className="h-5 w-5" />
                    </button>
                    <button 
                      className={`${isBookmarked ? 'text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
                      onClick={() => setIsBookmarked(!isBookmarked)}
                    >
                      <BookmarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                
                {/* Article content */}
                <div 
                  className="prose max-w-none prose-primary"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
                
                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        to={`/blog?tag=${tag}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Author info */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center text-white text-lg font-semibold">
                        {post.author.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{post.author}</h3>
                      <p className="text-gray-600 text-sm">
                        Automotive journalist with over 10 years of experience in the Indian car market.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Comments section (simplified) */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Comments (3)</h3>
                    <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                      Leave a comment
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Comment 1 */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                          AB
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">Ankit Bhardwaj</h4>
                          <span className="ml-2 text-xs text-gray-500">2 days ago</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          <p>Great tips! I especially found the documentation section helpful as I'm planning to buy a used car next month.</p>
                        </div>
                        <div className="mt-1">
                          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comment 2 */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                          SK
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">Sanjay Kumar</h4>
                          <span className="ml-2 text-xs text-gray-500">1 week ago</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          <p>I would add that checking the car's insurance claim history is also important. Sometimes sellers hide major accidents.</p>
                        </div>
                        <div className="mt-1">
                          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Comment 3 */}
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
                          DP
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="flex items-center">
                          <h4 className="text-sm font-medium text-gray-900">Deepika Patil</h4>
                          <span className="ml-2 text-xs text-gray-500">2 weeks ago</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                          <p>This is exactly what I needed! Just bought a used Maruti Swift following most of these guidelines and got a great deal.</p>
                        </div>
                        <div className="mt-1">
                          <button className="text-xs text-gray-500 hover:text-gray-700">Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Related articles */}
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="block group"
                  >
                    <div className="flex items-start">
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title}
                        className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(1).map((category) => (
                  <li key={category.id}>
                    <Link 
                      to={`/blog?category=${category.id}`}
                      className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-md"
                    >
                      <div className="text-gray-700 hover:text-primary-600">
                        {category.name}
                      </div>
                      <div className="bg-gray-100 text-gray-600 text-sm px-2 py-0.5 rounded-full">
                        {category.count}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Popular tags */}
            <div className="bg-white rounded-lg shadow-md p-5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map((tag) => (
                  <Link
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </Link>
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