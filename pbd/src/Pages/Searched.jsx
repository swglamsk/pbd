import React from "react";
import firebase from "firebase";
import { Document } from "..//Components/Document";
export const Searched = ({searching}) => {
  const db = firebase.firestore();
  const [documents, setDocuments] = React.useState([]);

  React.useEffect(() => {

    (async () => {
      console.log('useeffect')
      var tmp_docs = []
      const snapshot = await db.collection("documents")
        .where("category", "==", searching)
        .get();
          snapshot.forEach((doc) => {

            tmp_docs.push(doc)
          })

        setDocuments(tmp_docs)
    })();
  }, []);
  return <div>
{documents.map((element) => <Document key={element.id} docData={element}></Document>)}
  </div>
};
