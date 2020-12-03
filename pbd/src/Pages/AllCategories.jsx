import React from "react";
import firebase from "firebase";
import { Document } from "../Components/Document";
import { Table } from "@material-ui/core";
import { Form, Button } from "react-bootstrap";
export const AllCategories = () => {
  const db = firebase.firestore();
  const [categories, setCategories] = React.useState([]);
  const [Name, setCategoryName] = React.useState(null);
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
  }, [categories]);
  const submitCategory = () => {
    db.collection("Category")
      .doc()
      .set({ Name, categoryID: Math.random() * 100000000000000000 })
      .then(function () {
        console.log("done");
      });
  };
  const deleteCategory = () => {
    db.collection("Category")
      .where("Name", "==", Name)
      .get()
      .then((query) => {
        query.forEach((doc) => {
          db.collection("Category").doc(doc.id).delete()
        });
      });
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category name</th>
            <th>Category ID</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((element, key) => (
            <tr>
              <td>{key}</td>
              <td>{element.Name}</td>
              <td>{element.categoryID}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Form.Group controlId="formcategory">
          <Form.Label>Add new category or delete</Form.Label>
          <Form.Control
            placeholder="Enter category name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={submitCategory}>
          Add
        </Button>
        <Button variant="primary"  onClick={deleteCategory}>
          Delete
        </Button>
      </Form>
    </div>
  );
};
