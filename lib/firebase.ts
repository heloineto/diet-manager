import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC9F0T3NT4mfG_K1AIbejRpRCIKeaoTvBk',
  authDomain: 'diet-manager-app.firebaseapp.com',
  projectId: 'diet-manager-app',
  storageBucket: 'diet-manager-app.appspot.com',
  messagingSenderId: '834311395335',
  appId: '1:834311395335:web:07e658ab21baedf95af2a2',
  measurementId: 'G-C0F424KD2D',
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
