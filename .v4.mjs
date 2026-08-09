import { chromium } from "playwright";
const OUT="/tmp/claude-0/-home-user-ART-Foundation/0d686b59-ce74-544a-ae37-e31d2a405a41/scratchpad";
const b=await chromium.launch();
// tienda en escritorio: las dos categorías
const d=await b.newPage({viewport:{width:1280,height:1000}});
await d.goto("http://127.0.0.1:3000/store",{waitUntil:"domcontentloaded"});
await d.waitForTimeout(1200);
await d.locator("h2",{hasText:"Already sold"}).scrollIntoViewIfNeeded();
await d.waitForTimeout(800);
await d.screenshot({path:`${OUT}/s1-vendidas.png`});
await d.close();
// móvil: la barra que flota
const m=await b.newPage({viewport:{width:390,height:844}, isMobile:true, hasTouch:true});
await m.goto("http://127.0.0.1:3000/",{waitUntil:"domcontentloaded"});
await m.waitForTimeout(1000);
await m.getByRole("button",{name:/Register\s*:\s*Art/}).click();
await m.waitForTimeout(400);
await m.getByRole("button",{name:/Add\s*:\s*Theatre/}).click();
await m.waitForTimeout(600);
// bajo hasta las donaciones y compruebo que la barra sigue ahí
await m.locator("h2",{hasText:"Where your donation goes"}).scrollIntoViewIfNeeded();
await m.waitForTimeout(700);
await m.screenshot({path:`${OUT}/s2-barra-movil.png`});
const visible = await m.locator("a", {hasText:"Continue to register"}).last().isVisible();
console.log("barra visible tras desplazarse:", visible ? "SÍ" : "NO");
await b.close();
