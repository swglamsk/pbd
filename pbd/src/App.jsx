import { LoginPage } from "./Pages/LoginPage";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { SignedInUser } from "./Pages/SignedInUser";
import { signedInAdmin } from "./Pages/signedInAdmin";
import { signedInEditor } from "./Pages/signedInEditor";
import { AllPosts } from "./Pages/AllPosts";
import { Nav } from "./Components/Nav";
import firebase from "firebase";
import { AllCategories } from "./Pages/AllCategories";
import { Searched } from "./Pages/Searched";
import { getUserData } from "./utils/checkUser";
import React from "react";
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
  const [isUser, setIsUser] = React.useState(null);
  React.useEffect(() => {
    const role = localStorage.getItem("email");
    if (role === "admin@admin.com" || role === "editor@editor.com" || role === "user@user.com") {
      setIsUser(false);
      console.log(isUser);
      console.log("isuser powienine byc false");
    } else if (role === null) {
      setIsUser(true);
    }
  },[]);

  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route path="/signedInEditor" component={signedInEditor} />
      <Route path="/AllPosts" component={AllPosts} />
      <Route path="/categories" component={AllCategories} />
    </BrowserRouter>
  );
}

export default App;
