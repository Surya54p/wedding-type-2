"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/Button";
import { luxuryTransition } from "@/lib/motion";

interface WaxSealEnvelopeProps {
  guestName?: string | null;
  onEnter: () => void;
  isOpen: boolean;
}

export const WaxSealEnvelope: React.FC<WaxSealEnvelopeProps> = ({
  guestName,
  onEnter,
  isOpen,
}) => {
  const [stage, setStage] = useState<"sealed" | "opening" | "revealed">("sealed");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: October 12, 2026
    const targetDate = new Date("2026-10-12T08:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Reset stage saat modal dibuka
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setStage("sealed");
    }
  }

  const handleBreakSeal = () => {
    if (stage !== "sealed") return;

    // Picu musik pengiring
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("play-wedding-music"));
    }

    setStage("opening");
    setTimeout(() => {
      setStage("revealed");
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto select-none">
      <div className="relative w-full max-w-lg my-auto perspective-[1200px]">
        {/* Amplop Kontainer */}
        <div className="relative w-full min-h-[460px] sm:min-h-[520px] flex items-center justify-center">

          {/* ========================================================= */}
          {/* 1. KARTU SURAT UNDANGAN (Berada di Dalam Amplop & Meluncur Keluar) */}
          {/* ========================================================= */}
          <motion.div
            initial={false}
            animate={
              stage === "revealed"
                ? { y: 0, opacity: 1, scale: 1 }
                : stage === "opening"
                ? { y: -40, opacity: 0.8, scale: 0.96 }
                : { y: 60, opacity: 0, scale: 0.92 }
            }
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-20 w-full bg-[#050c0a] border border-wedding-gold/40 p-6 sm:p-10 text-center shadow-2xl ${
              stage === "revealed" ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Sudut Hiasan Emas */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wedding-gold" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-wedding-gold" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-wedding-gold" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wedding-gold" />

            <p className="text-wedding-tan uppercase text-[10px] mb-3 font-medium">
              Undangan Pernikahan
            </p>

            <h2 className="text-2xl sm:text-4xl font-serif text-white mb-4 font-medium leading-tight">
              Aris <span className="text-wedding-gold">&</span> Hana
            </h2>

            <div className="text-wedding-light/90 mb-5 space-y-1 text-xs sm:text-sm">
              <p className="font-medium text-wedding-gold uppercase text-[11px] mb-1">
                Sabtu, 12 Oktober 2026
              </p>
              <p className="font-normal">08:00 WIB - Selesai</p>
            </div>

            <div className="mb-5 p-3.5 bg-wedding-gold/5 border border-wedding-gold/25">
              <p className="text-wedding-tan text-[10px] uppercase mb-1.5 font-medium">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <p className="text-lg sm:text-xl text-white font-serif font-medium">
                {guestName || "Tamu Undangan"}
              </p>
            </div>

            <p className="text-xs text-wedding-light/75 italic leading-relaxed mb-5 max-w-sm mx-auto font-normal">
              &quot;Merupakan suatu kehormatan dan kebahagiaan bagi kami untuk
              mengundang Anda hadir pada acara pernikahan kami.&quot;
            </p>

            {/* Countdown Mini di Dalam Surat */}
            <div className="flex justify-center items-center gap-2 sm:gap-2.5 mb-6">
              <div className="flex flex-col items-center px-2 py-1.5 border border-wedding-gold/35 bg-wedding-gold/5 min-w-[48px] shadow-sm">
                <span className="font-serif text-wedding-gold text-base font-medium leading-tight">
                  {countdown.days.toString().padStart(2, "0")}
                </span>
                <span className="text-[8px] uppercase text-wedding-tan font-medium">
                  Hari
                </span>
              </div>
              <span className="text-wedding-gold/40 text-xs font-serif font-medium">:</span>
              <div className="flex flex-col items-center px-2 py-1.5 border border-wedding-gold/35 bg-wedding-gold/5 min-w-[48px] shadow-sm">
                <span className="font-serif text-wedding-gold text-base font-medium leading-tight">
                  {countdown.hours.toString().padStart(2, "0")}
                </span>
                <span className="text-[8px] uppercase text-wedding-tan font-medium">
                  Jam
                </span>
              </div>
              <span className="text-wedding-gold/40 text-xs font-serif font-medium">:</span>
              <div className="flex flex-col items-center px-2 py-1.5 border border-wedding-gold/35 bg-wedding-gold/5 min-w-[48px] shadow-sm">
                <span className="font-serif text-wedding-gold text-base font-medium leading-tight">
                  {countdown.minutes.toString().padStart(2, "0")}
                </span>
                <span className="text-[8px] uppercase text-wedding-tan font-medium">
                  Menit
                </span>
              </div>
              <span className="text-wedding-gold/40 text-xs font-serif font-medium">:</span>
              <div className="flex flex-col items-center px-2 py-1.5 border border-wedding-gold/35 bg-wedding-gold/5 min-w-[48px] shadow-sm">
                <span className="font-serif text-wedding-gold text-base font-medium leading-tight">
                  {countdown.seconds.toString().padStart(2, "0")}
                </span>
                <span className="text-[8px] uppercase text-wedding-tan font-medium">
                  Detik
                </span>
              </div>
            </div>

            <Button
              onClick={onEnter}
              className="w-full text-xs py-3 font-medium cursor-pointer"
            >
              Masuk ke Undangan
            </Button>
          </motion.div>

          {/* ========================================================= */}
          {/* 2. BADAN AMPLOP & LIPATAN 3D (Tampil Saat Belum Terbuka) */}
          {/* ========================================================= */}
          <AnimatePresence>
            {stage !== "revealed" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.4 } }}
                transition={luxuryTransition}
                className="absolute inset-0 z-30 flex flex-col justify-between rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-wedding-gold/35 bg-[#06100d]"
              >
                {/* Latar Pola Beludru Amplop */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

                {/* --- LIPATAN ATAS (3D TOP FLAP) --- */}
                <motion.div
                  initial={{ rotateX: 0 }}
                  animate={stage === "opening" ? { rotateX: -160 } : { rotateX: 0 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                  className="absolute top-0 left-0 right-0 h-1/2 z-40 flex items-end justify-center pointer-events-auto"
                >
                  {/* Segitiga Lipatan Atas Amplop */}
                  <svg
                    viewBox="0 0 500 250"
                    preserveAspectRatio="none"
                    className="w-full h-full drop-shadow-xl"
                  >
                    <polygon
                      points="0,0 500,0 250,250"
                      fill="#040a08"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                    />
                  </svg>

                  {/* =================================================== */}
                  {/* 3. SEGEL LILIN EMAS (WAX SEAL STAMP) DI TITIK TENGAH AMPLOP */}
                  {/* =================================================== */}
                  <div
                    onClick={handleBreakSeal}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer group pointer-events-auto"
                    title="Sentuh untuk memecahkan segel dan membuka surat"
                  >
                    {/* Lingkaran Segel Lilin Bulat - Tepat di perpotongan 4 lipatan amplop (x=50%, y=50%) */}
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      animate={
                        stage === "opening"
                          ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] }
                          : { scale: [1, 1.03, 1] }
                      }
                      transition={
                        stage === "opening"
                          ? { duration: 0.4 }
                          : { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
                      }
                      className="relative w-20 h-20 sm:w-22 sm:h-22 -translate-y-1/2 rounded-full flex items-center justify-center p-1 shadow-[0_10px_30px_rgba(212,175,55,0.45)]"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 35%, #fce9a5 0%, #d4af37 45%, #947424 85%, #5a4411 100%)",
                      }}
                    >
                      {/* Kontur Tekstur Lelehan Lilin Organik */}
                      <div className="absolute inset-0.5 rounded-full border border-yellow-100/40 pointer-events-none" />
                      <div className="w-15 h-15 sm:w-17 sm:h-17 rounded-full border-2 border-wedding-gold/80 flex flex-col items-center justify-center bg-gradient-to-b from-[#b89531] to-[#695015] shadow-inner">
                        <span className="font-serif text-white text-lg sm:text-xl font-medium tracking-tight drop-shadow-md">
                          A&amp;H
                        </span>
                        <span className="text-[7px] text-amber-200/90 uppercase tracking-normal font-medium">
                          Seal
                        </span>
                      </div>
                    </motion.div>

                    {/* Teks Pemicu Sentuhan Tepat di Bawah Lingkaran Segel */}
                    <motion.span
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute top-12 sm:top-14 text-[11px] font-medium text-wedding-tan uppercase tracking-normal bg-black/75 px-3.5 py-1 rounded-full border border-wedding-gold/30 shadow-md backdrop-blur-xs whitespace-nowrap"
                    >
                      Ketuk Segel Lilin
                    </motion.span>
                  </div>
                </motion.div>

                {/* --- LIPATAN SAMPING & BAWAH AMPLOP --- */}
                <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none z-30">
                  <svg
                    viewBox="0 0 500 500"
                    preserveAspectRatio="none"
                    className="w-full h-full"
                  >
                    {/* Sisi Kiri Amplop */}
                    <polygon
                      points="0,0 250,250 0,500"
                      fill="#06120e"
                      stroke="#d4af37"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                    />
                    {/* Sisi Kanan Amplop */}
                    <polygon
                      points="500,0 250,250 500,500"
                      fill="#06120e"
                      stroke="#d4af37"
                      strokeWidth="1"
                      strokeOpacity="0.25"
                    />
                    {/* Sisi Bawah Amplop */}
                    <polygon
                      points="0,500 250,240 500,500"
                      fill="#050e0b"
                      stroke="#d4af37"
                      strokeWidth="1.5"
                      strokeOpacity="0.35"
                    />
                  </svg>
                </div>

                {/* Keterangan Nama Tamu di Depan Amplop */}
                <div className="relative z-35 text-center mt-auto mb-6 px-4">
                  <p className="text-[10px] uppercase text-wedding-tan/70 font-medium mb-1">
                    Spesial untuk:
                  </p>
                  <p className="font-serif text-sm sm:text-base text-wedding-light font-medium">
                    {guestName || "Bapak/Ibu/Saudara/i"}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};
