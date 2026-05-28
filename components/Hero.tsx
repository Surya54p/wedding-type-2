"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/Button";

export const Hero = () => {
    const [guestName, setGuestName] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const to = params.get("to");
        if (to) {
            setGuestName(to);
        }
    }, []);

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
                    src="/hero-bg.png"
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

                <p className="text-wedding-light italic font-serif text-lg md:text-2xl mb-8 tracking-widest">
                    The Beginning of Always
                </p>

                {guestName && (
                    <div className="mb-8 animate-fade-in">
                        <p className="text-wedding-tan text-xs uppercase tracking-[0.2em] mb-2">Dear,</p>
                        <p className="text-2xl md:text-3xl text-white font-serif">{guestName}</p>
                    </div>
                )}

                <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(true)}
                    className="px-10 border-wedding-gold/50 hover:border-wedding-gold text-white mt-2"
                >
                    Open Invitation
                </Button>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <p className="text-wedding-tan text-[10px] uppercase tracking-[0.2em] mb-2">Scroll down</p>
                <div className="w-px h-10 bg-wedding-gold/50 mx-auto" />
            </div>

            {/* Invitation Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-[#040908] border border-wedding-gold/30 p-8 md:p-12 max-w-lg w-full text-center shadow-2xl animate-fade-in">
                        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-wedding-gold" />
                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-wedding-gold" />
                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-wedding-gold" />
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-wedding-gold" />

                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-wedding-gold/50 hover:text-wedding-gold transition-colors"
                        >
                            ✕
                        </button>

                        <p className="text-wedding-tan uppercase tracking-[0.2em] text-[10px] mb-6">Undangan Pernikahan</p>
                        
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                            Aris <span className="text-wedding-gold">&</span> Hana
                        </h2>
                        
                        <div className="w-16 h-px bg-wedding-gold/50 mx-auto mb-6" />
                        
                        <div className="text-wedding-light/90 mb-8 space-y-1 text-sm">
                            <p className="font-bold text-wedding-gold tracking-widest uppercase text-xs mb-2">Sabtu, 12 Oktober 2025</p>
                            <p>08:00 WIB - Selesai</p>
                        </div>
                        
                        <div className="mb-8 p-4 bg-wedding-gold/5 border border-wedding-gold/20">
                            <p className="text-wedding-tan text-[10px] uppercase tracking-widest mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                            <p className="text-xl text-white font-serif">{guestName || "Tamu Undangan"}</p>
                        </div>

                        <p className="text-xs text-wedding-light/70 italic leading-relaxed mb-8 max-w-sm mx-auto">
                            &quot;Merupakan suatu kehormatan dan kebahagiaan bagi kami untuk mengundang Anda hadir pada acara pernikahan kami.&quot;
                        </p>

                        <Button 
                            onClick={() => {
                                setIsModalOpen(false);
                                setTimeout(scrollToContent, 100);
                            }}
                            className="w-full text-xs py-3"
                        >
                            Masuk ke Undangan
                        </Button>
                    </div>
                </div>
            )}
        </section>
    );
};
