import firebase from 'firebase/app'
import 'firebase/auth';
require("firebase/firestore");

const app = firebase.initializeApp ({
<<<<<<< HEAD
  apiKey: "AIzaSyD1Rg0Oc_ORx5_CmFgiifnojPZDJajtnlo",
=======
    apiKey: "AIzaSyD1Rg0Oc_ORx5_CmFgiifnojPZDJajtnlo",
>>>>>>> 347e8eb9f612538c0fca1e6a11e27530125fe1fd
    authDomain: "trainer-directory.firebaseapp.com",
    projectId: "trainer-directory",
    storageBucket: "trainer-directory.appspot.com",
    messagingSenderId: "30317991718",
    appId: "1:30317991718:web:ac73fe80f816ea0228d3e7"
<<<<<<< HEAD
})
  


=======
  })
>>>>>>> 347e8eb9f612538c0fca1e6a11e27530125fe1fd


export const db = firebase.firestore();
export const auth = app.auth()
export default app
<<<<<<< HEAD

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
=======
>>>>>>> 347e8eb9f612538c0fca1e6a11e27530125fe1fd
