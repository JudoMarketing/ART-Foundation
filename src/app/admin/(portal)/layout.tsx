import { redirect } from "next/navigation";
import { adm } from "@/content/admin";
import { haySesion } from "@/lib/admin-auth";
import { ejemplosAdmin, idiomaAdmin } from "@/lib/admin-prefs";
import { cambiarEjemplos, cambiarIdioma, salir } from "../acciones";
import AdminNav from "./AdminNav";
import SiteLogo from "@/components/SiteLogo";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // La guardia va en el layout y no en cada página: una página nueva que
  // alguien agregue mañana queda protegida sin que se acuerde de protegerla.
  if (!(await haySesion())) redirect("/admin/login");

  const idioma = await idiomaAdmin();
  const ejemplos = await ejemplosAdmin();
  const c = adm(idioma).chrome;

  const items = [
    { href: "/admin", label: c.nav.panel },
    { href: "/admin/inscripciones", label: c.nav.inscripciones },
    { href: "/admin/voluntarios", label: c.nav.voluntarios },
    { href: "/admin/tienda", label: c.nav.tienda },
    { href: "/admin/donaciones", label: c.nav.donaciones },
    { href: "/admin/blog", label: c.nav.blog },
  ];

  return (
    <>
      <a href="#portal" className="skip-link">
        {c.skipToContent}
      </a>

      <header className="border-b-2 border-line bg-paper">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-4 px-4 py-4 sm:px-6">
          <span aria-hidden="true" className="shrink-0">
            <SiteLogo className="h-9 w-auto" />
          </span>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-ink-soft">
            {c.portal}
          </p>

          <div className="ms-auto flex items-center gap-2">
            {/* El idioma como dos botones y no como un menú desplegable: son
                dos opciones, y un desplegable de dos opciones son tres clics
                para hacer uno. */}
            <form action={cambiarIdioma} className="flex items-center gap-1">
              <span className="sr-only">{c.langLabel}</span>
              {(["es", "en"] as const).map((l) => (
                <button
                  key={l}
                  name="idioma"
                  value={l}
                  type="submit"
                  aria-pressed={idioma === l}
                  className={`tap rounded-full px-3 py-1.5 text-sm font-bold transition-colors ${
                    idioma === l
                      ? "bg-ink text-paper"
                      : "text-ink-soft hover:bg-paper-warm"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </form>

            <form action={salir}>
              <button
                type="submit"
                className="tap rounded-full border-2 border-ink px-4 py-1.5 text-sm font-bold transition-transform hover:scale-[1.03]"
              >
                {c.logout}
              </button>
            </form>
          </div>

          <div className="w-full">
            <AdminNav items={items} />
          </div>
        </div>
      </header>

      {/* El cartel de borrador. Va arriba de todo, en todas las pantallas, y
          no se puede cerrar. Un portal que se ve terminado y no lo está es la
          forma más rápida de que alguien planifique con algo que no existe. */}
      <div className="border-b-2 border-line bg-sun-soft">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <p className="font-bold">{c.draftTitle}</p>
          <p className="mt-1 max-w-3xl text-sm text-ink-soft">{c.draftBody}</p>

          <form action={cambiarEjemplos} className="mt-4">
            <button
              name="prender"
              value={ejemplos ? "0" : "1"}
              type="submit"
              className="tap rounded-full bg-ink px-5 py-2 text-sm font-bold text-paper transition-transform hover:scale-[1.03]"
            >
              {ejemplos ? c.demoOff : c.demoOn}
            </button>
          </form>
        </div>
      </div>

      {ejemplos && (
        <p className="bg-[var(--color-was)] px-4 py-2.5 text-center text-sm font-bold text-paper">
          {c.demoBanner}
        </p>
      )}

      <main id="portal" tabIndex={-1} className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {children}
      </main>
    </>
  );
}
