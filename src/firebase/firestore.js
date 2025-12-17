import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

/* ===========================================================
   ADD NEW APPLICATION
   =========================================================== */
export const addApplication = async (uid, data) => {
  const ref = collection(db, "applications");
  await addDoc(ref, {
    ...data,
    uid,
    createdAt: Date.now(),
  });
};

/* ===========================================================
   GET ALL APPLICATIONS OF THIS USER
   =========================================================== */
export const getUserApplications = async (uid) => {
  const q = query(collection(db, "applications"), where("uid", "==", uid));
  const snap = await getDocs(q);

  const apps = [];
  snap.forEach((docSnap) => {
    apps.push({ id: docSnap.id, ...docSnap.data() });
  });

  return apps;
};

/* ===========================================================
   DELETE APPLICATION
   =========================================================== */
export const deleteApplication = async (id) => {
  await deleteDoc(doc(db, "applications", id));
};

/* ===========================================================
   UPDATE APPLICATION
   =========================================================== */
export const updateApplication = async (id, updatedData) => {
  const ref = doc(db, "applications", id);
  await updateDoc(ref, updatedData);
};

/* ===========================================================
   DASHBOARD STATISTICS
   =========================================================== */
export const getDashboardStats = async (uid) => {
  const q = query(collection(db, "applications"), where("uid", "==", uid));
  const snap = await getDocs(q);

  let total = 0;
  let applied = 0;
  let interviewing = 0;
  let offered = 0;
  let rejected = 0;

  snap.forEach((docSnap) => {
    total++;
    const status = docSnap.data().status;

    if (status === "Applied") applied++;
    if (status === "Interviewing") interviewing++;
    if (status === "Offered") offered++;
    if (status === "Rejected") rejected++;
  });

  return { total, applied, interviewing, offered, rejected };
};
