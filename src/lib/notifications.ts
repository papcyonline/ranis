import { Resend } from "resend";
import twilio from "twilio";

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (key && key !== "your_resend_api_key_here") {
    return new Resend(key);
  }
  return null;
}

function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (sid && token && sid.startsWith("AC")) {
    return twilio(sid, token);
  }
  return null;
}

interface BookingDetails {
  clientName: string;
  clientPhone: string;
  service: string;
  option: string;
  price: number;
  duration: string;
  date: string;
  time: string;
  length?: string;
}

// ===== EMAIL =====

export async function sendSalonEmail(booking: BookingDetails) {
  const resend = getResendClient();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: "ranisbraids <onboarding@resend.dev>",
      to: process.env.SALON_EMAIL!,
      subject: `New Booking: ${booking.service}`,
      html: `
        <h2>New Booking Received</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;">Client</td><td style="padding:8px;">${booking.clientName}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${booking.clientPhone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${booking.service}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Option</td><td style="padding:8px;">${booking.option}</td></tr>
          ${booking.length ? `<tr><td style="padding:8px;font-weight:bold;">Length</td><td style="padding:8px;">${booking.length}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;">Price</td><td style="padding:8px;">$${booking.price}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Duration</td><td style="padding:8px;">${booking.duration}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Date</td><td style="padding:8px;">${booking.date}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Time</td><td style="padding:8px;">${booking.time}</td></tr>
        </table>
      `,
    });
  } catch (error) {
    console.error("Failed to send salon email:", error);
  }
}

export async function sendClientEmail(booking: BookingDetails, clientEmail: string) {
  const resend = getResendClient();
  if (!resend) return;
  try {
    await resend.emails.send({
      from: "ranisbraids <onboarding@resend.dev>",
      to: clientEmail,
      subject: `Booking Confirmed — ranisbraids`,
      html: `
        <h2>Your Booking is Confirmed!</h2>
        <p>Hi ${booking.clientName},</p>
        <p>Thank you for booking with ranisbraids. Here are your appointment details:</p>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;">Service</td><td style="padding:8px;">${booking.service}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Option</td><td style="padding:8px;">${booking.option}</td></tr>
          ${booking.length ? `<tr><td style="padding:8px;font-weight:bold;">Length</td><td style="padding:8px;">${booking.length}</td></tr>` : ""}
          <tr><td style="padding:8px;font-weight:bold;">Price</td><td style="padding:8px;">$${booking.price}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Duration</td><td style="padding:8px;">${booking.duration}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Date</td><td style="padding:8px;">${booking.date}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Time</td><td style="padding:8px;">${booking.time}</td></tr>
        </table>
        <p style="margin-top:16px;"><strong>Reminder:</strong> Please send your deposit to confirm your appointment.</p>
        <p>Please arrive on time with clean, blow-dried hair and no products.</p>
        <p style="margin-top:24px;">— ranisbraids<br><em>We Braid From The Heart</em></p>
      `,
    });
  } catch (error) {
    console.error("Failed to send client email:", error);
  }
}

// ===== SMS =====

export async function sendSalonSMS(booking: BookingDetails) {
  const twilioClient = getTwilioClient();
  if (!twilioClient) return;
  try {
    await twilioClient.messages.create({
      body: `New Booking!\n${booking.clientName} — ${booking.clientPhone}\n${booking.service} (${booking.option})\n${booking.date} at ${booking.time}\n$${booking.price}`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: process.env.SALON_PHONE_NUMBER!,
    });
  } catch (error) {
    console.error("Failed to send salon SMS:", error);
  }
}

export async function sendClientSMS(booking: BookingDetails) {
  const twilioClient = getTwilioClient();
  if (!twilioClient) return;
  try {
    await twilioClient.messages.create({
      body: `Hi ${booking.clientName}! Your booking with ranisbraids is confirmed.\n\n${booking.service} — ${booking.option}\n${booking.date} at ${booking.time}\n$${booking.price}\n\nPlease send your deposit to confirm. Arrive on time with clean, blow-dried hair.\n\n— ranisbraids`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: booking.clientPhone,
    });
  } catch (error) {
    console.error("Failed to send client SMS:", error);
  }
}

// ===== WHATSAPP =====

export async function sendSalonWhatsApp(booking: BookingDetails) {
  const twilioClient = getTwilioClient();
  if (!twilioClient) return;
  try {
    await twilioClient.messages.create({
      body: `New Booking!\n${booking.clientName} — ${booking.clientPhone}\n${booking.service} (${booking.option})\n${booking.date} at ${booking.time}\n$${booking.price}`,
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: `whatsapp:${process.env.SALON_PHONE_NUMBER!}`,
    });
  } catch (error) {
    console.error("Failed to send salon WhatsApp:", error);
  }
}

export async function sendClientWhatsApp(booking: BookingDetails) {
  const twilioClient = getTwilioClient();
  if (!twilioClient) return;
  try {
    await twilioClient.messages.create({
      body: `Hi ${booking.clientName}! Your booking with ranisbraids is confirmed.\n\n${booking.service} — ${booking.option}\n${booking.date} at ${booking.time}\n$${booking.price}\n\nPlease send your deposit to confirm. Arrive on time with clean, blow-dried hair.\n\n— ranisbraids ✨`,
      from: process.env.TWILIO_WHATSAPP_NUMBER!,
      to: `whatsapp:${booking.clientPhone}`,
    });
  } catch (error) {
    console.error("Failed to send client WhatsApp:", error);
  }
}

// Send all notifications
export async function sendAllNotifications(booking: BookingDetails, clientEmail?: string) {
  const promises = [
    sendSalonEmail(booking),
    sendSalonSMS(booking),
    sendSalonWhatsApp(booking),
    sendClientSMS(booking),
    sendClientWhatsApp(booking),
  ];

  if (clientEmail) {
    promises.push(sendClientEmail(booking, clientEmail));
  }

  await Promise.allSettled(promises);
}
