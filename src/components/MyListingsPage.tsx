import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import { Car } from '../firebase/firestore';

export default function MyListingsPage() {
  const { currentUser } = useAuth();
  const { getCars, deleteCar } = useFirestore();
  const navigate = useNavigate();
  
  const [listings, setListings] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  useEffect(() => {
    if (currentUser) {
      fetchUserListings();
    } else {
      // If no user is logged in, redirect to sign in page
      navigate('/signin');
    }
  }, [currentUser, navigate]);
  
  const fetchUserListings = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError('');
      const result = await getCars();
      setListings(result);
    } catch (err) {
      console.error('Error loading listings:', err);
      setError('Failed to load listings');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (carId: string) => {
    if (!currentUser) return;
    
    try {
      setIsDeleting(true);
      setDeletingId(carId);
      
      await deleteCar(carId);
      
      // Refresh listings after deletion
      const result = await getCars();
      setListings(result);
    } catch (err) {
      console.error('Error deleting listing:', err);
      setError('Failed to delete the listing. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Listings
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your car listings
          </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => navigate('/sell-car')}
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Add New Listing
          </button>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <div className="mt-8">
        {listings.length === 0 ? (
          <div className="text-center py-12 bg-white shadow rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No listings yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first car listing.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/sell-car')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                List Your First Car
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((car) => (
              <div key={car.id} className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold">{car.title}</h2>
                <p className="text-gray-600">{car.brand} {car.model}</p>
                <p className="text-primary-600 font-bold">₹{car.price.toLocaleString()}</p>
                <button
                  onClick={() => handleDelete(car.id!)}
                  disabled={isDeleting && deletingId === car.id}
                  className="mt-4 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting && deletingId === car.id ? 'Deleting...' : 'Delete Listing'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 