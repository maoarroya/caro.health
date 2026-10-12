This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Marca

El sitio sigue el briefing estratégico de `manual de marca.pdf`:

- **Paleta**: muestreada de los originales de marca (logotipo, manual del
  instructor y póster de Cadillac) con `scripts/`-style sampling — morado
  profundo `plum #3a264b`, violeta `lavender-deep #5b3a78`, dorado de los
  laureles `gold #b7a87f` (y `gold-ink #806c3e` cuando va como texto) sobre
  papel de lino `cream #f5f2e8`. Definida en `src/app/globals.css`.
- **Marca**: el isotipo (monograma CH) y el logotipo viven en
  `src/components/Logo.tsx` y heredan `currentColor`; las versiones estáticas
  están en `public/brand/` (originales en `public/brand/originales/`). `Sprig`
  se mantiene como alias del isotipo para viñetas y kickers. El favicon sale de
  `src/app/icon.svg`. La utilidad `.veil` tiñe cualquier fotografía cálida hacia
  la marca.
- **Arquitectura**: Home · Libro · Certificaciones de Pilates · Pilates, Barre y
  Yoga virtual en casa · Asesorías nutricionales · Conferencias · Retiros
  wellness y experiencias · Blog,
  tal como define el mapa de navegación del briefing.
- **Contenido**: todo el copy vive en `src/lib/content.ts`, escrito en la voz de
  marca (merecimiento y alta vibración).

## Photography

Every image on the site comes from Caro's own shoot. The raw frames live in
`/pictures` (untracked); `scripts/optimize-photos.py` curates them, writes
web-sized JPEGs to `/public/photos`, and generates `src/lib/photos.ts` — a
typed manifest with dimensions and a base64 blur placeholder per frame.

```bash
python3 -m venv .venv && .venv/bin/pip install pillow
.venv/bin/python scripts/optimize-photos.py
```

Components never reference a path directly: they take a `Photo` from the
manifest and render it through `<Frame>`, which handles the crop box, the
`sizes` hint and the blur-up.

## Pagos (Wompi) y venta del libro

La venta del libro corre sobre **Wompi Web Checkout** (redirección, sin SDK) y
**Resend** para los correos. No hay base de datos: Wompi es el registro de cada
pedido (email, dirección, estado) y Caro recibe un correo por cada compra.

**Flujo**

1. `src/components/BookCheckout.tsx` recoge formato y datos de la compradora y
   llama a `POST /api/wompi/checkout`.
2. La ruta arma la referencia (`LIBRO-DIG-…` / `LIBRO-TAPA-…`), firma la
   integridad (`SHA256(ref+monto+moneda+secreto)`) y devuelve la URL de Wompi
   (`src/lib/wompi.ts`). Para el físico se envía la cédula como
   `customer-data:legal-id`: el libro se reclama en Nirvana Spa presentándola.
3. Wompi redirige a `/libro/gracias?id=<transacción>`. La página consulta la
   transacción con la llave pública y muestra el estado real (nunca confía en
   el redirect). Si es digital y APPROVED, muestra el botón de descarga.
4. `POST /api/wompi/events` (webhook) es el momento fiable: valida el checksum
   con el secreto de eventos y, si el pago está APPROVED, envía a la compradora
   el PDF (enlace firmado, 30 días) o las instrucciones para reclamar el
   físico, y a Caro el aviso de pedido con nombre, cédula y referencia
   (`src/lib/order-emails.ts`).
   Cubre los pagos PSE que se aprueban minutos después de salir del checkout.
5. `GET /api/libro/descargar?token=…` vuelve a verificar el pago en Wompi y
   sirve el PDF desde `private/libro.pdf` o, si no existe en disco, desde
   `BOOK_PDF_URL` (copia privada remota). Nunca desde `/public`.

**Puesta en marcha (solo llaves)**

1. Copia `.env.example` a `.env.local` y pega:
   `WOMPI_PUBLIC_KEY`, `WOMPI_INTEGRITY_SECRET`, `WOMPI_EVENTS_SECRET`
   (panel de Wompi → Desarrolladores) y `RESEND_API_KEY` (resend.com, con el
   dominio del remitente verificado). Sandbox o producción lo decide el prefijo
   de la llave pública (`pub_test_` / `pub_prod_`).
2. Define `NEXT_PUBLIC_SITE_URL` con el dominio público y registra en Wompi la
   URL de eventos `https://<dominio>/api/wompi/events`.
3. Sube el PDF: en un servidor con disco, a `private/libro.pdf`; en Vercel u
   otro hosting sin disco, a un almacenamiento privado y pon la URL en
   `BOOK_PDF_URL`. El repo es público: el PDF está ignorado por git a propósito.
4. Abre `/api/wompi/status`: cuando todo esté en `true`, la venta funciona de
   punta a punta.

**Pruebas**

- Sandbox de Wompi: tarjeta `4242 4242 4242 4242` aprueba, `4111 1111 1111 1111`
  rechaza (cualquier fecha futura y CVC).
- Webhook sin pagar: `npm run wompi:simulate -- --email tu@correo.com`
  (o `--format fisico`, `--status DECLINED`) firma un evento con tu secreto
  y lo envía al servidor local; verás el correo y el log.

Precios en COP en `src/lib/content.ts` (`libro.book.formats`).

## Builder de la landing

`/builder` es el editor de la home: la dueña del sitio cambia textos, fotos,
el orden de las secciones (o las oculta) y arma los **cursos en video** con
enlaces de YouTube, con vista previa en vivo en computador y celular. Al
pulsar **Publicar** la home se regenera.

- **Acceso**: contraseña fija, guardada como huella scrypt en
  `src/lib/builder-auth.ts` (sesión de 30 días). `BUILDER_PASSWORD` la
  reemplaza sin tocar código.
- **Qué edita**: solo la home (`src/components/Landing.tsx`) y el llamado
  final que comparten Libro, Retiros y Blog. Las páginas interiores siguen en
  `src/lib/content.ts`, que también da los valores por defecto de la home.
- **Dónde se guarda** (`src/lib/landing-store.ts`): con
  `BLOB_READ_WRITE_TOKEN`, en Vercel Blob (obligatorio en Vercel, donde no hay
  disco); sin él, en `./data/landing.json` y `./data/uploads` (ignorados por
  git). Todo lo que entra pasa por `sanitizeLanding` (`src/lib/landing.ts`).
- **Fotos**: se eligen del archivo (`/public/photos`) o se suben; el navegador
  las reduce a JPEG de 2400 px antes de enviarlas.
- **Cursos**: cada curso es una lista de clases; se pegan uno o varios enlaces
  de YouTube y el título se rellena solo. La sección no aparece en el sitio
  mientras no haya al menos una clase.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
