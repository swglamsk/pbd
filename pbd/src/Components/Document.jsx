import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import Popup from "reactjs-popup";
import axios from "axios";
const URL = "http://127.0.0.1:8000";
export const Document = ({ docData }) => {
  const [title, setTitle] = React.useState();
  const [categories, setCategories] = React.useState();
  const [content, setContent] = React.useState();
  const [tags, setTags] = React.useState();
  const [author, setAuthor] = React.useState();
  const [isAdmin, setIsAdmin] = React.useState(null);
  const [isEditor, setIsEditor] = React.useState(null);
  const [role, setRole] = React.useState(null);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const selectedTags = [];
  const selectedCategories = [];

  const getCategories = async () => {
    await axios.get(`${URL}/categories/`).then((response) => {
      setCategories(
        response.data.map((category) => {
          return category;
        })
      );
    });
    if (role === null || undefined) {
      setRole(JSON.parse(localStorage.getItem("user")).role);
    }
  };
  const getTags = async () => {
    await axios.get(`${URL}/tags/`).then((response) => {
      setTags(
        response.data.map((tag) => {
          return tag;
        })
      );
    });
    if (role === null || undefined) {
      setRole(JSON.parse(localStorage.getItem("user")).role);
    }
  };

  React.useEffect(() => {
    getCategories();
    getTags();
    console.log(categories)


    if (role === "ADMIN") {
      setIsAdmin(true);
      setIsEditor(false);
    }
    if (role === "EDITOR") {
      setIsAdmin(false);
      setIsEditor(true);
    }
  }, [role]);

  const deletePost = async () => {
    await axios.delete(`${URL}/posts/${docData.id}/delete`);
  };

  const handleEdit = async () => {
    await axios.patch(`${URL}/posts/${docData.id}/update/`, {
      post_title: title,
      content: content,
      categories: selectedCategories,
      tags: selectedTags,
    });
  };
  const handleChangeTags = async (value) => {
    if (!selectedTags.includes(value)) {
      selectedTags.push(parseInt(value));
    }
    console.log(selectedTags);
  };
  const handleChangeCategories = async (value) => {
    if (!selectedCategories.includes(value)) {
      selectedCategories.push(parseInt(value));
    }
  };
  return (
    <Card style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>{docData.post_title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Categories:
          {docData.categories.map((e) => {
            return ` ${e.name}, `;
          })}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Tags:{" "}
          {docData.tags.map((e) => {
            return ` ${e.name}, `;
          })}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Author: {docData.author.username}
        </Card.Subtitle>
        <Card.Text>{docData.content}</Card.Text>

        {isEditor || !isAdmin ? null : (

          <Popup trigger={<Button> Edit</Button>} position="right center">
                      <div style={{backgroundColor:"rgb(255,255,255)", borderStyle:"solid", borderRadius:8, borderColor:"grey"}}>
            <Form>
              <Form.Group controlId="CreatePost.Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  defaultValue={docData.post_title}
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
                    return (
                      <option key={row.id} value={row.id}>
                        {row.name}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => handleChangeTags(e.target.value)}
                >
                  {tags.map((row) => {
                    return <option value={row.id}>{row.name}</option>;
                  })}
                </Form.Control>
                <Form.Group controlId="CreatePost.Doc">
                  <Form.Label>Doc</Form.Label>
                  <Form.Control
                    defaultValue={docData.content}
                    as="textarea"
                    rows={9}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>
              </Form.Group>
              <Button variant="primary" onClick={handleEdit}>
                Add document
              </Button>
            </Form>
            </div>
          </Popup>
        )}
        {!isAdmin ? null : (
          <Button type="submit" onClick={deletePost}>
            DELETE
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};
