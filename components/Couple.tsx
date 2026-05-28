import React from "react";
import Image from "next/image";
import { Section } from "./ui/Section";

export const Couple = () => {
    const Person = ({ role, name, image, bio }: { role: string; name: string; image: string; bio: string }) => (
        <div className="flex flex-col items-center text-center">
            <div className="relative w-64 h-80 mb-8 gold-border-fancy p-2">
                <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
            <h3 className="text-3xl font-serif text-wedding-gold mb-1">{name}</h3>
            <p className="text-wedding-tan uppercase tracking-widest text-xs mb-4">— {role} —</p>
            <p className="text-wedding-light/70 text-sm max-w-[280px] leading-relaxed italic">
                {bio}
            </p>
        </div>
    );

    return (
        <Section id="couple">
            <div className="text-center mb-16 md:mb-24">
                <h2 className="text-4xl md:text-6xl text-white mb-4">Meet the Couple</h2>
                <div className="w-20 h-px bg-wedding-gold mx-auto mb-2" />
                <div className="w-10 h-px bg-wedding-tan mx-auto opacity-50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-0 items-start">
                <Person
                    role="The Bride"
                    name="Hana Putri"
                    image="/bride-portrait.png"
                    bio="Daughter of Mr. Ahmad Putra & Mrs. Siti Aminah. A lover of nature and poetry, finding beauty in the simplest things."
                />
                <Person
                    role="The Groom"
                    name="Aris Setiawan"
                    image="/groom-portrait.png"
                    bio="Son of Mr. Bambang Setiawan & Mrs. Ratna Wahyuni. An architect who believes that every foundation starts with love."
                />
            </div>
        </Section>
    );
};
