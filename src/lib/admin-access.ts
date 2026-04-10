/**
 * Admin access is stored in Firestore `adminUsers` (document id = Firebase Auth uid).
 * Merge security rules so: users can create their own profile (typically `pending`);
 * only `approved` users can update other users’ access (for /admin/users).
 * Optional: `NEXT_PUBLIC_BOOTSTRAP_ADMIN_EMAILS` (comma-separated) auto-approves those emails on signup/first login.
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";
import { db } from "./firebase";

export const ADMIN_USERS_COLLECTION = "adminUsers";

export type AdminAccessStatus = "pending" | "approved" | "rejected";

export interface AdminUserRecord {
  id: string;
  email: string;
  accessStatus: AdminAccessStatus;
  createdAt?: { toDate?: () => Date };
  updatedAt?: { toDate?: () => Date };
  reviewedAt?: { toDate?: () => Date };
  reviewedByUid?: string;
}

/** Comma-separated emails in env may be approved without waiting (e.g. first technical admin). */
function isBootstrapEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const raw = process.env.NEXT_PUBLIC_BOOTSTRAP_ADMIN_EMAILS || "";
  const set = new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
  return set.has(email.trim().toLowerCase());
}

export async function recordAdminSignup(user: User): Promise<void> {
  const approved = isBootstrapEmail(user.email);
  await setDoc(doc(db, ADMIN_USERS_COLLECTION, user.uid), {
    email: user.email || "",
    accessStatus: approved ? "approved" : "pending",
    createdAt: serverTimestamp(),
  });
}

export async function resolveAdminAccessForSession(
  user: User
): Promise<AdminAccessStatus> {
  const ref = doc(db, ADMIN_USERS_COLLECTION, user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const approved = isBootstrapEmail(user.email);
    const status: AdminAccessStatus = approved ? "approved" : "pending";
    await setDoc(ref, {
      email: user.email || "",
      accessStatus: status,
      createdAt: serverTimestamp(),
    });
    return status;
  }
  const data = snap.data();
  const s = data.accessStatus as AdminAccessStatus | undefined;
  if (s === "approved" || s === "pending" || s === "rejected") return s;
  return "pending";
}

export async function fetchAllAdminUsers(): Promise<AdminUserRecord[]> {
  const q = query(collection(db, ADMIN_USERS_COLLECTION), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      email: (data.email as string) || "",
      accessStatus: (data.accessStatus as AdminAccessStatus) || "pending",
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      reviewedAt: data.reviewedAt,
      reviewedByUid: data.reviewedByUid as string | undefined,
    };
  });
}

export async function setAdminAccessStatus(
  targetUid: string,
  status: "approved" | "rejected",
  reviewerUid: string
): Promise<void> {
  await updateDoc(doc(db, ADMIN_USERS_COLLECTION, targetUid), {
    accessStatus: status,
    updatedAt: serverTimestamp(),
    reviewedAt: serverTimestamp(),
    reviewedByUid: reviewerUid,
  });
}
