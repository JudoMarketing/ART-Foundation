#!/usr/bin/env node
/**
 * Lectura de Vercel. Solo lectura.
 *
 * Sirve para que Claude (o cualquiera con el token) pueda ver qué pasó en un
 * despliegue sin abrir el panel: si compiló, por qué falló, qué dominio
 * quedó apuntando y qué variables de entorno existen.
 *
 * No escribe. No despliega. No borra. No imprime el valor de ninguna
 * variable de entorno — solo el nombre y en qué ambiente vive. Un token con
 * permiso de escritura sigue siendo peligroso si se filtra, así que el token
 * que se use aquí debería ser de solo lectura.
 *
 * Uso:
 *   VERCEL_TOKEN=xxx node scripts/vercel.mjs whoami
 *   node scripts/vercel.mjs projects
 *   node scripts/vercel.mjs deployments [proyecto] [cuántos]
 *   node scripts/vercel.mjs deployment <id>
 *   node scripts/vercel.mjs logs <id>
 *   node scripts/vercel.mjs env <proyecto>
 *   node scripts/vercel.mjs domains <proyecto>
 *
 * Si el equipo es una cuenta de organización, además: VERCEL_TEAM_ID=team_xxx
 *
 * Ver docs/VERCEL.md.
 */

const TOKEN = process.env.VERCEL_TOKEN;
const TEAM = process.env.VERCEL_TEAM_ID;
const API = "https://api.vercel.com";

if (!TOKEN) {
  console.error(
    "Falta VERCEL_TOKEN.\n" +
      "Se saca en vercel.com/account/tokens y se guarda como variable de\n" +
      "entorno — nunca dentro del repositorio. Ver docs/VERCEL.md.",
  );
  process.exit(1);
}

/** Todas las llamadas son GET. Es la única garantía de que esto no escribe. */
async function get(path, params = {}) {
  const url = new URL(path, API);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  }
  if (TEAM) url.searchParams.set("teamId", TEAM);

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  const body = await res.text();
  let data;
  try {
    data = JSON.parse(body);
  } catch {
    data = body;
  }

  if (!res.ok) {
    const msg = data?.error?.message ?? body.slice(0, 300);
    throw new Error(`${res.status} ${url.pathname} — ${msg}`);
  }
  return data;
}

/** Fecha en hora de Miami, que es donde está la fundación. */
function when(ms) {
  if (!ms) return "—";
  return new Date(ms).toLocaleString("es-US", {
    timeZone: "America/New_York",
    dateStyle: "short",
    timeStyle: "short",
  });
}

async function findProject(nameOrId) {
  if (nameOrId) return get(`/v9/projects/${encodeURIComponent(nameOrId)}`);
  const { projects } = await get("/v9/projects", { limit: 20 });
  if (projects.length === 0) throw new Error("No hay proyectos en esta cuenta.");
  if (projects.length > 1) {
    const names = projects.map((p) => p.name).join(", ");
    throw new Error(`Hay varios proyectos, hay que decir cuál: ${names}`);
  }
  return projects[0];
}

const commands = {
  async whoami() {
    const { user } = await get("/v2/user");
    console.log(`${user.username} · ${user.email}`);
    console.log(TEAM ? `equipo: ${TEAM}` : "cuenta personal");
  },

  async projects() {
    const { projects } = await get("/v9/projects", { limit: 50 });
    for (const p of projects) {
      const prod = p.targets?.production;
      console.log(
        `${p.name}\n  id: ${p.id}\n  framework: ${p.framework ?? "—"}` +
          `\n  producción: ${prod ? `${prod.readyState} · ${when(prod.createdAt)}` : "sin desplegar"}`,
      );
    }
  },

  async deployments(name, limit = "10") {
    const project = await findProject(name);
    const { deployments } = await get("/v6/deployments", {
      projectId: project.id,
      limit: Number(limit),
    });
    console.log(`${project.name} — últimos ${deployments.length} despliegues\n`);
    for (const d of deployments) {
      console.log(
        `${d.state.padEnd(9)} ${d.target ?? "preview"} · ${when(d.createdAt)}` +
          `\n  ${d.url}` +
          `\n  rama: ${d.meta?.githubCommitRef ?? "—"} · ${(d.meta?.githubCommitMessage ?? "").split("\n")[0]}` +
          `\n  id: ${d.uid}\n`,
      );
    }
  },

  async deployment(id) {
    if (!id) throw new Error("Falta el id del despliegue.");
    const d = await get(`/v13/deployments/${encodeURIComponent(id)}`);
    console.log(`${d.name} · ${d.readyState}`);
    console.log(`url: https://${d.url}`);
    console.log(`objetivo: ${d.target ?? "preview"}`);
    console.log(`creado: ${when(d.createdAt)}`);
    console.log(`rama: ${d.meta?.githubCommitRef ?? "—"}`);
    console.log(`commit: ${d.meta?.githubCommitSha?.slice(0, 7) ?? "—"}`);
    if (d.errorMessage) console.log(`\nerror: ${d.errorMessage}`);
  },

  async logs(id) {
    if (!id) throw new Error("Falta el id del despliegue.");
    const events = await get(`/v3/deployments/${encodeURIComponent(id)}/events`, {
      limit: 1000,
    });
    const list = Array.isArray(events) ? events : (events.events ?? []);
    for (const e of list) {
      const text = (e.text ?? e.payload?.text ?? "").trimEnd();
      if (text) console.log(text);
    }
    if (list.length === 0) console.log("Sin eventos de construcción.");
  },

  /**
   * Nombres de variables, nunca valores. Si alguna vez hace falta ver un
   * valor, se ve en el panel de Vercel con la cuenta del dueño — no desde
   * un script que puede terminar en un registro de texto.
   */
  async env(name) {
    const project = await findProject(name);
    const { envs } = await get(`/v9/projects/${project.id}/env`, {
      decrypt: "false",
    });
    console.log(`${project.name} — variables de entorno (solo nombres)\n`);
    for (const e of envs) {
      console.log(`${e.key.padEnd(32)} ${e.target?.join(", ") ?? "—"}`);
    }
  },

  async domains(name) {
    const project = await findProject(name);
    const { domains } = await get(`/v9/projects/${project.id}/domains`);
    for (const d of domains) {
      console.log(
        `${d.name}${d.redirect ? ` → ${d.redirect}` : ""}` +
          `  [${d.verified ? "verificado" : "SIN VERIFICAR"}]`,
      );
    }
  },
};

const [cmd, ...rest] = process.argv.slice(2);
const fn = commands[cmd];

if (!fn) {
  console.error(
    `Comandos: ${Object.keys(commands).join(", ")}\nVer docs/VERCEL.md.`,
  );
  process.exit(1);
}

try {
  await fn(...rest);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
