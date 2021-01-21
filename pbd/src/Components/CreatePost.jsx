import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
const URL = "http://127.0.0.1:8000";
const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const CreatePost = () => {
  const classes = useStyles();
  const [title, setTitle] = React.useState(null);
  const [text, setText] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const selectedTags = []
  const selectedCategories = []

  const getCategories = async () => {
    await axios.get(`${URL}/categories/`).then((response) => {
      setCategories(
        response.data.map((category) => {
          return category;
        })
      );
    });
  };
  const getTags = async () => {
    await axios.get(`${URL}/tags/`).then((response) => {
      setTags(
        response.data.map((tag) => {
          return tag;
        })
      );
    });
  };
  React.useEffect(() => {
    getCategories();
    getTags();
  }, []);

  const submitForm = async () => {
    const userID = JSON.parse(localStorage.getItem("user")).id;
    await axios.post(`${URL}/posts/create/`, {
      post_title: title,
      content: text,
      categories: selectedCategories,
      tags: selectedTags,
      author: userID,
    });
  };
  const handleChangeTags = async (value) => {
    if(!selectedTags.includes(value)){
      selectedTags.push(parseInt(value))
    }
      console.log(selectedTags)
  }
  const handleChangeCategories = async (value) => {
    if(!selectedCategories.includes(value)){
      selectedCategories.push(parseInt(value))
    }

    console.log(selectedCategories)
  }
  return (
    <div className={classes.root}>
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
          <Form.Control
            as="select"
            onChange={(e) => handleChangeCategories(e.target.value)}
          >
            {categories.map((row) => {
              return <option value={row.id}>{row.name}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="CreatePost.Tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control as="select" onChange={(e) => handleChangeTags(e.target.value)}>
            {tags.map((row) => {
              return <option value={row.id}>{row.name}</option>;
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
        <Button variant="primary" onClick={submitForm}>
          Add document
        </Button>
      </Form>
    </div>
  );
};
