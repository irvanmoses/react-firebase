import React, { useState } from "react";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        console.log(err);
      });

    setEmail("");
    setPassword("");
  };

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        alert("Signed in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        alert("Signed in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        alert("Signed in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="text"
        placeholder="Password"
      />
      <button type="submit" onClick={signUp}>
        Create Account
      </button>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signWithGoogle}>Sign In with Google</button>
      <button onClick={signWithFacebook}>Sign In with Facebook</button>
    </>
  );
};

export default Authentication;
