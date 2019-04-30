import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyBNkicTWQam_Bwok0XHRvZl3FZ4eapu8UU',
  authDomain: 'recaller-14a1f.firebaseapp.com',
  databaseURL: 'https://recaller-14a1f.firebaseio.com',
  projectId: 'recaller-14a1f',
  storageBucket: 'recaller-14a1f.appspot.com',
  messagingSenderId: '448806748779',
};

firebase.initializeApp(config);

const db = firebase.firestore();
const auth = () => firebase.auth();
export { db, firebase, auth };
