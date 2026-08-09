import type { Metadata } from "next";
import Image from "next/image";
import { type Locale } from "@/lib/i18n";
import { p } from "@/content/pages";
import { t } from "@/content/copy";
import { OBRA } from "@/content/obra";
import { ORG } from "@/content/site";
import { IconBlog, IconFacebook, IconInstagram } from "@/components/ArtIcons";
import PageHero from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = p(locale as Locale);
  return { title: c.blog.metaTitle, description: c.blog.metaDesc };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const c = p(locale).blog;
  const home = t(locale);

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="paper" />

      {/* Vacío, pero dicho de frente.
          Un blog sin artículos que dice "vienen en camino" con tres tarjetas
          fantasma es peor que uno que dice que está vacío: la tarjeta falsa
          promete algo que no está, y quien la toca se va. */}
      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <div className="flex flex-wrap items-start gap-8">
            <span aria-hidden="true" className="text-paper/70">
              <IconBlog className="h-20 w-20" />
            </span>
            <div className="min-w-[16rem] flex-1">
              <h2 className="text-3xl font-bold text-paper sm:text-4xl">
                {c.emptyTitle}
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-paper/80">{c.emptyBody}</p>
            </div>
          </div>

          <h3 className="mt-16 text-sm font-bold uppercase tracking-[0.16em] text-paper/60">
            {c.categoriesTitle}
          </h3>
          <ul className="mt-5 flex flex-wrap gap-3">
            {c.categories.map((cat) => (
              <li
                key={cat}
                className="rounded-full bg-paper/10 px-5 py-2.5 font-semibold text-paper ring-1 ring-inset ring-white/25"
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Mientras no hay artículos, la obra hace de contenido. Es lo que un
          blog de esta fundación va a mostrar igual. */}
      <section className="paper-grain bg-paper-warm">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">{c.meanwhileTitle}</h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{c.meanwhileBody}</p>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {OBRA.slice(0, 6).map((pieza) => (
              <li key={pieza.slug}>
                <div className="aspect-square overflow-hidden rounded-[--radius-card] border-2 border-line">
                  <Image
                    src={`/obra/${pieza.slug}.webp`}
                    alt={pieza.alt[locale]}
                    width={pieza.w}
                    height={pieza.h}
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={ORG.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn tap inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
            >
              <IconInstagram className="h-5 w-5" />
              Instagram
            </a>
            <a
              href={ORG.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn tap inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-base font-bold text-paper transition-transform hover:scale-[1.03]"
            >
              <IconFacebook className="h-5 w-5" />
              Facebook
            </a>
          </div>

          <p className="sr-only">{home.blog.empty}</p>
        </div>
      </section>
    </>
  );
}
