import firebase from "firebase";
export const getUserData = async () => {
    let role = ''
  const db = firebase.firestore();
  db.collection("Users")
    .where("email", "==", localStorage.getItem("email"))
    .get()
    .then((query) => {
      query.forEach((doc) => {
        role = doc.data().role;
        console.log(doc.data().name)
        console.log("test?")
      });
    });
    return role
};
