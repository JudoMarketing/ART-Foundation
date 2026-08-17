import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adm } from "@/content/admin";
import { haySesion, portalConfigurado } from "@/lib/admin-auth";
import { idiomaAdmin } from "@/lib/admin-prefs";
import LoginForm from "./LoginForm";
import { LogoMark } from "@/components/SiteLogo";

export async function generateMetadata(): Promise<Metadata> {
  const c = adm(await idiomaAdmin()).login;
  return { title: c.metaTitle };
}

export default async function LoginPage() {
  const idioma = await idiomaAdmin();
  const c = adm(idioma).login;

  // Quien ya entró no tiene por qué volver a ver la puerta.
  if (await haySesion()) redirect("/admin");

  const configurado = portalConfigurado();

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-16">
      <div className="card rounded-[--radius-card] bg-paper p-8 sm:p-10">
        <span aria-hidden="true" className="block">
          <LogoMark className="h-12 w-12" />
        </span>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-ink-soft">
          {c.eyebrow}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{c.title}</h1>
        <p className="mt-3 text-ink-soft">{c.lead}</p>

        {configurado ? (
          <LoginForm
            label={c.label}
            hint={c.hint}
            submit={c.submit}
            errBad={c.errBad}
            errEmpty={c.errEmpty}
          />
        ) : (
          <div className="mt-8 rounded-[--radius-card] border-2 border-[var(--color-was)] bg-paper-warm p-6">
            <h2 className="text-lg font-bold">{c.notConfiguredTitle}</h2>
            <p className="mt-2 text-ink-soft">{c.notConfiguredBody}</p>
          </div>
        )}
      </div>
    </main>
  );
}
