import React from "react";
import { makeStyles } from "@material-ui/core";
import { Nav } from "../Components/Nav";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
const URL = "http://127.0.0.1:8000";
export const LoginPage = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [username, setUsername] = React.useState("editor");
  const [password, setPassword] = React.useState("editor123");
  const [user, setUser] = React.useState(null);

  const handleLogin = async () => {
      await axios
      .post(`${URL}/login/`, {
        username: username,
        password: password,
      })
      .then((response) => {
        setUser(response.data);
        setIsSignedIn(true);
      });

  };
  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  
  const classes = useStyles();
  return (
    <div>
      {!isSignedIn ? null : <Nav></Nav>}
      <div className={classes.root}>
        <div>
          {!isSignedIn ? (
            <div>
              {" "}
              <h1>Log In</h1>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={() => handleLogin()}>
                  Submit
                </Button>
              </Form>
            </div>
          ) : (
            <div>Welcome {user.username}</div>
          )}
        </div>
      </div>
    </div>
  );
};
