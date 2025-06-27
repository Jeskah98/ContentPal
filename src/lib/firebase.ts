import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app'; // Import FirebaseApp type
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut, Auth } from 'firebase/auth'; // Import Auth type
import { getFirestore, doc, setDoc, Firestore } from 'firebase/firestore'; // Import Firestore type
import { getStorage, ref, uploadBytes, getDownloadURL , FirebaseStorage } from 'firebase/storage'; // Import FirebaseStorage type
import { getAnalytics, Analytics } from 'firebase/analytics'; // Import Analytics type

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;
let analytics: Analytics | null = null;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize and export services only after the app is initialized
auth = getAuth(app);
db = getFirestore(app);
storage = getStorage(app);
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Auth Methods
export const emailSignIn = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password)

export const googleSignIn = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}

export const signOut = () => {
  return firebaseSignOut(auth);
}

// Firestore Methods
export const createUserProfile = async (userId: string, data: { email: string }) => {
  await setDoc(doc(db, 'users', userId), data)
}

// Storage Methods
export const uploadFile = async (file: File, path: string): Promise<string> => {
  const storageRef = ref( storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  const downloadURL = await getDownloadURL(snapshot.ref)
  return downloadURL
}

// Explicit exports
export { auth };
export const emailSignUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
export { db };
export { storage };
export { analytics };