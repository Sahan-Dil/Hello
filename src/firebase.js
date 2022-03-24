import firebase from "firebase/compat";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig={
    
   // apiKey: "AIzaSyAs-uRoLxAP3H_0HEhn3Tj7chWt3bfTgLw",
    //authDomain: "hello-9d006.firebaseapp.com",
   // projectId: "hello-9d006",
   // storageBucket: "hello-9d006.appspot.com",
   // messagingSenderId: "511786241710",
   // appId: "1:511786241710:web:0419b3c1e06a699199273f",
   // measurementId: "G-FNSV4LZ2SJ"

  apiKey: "AIzaSyBcPf8DChYJiZfFed1wH7Zn9lqyrOQxnIw",
  authDomain: "hello-2-33ee4.firebaseapp.com",
  databaseURL: "https://hello-2-33ee4-default-rtdb.firebaseio.com",
  projectId: "hello-2-33ee4",
  storageBucket: "hello-2-33ee4.appspot.com",
  messagingSenderId: "584957286142",
  appId: "1:584957286142:web:298f72fca872139bcab7af",
  measurementId: "G-8H236X9PH5"

};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db=firebaseApp.firestore();
const storage= firebase.storage();

export { auth, storage,db};