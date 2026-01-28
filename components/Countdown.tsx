"use client";

import React, { useState, useEffect } from "react";
import { Section } from "./ui/Section";

export const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // Target date: October 12, 2025
        const targetDate = new Date("2025-10-12T00:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const TimerBox = ({ label, value }: { label: string; value: number }) => (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-28 md:h-28 border border-wedding-gold/40 flex items-center justify-center mb-3 bg-wedding-dark/50 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-wedding-gold/5 scale-0 group-hover:scale-100 transition-transform duration-500" />
                <span className="text-3xl md:text-5xl font-serif text-wedding-gold">
                    {value.toString().padStart(2, "0")}
                </span>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-wedding-tan font-medium">
                {label}
            </span>
        </div>
    );

    return (
        <Section id="countdown" className="bg-wedding-dark  border-y border-wedding-gold/10">
            <div className="text-center mb-12">
                <p className="text-wedding-tan uppercase tracking-[0.2em] text-[10px] mb-4">Counting down to the big day</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <TimerBox label="Days" value={timeLeft.days} />
                <TimerBox label="Hours" value={timeLeft.hours} />
                <TimerBox label="Minutes" value={timeLeft.minutes} />
                <TimerBox label="Seconds" value={timeLeft.seconds} />
            </div>
        </Section>
    );
};
