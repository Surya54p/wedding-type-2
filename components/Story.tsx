import React from "react";
import Image from "next/image";
import { Section } from "./ui/Section";

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
    ];

    return (
        <Section id="story" className="bg-wedding-dark">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl text-white mb-4 uppercase tracking-tighter">Our Story</h2>
                <p className="text-wedding-tan italic font-serif">The milestones that brought us to this day.</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-16">
                {milestones.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
                    >
                        <div className="w-full md:w-1/2 aspect-video relative gold-border-fancy overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        <div className={`w-full md:w-1/2 text-center ${index % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                            <span className="text-wedding-gold font-bold tracking-[0.2em] text-xs uppercase block mb-2">{item.date}</span>
                            <h3 className="text-2xl md:text-3xl text-white mb-4 font-serif">{item.title}</h3>
                            <p className="text-wedding-light/70 text-sm leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};
