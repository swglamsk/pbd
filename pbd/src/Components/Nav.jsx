import { makeStyles } from "@material-ui/core";
import React from "react";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
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
  return (
    <Navbar className="bg-light justify-content-between">
      <div className={classes.navbar}>
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search documents"
            className=" mr-sm-2"
          />
          <Button type="submit">Search</Button>
          <Button type="submit" onClick={() => history.push("/signedInEditor")}>
            Add new post
          </Button>
          <Button type="submit" onClick={() => history.push("/allUsers")}>
            See all users
          </Button>
          <Button type="submit" onClick={() => history.push("/allPosts")}>
            See all posts
          </Button>
        </Form>
      </div>
    </Navbar>
  );
};
