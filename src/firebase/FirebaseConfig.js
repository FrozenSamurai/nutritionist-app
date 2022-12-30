// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcjdHPA-kL72QFOOxz7YB8-ftnwd2vRfE",
  authDomain: "nutritionist-app-d158e.firebaseapp.com",
  projectId: "nutritionist-app-d158e",
  storageBucket: "nutritionist-app-d158e.appspot.com",
  messagingSenderId: "357469293581",
  appId: "1:357469293581:web:890f07c098c31e63969944",
  databaseURL: "https://nutritionist-app-d158e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

export default app;
