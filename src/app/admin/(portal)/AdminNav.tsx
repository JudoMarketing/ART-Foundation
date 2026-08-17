"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * El menú del portal.
 *
 * La sección donde estás va marcada de dos formas a la vez, y no es de más:
 * el color de fondo, para quien la ve, y `aria-current="page"`, para quien la
 * escucha. Una sola de las dos deja afuera a la mitad.
 */
export default function AdminNav({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  const aqui = usePathname();

  return (
    <nav aria-label="Portal" className="overflow-x-auto">
      <ul className="flex gap-1.5">
        {items.map((it) => {
          const activo =
            it.href === "/admin" ? aqui === "/admin" : aqui.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={activo ? "page" : undefined}
                className={`tap inline-block whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  activo
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-paper-warm hover:text-ink"
                }`}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
