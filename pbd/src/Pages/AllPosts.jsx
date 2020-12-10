import React from "react";
import firebase from "firebase";
import { Document } from "../Components/Document";
import { makeStyles } from "@material-ui/core";
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
  const db = firebase.firestore();
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    (() => {
      db.collection("documents")
        .get()
        .then((snapshot) => {
          setDocuments(
            snapshot.docs.map((doc) => {
              return doc;
            })
          );
        });
    })();
  }, [documents, db]);

  return documents.map((element) => (
    <div className={classes.root}>
      <Document docData={element}></Document>
    </div>
  ));
};
