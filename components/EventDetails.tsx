import React from "react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";

export const EventDetails = () => {
    const EventCard = ({ title, date, time, location, address, icon }: {
        title: string;
        date: string;
        time: string;
        location: string;
        address: string;
        icon: React.ReactNode;
    }) => (
        <div className="border border-wedding-gold/20 p-8 md:p-12 bg-wedding-dark/40 backdrop-blur-sm relative group overflow-hidden">
            {/* Icon Frame */}
            <div className="w-16 h-16 border border-wedding-gold/40 rotate-45 flex items-center justify-center mx-auto mb-10 group-hover:bg-wedding-gold/10 transition-colors duration-500">
                <div className="-rotate-45 text-wedding-gold text-2xl">
                    {icon}
                </div>
            </div>

            <h3 className="text-2xl md:text-3xl text-white mb-6 uppercase tracking-wider">{title}</h3>
            <p className="text-wedding-gold font-bold mb-8 tracking-widest uppercase text-sm">{date}</p>

            <div className="space-y-4 mb-10">
                <div className="flex flex-col items-center">
                    <span className="text-wedding-tan text-[10px] uppercase tracking-widest mb-1">Time</span>
                    <p className="text-wedding-light">{time}</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-wedding-tan text-[10px] uppercase tracking-widest mb-1">Location</span>
                    <p className="text-wedding-light font-bold">{location}</p>
                    <p className="text-wedding-light/60 text-xs mt-1 max-w-[200px]">{address}</p>
                </div>
            </div>

            <Button variant="outline" size="sm" className="border-wedding-gold/30 hover:border-wedding-gold text-[10px]">
                See Google Maps
            </Button>
        </div>
    );

    return (
        <Section id="event" className="bg-wedding-dark ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center max-w-5xl mx-auto">
                <EventCard
                    title="The Wedding Ceremony"
                    date="Saturday, 12 October 2025"
                    time="08:00 AM - 10:00 AM"
                    location="Balai Sudirman"
                    address="Jl. Dr. Saharjo No.268, Jakarta Selatan"
                    icon={<span>🕊️</span>}
                />
                <EventCard
                    title="The Reception"
                    date="Saturday, 12 October 2025"
                    time="11:00 AM - 01:00 PM"
                    location="The Ritz-Carlton"
                    address="Kawasan Mega Kuningan, Jakarta"
                    icon={<span>✨</span>}
                />
            </div>
        </Section>
    );
};
