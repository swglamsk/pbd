import React from "react";
import firebase from "firebase";
import { Document } from "../Components/Document";

export const AllPosts = () => {
  const db = firebase.firestore();
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    (() => {
      db.collection("Category")
        .get()
        .then((snapshot) => {
          setDocuments(
            snapshot.docs.map((doc) => {
              return doc.data();
            })
          );
        });
    })();
  }, []);

  return documents.map((element) => <Document docData={element}></Document>);
};
