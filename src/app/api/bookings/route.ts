import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sendAllNotifications } from "@/lib/notifications";

const BOOKINGS_FILE = path.join(process.cwd(), "bookings.json");

interface Booking {
  id: string;
  date: string;
  time: string;
  service: string;
  option: string;
  price: number;
  duration: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  length: string;
  createdAt: string;
}

function getBookings(): Booking[] {
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, "[]");
    return [];
  }
  const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
  return JSON.parse(data);
}

function saveBookings(bookings: Booking[]) {
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

// GET: return booked dates/times
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const bookings = getBookings();

  if (date) {
    const dayBookings = bookings.filter((b) => b.date === date);
    return NextResponse.json({ bookings: dayBookings });
  }

  // Return all booked dates
  const bookedDates = [...new Set(bookings.map((b) => b.date))];
  const bookedSlots: Record<string, string[]> = {};
  for (const b of bookings) {
    if (!bookedSlots[b.date]) bookedSlots[b.date] = [];
    bookedSlots[b.date].push(b.time);
  }

  return NextResponse.json({ bookedDates, bookedSlots });
}

// POST: create a booking
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { date, time, service, option, price, duration, clientName, clientPhone, clientEmail, length } = body;

  if (!date || !time || !service || !clientName || !clientPhone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const bookings = getBookings();

  // Check if slot is already booked
  const existing = bookings.find((b) => b.date === date && b.time === time);
  if (existing) {
    return NextResponse.json(
      { error: "This time slot is already booked. Please choose another." },
      { status: 409 }
    );
  }

  const booking: Booking = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    date,
    time,
    service,
    option: option || service,
    price: price || 0,
    duration: duration || "",
    clientName,
    clientPhone,
    clientEmail: clientEmail || "",
    length: length || "",
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  saveBookings(bookings);

  // Send notifications (don't block the response)
  sendAllNotifications(
    {
      clientName,
      clientPhone,
      service,
      option: option || service,
      price: price || 0,
      duration: duration || "",
      date,
      time,
      length: length || "",
    },
    clientEmail || undefined
  ).catch((err) => console.error("Notification error:", err));

  return NextResponse.json({ success: true, booking }, { status: 201 });
}
