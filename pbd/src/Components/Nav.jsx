import { makeStyles } from "@material-ui/core";
import React from "react";
import { Navbar, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
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
    if(role === null || undefined){
      setRole(JSON.parse(localStorage.getItem("user")).role);
    }

    if (role === "USER") {
      setIsUser(true);
      setIsAdmin(false)
    }
    if (role === "ADMIN") {
      setIsAdmin(true);
      setIsUser(false)
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
              history.push("/");
              localStorage.removeItem("user");
            }}
          >
            Log out
          </Button>
        </Form>
      </div>
    </Navbar>
  );
};
