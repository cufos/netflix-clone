import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// the configuration here
const config = {
  apiKey: "AIzaSyCPeDIPU0j-cd11NP1XKGFFf7QK5wqdl6E",
  authDomain: "netflix-clone-a93eb.firebaseapp.com",
  databaseURL: "https://netflix-clone-a93eb.firebaseio.com",
  projectId: "netflix-clone-a93eb",
  storageBucket: "netflix-clone-a93eb.appspot.com",
  messagingSenderId: "286169474630",
  appId: "1:286169474630:web:44a7af0eba837136118c47",
};

const firebase = Firebase.initializeApp(config);

export { firebase };
