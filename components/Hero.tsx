"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/Button";
import { WaxSealEnvelope } from "./WaxSealEnvelope";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { useInvitation } from "@/lib/invitation-context";

function HeroContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isOpened, openInvitation } = useInvitation();

  const scrollToContent = () => {
    const nextSection = document.getElementById("countdown");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEnterInvitation = () => {
    openInvitation();
    setIsModalOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("play-wedding-music"));
    }
    setTimeout(scrollToContent, 200);
  };

  return (
    <section className="relative h-screen min-h-[700px] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      {/* Background Image with Overlay */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-bg.png"
          alt="Wedding Background"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
      </motion.div>

      {/* Decorative Frame */}
      <motion.div
        variants={staggerContainer(0.18, 0.3)}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full max-w-4xl p-8 md:p-16 border-2 border-wedding-gold/30"
      >
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-wedding-gold" />
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-wedding-gold" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-wedding-gold" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-wedding-gold" />

        <motion.p
          variants={fadeInUp}
          className="text-wedding-tan uppercase text-xs md:text-sm mb-6 font-medium"
        >
          Save The Date
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          className="text-4xl sm:text-5xl md:text-7xl mb-4 font-serif text-white font-medium leading-tight"
        >
          ARIS <span className="text-wedding-gold">&</span> HANA
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="text-wedding-light italic font-serif text-lg md:text-2xl mb-8 font-normal"
        >
          The Beginning of Always
        </motion.p>

        {guestName && (
          <motion.div variants={fadeInUp} className="mb-8">
            <p className="text-wedding-tan text-xs uppercase mb-2 font-normal">
              Dear,
            </p>
            <p className="text-2xl md:text-3xl text-white font-serif font-medium">
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.div variants={fadeInUp}>
          <Button
            variant="navbar"
            onClick={() => setIsModalOpen(true)}
            className="px-10 mt-2 font-medium"
          >
            {isOpened ? "Lihat Undangan Kembali" : "Open Invitation"}
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll down indicator - Only visible after invitation is opened */}
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.8 }}
            onClick={scrollToContent}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <p className="text-wedding-tan text-[10px] uppercase mb-2 font-medium">
                Scroll down
              </p>
              <div className="w-px h-10 bg-wedding-gold/50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Wax Seal Envelope Experience */}
      <WaxSealEnvelope
        isOpen={isModalOpen}
        guestName={guestName}
        onEnter={handleEnterInvitation}
      />
    </section>
  );
}

export const Hero = () => {
  return (
    <Suspense fallback={<div className="h-screen bg-wedding-dark" />}>
      <HeroContent />
    </Suspense>
  );
};
