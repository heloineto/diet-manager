import type firebase from 'firebase/app';

export type DocumentReference = firebase.firestore.DocumentReference;

export type DocumentData = firebase.firestore.DocumentData;

export type FieldValue = firebase.firestore.FieldValue;

export type FirebaseRef =
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
