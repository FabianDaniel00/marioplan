import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBe57WPgqrojZYfQENBPkNec74-vaKnLI8",
  authDomain: "marioplan-4e5ec.firebaseapp.com",
  projectId: "marioplan-4e5ec",
  storageBucket: "marioplan-4e5ec.appspot.com",
  messagingSenderId: "432962873803",
  appId: "1:432962873803:web:780252bd53210477822e4e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
