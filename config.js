import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9WZD13F3j4HciI38lsVQl2mup15jT4dg",
  authDomain: "steroid-2dde4.firebaseapp.com",
  projectId: "steroid-2dde4",
  storageBucket: "steroid-2dde4.appspot.com",
  messagingSenderId: "362854028966",
  appId: "1:362854028966:web:25402c5b91c88973c70667"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;