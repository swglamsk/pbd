import React from "react";
import { Table } from "@material-ui/core";
import { Form, Button } from "react-bootstrap";
import { Searched } from "./Searched";
import axios from "axios";

const URL = 'http://127.0.0.1:8000'

export const AllCategories = () => {
  const [categories, setCategories] = React.useState([]);
  const [Name, setCategoryName] = React.useState(null);
  const [description, setCategoryDescription] = React.useState(null)
  const [searchedCategory, setSearchedCategory] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const getCategories = async () => {
    await axios.get(`${URL}/categories/`).then((response) => {
      setCategories(
        response.data.map(category => {
          return category
        })
      )

    }).catch(error => {
      console.log(error)
    })
  }

  React.useEffect( () => {
    getCategories() 
  }, [])

  const submitCategory = async () => {
    await axios.post(`${URL}/categories/create/`, {
      name: Name,
      description: description,
      category_posts: []

    })
    await getCategories() 
  };
  const deleteCategory = async (id) => {
    await axios.delete(`${URL}/categories/${id}/delete/`)
    await getCategories() 
  };
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category name</th>
            <th>Category description</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((element, key) => (
            <tr>
              <td>{element.id}</td>
              <td>{element.name}</td>
              <td>{element.description}</td>
              <td><Button onClick={() => deleteCategory(element.id) }>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form>
        <Form.Group controlId="formcategory">
          <Form.Label>Add new category</Form.Label>
          <Form.Control
            placeholder="Enter category name"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <Form.Control
            placeholder="Enter description"
            onChange={(e) => setCategoryDescription(e.target.value)}
          ></Form.Control>
          {/* <Form.Control
            placeholder="search by category"
            onChange={(e) => setSearchedCategory(e.target.value)}
          ></Form.Control> */}
        </Form.Group>
        <Button variant="primary" onClick={submitCategory}>
          Add
        </Button>
        {/* <Button variant="primary" onClick={() => setVisible(true)}>
          Search
        </Button> */}
        {visible && <Searched searching={searchedCategory} />}
      </Form>
    </div>
  );
};
