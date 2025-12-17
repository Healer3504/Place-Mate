// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // listen for auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // load user doc from Firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(userRef);
        const profile = snap.exists() ? snap.data() : { uid: firebaseUser.uid, email: firebaseUser.email };
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // create user (signup) + save profile in Firestore
  const signupUser = async (name, email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(res.user, { displayName: name }).catch(() => {});
    const userDoc = {
      uid: res.user.uid,
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, "users", res.user.uid), userDoc);
    setUser(userDoc);
    return userDoc;
  };

  // login
  const loginUser = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    // Firestore user will be loaded by onAuthStateChanged listener
    return res.user;
  };

  // logout
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signupUser, loginUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
