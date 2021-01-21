import { LoginPage } from "./Pages/LoginPage";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AddPost } from "./Pages/AddPost";
import { AllPosts } from "./Pages/AllPosts";
import { AllCategories } from "./Pages/AllCategories";
import React from "react";
function App() {

  return (
    <BrowserRouter>
      <Route exact path="/" component={LoginPage} />
      <Route path="/AddPost" component={AddPost} />
      <Route path="/AllPosts" component={AllPosts} />
      <Route path="/categories" component={AllCategories} />
    </BrowserRouter>
  );
}

export default App;
