"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { abrirSesion, cerrarSesion } from "@/lib/admin-auth";
import { COOKIES_ADMIN } from "@/lib/admin-prefs";

/** Entrar. Devuelve el motivo del fallo para que la pantalla lo muestre. */
export async function entrar(
  _previo: { error?: string } | null,
  datos: FormData,
): Promise<{ error?: string }> {
  const clave = String(datos.get("clave") ?? "");
  if (!clave) return { error: "vacia" };

  const r = await abrirSesion(clave);
  if (!r.ok) return { error: r.motivo };

  redirect("/admin");
}

export async function salir(): Promise<void> {
  await cerrarSesion();
  redirect("/admin/login");
}

export async function cambiarIdioma(datos: FormData): Promise<void> {
  const idioma = String(datos.get("idioma") ?? "es");
  (await cookies()).set(COOKIES_ADMIN.idioma, idioma === "en" ? "en" : "es", {
    path: "/admin",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/admin", "layout");
}

export async function cambiarEjemplos(datos: FormData): Promise<void> {
  const prender = String(datos.get("prender") ?? "0") === "1";
  (await cookies()).set(COOKIES_ADMIN.ejemplos, prender ? "1" : "0", {
    path: "/admin",
    maxAge: 60 * 60 * 24 * 30,
    sameSite: "lax",
  });
  revalidatePath("/admin", "layout");
}
