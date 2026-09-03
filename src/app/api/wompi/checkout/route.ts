import { NextResponse } from "next/server";
import { buildCheckoutUrl, isConfigured } from "@/lib/wompi";
import { getFormat, makeReference } from "@/lib/book-order";

type Body = {
  format?: string;
  email?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  address2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  legalId?: string;
};

const clean = (v: unknown, max = 120) => String(v ?? "").trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^\+?\d{7,15}$/;
const LEGAL_ID = /^\d{5,12}$/;

/** Builds a signed Wompi checkout link for one copy of the book. */
export async function POST(req: Request) {
  if (!isConfigured()) {
    return NextResponse.json(
      { error: "Los pagos aún no están configurados. Escríbenos y te ayudamos con tu pedido." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const format = getFormat(clean(body.format, 20));
  if (!format) return NextResponse.json({ error: "Formato no disponible." }, { status: 400 });

  const email = clean(body.email);
  const fullName = clean(body.fullName);
  const phone = clean(body.phone, 20).replace(/[\s()-]/g, "");
  if (!EMAIL.test(email)) return NextResponse.json({ error: "Revisa tu email." }, { status: 400 });
  if (fullName.length < 3) return NextResponse.json({ error: "Escribe tu nombre completo." }, { status: 400 });

  const legalId = clean(body.legalId, 16).replace(/[.\s-]/g, "");
  if (format.pickup && !LEGAL_ID.test(legalId)) {
    return NextResponse.json({ error: "Escribe tu cédula: con ella reclamas el libro." }, { status: 400 });
  }

  let shipping;
  if (format.needsShipping) {
    const address = clean(body.address, 200);
    const city = clean(body.city, 80);
    const region = clean(body.region, 80);
    if (!PHONE.test(phone)) return NextResponse.json({ error: "Necesitamos un teléfono para el envío." }, { status: 400 });
    if (address.length < 5 || !city || !region) {
      return NextResponse.json({ error: "Completa la dirección de envío." }, { status: 400 });
    }
    shipping = {
      name: fullName,
      addressLine1: address,
      addressLine2: clean(body.address2, 120) || undefined,
      city,
      region,
      country: "CO",
      phone,
      postalCode: clean(body.postalCode, 12) || undefined,
    };
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || new URL(req.url).origin;
  const reference = makeReference(format.id);

  const url = buildCheckoutUrl({
    reference,
    amountInCents: format.priceCop * 100,
    currency: "COP",
    redirectUrl: `${origin}/libro/gracias`,
    customer: {
      email,
      fullName,
      phone: PHONE.test(phone) ? phone : undefined,
      legalId: format.pickup ? legalId : undefined,
      legalIdType: "CC",
    },
    shipping,
  });

  return NextResponse.json({ url, reference });
}
