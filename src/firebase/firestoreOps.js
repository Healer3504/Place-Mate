// src/firebase/firestoreOps.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

// add application under users collection or a separate applications collection referencing uid
export async function addApplication(uid, appData) {
  const col = collection(db, "applications");
  const docRef = await addDoc(col, {
    uid,
    ...appData,
    createdAt: new Date().toISOString(),
  });
  return { id: docRef.id, ...appData };
}

export async function getUserApplications(uid) {
  const col = collection(db, "applications");
  const q = query(col, where("uid", "==", uid), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return data;
}

export async function deleteApplication(id) {
  await deleteDoc(doc(db, "applications", id));
}

export async function updateApplication(id, updates) {
  await updateDoc(doc(db, "applications", id), { ...updates });
}
