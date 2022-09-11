import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAsN-NRC3iArMfE0gypNuDbMyLDu5CJsr4",
	authDomain: "clone-projects-9.firebaseapp.com",
	projectId: "clone-projects-9",
	storageBucket: "clone-projects-9.appspot.com",
	messagingSenderId: "174316682985",
	appId: "1:174316682985:web:b8e149acb01f06656dba78",
};

let app;

if (firebase.apps.length === 0) {
	app = firebase.initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
