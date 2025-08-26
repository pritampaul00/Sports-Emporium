import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQZwyw-N0swMpyUomuwF6zpYdXwgFba0k",
  authDomain: "sports-emporium.firebaseapp.com",
  projectId: "sports-emporium",
  storageBucket: "sports-emporium.firebasestorage.app",
  messagingSenderId: "417018705827",
  appId: "1:417018705827:web:e6f92b244fc339cc0f4c16",
  measurementId: "G-6H2M7DGQLD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// ✅ Add required scopes
facebookProvider.addScope("email");
facebookProvider.addScope("public_profile");

facebookProvider.setCustomParameters({
  display: "popup",
});

export { auth, googleProvider, facebookProvider };
