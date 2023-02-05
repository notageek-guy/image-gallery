import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD1UVMyFk_cz3EAJ_vcIrDt9Rh9b5vmSJQ",
  authDomain: "todoreact-7c5fc.firebaseapp.com",
  projectId: "todoreact-7c5fc",
  storageBucket: "todoreact-7c5fc.appspot.com",
  messagingSenderId: "295949089000",
  appId: "1:295949089000:web:a6903932d7a52f6186315d",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

export { auth, googleProvider, storage };
