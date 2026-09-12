"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CurtainIntro() {
  const [stage, setStage] = useState<"logo" | "opening" | "done">("logo");

  useEffect(() => {
    // Stage 1: Tampilkan kartu monogram wedding di tengah selama 1.5 detik
    const timer1 = setTimeout(() => {
      setStage("opening");
    }, 1500);

    // Stage 2: Selesaikan animasi pembukaan tirai sinematik (1.2 detik)
    const timer2 = setTimeout(() => {
      setStage("done");
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleSkipOrOpen = () => {
    if (stage === "logo") {
      setStage("opening");
      setTimeout(() => setStage("done"), 1200);
    }
  };

  if (stage === "done") return null;

  return (
    <div
      onClick={handleSkipOrOpen}
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col cursor-pointer select-none"
      title="Klik untuk membuka langsung"
    >
      {/* 1. Panel Tirai Atas (Bergerak ke Atas: y -> -100%) */}
      <motion.div
        className="w-full h-[50vh] bg-[#040908] border-b border-wedding-gold/25 relative flex items-end justify-center shadow-2xl"
        initial={{ y: 0 }}
        animate={stage === "opening" ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Ambient Gold Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(212,175,55,0.2)_0%,transparent_70%)] pointer-events-none" />
      </motion.div>

      {/* 2. Emblem Monogram Wedding di Tengah */}
      <AnimatePresence>
        {stage === "logo" && (
          <motion.div
            key="center-wedding-logo"
            className="absolute inset-0 z-[110] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.35 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex flex-col items-center text-center p-8 sm:p-10 bg-[#060e0c]/95 backdrop-blur-md border border-wedding-gold/40 shadow-2xl max-w-sm mx-4">
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wedding-gold" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-wedding-gold" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-wedding-gold" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wedding-gold" />

              {/* Monogram Circle Emblem */}
              <div className="w-16 h-16 rounded-full border border-wedding-gold/60 flex items-center justify-center mb-4 bg-black/40 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <span className="font-serif text-2xl text-wedding-gold font-medium">
                  A&H
                </span>
              </div>

              {/* Title & Subtitle */}
              <p className="text-[10px] uppercase text-wedding-tan mb-2 font-medium">
                The Wedding Of
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2 font-medium">
                Aris <span className="text-wedding-gold">&</span> Hana
              </h2>
              <p className="text-xs font-serif text-wedding-light/70 italic mb-4 font-normal">
                12 Oktober 2026
              </p>

              <span className="text-[9px] uppercase text-wedding-tan/60 font-medium animate-pulse">
                Menyambut Undangan...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Panel Tirai Bawah (Bergerak ke Bawah: y -> +100%) */}
      <motion.div
        className="w-full h-[50vh] bg-[#040908] border-t border-wedding-gold/25 relative flex items-start justify-center shadow-2xl"
        initial={{ y: 0 }}
        animate={stage === "opening" ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Ambient Gold Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.2)_0%,transparent_70%)] pointer-events-none" />
      </motion.div>
    </div>
  );
}
