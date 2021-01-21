import React from "react";
import { Document } from "../Components/Document";
import { makeStyles } from "@material-ui/core";
import axios from "axios"
const URL = 'http://127.0.0.1:8000'

const useStyles = makeStyles({
  root: {
    marginTop: "100",
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
});
export const AllPosts = () => {
  const classes = useStyles();
  const [documents, setDocuments] = React.useState([]);

  const getDocs = async () => {
    await axios.get(`${URL}/posts/`).then(response => {
      setDocuments(response.data.map(post => {
        return post
      }))

    })
  }
  React.useEffect(() => {
    getDocs()
  }, []);

  return documents.map((element, key) => (
    <div className={classes.root}>
      <Document key={key} docData={element}></Document>
    </div>
  ));
};
