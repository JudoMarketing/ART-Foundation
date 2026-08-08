/**
 * Comprobación de accesibilidad.
 *
 * Hace dos cosas que se complementan:
 *   1. axe-core contra WCAG 2.0 / 2.1 / 2.2 nivel AA
 *   2. un recorrido con teclado, comprobando que cada parada tenga foco
 *      visible — eso axe no lo mide y es de lo que más se rompe
 *
 * Uso:  npm run build && npm start   (en una terminal)
 *       npm run a11y                 (en otra)
 *
 * Sale con código 1 si hay una sola violación, para que se pueda enganchar
 * a CI y que nadie publique una regresión de accesibilidad sin enterarse.
 */
import { chromium } from "playwright";
import { createRequire } from "node:module";
import fs from "node:fs";

const require = createRequire(import.meta.url);
const AXE = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

const BASE = process.env.A11Y_BASE_URL ?? "http://127.0.0.1:3000";
const PAGES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["/", "/es"];

// En entornos donde el navegador ya viene instalado (contenedores de CI),
// se le pasa la ruta por A11Y_CHROMIUM. Si no, Playwright usa el suyo.
const browser = await chromium.launch({
  args: ["--no-sandbox", "--no-proxy-server"],
  ...(process.env.A11Y_CHROMIUM
    ? { executablePath: process.env.A11Y_CHROMIUM }
    : {}),
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let violations = 0;

for (const path of PAGES) {
  const url = `${BASE}${path}`;
  await page.goto(url, { waitUntil: "load" });
  await page.addScriptTag({ content: AXE });

  const result = await page.evaluate(async () =>
    await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
      },
    })
  );

  console.log(`\n══ ${url}`);
  console.log(
    `   ${result.passes.length} reglas pasadas · ${result.violations.length} violaciones`
  );
  for (const v of result.violations) {
    violations++;
    console.log(`   ✗ [${v.impact}] ${v.id} — ${v.help}`);
    for (const n of v.nodes.slice(0, 3)) {
      console.log(`       ${n.html.slice(0, 110)}`);
    }
    console.log(`       ${v.helpUrl}`);
  }
}

// ── Recorrido con teclado ──────────────────────────────────────────────────
await page.goto(`${BASE}${PAGES[0]}`, { waitUntil: "load" });
console.log("\n══ recorrido con Tab");

for (let i = 0; i < 14; i++) {
  await page.keyboard.press("Tab");
  const stop = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const hasRing =
      cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
    const label = (el.innerText || el.getAttribute("aria-label") || el.tagName)
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 46);
    return { tag: el.tagName.toLowerCase(), label, hasRing };
  });
  if (!stop) continue;
  if (!stop.hasRing) violations++;
  console.log(
    `   ${String(i + 1).padStart(2)}. ${stop.tag} "${stop.label}" ${
      stop.hasRing ? "foco visible ✓" : "SIN FOCO VISIBLE ✗"
    }`
  );
}

await browser.close();

console.log(
  violations === 0
    ? "\n✓ sin violaciones"
    : `\n✗ ${violations} problema(s)`
);
process.exit(violations === 0 ? 0 : 1);
