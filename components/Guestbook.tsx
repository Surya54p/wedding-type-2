"use client";
import React, { useEffect, useState } from "react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";

type Message = {
    id: string;
    name: string;
    message: string;
    createdAt: string;
};

export const Guestbook = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [formData, setFormData] = useState({ name: "", message: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/guestbook")
            .then((res) => res.json())
            .then(setMessages);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.message) return;

        setLoading(true);

        const res = await fetch("/api/guestbook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const newMessage = await res.json();

        setMessages([newMessage, ...messages]);
        setFormData({ name: "", message: "" });
        setLoading(false);
    };

    return (
        <Section id="guestbook">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl text-white mb-4 uppercase tracking-widest">Guestbook</h2>
                <p className="text-wedding-tan italic font-serif text-sm">Leave your warm wishes for the happy couple.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                {/* Form */}
                <div className="border border-wedding-gold/20 p-8 md:p-10 bg-wedding-dark/30 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div>
                            <label htmlFor="name" className="block text-wedding-gold text-[10px] uppercase tracking-widest mb-2 font-bold">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-transparent border border-wedding-gold/30 p-3 text-wedding-light focus:border-wedding-gold outline-none transition-colors text-sm"
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-wedding-gold text-[10px] uppercase tracking-widest mb-2 font-bold">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                rows={4}
                                className="w-full bg-transparent border border-wedding-gold/30 p-3 text-wedding-light focus:border-wedding-gold outline-none transition-colors text-sm resize-none"
                                placeholder="Write your wishes here..."
                                required
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full" disabled={loading}>
                            {loading ? "Sending..." : "Send Wishes"}
                        </Button>
                    </form>
                </div>

                {/* Message List */}
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-wedding-gold/20">
                    {messages.map((msg, index) => (
                        <div key={index} className="border-b border-wedding-gold/10 pb-6 text-left">
                            <h4 className="text-wedding-gold font-bold uppercase tracking-widest text-[10px] mb-2">
                                {msg.name}
                            </h4>
                            <p className="text-wedding-light/80 text-sm italic mb-2">
                                "{msg.message}"
                            </p>
                            <span className="text-wedding-tan text-[9px] uppercase tracking-tighter opacity-60">
                                {msg.createdAt}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};
