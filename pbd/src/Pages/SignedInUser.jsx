import React from "react";
import firebase from "firebase";

export const SignedInUser = () => {
  const db = firebase.firestore();

  let docs = [];
  db.collection("documents")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        docs.push(doc.data());
      });
    });

  console.log(docs);
  return <div></div>;
};
