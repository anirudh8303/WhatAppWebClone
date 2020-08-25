import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyA6p5QNnDzTKmJFm4pQp5JX8iZ7Aym4_pE",
    authDomain: "whatsappclone-1c3ae.firebaseapp.com",
    databaseURL: "https://whatsappclone-1c3ae.firebaseio.com",
    projectId: "whatsappclone-1c3ae",
    storageBucket: "whatsappclone-1c3ae.appspot.com",
    messagingSenderId: "137111953927",
    appId: "1:137111953927:web:03bf8a70dc17eced5a40a2",
    measurementId: "G-MCZRMFD345"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
export default db;