import React from "react";
import { Form, Button } from "react-bootstrap";
import firebase from "firebase";

export const CreatePost = () => {
  const db = firebase.firestore();
  const [title, setTitle] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [userID, setUserID] = React.useState(null);
  const [text, setText] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
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
    setUserID(firebase.auth().currentUser.email);
    db.collection("documents")
      .doc()
      .set({ title, category, userID, text })
      .then(function () {
        console.log("done");
      });
  };
  return (
    <Form>
      <Form.Group controlId="CreatePost.Title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          as="textarea"
          rows={1}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="CreatePost.Category">
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" onChange={(e) => setCategory(e.target.value)}>
          {categories.map((row) => {
            return <option value={row.Name}>{row.Name}</option>;
          })}
        </Form.Control>
        <Form.Group controlId="CreatePost.Doc">
          <Form.Label>Doc</Form.Label>
          <Form.Control
            as="textarea"
            rows={9}
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Group>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={submitForm}>
        Add document
      </Button>
    </Form>
  );
};
