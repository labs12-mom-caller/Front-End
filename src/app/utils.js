/* eslint-disable import/prefer-default-export */
import { firebase, db, auth } from '../firebase';

export function logout() {
  return auth().signOut();
}

export async function signup({
  email,
  password,
  phoneNumber,
  displayName,
  photoURL = 'https://placekitten.com/200/200',
}) {
  const formattedPhone = String('+1').concat(
    String(phoneNumber).replace(/[^\d]/g, ''),
  );
  try {
    const { user } = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    await user.updateProfile({ displayName, photoURL });
    await db.doc(`users/${user.uid}`).set({
      displayName,
      uid: user.uid,
      email,
      photoURL,
      phoneNumber: formattedPhone,
    });
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
