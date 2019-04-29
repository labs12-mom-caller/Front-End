/* eslint-disable import/prefer-default-export */
import { firebase, db, auth } from '../firebase';

export function logout() {
  return auth().signOut();
}
// const handleSubmit = async values => {
//   console.log(values);
//   const formattedPhone = String('+1').concat(
//     String(values.phoneNumber).replace(/[^\d]/g, ''),
//   );
//   try {
//     const { user } = await firebase
//       .auth()
//       .createUserWithEmailAndPassword(values.email, values.password);
//     const ref = db.doc(`users/${user.uid}`);
//     const { email, photoURL } = user;
//     ref.set({
//       displayName: values.displayName,
//       photoURL,
//       email: values.email,
//       phoneNumber: formattedPhone,
//     });
//     console.log(user, '$$$$$$');
//     user.updateProfile({ displayName: values.displayName });
//   } catch (error) {
//     alert(error);
//   }
// };
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
