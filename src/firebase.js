import firebase from 'firebase/app'
import 'firebase/auth';
require("firebase/firestore");

const app = firebase.initializeApp ({
  apiKey: "AIzaSyCuQ2pF05G6GVnhifhgphkq5ty6oVXEdwE",
  authDomain: "trainer-e012f.firebaseapp.com",
  projectId: "trainer-e012f",
  storageBucket: "trainer-e012f.appspot.com",
  messagingSenderId: "991480080495",
  appId: "1:991480080495:web:a2c61c7440369dbe3dc59a",
  measurementId: "G-VTPHZ6VS60"
})
  




export const db = firebase.firestore();
export const auth = app.auth();
export default app

/**
 * Gets a users/{uid} document with username
 * @param {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = db.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}
