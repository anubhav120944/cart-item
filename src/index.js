import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCGbEyHetQncD4Nx-OpiNGAM7G08DkFUUo",
    authDomain: "cart-71da6.firebaseapp.com",
    projectId: "cart-71da6",
    storageBucket: "cart-71da6.appspot.com",
    messagingSenderId: "648064415597",
    appId: "1:648064415597:web:4b291aa997520e12ff4c64"
  };
  

firebase.default.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById('root'));

