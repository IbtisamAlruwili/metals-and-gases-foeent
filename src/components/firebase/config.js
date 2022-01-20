import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBxBchOjGlNT9FngUHOuQjLrqr1uIhqpMI",
  authDomain: "metal-78065.firebaseapp.com",
  projectId: "metal-78065",
  storageBucket: "metal-78065.appspot.com",
  messagingSenderId: "163753087017",
  appId: "1:163753087017:web:b3214b6e27c2898e2b0c38"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };