import { firebase, db, auth } from '../firebase';

export function logout() {
  return auth().signOut();
}
