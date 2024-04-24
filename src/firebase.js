// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtXelyBntKa12hyvPPwCGCGyRszM6Y_WY",
  authDomain: "react-disney-plus-clone-ffda8.firebaseapp.com",
  projectId: "react-disney-plus-clone-ffda8",
  storageBucket: "react-disney-plus-clone-ffda8.appspot.com",
  messagingSenderId: "251811183790",
  appId: "1:251811183790:web:77172e07f843f6e963c13f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;