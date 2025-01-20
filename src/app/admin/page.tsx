"use client";

import { Fondo } from "app/components/home";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Muestra un estado de carga mientras se valida la sesión
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  // Si no hay sesión, muestra el panel de inicio de sesión
  if (!session) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Fondo />
        <h1>Iniciar Sesión</h1>
        <button
          onClick={() => signIn("google")} // Cambia "google" al proveedor que estés usando
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#4285F4",
            color: "white",
            cursor: "pointer",
          }}
        >
          Inicia sesión con Google
        </button>
      </div>
    );
  }

  // Si el usuario está autenticado, muestra el panel de administración
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Fondo />
      <h1>Panel de Administración</h1>
      <p>
        Bienvenido, {session.user?.name} ({session.user?.email})
      </p>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <button
          onClick={() => signOut()}
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
        >
          Sign out
        </button>
        <button
          onClick={() => router.push("/admin/PanelAdmin")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Ir al panel
        </button>
      </div>
    </div>
  );
}
