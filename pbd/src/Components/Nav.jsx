import { makeStyles } from "@material-ui/core";
import React from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import {getUserData} from "../utils/checkUser"
const useStyles = makeStyles({
  navbar: {
    overflow: "hidden",
    display: "flex",
    width: "100%",
    marginBottom: 8,
    flexWrap: "wrap",
    alignItems: "initial",
  },
});
export const Nav = () => {
  const history = useHistory();
  const classes = useStyles();
  const db = firebase.firestore();
  const [searched, setSearched] = React.useState(null)
  const [isUser, setIsUser] = React.useState(null)
  const [isAdmin, setIsAdmin] = React.useState(null)
 
 const role = localStorage.getItem("email")
 React.useEffect(() =>{
  if( role === "user@user.com"){
    setIsUser(true)
  }
  if (role === "admin@admin.com"){
    setIsAdmin(true)
  }
 
 },[])

  return (
    <Navbar className="bg-light justify-content-between">
      <div className={classes.navbar}>
        <Form inline>
          {isUser ? null :  
          <Button type="submit" onClick={() => history.push("/signedInEditor")}>
            Add new post
          </Button> }
          <Button type="submit" onClick={() => history.push("/allPosts")}>
            See all posts
          </Button>
          {!isAdmin ? null :  
          <Button type="submit" onClick={() => history.push("/categories")}>
            See all categories
          </Button>}
          <Button
            type="submit"
            onClick={() => {
              firebase.auth().signOut();
              history.push("/");
              localStorage.removeItem("email")
            }}
          >
            Log out
          </Button>
        </Form>
      </div>
    </Navbar>
  );
};
