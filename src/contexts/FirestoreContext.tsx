import React, { createContext, useContext, ReactNode } from 'react';
import { 
  getCars, 
  getCarById, 
  getSimilarCars, 
  addCar, 
  updateCar, 
  deleteCar, 
  toggleFavoriteCar, 
  getFavoriteCars,
  Car,
  CarFilter
} from '../firebase/firestore';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

// Create Firestore context type
type FirestoreContextType = {
  cars: Car[];
  loading: boolean;
  error: string | null;
  fetchCars: (
    filters?: CarFilter,
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
    itemsPerPage?: number,
    lastVisible?: QueryDocumentSnapshot<DocumentData>
  ) => Promise<{ cars: Car[]; lastVisible: QueryDocumentSnapshot<DocumentData> | undefined }>;
  
  fetchCarById: (id: string) => Promise<Car | null>;
  
  fetchSimilarCars: (
    carId: string, 
    brand: string, 
    model: string, 
    bodyType: string, 
    limit?: number
  ) => Promise<Car[]>;
  
  createCar: (
    carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'images'>, 
    imageFiles: File[]
  ) => Promise<{ id: string }>;
  
  modifyCar: (
    carId: string, 
    carData: Partial<Car>,
    newImageFiles?: File[],
    deletedImageUrls?: string[]
  ) => Promise<void>;
  
  removeCar: (carId: string) => Promise<void>;
  
  // Favorites operations
  toggleFavorite: (userId: string, carId: string, isFavorite: boolean) => Promise<void>;
  
  fetchFavoriteCars: (userId: string) => Promise<Car[]>;
};

// Create context with default values
const FirestoreContext = createContext<FirestoreContextType>({
  cars: [],
  loading: false,
  error: null,
  fetchCars: async () => ({ cars: [], lastVisible: undefined }),
  fetchCarById: async () => null,
  fetchSimilarCars: async () => [],
  createCar: async () => ({ id: '' }),
  modifyCar: async () => {},
  removeCar: async () => {},
  toggleFavorite: async () => {},
  fetchFavoriteCars: async () => []
});

// Hook to use Firestore context
export const useFirestore = () => {
  return useContext(FirestoreContext);
};

// Firestore provider component
export const FirestoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Car operations
  const fetchCars = async (
    filters: CarFilter = {},
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'desc',
    itemsPerPage: number = 10,
    lastVisible?: QueryDocumentSnapshot<DocumentData>
  ) => {
    try {
      return await getCars(filters, sortBy, sortOrder, itemsPerPage, lastVisible);
    } catch (error) {
      console.error('Error in fetchCars:', error);
      return { cars: [], lastVisible: undefined };
    }
  };

  const fetchCarById = async (id: string) => {
    try {
      return await getCarById(id);
    } catch (error) {
      console.error('Error in fetchCarById:', error);
      return null;
    }
  };

  const fetchSimilarCars = async (
    carId: string, 
    brand: string, 
    model: string, 
    bodyType: string, 
    limit: number = 3
  ) => {
    try {
      return await getSimilarCars(carId, brand, model, bodyType, limit);
    } catch (error) {
      console.error('Error in fetchSimilarCars:', error);
      return [];
    }
  };

  const createCar = async (
    carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'images'>, 
    imageFiles: File[]
  ) => {
    try {
      return await addCar(carData, imageFiles);
    } catch (error) {
      console.error('Error in createCar:', error);
      throw error;
    }
  };

  const modifyCar = async (
    carId: string, 
    carData: Partial<Car>,
    newImageFiles?: File[],
    deletedImageUrls?: string[]
  ) => {
    try {
      await updateCar(carId, carData, newImageFiles, deletedImageUrls);
    } catch (error) {
      console.error('Error in modifyCar:', error);
      throw error;
    }
  };

  const removeCar = async (carId: string) => {
    try {
      await deleteCar(carId);
    } catch (error) {
      console.error('Error in removeCar:', error);
      throw error;
    }
  };

  // Favorites operations
  const toggleFavorite = async (userId: string, carId: string, isFavorite: boolean) => {
    try {
      await toggleFavoriteCar(userId, carId, isFavorite);
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
      throw error;
    }
  };

  const fetchFavoriteCars = async (userId: string) => {
    try {
      return await getFavoriteCars(userId);
    } catch (error) {
      console.error('Error in fetchFavoriteCars:', error);
      return [];
    }
  };

  const value = {
    cars: [],
    loading: false,
    error: null,
    fetchCars,
    fetchCarById,
    fetchSimilarCars,
    createCar,
    modifyCar,
    removeCar,
    toggleFavorite,
    fetchFavoriteCars
  };

  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
}; 