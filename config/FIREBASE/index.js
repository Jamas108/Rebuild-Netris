import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
    apiKey: "AIzaSyC2LYukdhn54ZDgFnxlJsBz7OgyHvsUiR4",
    authDomain: "netris-8c61b.firebaseapp.com",
    databaseURL: "https://netris-8c61b-default-rtdb.firebaseio.com",
    projectId: "netris-8c61b",
    storageBucket: "netris-8c61b.appspot.com",
    messagingSenderId: "82734100379",
    appId: "1:82734100379:web:6b8ffe01eb721eae7c7b3e",
    measurementId: "G-F442G1VKD6"
});

const FIREBASE = firebase;

export default FIREBASE;