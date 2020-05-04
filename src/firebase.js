import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

  // Import Firebase Database, Storage, and Auth
const firebaseConfig = {
    apiKey: "AIzaSyBslURg8BzIY4LQyAMs7COxthAVymmySyQ",
    authDomain: "recipe-poster-app.firebaseapp.com",
    databaseURL: "https://recipe-poster-app.firebaseio.com",
    projectId: "recipe-poster-app",
    storageBucket: "recipe-poster-app.appspot.com",
    messagingSenderId: "320111871342",
    appId: "1:320111871342:web:e6390d3b30e73c05612d7f"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase