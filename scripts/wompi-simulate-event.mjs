#!/usr/bin/env node
// Simula el webhook de Wompi contra tu servidor local para probar correos y
// logs sin pagar nada. Usa WOMPI_EVENTS_SECRET de .env.local para firmar.
//
//   node scripts/wompi-simulate-event.mjs --email tu@correo.com
//   node scripts/wompi-simulate-event.mjs --format fisico --status APPROVED
//   node scripts/wompi-simulate-event.mjs --url https://tu-dominio.com --status DECLINED
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const args = Object.fromEntries(
  process.argv.slice(2).map((a, i, all) => (a.startsWith("--") ? [a.slice(2), all[i + 1] ?? "true"] : [])).filter((p) => p.length),
);

// Misma precedencia que Next: .env y encima .env.local.
const env = {};
for (const file of [".env", ".env.local"]) {
  try {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !line.trim().startsWith("#") && m[2] !== "") env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* archivo opcional */
  }
}

const secret = env.WOMPI_EVENTS_SECRET;
if (!secret) {
  console.error("Falta WOMPI_EVENTS_SECRET en .env.local");
  process.exit(1);
}

const format = args.format === "fisico" ? "FIS" : "DIG";
const amount = format === "FIS" ? 60000 * 100 : 35000 * 100;
const status = (args.status || "APPROVED").toUpperCase();
const reference = `LIBRO-${format}-${Date.now().toString(36)}-sim1`;
const id = `sim-${Date.now()}-${Math.floor(Math.random() * 1e5)}`;
const email = args.email || "compradora@example.com";

const transaction = {
  id,
  amount_in_cents: amount,
  reference,
  customer_email: email,
  currency: "COP",
  payment_method_type: "CARD",
  redirect_url: `${args.url || "http://localhost:3000"}/libro/gracias`,
  status,
  customer_data: format === "FIS" ? { full_name: "Prueba Simulada", legal_id: "1234567890", legal_id_type: "CC" } : null,
  shipping_address: null,
  payment_link_id: null,
  payment_source_id: null,
};

const timestamp = Math.floor(Date.now() / 1000);
const properties = ["transaction.id", "transaction.status", "transaction.amount_in_cents"];
const joined = `${transaction.id}${transaction.status}${transaction.amount_in_cents}`;
const checksum = createHash("sha256").update(`${joined}${timestamp}${secret}`).digest("hex");

const body = {
  event: "transaction.updated",
  data: { transaction },
  environment: "test",
  signature: { properties, checksum },
  timestamp,
  sent_at: new Date().toISOString(),
};

const url = `${(args.url || "http://localhost:3000").replace(/\/$/, "")}/api/wompi/events`;
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-Event-Checksum": checksum },
  body: JSON.stringify(body),
});
console.log(`POST ${url} → ${res.status}`);
console.log(await res.text());
console.log(`\nReferencia ${reference} · transacción ${id} · ${status}`);
if (status === "APPROVED") {
  console.log(
    "Si RESEND_API_KEY está configurada, revisa el correo de la compradora y el de ORDERS_NOTIFY_EMAIL.\n" +
      "Nota: el enlace de descarga del correo simulado dará 403 porque Wompi no conoce esta transacción; con un pago real (sandbox o producción) sí funciona.",
  );
}
