// app/page.jsx
"use client";
import { Home, Info, Contact, BookOpen } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import Iridescence from "@/Homesections/bits/Iridescence.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


// Load Playfair Display with variable weights (includes Black 900)
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // Include 900 for Black
  variable: "--font-playfair",
  display: "swap",
});

export default function Homee() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    city: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const [formErrors, setFormErrors] = useState({});

  const courseOptions = [
    "Diploma in Generative AI & Prompt Engineering",
    "Advanced Generative AI & Prompt Engineering",
    "AI Literacy for Everyone",
    "Generative AI for Professionals",
    "NLP Professional",
    "Computer Vision Professional",
    "Deep Learning Professional",
  ];

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s|-/g, ""))) errors.phone = "Enter a valid 10-digit Indian mobile number";
    if (!formData.course) errors.course = "Please select a course";
    return errors;
  };

  const appsScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL;

  const openPopup = (e) => {
    e.preventDefault();
    setPopupOpen(true);
    setSubmitState({ status: "idle", message: "" });
  };
  const closePopup = () => setPopupOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      city: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    if (!appsScriptUrl) {
      setSubmitState({
        status: "error",
        message: "Form endpoint not configured. Add NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL.",
      });
      return;
    }

    setSubmitState({ status: "submitting", message: "Submitting your request..." });

    try {
      const payload = new URLSearchParams({
        ...formData,
        source: "website-popup",
        submittedAt: new Date().toISOString(),
      });

      const response = await fetch(appsScriptUrl, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setSubmitState({
        status: "success",
        message: "Thanks! Your details were submitted successfully.",
      });
      resetForm();
    } catch (error) {
      setSubmitState({
        status: "error",
        message: "Submission failed. Please try again.",
      });
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const popupModal = popupOpen ? (
    <div className="fixed inset-0 z-[9999] flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto" onClick={closePopup}>
      <div
        className="relative bg-black rounded-2xl shadow-2xl w-[96vw] max-w-6xl border border-[#FF40EB]/30 max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-[#FF40EB] text-2xl font-bold z-10"
          onClick={closePopup}
          aria-label="Close"
        >
          ×
        </button>
        {/* Form Content */}
        <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-9">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#FF40EB] text-center">Book Your Counseling Session</h2>
          <form className="w-full max-w-none space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400 ${formErrors.name ? 'border-red-500' : 'border-[#FF40EB]/30'}`}
                />
                {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400 ${formErrors.email ? 'border-red-500' : 'border-[#FF40EB]/30'}`}
                />
                {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={formData.phone}
                onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); handleChange({ target: { name: 'phone', value: v } }); }}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400 ${formErrors.phone ? 'border-red-500' : 'border-[#FF40EB]/30'}`}
              />
              {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
              <div>
                <select
                  name="course"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white ${formErrors.course ? 'border-red-500' : 'border-[#FF40EB]/30'} ${!formData.course ? 'text-gray-400' : ''}`}
                >
                  <option value="" disabled className="text-gray-400 bg-black">Course Interested In *</option>
                  {courseOptions.map((c) => (
                    <option key={c} value={c} className="bg-black text-white">{c}</option>
                  ))}
                </select>
                {formErrors.course && <p className="text-red-400 text-xs mt-1">{formErrors.course}</p>}
              </div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400 md:col-span-2"
              />
              <textarea
                rows={4}
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#FF40EB]/30 rounded-lg focus:outline-none focus:border-[#FF40EB] bg-black/80 text-white placeholder-gray-400 resize-none md:col-span-2"
              />
            </div>

            {submitState.status !== "idle" && (
              <p
                className={`text-sm ${submitState.status === "success" ? "text-green-400" : submitState.status === "error" ? "text-red-400" : "text-gray-300"}`}
              >
                {submitState.message}
              </p>
            )}

            <button
              type="submit"
              disabled={submitState.status === "submitting"}
              className="w-full py-3 rounded-lg bg-[#FF40EB] text-white font-bold text-base sm:text-lg shadow-md hover:bg-[#c026d3] transition"
            >
              {submitState.status === "submitting" ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden text-white bg-black ${playfair.variable}`}
    >
      {/* ===== LIGHT PILLAR BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        {/* <LightPillar
          topColor="#8b5df5"
          bottomColor="#8b5df5"
          intensity={1.0}
          rotationSpeed={1.0} // slightly lower
          glowAmount={0.003} // reduced
          pillarWidth={2.5} // slightly narrower
          pillarHeight={0.5}
          noiseIntensity={0.0} // disabled
          pillarRotation={6}
          interactive={false}
          mixBlendMode="normal"
          className="w-full h-full"
        /> */}

        {/* ===== IRIDESCENT BACKGROUND ===== */}
        <div className="absolute inset-0 z-0">
          <Iridescence
            color={[1, 0.25, 0.92]}
            mouseReact={false}
            amplitude={0.03}
            speed={0.7}
            // hueShift={0.18}
            saturation={1.3}
            brightness={1.0}
          />
        </div>
      </div>


      {/* ===== VIGNETTE OVERLAY (TOP + BOTTOM SHADOW) ===== */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/90 via-transparent to-black/90" />

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 min-h-screen flex flex-col ">
        {/* HERO */}
        <section className="flex-1  flex items-center">
          <div className="mx-auto pt-5 md:pt-20 w-full max-w-7xl px-4">
            <div className="space-y-10 text-center max-w-8xl mx-auto">
              <h1 
                className=" font-black uppercase tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-[3.8rem] drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
                style={{ fontWeight: 800 }} // Explicitly force Black weight
              >
                Build Your{" "}
                <span className="text-white drop-shadow-[0_0_35px_rgba(147,51,234,0.7)]">
                  AI
                </span>{" "}
                Career
                <br />
                in{" "}
                <span className="text-white drop-shadow-[0_0_45px_rgba(147,51,234,0.8)]">
                  GenAI & Prompt Engineering
                </span>
              </h1>


              {/* Delivery Modes
              <div className="flex justify-center gap-4 mt-2 mb-1">
                <span className="inline-block px-4 py-1 rounded-full bg-linear-r  to-black/20 text-black text-xs sm:text-sm font-semibold shadow-md border border-blue-400/60">Online</span>
                <span className="inline-block px-4 py-1 rounded-full bg-linear-r  to-black/20 text-black text-xs sm:text-sm font-semibold shadow-md border border-green-400/60">Offline</span>
              </div> */}
              
              <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-xl mx-auto leading-relaxed">
                Learn through immersive campus and online cohorts. Build real projects in Generative AI, Prompt Engineering, agents, and automation with mentor support for internships and placements.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-5 pt-2">
                <Link href="?enroll=1" className="rounded-full bg-[#FF40EB] px-10 py-3 font-bold text-white shadow-[0_0_35px_rgba(147,51,234,0.6)] hover:shadow-[0_0_55px_rgba(147,51,234,0.8)] hover:scale-105 transition flex items-center justify-center">
                  Enroll Now
                </Link>
                <Link href="/courses" className="rounded-full border-2 border-[#FF40EB] px-10 py-3 font-bold hover:bg-purple-600/15 transition backdrop-blur-sm flex items-center justify-center">
                  Explore Our Courses
                </Link>
              </div>

              {/* Degree & PG Program quick links */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-1">
                <Link href="/programs/degree-in-ai" className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-2.5 text-sm font-semibold text-white hover:border-[#FF40EB]/60 hover:bg-[#FF40EB]/10 transition flex items-center justify-center gap-2">
                  Degree Programs <span className="text-[#FF40EB] text-xs">(3 Years)</span>
                </Link>
                <Link href="/programs/pg-in-ai" className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-7 py-2.5 text-sm font-semibold text-white hover:border-[#9234eb]/60 hover:bg-[#9234eb]/10 transition flex items-center justify-center gap-2">
                  PG Programs <span className="text-[#9234eb] text-xs">(2 Years)</span>
                </Link>
              </div>

            {/* Modal Form Popup */}
            {mounted && createPortal(popupModal, document.body)}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
