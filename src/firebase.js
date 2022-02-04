import firebase from 'firebase/app'
import 'firebase/auth';

const app = firebase.initializeApp ({
    apiKey: "AIzaSyD1Rg0Oc_ORx5_CmFgiifnojPZDJajtnlo",
    authDomain: "trainer-directory.firebaseapp.com",
    projectId: "trainer-directory",
    storageBucket: "trainer-directory.appspot.com",
    messagingSenderId: "30317991718",
    appId: "1:30317991718:web:ac73fe80f816ea0228d3e7"
  })

export const auth = app.auth()
export default app
