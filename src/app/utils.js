/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';

export function logout() {
  return auth().signOut();
}

export function useLocalStorage(key, value) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}
export function useLocalStorageState(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const [value, setValue] = useState(
    stored ? JSON.parse(stored) : defaultValue,
  );
  useLocalStorage(key, value);
  return [value, setValue];
}

export async function signup({
  email,
  password,
  phoneNumber,
  displayName,
  photoUrl = 'https://placekitten.com/200/200',
}) {
  const formattedPhone = String('+1').concat(
    String(phoneNumber).replace(/[^\d]/g, ''),
  );
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await user.updateProfile({ displayName, photoUrl });
    await db.doc(`users/${user.uid}`).set({
      displayName,
      uid: user.uid,
      email,
      photoUrl:
        'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico',
      phoneNumber: formattedPhone,
    });
    return user.uid;
  } catch (e) {
    throw e;
  }
}

export async function signupUserTwo({
  email,
  name,
  password = Math.random()
    .toString(36)
    .slice(-8),
  phoneNumber,
  displayName = name,
  photoURL = 'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico',
}) {
  const formattedPhone = String('+1').concat(
    String(phoneNumber).replace(/[^\d]/g, ''),
  );
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    auth()
      .sendPasswordResetEmail(email)
      .catch(e => console.log(e.message));
    await user.updateProfile({ displayName, photoURL });
    await db.doc(`users/${user.uid}`).set({
      displayName,
      uid: user.uid,
      email,
      photoURL,
      phoneNumber: formattedPhone,
    });
    return user.uid;
  } catch (e) {
    throw e;
  }
}

export function fetchDoc(path) {
  return db
    .doc(path)
    .get()
    .then(doc => doc.data());
}

export function fetchUser(uid) {
  return fetchDoc(`users/${uid}`);
}
export function deleteUser(id) {
  return db.doc(`users/${id}`).delete();
}
