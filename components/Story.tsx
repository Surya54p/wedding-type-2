"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { staggerContainer, fadeInUp, luxuryTransition, viewportReveal } from "@/lib/motion";

export const Story = () => {
    const milestones = [
        {
            date: "May 15, 2021",
            title: "The First Meeting",
            description: "It all started in a small café in Jakarta. A simple 'hello' led to hours of conversation that felt like minutes.",
            image: "/story-meeting.png",
        },
        {
            date: "January 20, 2023",
            title: "The First Trip",
            description: "Exploring the volcanic landscapes of Bali together made us realize how perfectly we complement each other.",
            image: "/story-trip.png",
        },
        {
            date: "February 12, 2024",
            title: "The Proposal",
            description: "Under the stars, high up on the hills, Aris asked the most important question, and Hana said 'Yes' with joy.",
            image: "/story-proposal.png",
        },
        {
            date: "August 18, 2024",
            title: "The Engagement",
            description: "Surrounded by our closest family and friends, we made our official commitment to embark on this sacred journey together.",
            image: "/gallery-1.png",
        },
        {
            date: "March 15, 2025",
            title: "Towards The Forever",
            description: "Capturing moments of love, laughter, and prayer as we prepare to step into the most beautiful chapter of our lives.",
            image: "/gallery-3.png",
        },
    ];

    return (
        <Section id="story" className="bg-wedding-dark">
            <motion.div
                variants={staggerContainer(0.15, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
            >
                <motion.div variants={fadeInUp} className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl text-white mb-3 uppercase font-medium">Our Story</h2>
                    <p className="text-wedding-tan italic font-serif font-normal">The milestones that brought us to this day.</p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-16">
                    {milestones.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={viewportReveal}
                                transition={luxuryTransition}
                                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
                            >
                                <div className="w-full md:w-1/2 aspect-video relative gold-border-fancy overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover opacity-80 hover:opacity-100 transition-all duration-700 hover:scale-105"
                                    />
                                </div>
                                <div className={`w-full md:w-1/2 text-center ${isEven ? "md:text-left" : "md:text-right"}`}>
                                    <span className="text-wedding-gold font-medium text-xs uppercase block mb-2">{item.date}</span>
                                    <h3 className="text-2xl md:text-3xl text-white mb-4 font-serif font-medium">{item.title}</h3>
                                    <p className="text-wedding-light/70 text-sm leading-relaxed font-normal">{item.description}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </Section>
    );
};
