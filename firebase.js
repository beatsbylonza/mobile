import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCrkZiarLmuT_twbZWfVP7hJoLlgAKgVt0",
    authDomain: "lonza-da8e4.firebaseapp.com",
    databaseURL: "https://lonza-da8e4-default-rtdb.firebaseio.com",
    projectId: "lonza-da8e4",
    storageBucket: "lonza-da8e4.appspot.com",
    messagingSenderId: "1010403861592",
    appId: "1:1010403861592:web:73ee9ce751f8a4e0d4562d",
    measurementId: "G-NB30STRJ1B"
};

let app;
if(firebase.apps.length == 0){
    app = firebase.initializeApp(firebaseConfig);
}else{
    app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db };