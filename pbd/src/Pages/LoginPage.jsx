import React from "react";
import { makeStyles } from "@material-ui/core";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "firebase";
import {Nav} from "../Components/Nav"
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

// Configure FirebaseUI.

export const LoginPage = () => {
  console.log("test")
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "",
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks:{
      signInSuccessWithAuthResult: (foo) => {localStorage.setItem('email', foo.user.email)  }
    }
  };
  React.useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => setIsSignedIn(!!user));
    return () => unregisterAuthObserver();
  }, []);

  const classes = useStyles();
  return (
    <div>
    {!isSignedIn ? null : <Nav></Nav>}
    <div className={classes.root}>

      <div>
        {!isSignedIn ? (
          <div>
            {" "}
            <h1>Log In</h1>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        ) : (
          <div>
            <p>Welcome {firebase.auth().currentUser.email}!</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};
