import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDKX5tCH0xcMRmMRaBoXrk0rVWudWWRedI",
  authDomain: "vacation-planner-7b9c0.firebaseapp.com",
  projectId: "vacation-planner-7b9c0",
  storageBucket: "vacation-planner-7b9c0.appspot.com",
  messagingSenderId: "459946861882",
  appId: "1:459946861882:web:3d9334f7d5038086701c03",
  measurementId: "G-V68RTRQJXX"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }