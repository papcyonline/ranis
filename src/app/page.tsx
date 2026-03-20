"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { services, Service, ServiceOption } from "@/data/services";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const TIME_SLOTS = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const LENGTHS = [
  "Mid-back",
  "Waist length",
  "Butt length",
  "Knee length",
];

const DEPOSIT_AMOUNT = 20;

// Service images — add more as they become available
const serviceImages: Record<string, string> = {
  "knotless-braids": "/knotless braids.webp",
  "bob-bohemian": "/bob bohemian knotless.webp",
  "cornrows-men": "/cornrows for men.webp",
  "crochet": "/crochet.webp",
  "passion-senegalese-twist": "/Passion:Senegalese Twist.avif",
  "women-cornrows": "/Women Cornrows (6-8).jpg",
  "faux-locs-synthetic": "/Faux-Locs or Butterfly Locs – Synthetic Hair.webp",
  "french-pochahontas": "/French:Pochahontas Braids.webp",
  "bohemian-knotless": "/Bohemian Knotless Braids with Human Hair Curls .webp",
  "french-curls-box-braids": "/French Curls Box Braids.jpg",
  "knotless-feedins": "/Knotless Braids with Feedins.jpg",
  "kinky-twist": "/Kinky Twist Extensions (Shoulder length).jpg",
  "box-braids": "/Box Braids.webp",
  "two-strand-twist-men": "/Two Strand Twist on Natural Hair for Men.jpg",
  "feedins-braids": "/Feedins Braids.webp",
  "lemonade-braids": "/Lemonade Braids.webp",
  "shampoo-wash": "/Shampoo Wash & Blow-Dry.webp",
  "braids-takedown": "/Braids Take Down.jpg",
  "touchup-knotless": "/Braids Touch-Up – Knotless Braids.jpeg",
  "touchup-bohemian": "/Braids Touch-Up – Bohemian Knotless Braids.webp",
  "faux-locs-human": "/Faux-Locs – Human Hair.webp",
  "knotless-designed-feedins": "/Knotless Braids with Designed Feedins.webp",
  "bora-bora": "/Bora Bora Braids.webp",
  "mens-box-braids": "/Men's Box Braids.webp",
};


export default function Home() {
  // Booking flow steps: "categories" | "styles" | "appointment" | "calendar" | "details" | "success"
  const [step, setStep] = useState<"categories" | "styles" | "appointment" | "calendar" | "details" | "success">("categories");
  const [slideDirection, setSlideDirection] = useState<"right" | "left">("right");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedOption, setSelectedOption] = useState<ServiceOption | null>(null);
  const [selectedLength, setSelectedLength] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBookedSlots = useCallback(async () => {
    const res = await fetch("/api/bookings");
    const data = await res.json();
    setBookedSlots(data.bookedSlots || {});
  }, []);

  useEffect(() => {
    fetchBookedSlots();
  }, [fetchBookedSlots]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const isDatePast = (dateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(dateStr + "T00:00:00") < today;
  };

  const isDateFullyBooked = (dateStr: string) => {
    const slots = bookedSlots[dateStr] || [];
    return slots.length >= TIME_SLOTS.length;
  };

  const isSlotBooked = (dateStr: string, time: string) => {
    return (bookedSlots[dateStr] || []).includes(time);
  };

  const goToStyles = (service: Service) => {
    setSelectedService(service);
    setSelectedOption(null);
    setSelectedLength(null);
    setSlideDirection("right");
    setStep("styles");
  };

  const goToAppointment = (option: ServiceOption) => {
    setSelectedOption(option);
    setSlideDirection("right");
    setStep("appointment");
  };

  const goToCalendar = () => {
    setSlideDirection("right");
    setStep("calendar");
  };

  const goToDetails = () => {
    setSlideDirection("right");
    setStep("details");
  };

  const goBack = (toStep: "categories" | "styles" | "appointment" | "calendar") => {
    setSlideDirection("left");
    setStep(toStep);
  };

  const resetBooking = () => {
    setStep("categories");
    setSelectedService(null);
    setSelectedOption(null);
    setSelectedLength(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setClientName("");
    setClientPhone("");
    setClientEmail("");
    setBookingStatus("idle");
    setErrorMessage("");
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !clientPhone) return;

    setBookingStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          service: selectedService.name,
          option: selectedOption?.name || selectedService.name,
          price: selectedOption?.price || 0,
          duration: selectedOption?.duration || selectedService.baseDuration,
          clientName,
          clientPhone,
          clientEmail,
          length: selectedLength,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        setErrorMessage(err.error || "Booking failed. Please try again.");
        setBookingStatus("error");
        return;
      }

      setSlideDirection("right");
      setStep("success");
      fetchBookedSlots();
      setClientName("");
      setClientPhone("");
      setClientEmail("");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setBookingStatus("error");
    }
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  // For single-option services, skip the styles step
  const handleCategorySelect = (service: Service) => {
    if (service.options.length === 1) {
      setSelectedService(service);
      setSelectedOption(service.options[0]);
      setSlideDirection("right");
      setStep("appointment");
    } else if (service.options.length === 0) {
      // No options — contact for pricing
      return;
    } else {
      goToStyles(service);
    }
  };

  return (
    <div className="min-h-screen bg-darker">
      {/* HERO */}
      <section className="pt-6 md:pt-10 pb-8 md:pb-16 px-3 md:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-xl overflow-hidden border border-white/5 flex flex-row h-40 md:h-80">
            <div className="w-1/3 md:w-1/2 relative">
              <Image
                src="/image.webp"
                alt="Braids showcase"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="w-2/3 md:w-1/2 flex flex-col items-center justify-center p-4 md:p-10 text-center">
              <h1 className="font-playfair text-lg md:text-5xl font-bold text-white mb-2 md:mb-4 tracking-wide uppercase">
                Welcome to Ranisbraids
              </h1>
              <p className="text-xs md:text-2xl text-white/80 italic font-light">
                We Braid From The Heart
              </p>
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
          <div className="bg-card rounded-xl border border-white/5 overflow-hidden flex flex-col md:flex-row md:h-72">
            <div className="h-56 md:w-1/3 md:h-full relative">
              <Image src="/image (2).webp" alt="Your stylist" fill className="object-cover" />
            </div>
            <div className="md:w-2/3 flex flex-col justify-center p-5 md:p-10">
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wider">Meet Your Stylist</h2>
              <p className="text-white/70 text-xs md:text-sm leading-relaxed uppercase">
                With years of experience in protective styling, your stylist specializes in knotless braids, bohemian styles, faux locs, and more. Every client receives personalized attention and care to ensure you leave feeling confident and beautiful. Quality and precision are at the heart of every style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL */}
      <section className="px-3 md:px-4 pb-8 md:pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-pink-950 rounded-xl border border-white/10 overflow-hidden">
            {/* Top bar — Instagram style profile header */}
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
            {/* Images grid */}
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
            {/* Bottom bar */}
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

      {/* SERVICES — MULTI-STEP BOOKING */}
      <section id="services" className="py-8 md:py-16 px-3 md:px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-xl border border-white/5 overflow-hidden">
            {/* STEP: Categories */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === "categories" ? "block" : "hidden"
              }`}
            >
              <div className="p-5 md:p-6">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white text-center mb-2 uppercase tracking-wider">Our Services</h2>
                <p className="text-white/50 text-center mb-6 uppercase tracking-wide text-xs">Select Category</p>
                <div className="rounded-lg border border-white/5 overflow-hidden">
                  {services.map((service, index) => (
                    <div key={service.id}>
                      <div className={`flex items-center justify-between px-4 py-3 ${index % 2 === 0 ? "bg-[#111111]" : "bg-[#1A1A1A]"}`}>
                        <h3 className="text-white font-semibold text-xs md:text-sm uppercase tracking-wide leading-tight">{service.name}</h3>
                        {service.options.length > 0 ? (
                          <button
                            onClick={() => handleCategorySelect(service)}
                            className="bg-pink text-white text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded flex-shrink-0 ml-3 hover:bg-pink-light transition-colors"
                          >
                            Select
                          </button>
                        ) : (
                          <span className="text-white/30 text-xs uppercase flex-shrink-0 ml-3">Inquire</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP: Styles (options for selected category) */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === "styles" ? "block" : "hidden"
              }`}
            >
              <div className="p-5 md:p-6">
                <button
                  onClick={() => goBack("categories")}
                  className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-4 uppercase tracking-wide"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                  Back
                </button>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wider">{selectedService?.name}</h2>
                {selectedService?.description && (
                  <p className="text-white/50 text-xs mb-4">{selectedService.description}</p>
                )}
                <p className="text-white/50 text-xs mb-5 uppercase tracking-wide">Select Style</p>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image on the left */}
                  {selectedService && serviceImages[selectedService.id] && (
                    <div className="w-full md:w-1/3 h-56 md:h-auto relative rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={serviceImages[selectedService.id]} alt={selectedService.name} fill className="object-cover" />
                    </div>
                  )}
                  {/* Listing on the right */}
                  <div className={`${selectedService && serviceImages[selectedService.id] ? "md:w-2/3" : "w-full"} rounded-lg border border-white/5 overflow-hidden`}>
                    {selectedService?.options.map((opt, index) => (
                      <div key={opt.name}>
                        <div className={`flex items-center justify-between px-4 py-3 ${index % 2 === 0 ? "bg-[#111111]" : "bg-[#1A1A1A]"}`}>
                          <div>
                            <h4 className="text-white font-semibold text-xs md:text-sm uppercase">{opt.name}</h4>
                            <p className="text-white/50 text-xs mt-1">${opt.price} · {opt.duration}</p>
                          </div>
                          <button
                            onClick={() => goToAppointment(opt)}
                            className="bg-pink text-white text-xs font-semibold uppercase tracking-wide px-4 py-1.5 rounded flex-shrink-0 ml-3 hover:bg-pink-light transition-colors"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP: Add to Appointment (length selection) */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === "appointment" ? "block" : "hidden"
              }`}
            >
              <div className="p-5 md:p-6">
                <button
                  onClick={() => goBack(selectedService && selectedService.options.length > 1 ? "styles" : "categories")}
                  className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-4 uppercase tracking-wide"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                  Back
                </button>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2 uppercase tracking-wider">Add to Appointment</h2>
                <div className="bg-darker rounded-lg p-3 mb-5 border border-white/5">
                  <p className="text-white font-semibold text-sm">{selectedService?.name}</p>
                  <p className="text-white/50 text-xs">{selectedOption?.name} — ${selectedOption?.price} · {selectedOption?.duration}</p>
                </div>

                <p className="text-white/50 text-xs mb-3 uppercase tracking-wide">Select Length</p>
                <div className="space-y-2 mb-6">
                  {LENGTHS.map((length) => (
                    <button
                      key={length}
                      onClick={() => setSelectedLength(selectedLength === length ? null : length)}
                      className="w-full flex items-center gap-3 bg-darker rounded-lg p-3 border border-white/5 hover:border-white/20 transition-colors text-left"
                    >
                      {selectedLength === length ? (
                        <CheckBoxIcon sx={{ fontSize: 22 }} className="text-pink flex-shrink-0" />
                      ) : (
                        <CheckBoxOutlineBlankIcon sx={{ fontSize: 22 }} className="text-white/30 flex-shrink-0" />
                      )}
                      <span className="text-white text-sm uppercase tracking-wide">{length}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToCalendar}
                  disabled={!selectedLength}
                  className="w-full bg-pink text-white font-bold py-3 rounded-lg hover:bg-pink-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
                >
                  Continue
                </button>
              </div>
            </div>

            {/* STEP: Calendar */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === "calendar" ? "block" : "hidden"
              }`}
            >
              <div className="p-5 md:p-6">
                <button
                  onClick={() => goBack("appointment")}
                  className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-4 uppercase tracking-wide"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                  Back
                </button>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-5 uppercase tracking-wider">Choose Date & Time</h2>

                {/* Summary bar */}
                <div className="bg-darker rounded-lg p-3 mb-5 border border-white/5">
                  <p className="text-white font-semibold text-sm">{selectedService?.name} — {selectedOption?.name}</p>
                  <p className="text-white/50 text-xs">{selectedLength} · ${selectedOption?.price} · {selectedOption?.duration}</p>
                </div>

                {/* Month navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() =>
                      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
                    }
                    className="text-white/50 hover:text-white p-2"
                  >
                    <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
                  </button>
                  <span className="text-white font-medium text-sm md:text-base uppercase">
                    {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
                    }
                    className="text-white/50 hover:text-white p-2"
                  >
                    <ArrowForwardIosIcon sx={{ fontSize: 16 }} />
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="text-center text-white/30 text-xs py-1 uppercase">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1 mb-6">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = formatDate(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    );
                    const past = isDatePast(dateStr);
                    const fullyBooked = isDateFullyBooked(dateStr);
                    const disabled = past || fullyBooked;
                    const selected = selectedDate === dateStr;

                    return (
                      <button
                        key={day}
                        disabled={disabled}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setSelectedTime(null);
                        }}
                        className={`aspect-square rounded-lg text-xs md:text-sm flex items-center justify-center transition-colors ${
                          selected
                            ? "bg-pink text-white font-bold"
                            : disabled
                            ? "text-white/15 cursor-not-allowed"
                            : "text-white hover:bg-pink/20"
                        } ${fullyBooked && !past ? "line-through" : ""}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                {selectedDate && (
                  <>
                    <p className="text-white/50 text-xs mb-3 uppercase tracking-wide">Select Time</p>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {TIME_SLOTS.map((time) => {
                        const booked = isSlotBooked(selectedDate, time);
                        const selected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            disabled={booked}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2.5 rounded-lg text-xs md:text-sm transition-colors ${
                              selected
                                ? "bg-pink text-white font-bold"
                                : booked
                                ? "bg-darker text-white/15 cursor-not-allowed line-through"
                                : "bg-darker text-white/70 hover:bg-pink/20 border border-white/5"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                <button
                  onClick={goToDetails}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-pink text-white font-bold py-3 rounded-lg hover:bg-pink-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
                >
                  Proceed
                </button>
              </div>
            </div>

            {/* STEP: Client Details */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === "details" ? "block" : "hidden"
              }`}
            >
              <div className="p-5 md:p-6">
                <button
                  onClick={() => goBack("calendar")}
                  className="flex items-center gap-1 text-white/50 hover:text-white text-sm mb-4 uppercase tracking-wide"
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
                  Back
                </button>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-5 uppercase tracking-wider">Your Details</h2>

                {/* Summary */}
                <div className="bg-darker rounded-lg p-3 mb-5 border border-white/5">
                  <p className="text-white font-semibold text-sm">{selectedService?.name} — {selectedOption?.name}</p>
                  <p className="text-white/50 text-xs">{selectedLength} · ${selectedOption?.price} · {selectedOption?.duration}</p>
                  <p className="text-white/50 text-xs mt-1">{selectedDate} at {selectedTime}</p>
                </div>

                <div className="space-y-3 mb-5">
                  <input
                    type="text"
                    placeholder="FULL NAME"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-darker border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink/50 uppercase"
                  />
                  <input
                    type="tel"
                    placeholder="PHONE NUMBER"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full bg-darker border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink/50"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS (OPTIONAL)"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full bg-darker border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink/50"
                  />
                </div>

                {errorMessage && (
                  <p className="text-red-400 text-xs mb-3 uppercase">{errorMessage}</p>
                )}

                <p className="text-white/50 text-xs mb-5 uppercase">${DEPOSIT_AMOUNT} deposit required to confirm</p>

                <button
                  onClick={handleBooking}
                  disabled={!clientName || !clientPhone || bookingStatus === "loading"}
                  className="w-full bg-pink text-white font-bold py-3 rounded-lg hover:bg-pink-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wide text-sm"
                >
                  {bookingStatus === "loading" ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </div>

            {/* STEP: Success */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                step === "success" ? "block" : "hidden"
              }`}
            >
              <div className="p-6 md:p-10 text-center">
                <div className="text-4xl mb-4 text-green-400">&#10003;</div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3 uppercase tracking-wider">Booking Confirmed</h2>
                <p className="text-white/60 text-sm mb-1">{selectedService?.name} — {selectedOption?.name}</p>
                <p className="text-white/60 text-sm mb-1">{selectedLength}</p>
                <p className="text-white/60 text-sm mb-1">{selectedDate} at {selectedTime}</p>
                <p className="text-white font-semibold mb-4">${selectedOption?.price}</p>
                <p className="text-white/40 text-xs mb-6 uppercase">Please send your ${DEPOSIT_AMOUNT} deposit to confirm your appointment.</p>
                <button
                  onClick={resetBooking}
                  className="bg-pink text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-pink-light transition-colors uppercase tracking-wide text-sm"
                >
                  Book Another
                </button>
              </div>
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
