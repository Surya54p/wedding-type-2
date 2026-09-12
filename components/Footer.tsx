"use client";

import React from "react";
import { Origami } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp, luxuryTransition, viewportReveal } from "@/lib/motion";

export const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportReveal}
            transition={luxuryTransition}
            className="bg-[#040908] pt-24 pb-16 px-4 text-center"
        >
            <motion.h2
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                className="text-4xl md:text-6xl font-serif mb-6 gold-gradient-text font-medium"
            >
                Aris & Hana
            </motion.h2>

            <motion.p
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
                className="text-wedding-light/80 font-serif italic text-base md:text-lg mb-12 max-w-sm mx-auto font-normal"
            >
                Together is a beautiful place to be.
            </motion.p>

            <motion.div
                initial={{ rotate: 45, scale: 0.8, opacity: 0 }}
                whileInView={{ rotate: 45, scale: 1, opacity: 1 }}
                viewport={viewportReveal}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 border border-wedding-gold/30 rotate-45 flex items-center justify-center mx-auto mb-10"
            >
                <div className="-rotate-45 text-wedding-gold text-sm font-medium">
                    <Origami size={24} />
                </div>
            </motion.div>

            <div className="text-[10px] md:text-xs text-wedding-tan uppercase opacity-50 font-normal">
                &copy; 2026 Aris & Hana Wedding • Invitation by Antigravity
            </div>
        </motion.footer>
    );
};
