import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCXzOrVqwGCVNrrVFbDc3NaIjTh-GDTrPU",
    authDomain: "parcial5jefersonvivero.firebaseapp.com",
    projectId: "parcial5jefersonvivero",
    storageBucket: "parcial5jefersonvivero.appspot.com",
    messagingSenderId: "745835385173",
    appId: "1:745835385173:web:62798d321cee82f193dfdc"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)