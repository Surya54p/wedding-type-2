"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/Button";

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Home", href: "#" },
        { label: "Couple", href: "#couple" },
        { label: "Event", href: "#event" },
        { label: "Story", href: "#story" },
        { label: "Gallery", href: "#gallery" },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-wedding-dark/90 backdrop-blur-md py-4 shadow-xl" : "bg-transparent py-8"}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="text-wedding-gold font-serif text-2xl tracking-widest font-bold">
                    A&H
                </div>

                <div className="hidden md:flex items-center gap-10">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-[10px] uppercase tracking-[0.3em] text-wedding-light/80 hover:text-wedding-gold transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                    <Button size="sm" className="text-[10px]">RSVP</Button>
                </div>

                {/* Mobile Menu Button - Placeholder for brevity */}
                <div className="md:hidden text-wedding-gold">
                    ☰
                </div>
            </div>
        </nav>
    );
};
