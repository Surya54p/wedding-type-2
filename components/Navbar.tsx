"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useInvitation } from "@/lib/invitation-context";

export const Navbar = () => {
    const { isOpened } = useInvitation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        { label: "RSVP", href: "#guestbook" },
    ];

    return (
        <AnimatePresence>
            {isOpened && (
                <motion.nav
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
                        mobileMenuOpen || isScrolled
                            ? "bg-wedding-dark/98 backdrop-blur-md py-4 shadow-2xl"
                            : "bg-wedding-dark/95 backdrop-blur-md py-4 shadow-lg"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                        <a href="#" className="text-wedding-gold font-serif text-2xl font-medium">
                            A&H
                        </a>

                        <div className="hidden md:flex items-center gap-10">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-xs uppercase text-wedding-light/80 hover:text-wedding-gold transition-colors font-medium"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden text-wedding-gold text-xl focus:outline-none p-1"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? "✕" : "☰"}
                        </button>
                    </div>

                    {/* Mobile Dropdown */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="md:hidden bg-wedding-dark/98 backdrop-blur-md px-6 pt-3 pb-6 flex flex-col gap-4 shadow-2xl"
                            >
                                {navItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-xs uppercase text-wedding-light/80 hover:text-wedding-gold transition-colors py-1 font-medium"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};
