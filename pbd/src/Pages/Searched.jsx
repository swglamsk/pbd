import React from "react";
import { Document } from "..//Components/Document";

import axios from "axios"
const URL = 'http://127.0.0.1:8000'
export const Searched = ({ searching }) => {
  const [documents, setDocuments] = React.useState([]);

  const getDocs = async () => {
    await axios.get(`${URL}/posts/`).then(response => {
      setDocuments(response.data.map(post => {
        return post
      }))

    })
  }
  const containsDocument = ( (value) => {
    return value.categories.name === searching
  })

  React.useEffect(() => {
    getDocs()
    setDocuments(documents.filter(containsDocument))
    console.log(searching)
  }, []);

  return (
    <div>
      {documents.map((element) => (
        <Document key={element.id} docData={element}></Document>
      ))}
    </div>
  );
};
