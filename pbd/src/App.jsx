import { LoginPage } from "./Pages/LoginPage";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignedInUser } from "./Pages/SignedInUser";
import { signedInAdmin } from "./Pages/signedInAdmin";
import { signedInEditor } from "./Pages/signedInEditor";
import { AllPosts } from "./Pages/AllPosts";
import { Nav } from "./Components/Nav";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "knowledge-management-bd522.firebaseapp.com",
  databaseURL: "https://knowledge-management-bd522.firebaseio.com",
  projectId: "knowledge-management-bd522",
  storageBucket: "knowledge-management-bd522.appspot.com",
  messagingSenderId: "270814337955",
  appId: "1:270814337955:web:4861c7f59c35e15f63d816",
  measurementId: "G-42VPFY6TDN",
};

firebase.initializeApp(firebaseConfig);
function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Route exact path="/" component={LoginPage} />
      <Route path="/signedInUser" component={SignedInUser} />
      <Route path="/signedInAdmin" component={signedInAdmin} />
      <Route path="/signedInEditor" component={signedInEditor} />
      <Route path="/AllPosts" component={AllPosts} />
    </BrowserRouter>
  );
}

export default App;
