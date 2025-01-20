"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./botonlogin.module.sass";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className={styles.authButton} onClick={() => signOut()}>
        Sign out
      </button>
    );
  }

  return (
    <button className={styles.authButton} onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  );
}
