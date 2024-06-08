// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "hackathon-web-a133c.firebaseapp.com",
//   projectId: "hackathon-web-a133c",
//   storageBucket: "hackathon-web-a133c.appspot.com",
//   messagingSenderId: "784333205898",
//   appId: "1:784333205898:web:4eb613c3524bd94da7d873",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "level-works-308610.firebaseapp.com",
  databaseURL:
    "https://level-works-308610-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "level-works-308610",
  storageBucket: "level-works-308610.appspot.com",
  messagingSenderId: "121599178253",
  appId: "1:121599178253:web:c71f3d601906f8e1b78744",
  measurementId: "G-3TNG413HM2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the necessary Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
