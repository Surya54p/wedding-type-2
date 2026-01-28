"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

export const Hero = () => {
    const scrollToContent = () => {
        const nextSection = document.getElementById("countdown");
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative h-screen min-h-[700px] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/profile-cat-1.jpg"
                    alt="Wedding Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
            </div>

            {/* Decorative Frame */}
            <div className="relative z-20 w-full max-w-4xl p-8 md:p-16 border-2 border-wedding-gold/30">
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-wedding-gold" />
                <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-wedding-gold" />
                <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-wedding-gold" />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-wedding-gold" />

                <p className="text-wedding-tan uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-fade-in">
                    Save The Date
                </p>

                <h1 className="text-5xl md:text-8xl mb-4 font-serif text-white tracking-widest leading-tight">
                    ARIS <span className="text-wedding-gold">&</span> HANA
                </h1>

                <p className="text-wedding-light italic font-serif text-lg md:text-2xl mb-10 tracking-widest">
                    The Beginning of Always
                </p>

                <Button
                    variant="outline"
                    onClick={scrollToContent}
                    className="px-10 border-wedding-gold/50 hover:border-wedding-gold text-white"
                >
                    Open Invitation
                </Button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <p className="text-wedding-tan text-[10px] uppercase tracking-[0.2em] mb-2">Scroll down</p>
                <div className="w-px h-10 bg-wedding-gold/50 mx-auto" />
            </div>
        </section>
    );
};
