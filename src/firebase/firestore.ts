import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  serverTimestamp,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './config';

// Types
export type Car = {
  id?: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  oldPrice?: number;
  location: string;
  kilometers: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  owners: number;
  isNew: boolean;
  isFeatured: boolean;
  isReduced: boolean;
  rating: number;
  sellerType: 'dealer' | 'individual';
  sellerName: string;
  sellerContact: string;
  sellerAvatar?: string;
  sellerUid: string;
  sellerRating: number;
  sellerJoined: string;
  description: string;
  features: string[];
  specifications: {
    engine: string;
    maxPower: string;
    maxTorque: string;
    fuelTank: string;
    seatingCapacity: number;
    bootSpace: string;
    mileage: string;
    groundClearance: string;
    color: string;
  };
  images: string[];
  postedDate: string;
  createdAt?: any;
  updatedAt?: any;
};

export type CarFilter = {
  brand?: string[];
  model?: string[];
  bodyType?: string[];
  fuelType?: string[];
  transmission?: string[];
  yearRange?: string;
  priceRange?: string;
  isNew?: boolean;
  isFeatured?: boolean;
};

// Get all cars with pagination and filters
export const getCars = async (
  filters: CarFilter = {},
  sortBy: string = 'createdAt',
  sortOrder: 'asc' | 'desc' = 'desc',
  itemsPerPage: number = 10,
  lastVisible?: QueryDocumentSnapshot<DocumentData>
) => {
  try {
    // Start with a base query
    let carsQuery = collection(db, 'cars');
    let constraints: any[] = [];
    
    // Add filters
    if (filters.brand && filters.brand.length > 0) {
      constraints.push(where('brand', 'in', filters.brand));
    }
    
    if (filters.model && filters.model.length > 0) {
      constraints.push(where('model', 'in', filters.model));
    }
    
    if (filters.bodyType && filters.bodyType.length > 0) {
      constraints.push(where('bodyType', 'in', filters.bodyType));
    }
    
    if (filters.fuelType && filters.fuelType.length > 0) {
      constraints.push(where('fuelType', 'in', filters.fuelType));
    }
    
    if (filters.transmission && filters.transmission.length > 0) {
      constraints.push(where('transmission', 'in', filters.transmission));
    }
    
    if (filters.isNew !== undefined) {
      constraints.push(where('isNew', '==', filters.isNew));
    }
    
    if (filters.isFeatured !== undefined) {
      constraints.push(where('isFeatured', '==', filters.isFeatured));
    }
    
    // Add price range filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-');
      if (min && max) {
        constraints.push(where('price', '>=', parseInt(min)));
        constraints.push(where('price', '<=', parseInt(max)));
      } else if (min && min.endsWith('+')) {
        constraints.push(where('price', '>=', parseInt(min)));
      }
    }
    
    // Add year range filter
    if (filters.yearRange) {
      const [min, max] = filters.yearRange.split('-');
      if (min && max) {
        constraints.push(where('year', '>=', parseInt(min)));
        constraints.push(where('year', '<=', parseInt(max)));
      }
    }
    
    // Add sorting
    constraints.push(orderBy(sortBy, sortOrder));
    
    // Add pagination
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    
    // Add limit
    constraints.push(limit(itemsPerPage));
    
    // Create the final query
    const finalQuery = query(carsQuery, ...constraints);
    
    // Execute the query
    const querySnapshot = await getDocs(finalQuery);
    
    // Process results
    const cars: Car[] = [];
    querySnapshot.forEach((doc) => {
      cars.push({ id: doc.id, ...doc.data() } as Car);
    });
    
    // Get the last visible document for pagination
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    
    return { cars, lastVisible: lastVisibleDoc };
  } catch (error: any) {
    console.error('Error getting cars:', error);
    throw new Error(error.message);
  }
};

// Get a single car by ID
export const getCarById = async (id: string): Promise<Car | null> => {
  try {
    const carDoc = await getDoc(doc(db, 'cars', id));
    
    if (carDoc.exists()) {
      return { id: carDoc.id, ...carDoc.data() } as Car;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Error getting car by ID:', error);
    throw new Error(error.message);
  }
};

// Get similar cars
export const getSimilarCars = async (
  carId: string,
  brand: string,
  model: string,
  bodyType: string,
  limit: number = 3
): Promise<Car[]> => {
  try {
    // Query for cars with the same brand or body type, excluding the current car
    const q = query(
      collection(db, 'cars'),
      where('id', '!=', carId),
      where('bodyType', '==', bodyType),
      limit
    );
    
    const querySnapshot = await getDocs(q);
    
    const similarCars: Car[] = [];
    querySnapshot.forEach((doc) => {
      similarCars.push({ id: doc.id, ...doc.data() } as Car);
    });
    
    // If we don't have enough similar cars, get cars with the same brand
    if (similarCars.length < limit) {
      const brandQuery = query(
        collection(db, 'cars'),
        where('id', '!=', carId),
        where('brand', '==', brand),
        limit(limit - similarCars.length)
      );
      
      const brandQuerySnapshot = await getDocs(brandQuery);
      
      brandQuerySnapshot.forEach((doc) => {
        // Check if this car is not already in the similar cars array
        if (!similarCars.some(car => car.id === doc.id)) {
          similarCars.push({ id: doc.id, ...doc.data() } as Car);
        }
      });
    }
    
    return similarCars;
  } catch (error: any) {
    console.error('Error getting similar cars:', error);
    throw new Error(error.message);
  }
};

// Add a new car
export const addCar = async (carData: Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'images'>, imageFiles: File[]): Promise<{ id: string }> => {
  try {
    // Add the car document to Firestore without images first
    const carRef = await addDoc(collection(db, 'cars'), {
      ...carData,
      images: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Upload images to storage and get their download URLs
    const imageUrls: string[] = [];
    
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      const imageRef = ref(storage, `cars/${carRef.id}/${i}_${file.name}`);
      
      // Upload the file
      await uploadBytes(imageRef, file);
      
      // Get download URL
      const url = await getDownloadURL(imageRef);
      imageUrls.push(url);
    }
    
    // Update the car document with image URLs
    await updateDoc(carRef, {
      images: imageUrls
    });
    
    return { id: carRef.id };
  } catch (error: any) {
    console.error('Error adding car:', error);
    throw new Error(error.message);
  }
};

// Update a car
export const updateCar = async (
  carId: string, 
  carData: Partial<Car>,
  newImageFiles?: File[],
  deletedImageUrls?: string[]
): Promise<void> => {
  try {
    const carRef = doc(db, 'cars', carId);
    
    // Handle image updates if necessary
    if ((newImageFiles && newImageFiles.length > 0) || (deletedImageUrls && deletedImageUrls.length > 0)) {
      // Get the current car data to access existing images
      const carDoc = await getDoc(carRef);
      if (!carDoc.exists()) {
        throw new Error('Car not found');
      }
      
      const currentData = carDoc.data() as Car;
      let updatedImages = [...(currentData.images || [])];
      
      // Delete images if specified
      if (deletedImageUrls && deletedImageUrls.length > 0) {
        // Remove from storage
        for (const imageUrl of deletedImageUrls) {
          try {
            // Extract the path from the URL (this depends on your storage setup)
            const pathMatch = imageUrl.match(/cars\/.+\/.+/);
            if (pathMatch) {
              const imagePath = pathMatch[0];
              const imageRef = ref(storage, imagePath);
              await deleteObject(imageRef);
            }
          } catch (deleteError) {
            console.error('Error deleting image:', deleteError);
            // Continue with other deletions even if one fails
          }
        }
        
        // Remove from the images array
        updatedImages = updatedImages.filter(url => !deletedImageUrls.includes(url));
      }
      
      // Upload new images if any
      if (newImageFiles && newImageFiles.length > 0) {
        for (let i = 0; i < newImageFiles.length; i++) {
          const file = newImageFiles[i];
          const imageRef = ref(storage, `cars/${carId}/${Date.now()}_${file.name}`);
          
          // Upload the file
          await uploadBytes(imageRef, file);
          
          // Get download URL
          const url = await getDownloadURL(imageRef);
          updatedImages.push(url);
        }
      }
      
      // Update car data with the new images array
      carData.images = updatedImages;
    }
    
    // Update the car document
    await updateDoc(carRef, {
      ...carData,
      updatedAt: serverTimestamp()
    });
  } catch (error: any) {
    console.error('Error updating car:', error);
    throw new Error(error.message);
  }
};

// Delete a car
export const deleteCar = async (carId: string): Promise<void> => {
  try {
    // Get the car data to delete images from storage
    const carDoc = await getDoc(doc(db, 'cars', carId));
    
    if (carDoc.exists()) {
      const carData = carDoc.data() as Car;
      
      // Delete images from storage
      if (carData.images && carData.images.length > 0) {
        for (const imageUrl of carData.images) {
          try {
            // Extract the path from the URL
            const pathMatch = imageUrl.match(/cars\/.+\/.+/);
            if (pathMatch) {
              const imagePath = pathMatch[0];
              const imageRef = ref(storage, imagePath);
              await deleteObject(imageRef);
            }
          } catch (deleteError) {
            console.error('Error deleting image:', deleteError);
            // Continue with other deletions even if one fails
          }
        }
      }
    }
    
    // Delete the car document
    await deleteDoc(doc(db, 'cars', carId));
  } catch (error: any) {
    console.error('Error deleting car:', error);
    throw new Error(error.message);
  }
};

// Add or remove a car from user's favorites
export const toggleFavoriteCar = async (userId: string, carId: string, isFavorite: boolean): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const userData = userDoc.data();
    let favoriteCars: string[] = userData.favoriteCars || [];
    
    if (isFavorite) {
      // Add to favorites if not already there
      if (!favoriteCars.includes(carId)) {
        favoriteCars.push(carId);
      }
    } else {
      // Remove from favorites
      favoriteCars = favoriteCars.filter(id => id !== carId);
    }
    
    // Update user document
    await updateDoc(userRef, {
      favoriteCars: favoriteCars
    });
  } catch (error: any) {
    console.error('Error toggling favorite car:', error);
    throw new Error(error.message);
  }
};

// Get user's favorite cars
export const getFavoriteCars = async (userId: string): Promise<Car[]> => {
  try {
    // Get user document to get favorite car IDs
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      throw new Error('User not found');
    }
    
    const userData = userDoc.data();
    const favoriteCars: string[] = userData.favoriteCars || [];
    
    if (favoriteCars.length === 0) {
      return [];
    }
    
    // Get all the favorite cars
    const cars: Car[] = [];
    
    // Process in batches if there are many favorites
    const batchSize = 10;
    for (let i = 0; i < favoriteCars.length; i += batchSize) {
      const batch = favoriteCars.slice(i, i + batchSize);
      
      // Create queries for each batch
      const q = query(
        collection(db, 'cars'),
        where('id', 'in', batch)
      );
      
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        cars.push({ id: doc.id, ...doc.data() } as Car);
      });
    }
    
    return cars;
  } catch (error: any) {
    console.error('Error getting favorite cars:', error);
    throw new Error(error.message);
  }
};

// Fix the fetchSimilarCars function
export const fetchSimilarCars = async (car: Car): Promise<Car[]> => {
  try {
    const carsRef = collection(db, 'cars');
    const q = query(
      carsRef,
      where('make', '==', car.make),
      where('id', '!=', car.id),
      limit(3)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Car[];
  } catch (error) {
    console.error('Error fetching similar cars:', error);
    return [];
  }
};

// Fix the generateCarId function
export const generateCarId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}; 