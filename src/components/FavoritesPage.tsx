import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useFirestore } from '../contexts/FirestoreContext';
import CarCard from './CarCard';
import { Car } from '../firebase/firestore';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getFavoriteCars, toggleFavoriteCar } = useFirestore();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        if (!currentUser?.uid) return;
        const result = await getFavoriteCars(currentUser.uid);
        setFavorites(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('Error fetching favorites');
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [currentUser, getFavoriteCars]);

  const handleToggleFavorite = async (carId: string) => {
    try {
      if (!currentUser?.uid) return;
      await toggleFavoriteCar(currentUser.uid, carId, false);
      const result = await getFavoriteCars(currentUser.uid);
      setFavorites(result);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setError('Error updating favorite');
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your favorites</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">{error}</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorites</h1>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-500">
          <p>You haven't added any cars to your favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isFavorite={true}
              onFavoriteClick={() => car.id && handleToggleFavorite(car.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
} 