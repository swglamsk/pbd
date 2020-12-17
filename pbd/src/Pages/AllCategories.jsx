import React from "react";
import firebase from "firebase";
import { Table } from "@material-ui/core";
import { Form, Button } from "react-bootstrap";
import {Searched} from "./Searched"
export const AllCategories = () => {
  const db = firebase.firestore();
  const [categories, setCategories] = React.useState([]);
  const [Name, setCategoryName] = React.useState(null);
  const [searchedCategory, setSearchedCategory] = React.useState(null);
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    (() => {
      db.collection("Category")
        .get()
        .then((snapshot) => {
          setCategories(
            snapshot.docs.map((doc) => {
              return doc;
            })
          );
        });
    })();
  }, [categories]);
  
  const submitCategory = () => {
    db.collection("Category")
      .doc()
      .set({ Name})
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
          db.collection("Category").doc(doc.id).delete();
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
              <td>{element.data().Name}</td>
              <td>{element.id}</td>
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
          <Form.Control
            placeholder="search by category"
            onChange={(e) => setSearchedCategory(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={submitCategory}>
          Add
        </Button>
        <Button variant="primary" onClick={deleteCategory}>
          Delete
        </Button>
        <Button variant="primary" onClick={() => setVisible(true)}>
            Search
        </Button>
        {visible && <Searched searching={searchedCategory}/>}
      </Form>
    </div>
  );
};
