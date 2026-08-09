/**
 * Bloque de sección con su título.
 *
 * Existe para una cosa: que ninguna sección del sitio se quede sin encabezado
 * de verdad. Quien navega con lector de pantalla salta de encabezado en
 * encabezado, si las secciones se arman con <div> y texto grande, esa
 * persona no tiene forma de moverse por la página.
 */
export default function Section({
  title,
  lead,
  tone = "plain",
  children,
}: {
  title?: string;
  lead?: string;
  tone?: "plain" | "warm";
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        tone === "warm"
          ? "border-y border-line bg-paper-warm"
          : "bg-paper"
      }
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        {title && (
          <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">{title}</h2>
        )}
        {lead && (
          <p className="mt-5 max-w-2xl text-lg text-ink-soft">{lead}</p>
        )}
        <div className={title || lead ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}
