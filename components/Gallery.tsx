import React from "react";
import Image from "next/image";
import { Section } from "./ui/Section";

export const Gallery = () => {
    const images = [
        "/profile-cat-1.jpg",
        "/profile-cat-1.jpg",
        "/profile-cat-1.jpg",
        "/profile-cat-1.jpg",
        "/profile-cat-1.jpg",
        "/profile-cat-1.jpg",
    ];

    return (
        <Section id="gallery">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl text-white mb-4 uppercase tracking-widest">Pre-Wedding Gallery</h2>
                <p className="text-wedding-tan italic font-serif text-sm">Capturing every moment of love before our big day.</p>
                <div className="w-24 h-px bg-wedding-gold/30 mx-auto mt-6" />
            </div>

            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {images.map((src, index) => (
                    <div
                        key={index}
                        className="relative group overflow-hidden border border-wedding-gold/10 p-1 bg-wedding-dark/20 break-inside-avoid"
                    >
                        <div className="relative aspect-4/5 md:aspect-auto">
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                width={500}
                                height={700}
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};
