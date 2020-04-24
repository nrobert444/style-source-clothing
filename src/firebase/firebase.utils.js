import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyBKSC522mFokkOxnuegl1M69DQtCNiNOk0',
  authDomain: 'style-source-db.firebaseapp.com',
  databaseURL: 'https://style-source-db.firebaseio.com',
  projectId: 'style-source-db',
  storageBucket: 'style-source-db.appspot.com',
  messagingSenderId: '1042542429504',
  appId: '1:1042542429504:web:7c443f3c6ea04f4915a6a5',
  measurementId: 'G-2ZL74XD0T4',
};

export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...otherData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
