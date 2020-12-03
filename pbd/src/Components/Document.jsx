import { makeStyles } from "@material-ui/core";
import React from "react";
import useState from "react";
import { Navbar, Form, FormControl, Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import Popup from "reactjs-popup";
export const Document = ({ docData }) => {
  const db = firebase.firestore();
  const deletePost = () => {
    db.collection("documents").doc(docData.id).delete();
  };
  const [title, setTitle] = React.useState(docData.data().title);
  const [category, setCategory] = React.useState(docData.data().category);
  const [userID, setUserID] = React.useState(null);
  const [text, setText] = React.useState(docData.data().text);
  const [categories, setCategories] = React.useState([]);
  const [documentID, setID] = React.useState(null);
  React.useEffect(() => {
    (() => {
      db.collection("Category")
        .get()
        .then((snapshot) => {
          setCategories(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    })();
  }, []);
  const submitForm = () => {
    setID(Math.random() * 100000);
    db.collection("documents")
      .doc(docData.id)
      .set({ title, category, userID, text, documentID })
      .then(function () {
        console.log("done");
      });
  };
  return (
    <Card style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>{docData.data().title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {docData.data().category}
        </Card.Subtitle>
        <Card.Text>{docData.data().text}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          {docData.data().userID}
        </Card.Subtitle>
        <Popup trigger={<Button> Edit</Button>}position ="right center">
          <Form>
            <Form.Group controlId="CreatePost.Title">
              <Form.Label>Title</Form.Label>
              <Form.Control defaultValue={docData.data().title}
                as="textarea"
                rows={1}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="CreatePost.Category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((row) => {
                  return <option value={row.Name}>{row.Name}</option>;
                })}
              </Form.Control>
              <Form.Group controlId="CreatePost.Doc">
                <Form.Label>Doc</Form.Label>
                <Form.Control
                                  defaultValue={docData.data().text}
                  as="textarea"
                  rows={9}
                  onChange={(e) => setText(e.target.value)}

                />
              </Form.Group>
            </Form.Group>
            <Button variant="primary" onClick={submitForm}>
              Add document
            </Button>
          </Form>
        </Popup>
        <Button type="submit" onClick={deletePost}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
};
