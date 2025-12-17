import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getDashboardStats = async (uid) => {
  const q = query(collection(db, "applications"), where("uid", "==", uid));
  const snap = await getDocs(q);

  let total = 0;

  let statusCount = {
    Applied: 0,
    "OA Pending": 0,
    Interview: 0,
    Offer: 0,
    Rejected: 0,
  };

  const recent = [];

  snap.forEach((doc) => {
    const entry = doc.data();
    total++;

    if (statusCount[entry.status] !== undefined) {
      statusCount[entry.status]++;
    }

    recent.push({ id: doc.id, ...entry });
  });

  return {
    total,
    statusCount,
    recent: recent.slice(-5).reverse(),
  };
};
