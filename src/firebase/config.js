import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcI0AnTXJCyB-zEsxMPyfs0HDQQLHjzMA",
  authDomain: "miniblog-4c10d.firebaseapp.com",
  projectId: "miniblog-4c10d",
  storageBucket: "miniblog-4c10d.appspot.com",
  messagingSenderId: "453722742638",
  appId: "1:453722742638:web:34835f51a3fa99b335eb7f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
