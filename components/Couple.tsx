"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { staggerContainer, fadeInUp, luxuryTransition, viewportReveal } from "@/lib/motion";

const Person = ({
    role,
    name,
    image,
    bio,
    direction = "left",
}: {
    role: string;
    name: string;
    image: string;
    bio: string;
    direction?: "left" | "right";
}) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, x: direction === "left" ? -30 : 30, y: 20 },
            visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: luxuryTransition,
            },
        }}
        className="flex flex-col items-center text-center"
    >
        <div className="relative w-72 sm:w-80 h-[380px] sm:h-[430px] mb-8 gold-border-fancy p-2.5 shadow-2xl">
            <div className="relative w-full h-full overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 350px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                />
            </div>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-wedding-gold mb-1 font-medium">{name}</h3>
        <p className="text-wedding-tan uppercase text-xs mb-4 font-medium">— {role} —</p>
        <p className="text-wedding-light/70 text-sm max-w-[320px] leading-relaxed italic font-normal">
            {bio}
        </p>
    </motion.div>
);

export const Couple = () => {
    return (
        <Section id="couple">
            <motion.div
                variants={staggerContainer(0.2, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
            >
                <motion.div variants={fadeInUp} className="text-center mb-16 md:mb-20">
                    <h2 className="text-3xl md:text-5xl text-white mb-3 font-medium">Meet the Couple</h2>
                    <p className="text-wedding-tan text-xs uppercase font-normal">Dua Jiwa Bersatu Dalam Cinta</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-start max-w-4xl mx-auto">
                    <Person
                        direction="left"
                        role="The Bride"
                        name="Hana Putri"
                        image="/bride-portrait.png"
                        bio="Daughter of Mr. Ahmad Putra & Mrs. Siti Aminah. A lover of nature and poetry, finding beauty in the simplest things."
                    />
                    <Person
                        direction="right"
                        role="The Groom"
                        name="Aris Setiawan"
                        image="/groom-portrait.png"
                        bio="Son of Mr. Bambang Setiawan & Mrs. Ratna Wahyuni. An architect who believes that every foundation starts with love."
                    />
                </div>
            </motion.div>
        </Section>
    );
};
