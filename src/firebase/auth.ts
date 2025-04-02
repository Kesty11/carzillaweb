import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// Register a new user
export const registerUser = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<{ user: User; error?: never } | { user?: never; error: string }> => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email,
      displayName,
      createdAt: serverTimestamp(),
      phoneNumber: null,
      photoURL: null,
      favoritesCars: [],
      location: null
    });
    
    return { user };
  } catch (error: any) {
    let errorMessage = 'An unknown error occurred during registration.';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }
    
    return { error: errorMessage };
  }
};

// Login with email and password
export const loginUser = async (
  email: string, 
  password: string
): Promise<{ user: User; error?: never } | { user?: never; error: string }> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error: any) {
    let errorMessage = 'An unknown error occurred during login.';
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      errorMessage = 'Invalid email or password.';
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed login attempts. Please try again later.';
    }
    
    return { error: errorMessage };
  }
};

// Login with Google
export const loginWithGoogle = async (): Promise<{ user: User; error?: never } | { user?: never; error: string }> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user document exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    // If user does not exist, create a new document
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        createdAt: serverTimestamp(),
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        favoritesCars: [],
        location: null
      });
    }
    
    return { user };
  } catch (error: any) {
    let errorMessage = 'An unknown error occurred during Google login.';
    
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Login popup was closed before completing the authentication.';
    }
    
    return { error: errorMessage };
  }
};

// Logout user
export const logoutUser = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    let errorMessage = 'An unknown error occurred.';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No user found with this email address.';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }
    
    return { success: false, error: errorMessage };
  }
}; 