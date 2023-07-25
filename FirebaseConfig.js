// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvIgnArgoDZJ2avvYhWI408f-rlXgFOBM",
  authDomain: "th-man-27e0d.firebaseapp.com",
  projectId: "th-man-27e0d",
  storageBucket: "th-man-27e0d.appspot.com",
  messagingSenderId: "595298265035",
  appId: "1:595298265035:web:49422d2209ef95fd2c784e",
  measurementId: "G-DP17H4ER7N"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };