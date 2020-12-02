import React from "react";
import { Form, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%"
  },
});

export const LoginPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
