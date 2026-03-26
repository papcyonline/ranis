"use client";

import Image from "next/image";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ShowerIcon from "@mui/icons-material/Shower";
import BlockIcon from "@mui/icons-material/Block";
import PaymentsIcon from "@mui/icons-material/Payments";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import SickIcon from "@mui/icons-material/Sick";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";

const SQUARE_BOOKING_URL = "https://book.squareup.com/appointments/92su5oigdzi0h1/location/LPF2VRFQNETAF/services";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-darker">
      {/* BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/80" onClick={() => setBookingOpen(false)} />
          <div className="relative w-full max-w-2xl mx-3 h-[90vh] bg-white rounded-xl overflow-hidden">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </button>
            <iframe
              src={SQUARE_BOOKING_URL}
              title="Book an appointment"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      )}
      {/* HERO */}
      <section className="pt-6 md:pt-10 pb-8 md:pb-16 px-3 md:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-xl overflow-hidden border border-white/5 h-48 md:h-96">
            <Image
              src="/image.webp"
              alt="Braids showcase"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <p className="text-xs md:text-sm text-white/70 uppercase tracking-widest mb-1 md:mb-2">Welcome to</p>
              <h1 className="font-playfair text-2xl md:text-6xl font-bold text-white mb-2 md:mb-4 tracking-wide uppercase">
                Ranisbraids
              </h1>
              <div className="w-16 md:w-24 h-0.5 bg-pink mx-auto mb-2 md:mb-4" />
              <p className="text-sm md:text-2xl text-white/90 italic font-light">
                We Braid From The Heart
              </p>
              <p className="text-xs md:text-sm text-white/50 mt-2 md:mt-4">Your style, our passion</p>
            </div>
          </div>
          <div className="bg-card rounded-xl overflow-hidden border border-white/5 mt-3 md:mt-4">
            <div className="grid grid-cols-3 gap-0 h-40 md:h-96">
              <div className="relative">
                <Image src="/image.webp" alt="Braids style 1" fill className="object-cover" />
              </div>
              <div className="relative">
                <Image src="/image (1).webp" alt="Braids style 2" fill className="object-cover" />
              </div>
              <div className="relative">
                <Image src="/image (2).webp" alt="Braids style 3" fill className="object-cover" />
              </div>
            </div>
            <div className="bg-pink py-2.5 md:py-3 text-center">
              <p className="text-white font-semibold text-sm md:text-lg tracking-widest uppercase">Menifee, CA</p>
            </div>
          </div>
        </div>
      </section>

      {/* POLICIES */}
      <section className="px-3 md:px-4 pb-8 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-wider">Booking Policy</h2>
          <div className="bg-card rounded-xl border border-white/5">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <div className="p-4 md:p-5">
                <h3 className="text-white font-bold text-lg md:text-xl mb-2 uppercase tracking-wide">Cancellations</h3>
                <p className="text-white/70 text-xs">A 24 hour notice is required prior to cancellation or rescheduling of any service.</p>
              </div>
              <div className="border-l border-white/10 p-4 md:p-5">
                <h3 className="text-white font-bold text-lg md:text-xl mb-2 uppercase tracking-wide">Payments</h3>
                <p className="text-white/70 text-xs">$75–$100 non-refundable deposit is required! The remaining balance can be paid in cash, Apple Pay or Zelle.</p>
              </div>
              <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-4 md:p-5">
                <h3 className="text-white font-bold text-lg md:text-xl mb-2 uppercase tracking-wide">Guests</h3>
                <p className="text-white/70 text-xs">For safety and sanitation reasons, no extra guests are allowed.</p>
              </div>
              <div className="border-t border-l lg:border-t-0 border-white/10 p-4 md:p-5">
                <h3 className="text-white font-bold text-lg md:text-xl mb-2 uppercase tracking-wide">Late Arrivals</h3>
                <p className="text-white/70 text-xs">Please arrive on time. A 15 minute grace period is given. Appointment will be cancelled at 30 minutes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREPARE */}
      <section className="px-3 md:px-4 pb-8 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-pink-950 rounded-xl border border-white/10 p-5 md:p-6">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white text-center mb-5 md:mb-6 uppercase tracking-wider">Prepare for Your Appointment</h2>
            <div className="rounded-lg border border-white/5 overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3">
                <ShowerIcon sx={{ fontSize: 24 }} className="text-white flex-shrink-0" />
                <p className="text-white/70 text-xs">Wash and blow dry hair</p>
              </div>
              <hr className="border-white/10" />
              <div className="flex items-center gap-3 px-4 py-3">
                <BlockIcon sx={{ fontSize: 24 }} className="text-white flex-shrink-0" />
                <p className="text-white/70 text-xs">Arrive product free</p>
              </div>
              <hr className="border-white/10" />
              <div className="flex items-center gap-3 px-4 py-3">
                <PaymentsIcon sx={{ fontSize: 24 }} className="text-white flex-shrink-0" />
                <p className="text-white/70 text-xs">Pay remaining balance</p>
              </div>
              <hr className="border-white/10" />
              <div className="flex items-center gap-3 px-4 py-3">
                <AccessTimeIcon sx={{ fontSize: 24 }} className="text-white flex-shrink-0" />
                <p className="text-white/70 text-xs">Arrive on time</p>
              </div>
              <hr className="border-white/10" />
              <div className="flex items-center gap-3 px-4 py-3">
                <PersonOffIcon sx={{ fontSize: 24 }} className="text-white flex-shrink-0" />
                <p className="text-white/70 text-xs">No extra guests</p>
              </div>
              <hr className="border-white/10" />
              <div className="flex items-center gap-3 px-4 py-3">
                <SickIcon sx={{ fontSize: 24 }} className="text-white flex-shrink-0" />
                <p className="text-white/70 text-xs">Cancel/reschedule if feeling sick</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STYLIST */}
      <section className="px-3 md:px-4 pb-8 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-xl border border-white/5 p-6 md:p-10 text-center">
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden relative mx-auto mb-4 border-2 border-pink">
              <Image src="/hair stylist.webp" alt="Your stylist" fill className="object-cover" />
            </div>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-1 uppercase tracking-wider">Meet Your Stylist</h2>
            <div className="w-12 h-0.5 bg-pink mx-auto my-3" />
            <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-lg mx-auto">
              With years of experience in protective styling, specializing in knotless braids, bohemian styles, faux locs, and more. Every client receives personalized attention and care to leave feeling confident and beautiful. Quality and precision are at the heart of every style.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-8 md:py-16 px-3 md:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
            <div className="p-6 md:p-10 text-center">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wider">Book Your Appointment</h2>
              <p className="text-white/50 mb-6 uppercase tracking-wide text-xs">Select a service to get started</p>
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-block bg-pink text-white font-bold py-3 px-10 rounded-lg hover:bg-pink-light transition-colors uppercase tracking-wide text-sm"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="px-3 md:px-4 pb-8 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-pink-950 rounded-xl border border-white/10 overflow-hidden">
            <div className="flex items-center gap-3 p-4 md:p-5 border-b border-white/10">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-pink overflow-hidden relative flex-shrink-0">
                <Image src="/ranisbraids logo.jpeg" alt="ranisbraids" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-sm md:text-base">@ranisbraids</p>
                  <InstagramIcon sx={{ fontSize: 18 }} className="text-pink" />
                </div>
                <p className="text-white/50 text-xs">Follow us for the latest styles</p>
              </div>
            </div>
            <div className="grid grid-cols-3">
              {["/image.webp", "/image (1).webp", "/image (2).webp"].map((src, i) => (
                <div key={i} className="relative group aspect-square">
                  <Image src={src} alt={`Client style ${i + 1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <FavoriteIcon sx={{ fontSize: 28 }} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-5 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FavoriteIcon sx={{ fontSize: 22 }} className="text-white" />
                <ChatBubbleOutlineIcon sx={{ fontSize: 22 }} className="text-white" />
                <SendIcon sx={{ fontSize: 22 }} className="text-white" />
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wide">Tag us in your photos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-3 md:px-4 pb-8 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6 uppercase tracking-wider">Contact</h2>
          <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3">
              <PhoneIcon sx={{ fontSize: 20 }} className="text-white flex-shrink-0" />
              <p className="text-white text-sm uppercase tracking-wide">951-704-9370</p>
            </div>
            <hr className="border-white/10" />
            <div className="flex items-center gap-3 px-4 py-3">
              <EmailIcon sx={{ fontSize: 20 }} className="text-white flex-shrink-0" />
              <p className="text-white text-sm uppercase tracking-wide">talk2us@ranisbraids.com</p>
            </div>
            <hr className="border-white/10" />
            <div className="flex items-center gap-3 px-4 py-3">
              <LocationOnIcon sx={{ fontSize: 20 }} className="text-white flex-shrink-0" />
              <p className="text-white text-sm uppercase tracking-wide">30788 Mountain Ash Cir, Menifee, CA 92584</p>
            </div>
            <hr className="border-white/10" />
            <div className="flex items-center gap-3 px-4 py-3">
              <ScheduleIcon sx={{ fontSize: 20 }} className="text-white flex-shrink-0" />
              <p className="text-white text-sm uppercase tracking-wide">6:00 AM - 7:00 PM</p>
            </div>
          </div>
          <p className="text-white/30 text-xs text-center mt-6 uppercase">&copy; 2024 Ranisbraids. All rights reserved.</p>
        </div>
      </section>
    </div>
  );
}
