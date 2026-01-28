import React from "react";
import { Button } from "./ui/Button";
import { Origami } from "lucide-react";
export const Footer = () => {
    return (
        <footer className="bg-[#040908] py-20 px-4 text-center border-t border-wedding-gold/10">
            <h2 className="text-5xl md:text-7xl font-serif mb-6 gold-gradient-text tracking-wider">
                Aris & Hana
            </h2>
            <p className="text-wedding-light/80 font-serif italic text-lg md:text-xl mb-12 max-w-sm mx-auto">
                Together is a beautiful place to be.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-20">
                <Button className="flex items-center gap-2">
                    <span>💌</span> Confirm Attendance
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                    <span>🎁</span> Send Gift
                </Button>
            </div>

            <div className="w-16 h-16 border border-wedding-gold/30 rotate-45 flex items-center justify-center mx-auto mb-10">
                <div className="-rotate-45 text-wedding-gold text-sm font-bold">
                    <Origami size={25}/>
                </div>
            </div>

            <div className="text-[10px] md:text-xs text-wedding-tan uppercase tracking-[0.4em] opacity-40">
                &copy; 2025 Aris & Hana Wedding • Invitation by Antigravity
            </div>
        </footer>
    );
};
