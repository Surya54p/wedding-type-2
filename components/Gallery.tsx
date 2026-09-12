"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { staggerContainer, fadeInUp, cardReveal, viewportReveal } from "@/lib/motion";

export const Gallery = () => {
    const images = [
        "/gallery-1.png",
        "/gallery-2.png",
        "/gallery-3.png",
        "/gallery-4.png",
        "/gallery-5.png",
        "/gallery-6.png",
        "/story-trip.png",
        "/story-meeting.png",
        "/story-proposal.png",
        "/bride-portrait.png",
        "/groom-portrait.png",
        "/hero-bg.png",
        "/gallery-1.png",
        "/gallery-4.png",
        "/gallery-2.png",
    ];

    return (
        <Section id="gallery">
            <motion.div
                variants={staggerContainer(0.1, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
            >
                <motion.div variants={fadeInUp} className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl md:text-5xl text-white mb-3 uppercase font-medium">Pre-Wedding Gallery</h2>
                    <p className="text-wedding-tan italic font-serif text-sm font-normal">Capturing every moment of love before our big day.</p>
                </motion.div>

                <div className="columns-2 md:columns-2 lg:columns-3 gap-2.5 sm:gap-4 space-y-2.5 sm:space-y-4">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            variants={cardReveal}
                            whileHover={{ y: -4 }}
                            className="relative group overflow-hidden break-inside-avoid shadow-lg"
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                width={500}
                                height={700}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </Section>
    );
};
