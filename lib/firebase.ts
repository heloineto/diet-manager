import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDFSCILjbvGDlhp6xojOv9l4T3g7Azj5k4',
  authDomain: 'diet-manager-co.firebaseapp.com',
  projectId: 'diet-manager-co',
  storageBucket: 'diet-manager-co.appspot.com',
  messagingSenderId: '385439945857',
  appId: '1:385439945857:web:25e2ebea6a9caab1ebe980',
  measurementId: 'G-Q6EGJ1FSS8',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
export const arrayRemove = firebase.firestore.FieldValue.arrayRemove;

export const storage = firebase.storage();
