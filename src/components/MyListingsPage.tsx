import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';

export default function MyListingsPage() {
  const { currentUser } = useAuth();
  const { getCars, deleteCar } = useFirestore();
  const navigate = useNavigate();
  
  const [userListings, setUserListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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
      // Use the userId to fetch cars created by this user
      const filter = { userId: currentUser.uid };
      const { cars, error } = await getCars(filter);
      
      if (error) {
        setError(error);
        return;
      }
      
      setUserListings(cars || []);
    } catch (error: any) {
      console.error('Error fetching user listings:', error);
      setError('Failed to load your listings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteCar = async (carId: string) => {
    if (!currentUser) return;
    
    try {
      setIsDeleting(true);
      setDeletingId(carId);
      
      const { error } = await deleteCar(carId);
      
      if (error) {
        setError(error);
        return;
      }
      
      // Remove the car from the local state
      setUserListings(userListings.filter(car => car.id !== carId));
    } catch (error: any) {
      console.error('Error deleting car:', error);
      setError('Failed to delete the car. Please try again.');
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };
  
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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading your listings...</p>
          </div>
        ) : userListings.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {userListings.map((car) => (
                <li key={car.id}>
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div className="flex">
                        <div className="flex-shrink-0 h-20 w-20 bg-gray-200 rounded">
                          {car.images && car.images[0] && (
                            <img
                              src={car.images[0]}
                              alt={`${car.brand} ${car.model}`}
                              className="h-20 w-20 object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-primary-600 truncate">
                            {car.brand} {car.model} {car.year}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {car.variant} • {car.bodyType} • {car.fuelType} • {car.transmission}
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ₹{car.price.toLocaleString()} • {car.mileage} km
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            Listed on {new Date(car.createdAt?.toDate()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0 flex space-x-2">
                      <button
                        onClick={() => navigate(`/car/${car.id}`)}
                        className="text-primary-600 hover:text-primary-900 font-medium text-sm"
                      >
                        View
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => navigate(`/edit-car/${car.id}`)}
                        className="text-primary-600 hover:text-primary-900 font-medium text-sm"
                      >
                        Edit
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        onClick={() => handleDeleteCar(car.id)}
                        disabled={isDeleting && deletingId === car.id}
                        className="text-red-600 hover:text-red-900 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDeleting && deletingId === car.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
} 