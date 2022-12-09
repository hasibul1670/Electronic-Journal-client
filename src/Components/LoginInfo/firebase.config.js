import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDF0y9YfKpEwXv7XHh253NLX7A60iNXhDg",
    authDomain: "ejournal-9871c.firebaseapp.com",
    projectId: "ejournal-9871c",
    storageBucket: "ejournal-9871c.appspot.com",
    messagingSenderId: "888861293398",
    appId: "1:888861293398:web:3905b44a4106b94690f4f7",
    measurementId: "G-G7XR5YPB2R"
  };

  const app = initializeApp(firebaseConfig);

  export default app;