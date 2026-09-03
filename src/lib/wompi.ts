// Wompi (pasarela de pagos colombiana) — Web Checkout por redirección.
// Docs: https://docs.wompi.co/docs/colombia/widget-checkout-web/
//       https://docs.wompi.co/docs/colombia/eventos/
import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

const env = () => ({
  publicKey: process.env.WOMPI_PUBLIC_KEY ?? "",
  // El panel de Wompi la llama "llave de integridad": se aceptan ambos nombres.
  integritySecret: process.env.WOMPI_INTEGRITY_SECRET || process.env.WOMPI_INTEGRITY_KEY || "",
  eventsSecret: process.env.WOMPI_EVENTS_SECRET ?? "",
});

export const CHECKOUT_URL = "https://checkout.wompi.co/p/";

/** Sandbox or production is decided by the key prefix, never by NODE_ENV. */
export function apiBase(): string {
  return env().publicKey.startsWith("pub_prod_")
    ? "https://production.wompi.co/v1"
    : "https://sandbox.wompi.co/v1";
}

export const isSandbox = () => !env().publicKey.startsWith("pub_prod_");

export const isConfigured = () => Boolean(env().publicKey && env().integritySecret);

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

/** SHA256("<reference><amount><currency>[<expiration>]<integritySecret>") */
export function integritySignature(
  reference: string,
  amountInCents: number,
  currency: string,
  expirationTime?: string,
): string {
  return sha256(`${reference}${amountInCents}${currency}${expirationTime ?? ""}${env().integritySecret}`);
}

export type CheckoutInput = {
  reference: string;
  amountInCents: number;
  currency?: "COP";
  redirectUrl: string;
  expirationTime?: string; // ISO 8601
  customer?: { email: string; fullName: string; phone?: string; phonePrefix?: string };
  shipping?: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    region: string;
    country: string;
    phone: string;
    postalCode?: string;
  };
};

export function buildCheckoutUrl(input: CheckoutInput): string {
  const currency = input.currency ?? "COP";
  const params = new URLSearchParams({
    "public-key": env().publicKey,
    currency,
    "amount-in-cents": String(input.amountInCents),
    reference: input.reference,
    "signature:integrity": integritySignature(
      input.reference,
      input.amountInCents,
      currency,
      input.expirationTime,
    ),
    "redirect-url": input.redirectUrl,
  });
  if (input.expirationTime) params.set("expiration-time", input.expirationTime);

  const c = input.customer;
  if (c) {
    params.set("customer-data:email", c.email);
    params.set("customer-data:full-name", c.fullName);
    if (c.phone) params.set("customer-data:phone-number", c.phone);
    if (c.phonePrefix) params.set("customer-data:phone-number-prefix", c.phonePrefix);
  }
  const s = input.shipping;
  if (s) {
    params.set("shipping-address:name", s.name);
    params.set("shipping-address:address-line-1", s.addressLine1);
    if (s.addressLine2) params.set("shipping-address:address-line-2", s.addressLine2);
    params.set("shipping-address:city", s.city);
    params.set("shipping-address:region", s.region);
    params.set("shipping-address:country", s.country);
    params.set("shipping-address:phone-number", s.phone);
    if (s.postalCode) params.set("shipping-address:postal-code", s.postalCode);
  }
  return `${CHECKOUT_URL}?${params.toString()}`;
}

export type TransactionStatus = "APPROVED" | "DECLINED" | "VOIDED" | "ERROR" | "PENDING";

export type WompiTransaction = {
  id: string;
  status: TransactionStatus;
  status_message?: string | null;
  reference: string;
  amount_in_cents: number;
  currency: string;
  customer_email?: string | null;
  payment_method_type?: string | null;
  created_at?: string;
  finalized_at?: string | null;
  customer_data?: { full_name?: string; phone_number?: string } | null;
  shipping_address?: {
    name?: string;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    region?: string;
    country?: string;
    phone_number?: string;
    postal_code?: string;
  } | null;
};

/** Source of truth for a payment: never trust the redirect alone. */
export async function getTransaction(id: string): Promise<WompiTransaction | null> {
  if (!/^[\w-]{6,80}$/.test(id)) return null;
  const { publicKey } = env();
  const res = await fetch(`${apiBase()}/transactions/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${publicKey}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { data?: WompiTransaction };
  return json.data ?? null;
}

export type WompiEvent = {
  event: string;
  environment: "test" | "prod";
  timestamp: number;
  sent_at?: string;
  data: { transaction?: WompiTransaction } & Record<string, unknown>;
  signature: { properties: string[]; checksum: string };
};

const dig = (obj: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj);

/** SHA256(values of signature.properties in order + timestamp + eventsSecret) */
export function verifyEventChecksum(event: WompiEvent): boolean {
  const secret = env().eventsSecret;
  if (!secret || !event?.signature?.checksum || !Array.isArray(event.signature.properties)) return false;
  const joined = event.signature.properties.map((prop) => String(dig(event.data, prop) ?? "")).join("");
  const expected = sha256(`${joined}${event.timestamp}${secret}`);
  const a = Buffer.from(expected, "hex");
  const b = Buffer.from(String(event.signature.checksum).toLowerCase(), "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}
