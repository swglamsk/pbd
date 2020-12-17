import React from "react";
import firebase from "firebase";
import { Document } from "..//Components/Document";
export const Searched = (searching) => {
  const db = firebase.firestore();
  const [documents, setDocuments] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      let tmp_docs = []
      const query = await db.collection("documents")
        .where("category", "==", "BugFix")
        .get()
          query.forEach((doc) => {
            console.log(doc.data())
            tmp_docs.push(doc.data())
          })

        setDocuments(tmp_docs)
    })();
  }, [documents]);

  return <div>
{documents.map((element) => <Document key={element.id} docData={element}></Document>)}
  </div>
};
