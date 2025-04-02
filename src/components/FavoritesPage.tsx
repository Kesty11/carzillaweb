import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import CarCard from './CarCard';

export default function FavoritesPage() {
  const { currentUser } = useAuth();
  const { getFavoriteCars, toggleFavoriteCar } = useFirestore();
  const navigate = useNavigate();
  
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (currentUser) {
      fetchFavorites();
    } else {
      // If no user is logged in, redirect to sign in page
      navigate('/signin');
    }
  }, [currentUser, navigate]);
  
  const fetchFavorites = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      setError('');
      const result = await getFavoriteCars();
      
      if (result.error) {
        setError(result.error);
        return;
      }
      
      setFavorites(result.cars || []);
    } catch (error: any) {
      console.error('Error fetching favorites:', error);
      setError('Failed to load your favorite cars. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleRemoveFavorite = async (carId: string) => {
    if (!currentUser) return;
    
    try {
      await toggleFavoriteCar(carId);
      // Remove the car from the local state
      setFavorites(favorites.filter(car => car.id !== carId));
    } catch (error: any) {
      console.error('Error removing favorite:', error);
      setError('Failed to remove from favorites. Please try again.');
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            My Favorites
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Cars you've saved to review later
          </p>
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
            <p className="text-gray-500">Loading your favorites...</p>
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((car) => (
              <div key={car.id} className="relative">
                <CarCard car={car} onClick={() => navigate(`/car/${car.id}`)} />
                <button
                  onClick={() => handleRemoveFavorite(car.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="Remove from favorites"
                >
                  <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white shadow rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Start browsing cars and save your favorites to view them here.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/cars')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Browse Cars
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 