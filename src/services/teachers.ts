import { ref, get } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export async function fetchTeachers() {
  try {
    const snapshot = await get(ref(db, "teachers"));

    if (!snapshot.exists()) return [];

    return Object.entries(snapshot.val()).map(([id, value]) => ({
      id,
      ...(value as object),
    }));
  } catch (error) {
    console.error("Firebase error:", error);
    return [];
  }
}
