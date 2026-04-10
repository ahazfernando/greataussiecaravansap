import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export const ADMIN_LOGIN_PATH = "/admin/login";

/**
 * Signs out of Firebase then navigates to the admin login page with a full page load,
 * so the session and dashboard layout state are cleared immediately.
 */
export async function signOutAndGoToAdminLogin(): Promise<void> {
  try {
    await signOut(auth);
  } finally {
    if (typeof window !== "undefined") {
      window.location.assign(ADMIN_LOGIN_PATH);
    }
  }
}
