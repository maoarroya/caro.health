// Correo transaccional vía Resend (misma herramienta que kalmiapp).
// Sin RESEND_API_KEY no falla: registra el correo en el log y sigue.
import "server-only";
import { Resend } from "resend";
import { brand } from "@/lib/content";

export type Mail = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export const mailConfigured = () => Boolean(process.env.RESEND_API_KEY);

export const mailFrom = () => process.env.MAIL_FROM || `Caro Health <${brand.email}>`;

/** Correo que recibe Caro con cada pedido. */
export const ordersNotifyEmail = () => process.env.ORDERS_NOTIFY_EMAIL || brand.email;

export async function sendMail(mail: Mail): Promise<{ ok: boolean; id?: string; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[mail] RESEND_API_KEY ausente · no enviado → ${mail.to} · "${mail.subject}"`);
    return { ok: false, error: "RESEND_API_KEY no configurada" };
  }
  try {
    const resend = new Resend(key);
    const { data, error } = await resend.emails.send({
      from: mailFrom(),
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      replyTo: mail.replyTo,
    });
    if (error) {
      console.error(`[mail] error → ${mail.to}: ${error.message}`);
      return { ok: false, error: error.message };
    }
    return { ok: true, id: data?.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[mail] excepción → ${mail.to}: ${message}`);
    return { ok: false, error: message };
  }
}
