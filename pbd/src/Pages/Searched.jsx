import React from "react";
import firebase from "firebase";
import {Document} from "..//Components/Document"
export const Searched = (searching) => {
  const db = firebase.firestore();
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    (() => {
      db.collection("documents").where("category", "==", searching)
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
