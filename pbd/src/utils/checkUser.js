import firebase from "firebase";
export const getUserData = () => {
  const db = firebase.firestore();
  let data = ""
  db.collection("Users")
    .where("email", "==", localStorage.getItem("email"))
    .get()
    .then((query) => {
      query.forEach((doc) => {
        data = doc.data().role;
        console.log(data)
        console.log("teraz funkcja")
      });
    });
    return data
};
