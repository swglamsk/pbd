import { makeStyles } from "@material-ui/core";
import React from "react";
import { Navbar, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
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
  const [isUser, setIsUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(null);
  const [role, setRole] = React.useState(null);
  React.useEffect(() => {
    const db = firebase.firestore();
    (async () => {
      const query = await db
        .collection("Users")
        .where("email", "==", localStorage.getItem("email"))
        .get();

      query.forEach((doc) => {
        setRole(doc.data().role);
        
      });
      console.log(role);
      console.log("teraz funkcja");
    })();

    if (role === "user") {
      console.log("jest to user");
      setIsUser(true);
    }
    if (role === "admin") {
      console.log("jest to admin");
      setIsAdmin(true);
    }
  }, [role]);

  return (
    <Navbar className="bg-light justify-content-between">
      <div className={classes.navbar}>
        <Form inline>
          {isUser ? null : (
            <Button type="submit" onClick={() => history.push("/AddPost")}>
              Add new post
            </Button>
          )}
          <Button type="submit" onClick={() => history.push("/allPosts")}>
            See all posts
          </Button>
          {!isAdmin ? null : (
            <Button type="submit" onClick={() => history.push("/categories")}>
              See all categories
            </Button>
          )}
          <Button
            type="submit"
            onClick={() => {
              firebase.auth().signOut();
              history.push("/");
              localStorage.removeItem("email");
            }}
          >
            Log out
          </Button>
        </Form>
      </div>
    </Navbar>
  );
};
