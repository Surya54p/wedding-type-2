"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { staggerContainer, fadeInUp, luxuryTransition, viewportReveal } from "@/lib/motion";

const TimerBox = ({ label, value }: { label: string; value: number }) => (
  <motion.div variants={fadeInUp} className="flex flex-col items-center">
    <div className="w-18 h-18 sm:w-22 sm:h-22 md:w-26 md:h-26 border border-wedding-gold/40 flex items-center justify-center mb-2.5 sm:mb-3 bg-wedding-dark/60 backdrop-blur-sm relative overflow-hidden group shadow-lg">
      <div className="absolute inset-0 bg-wedding-gold/5 scale-0 group-hover:scale-100 transition-transform duration-500" />
      <span className="text-2xl sm:text-3xl md:text-4xl font-serif text-wedding-gold font-medium">
        {value.toString().padStart(2, "0")}
      </span>
    </div>
    <span className="text-[11px] sm:text-xs uppercase text-wedding-tan font-medium">
      {label}
    </span>
  </motion.div>
);

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: October 12, 2026
    const targetDate = new Date("2026-10-12T08:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        ),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Section
      id="countdown"
      className="bg-wedding-dark min-h-screen min-h-[100dvh] flex flex-col justify-center items-center text-center scroll-mt-16 sm:scroll-mt-20 py-20 sm:py-24"
    >
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportReveal}
        className="max-w-2xl mx-auto px-4 flex flex-col items-center"
      >
        {/* 1. Teks Pembukaan Salam Lebih Besar & Tegas */}
        <motion.p
          variants={fadeInUp}
          className="font-serif italic text-wedding-gold text-2xl sm:text-2xl md:text-3xl font-medium mb-5 leading-snug"
        >
          Assalamu’alaikum Warahmatullahi Wabarakatuh
        </motion.p>

        {/* 2. Teks Ucapan Syukur Lebih Jelas & Kontras */}
        <motion.p
          variants={fadeInUp}
          className="text-wedding-light/95 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal mb-4"
        >
          Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami
          bermaksud menyelenggarakan syukuran pernikahan putra-putri kami.
        </motion.p>

        {/* 3. Harapan Doa Restu Lebih Terbaca */}
        <motion.p
          variants={fadeInUp}
          className="text-wedding-light/90 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed font-normal mb-6"
        >
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
          Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi
          kedua mempelai.
        </motion.p>

        {/* 4. Hormat Kami */}
        <motion.p
          variants={fadeInUp}
          className="text-wedding-tan font-serif italic text-sm sm:text-base font-medium mb-8"
        >
          Hormat kami yang berbahagia, Aris & Hana beserta keluarga besar.
        </motion.p>

        {/* 5. Sub-label Countdown */}
        <motion.p
          variants={fadeInUp}
          className="text-wedding-tan uppercase text-xs sm:text-sm mb-5 font-medium"
        >
          Counting Down to The Big Day
        </motion.p>

        {/* 6. 4 Kotak Timer Proporsional */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 sm:gap-5 md:gap-6 mb-10"
        >
          <TimerBox label="Days" value={timeLeft.days} />
          <TimerBox label="Hours" value={timeLeft.hours} />
          <TimerBox label="Minutes" value={timeLeft.minutes} />
          <TimerBox label="Seconds" value={timeLeft.seconds} />
        </motion.div>

        {/* Indikator Lanjut Gulir yang Halus */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportReveal}
          transition={{ delay: 0.6, duration: luxuryTransition.duration }}
          className="flex flex-col items-center mt-2 opacity-60"
        >
          <span className="text-xs uppercase text-wedding-tan font-medium mb-1">
            Gulir ke bawah
          </span>
          <div className="w-px h-6 bg-wedding-gold/40" />
        </motion.div>
      </motion.div>
    </Section>
  );
};
