import { makeStyles } from "@material-ui/core";
import React from "react";
import useState from "react";
import { Navbar, Form, FormControl, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

export const Document = ({ docData }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{docData.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {docData.category}
        </Card.Subtitle>
        <Card.Text>{docData.text}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          {docData.userID}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};
