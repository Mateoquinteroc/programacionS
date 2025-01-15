"use client";

import AuthGuard from "../../../components/AuthGuard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PanelAdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Detectar el tamaño de la pantalla
    const screenWidth = window.innerWidth;

    // Redirigir si la pantalla no está entre 1024px y 1920px
    if (screenWidth < 1024 || screenWidth > 2560) {
      router.push("/"); // Redirigir a la página principal
    }
  }, [router]);

  return (
    <AuthGuard>
      <div>
        <h1>Panel de Administración</h1>
        <p>Bienvenido al panel de administración.</p>
      </div>
    </AuthGuard>
  );
}
