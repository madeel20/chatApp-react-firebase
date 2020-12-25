import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDXrSMaVQpMRAmIep7CpyVK3C8gssxcO9Q",
    authDomain: "flutter-combine.firebaseapp.com",
    databaseURL: "https://flutter-combine.firebaseio.com",
    projectId: "flutter-combine",
    storageBucket: "flutter-combine.appspot.com",
    messagingSenderId: "794077153750",
    appId: "1:794077153750:web:0c70bae52f7f6fb8403c77",
    measurementId: "G-QN362NHFM4"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage().ref();
export const database = firebase.database();
