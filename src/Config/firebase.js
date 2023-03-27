import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxlJhlN2DDPCpvG_s1YQ8AA3VU6wvuVR8",
  authDomain: "apimlpropia.firebaseapp.com",
  projectId: "apimlpropia",
  storageBucket: "apimlpropia.appspot.com",
  messagingSenderId: "22608013439",
  appId: "1:22608013439:web:5d0887aa9f40f91218b74a",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
