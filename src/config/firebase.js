import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBBJ8iiBIAhNmPC6qfR0HGX0ucdnIPLbZw",
  authDomain: "chousei-firebase-70e81.firebaseapp.com",
  databaseURL: "https://chousei-firebase-70e81.firebaseio.com",
  projectId: "chousei-firebase-70e81",
  storageBucket: "",
  messagingSenderId: "924982950422",
  appId: "1:924982950422:web:2d32edac308e07f0805337"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
