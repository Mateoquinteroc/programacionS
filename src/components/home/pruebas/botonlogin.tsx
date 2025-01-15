"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "red",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }

  return <button onClick={() => signIn("google")}>Sign in with Google</button>;
}
