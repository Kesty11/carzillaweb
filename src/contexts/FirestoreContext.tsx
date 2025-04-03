import React, { createContext, useContext, ReactNode } from 'react';
import { 
  getCars as getFirestoreCars, 
  getCarById, 
  getSimilarCars, 
  addCar as addFirestoreCar, 
  updateCar as updateFirestoreCar, 
  deleteCar as deleteFirestoreCar, 
  toggleFavoriteCar as toggleFirestoreFavoriteCar, 
  getFavoriteCars as getFirestoreFavoriteCars,
  Car
} from '../firebase/firestore';

// Create Firestore context type
interface FirestoreContextType {
  cars: Car[];
  loading: boolean;
  error: string | null;
  fetchCars: () => Promise<void>;
  fetchCarById: (id: string) => Promise<Car | null>;
  fetchSimilarCars: (car: Car) => Promise<Car[]>;
  addCar: (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'images'>, imageFiles: File[]) => Promise<string>;
  updateCar: (id: string, car: Partial<Car>) => Promise<void>;
  deleteCar: (id: string) => Promise<void>;
  toggleFavoriteCar: (userId: string, carId: string, isFavorite: boolean) => Promise<void>;
  getFavoriteCars: (userId: string) => Promise<Car[]>;
  getCars: () => Promise<Car[]>;
}

// Create context with default values
const FirestoreContext = createContext<FirestoreContextType>({
  cars: [],
  loading: false,
  error: null,
  fetchCars: async () => {},
  fetchCarById: async () => null,
  fetchSimilarCars: async () => [],
  addCar: async () => '',
  updateCar: async () => {},
  deleteCar: async () => {},
  toggleFavoriteCar: async () => {},
  getFavoriteCars: async () => [],
  getCars: async () => []
});

// Hook to use Firestore context
export const useFirestore = () => {
  return useContext(FirestoreContext);
};

// Firestore provider component
export const FirestoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = React.useState<Car[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Car operations
  const fetchCars = async () => {
    try {
      const result = await getFirestoreCars();
      setCars(result.cars);
      setLoading(false);
    } catch (error) {
      console.error('Error in fetchCars:', error);
      setError('Error fetching cars');
      setLoading(false);
    }
  };

  const fetchCarById = async (id: string) => {
    try {
      const car = await getCarById(id);
      setLoading(false);
      return car;
    } catch (error) {
      console.error('Error in fetchCarById:', error);
      setError('Error fetching car');
      setLoading(false);
      return null;
    }
  };

  const fetchSimilarCars = async (car: Car) => {
    try {
      if (!car.id) return [];
      const result = await getSimilarCars(car.id, car.brand, car.bodyType, 3);
      setLoading(false);
      return result;
    } catch (error) {
      console.error('Error in fetchSimilarCars:', error);
      setError('Error fetching similar cars');
      setLoading(false);
      return [];
    }
  };

  const addCar = async (car: Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'images'>, imageFiles: File[]): Promise<string> => {
    try {
      const result = await addFirestoreCar(car, imageFiles);
      setLoading(false);
      return result.id;
    } catch (error) {
      console.error('Error in addCar:', error);
      setError('Error adding car');
      setLoading(false);
      throw error;
    }
  };

  const updateCar = async (id: string, car: Partial<Car>): Promise<void> => {
    try {
      await updateFirestoreCar(id, car);
      setLoading(false);
    } catch (error) {
      console.error('Error in updateCar:', error);
      setError('Error updating car');
      setLoading(false);
      throw error;
    }
  };

  const deleteCar = async (id: string): Promise<void> => {
    try {
      await deleteFirestoreCar(id);
      setLoading(false);
    } catch (error) {
      console.error('Error in deleteCar:', error);
      setError('Error deleting car');
      setLoading(false);
      throw error;
    }
  };

  const toggleFavoriteCar = async (userId: string, carId: string, isFavorite: boolean): Promise<void> => {
    try {
      await toggleFirestoreFavoriteCar(userId, carId, isFavorite);
      setLoading(false);
    } catch (error) {
      console.error('Error in toggleFavoriteCar:', error);
      setError('Error toggling favorite car');
      setLoading(false);
      throw error;
    }
  };

  const getFavoriteCars = async (userId: string): Promise<Car[]> => {
    try {
      const result = await getFirestoreFavoriteCars(userId);
      setLoading(false);
      return result;
    } catch (error) {
      console.error('Error in getFavoriteCars:', error);
      setError('Error fetching favorite cars');
      setLoading(false);
      return [];
    }
  };

  const getCars = async (): Promise<Car[]> => {
    try {
      const result = await getFirestoreCars();
      setCars(result.cars);
      setLoading(false);
      return result.cars;
    } catch (error) {
      console.error('Error in getCars:', error);
      setError('Error fetching cars');
      setLoading(false);
      return [];
    }
  };

  const value = {
    cars,
    loading,
    error,
    fetchCars,
    fetchCarById,
    fetchSimilarCars,
    addCar,
    updateCar,
    deleteCar,
    toggleFavoriteCar,
    getFavoriteCars,
    getCars
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}; 