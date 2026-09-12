"use client";

import React, { useEffect, useState, useCallback } from "react";
import { CheckCircle2, XCircle, Users, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { staggerContainer, fadeInUp, luxuryTransition, viewportReveal } from "@/lib/motion";

type Reservation = {
    id: string;
    name: string;
    attendance: "Akan Hadir" | "Belum Bisa Hadir";
    message?: string;
    createdAt: string;
};

export const Guestbook = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        attendance: "Akan Hadir" as "Akan Hadir" | "Belum Bisa Hadir",
        message: "",
    });
    const [activeFilter, setActiveFilter] = useState<"Semua" | "Akan Hadir" | "Belum Bisa Hadir">("Semua");
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const loadReservations = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/guestbook");
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data)) {
                    setReservations(data);
                }
            }
        } catch {
            // Silently handle fetch errors
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadReservations();
    }, [loadReservations]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        setSubmitting(true);
        setSubmitSuccess(false);

        try {
            const res = await fetch("/api/guestbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                const newReservation = await res.json();
                if (newReservation && newReservation.id) {
                    setReservations((prev) => [newReservation, ...prev]);
                    setFormData({ name: "", attendance: "Akan Hadir", message: "" });
                    setSubmitSuccess(true);
                    setTimeout(() => setSubmitSuccess(false), 4000);
                }
            }
        } catch {
            // Handle error
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateStr: string) => {
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return dateStr;
        }
    };

    const hadirCount = reservations.filter((r) => r.attendance === "Akan Hadir").length;
    const tidakHadirCount = reservations.filter((r) => r.attendance === "Belum Bisa Hadir").length;

    const filteredList = reservations.filter((item) => {
        if (activeFilter === "Semua") return true;
        return item.attendance === activeFilter;
    });

    return (
        <Section id="guestbook" className="bg-wedding-dark">
            <motion.div
                variants={staggerContainer(0.15, 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={viewportReveal}
            >
                {/* Header */}
                <motion.div variants={fadeInUp} className="text-center mb-16">
                    <p className="text-wedding-tan uppercase text-xs mb-3 font-medium">
                        RSVP & Konfirmasi
                    </p>
                    <h2 className="text-3xl md:text-5xl text-white mb-4 uppercase font-medium">
                        Reservasi Kehadiran
                    </h2>
                    <p className="text-wedding-light/80 italic font-serif text-sm max-w-lg mx-auto font-normal">
                        Mohon konfirmasi kehadiran serta berikan doa restu hangat untuk kedua mempelai.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-start">
                    {/* Form Reservasi (Left 5 Columns) */}
                    <motion.div
                        variants={fadeInUp}
                        className="lg:col-span-5 relative border border-wedding-gold/25 p-8 md:p-10 bg-wedding-dark/60 backdrop-blur-md shadow-2xl"
                    >
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-wedding-gold" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-wedding-gold" />
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-wedding-gold" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-wedding-gold" />

                        <h3 className="text-xl font-serif text-wedding-gold mb-6 uppercase text-left font-medium">
                            Formulir RSVP
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            {/* Nama Tamu */}
                            <div>
                                <label htmlFor="name" className="block text-wedding-gold text-[10px] uppercase mb-2 font-medium">
                                    Nama Lengkap Tamu <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-black/40 border border-wedding-gold/30 p-3.5 text-wedding-light focus:border-wedding-gold outline-none transition-colors text-sm rounded-none font-normal"
                                    placeholder="Contoh: Bpk. Bambang & Keluarga"
                                    required
                                />
                            </div>

                            {/* Status Kehadiran */}
                            <div>
                                <label className="block text-wedding-gold text-[10px] uppercase mb-2 font-medium">
                                    Konfirmasi Kehadiran <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, attendance: "Akan Hadir" })}
                                        className={`flex items-center justify-center gap-2 p-3 text-xs uppercase transition-all duration-300 cursor-pointer border ${
                                            formData.attendance === "Akan Hadir"
                                                ? "border-wedding-gold bg-wedding-gold/20 text-wedding-gold font-medium shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                                : "border-wedding-gold/20 bg-black/30 text-wedding-light/60 hover:border-wedding-gold/40 font-normal"
                                        }`}
                                    >
                                        <CheckCircle2 size={15} />
                                        <span>Akan Hadir</span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, attendance: "Belum Bisa Hadir" })}
                                        className={`flex items-center justify-center gap-2 p-3 text-xs uppercase transition-all duration-300 cursor-pointer border ${
                                            formData.attendance === "Belum Bisa Hadir"
                                                ? "border-rose-400/80 bg-rose-950/40 text-rose-300 font-medium shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                                                : "border-wedding-gold/20 bg-black/30 text-wedding-light/60 hover:border-wedding-gold/40 font-normal"
                                        }`}
                                    >
                                        <XCircle size={15} />
                                        <span>Berhalangan</span>
                                    </button>
                                </div>
                            </div>

                            {/* Pesan & Doa Restu */}
                            <div>
                                <label htmlFor="message" className="block text-wedding-gold text-[10px] uppercase mb-2 font-medium">
                                    Ucapan & Doa Restu
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    rows={4}
                                    className="w-full bg-black/40 border border-wedding-gold/30 p-3.5 text-wedding-light focus:border-wedding-gold outline-none transition-colors text-sm resize-none rounded-none font-normal"
                                    placeholder="Tuliskan ucapan selamat dan doa untuk kedua mempelai..."
                                />
                            </div>

                            {/* Tombol Submit */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full text-xs font-medium py-4"
                                disabled={submitting}
                            >
                                {submitting ? "Mengirim Konfirmasi..." : "Kirim Reservasi"}
                            </Button>

                            {/* Status Notifikasi */}
                            <AnimatePresence>
                                {submitSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-3 bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-2 font-normal"
                                    >
                                        <Check size={14} />
                                        <span>Terima kasih! Konfirmasi kehadiran Anda telah tersimpan.</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Daftar Kehadiran & Ucapan (Right 7 Columns) */}
                    <motion.div variants={fadeInUp} className="lg:col-span-7 flex flex-col space-y-4">
                        {/* Ringkasan Statistik */}
                        <div className="grid grid-cols-3 gap-3">
                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => setActiveFilter("Semua")}
                                className={`p-4 border transition-all text-center cursor-pointer ${
                                    activeFilter === "Semua"
                                        ? "border-wedding-gold bg-wedding-gold/10"
                                        : "border-wedding-gold/20 bg-wedding-dark/40 hover:border-wedding-gold/40"
                                }`}
                            >
                                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase text-wedding-tan mb-1 font-medium">
                                    <Users size={12} />
                                    <span>Total</span>
                                </div>
                                <span className="text-2xl font-serif text-white font-medium">
                                    {reservations.length}
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => setActiveFilter("Akan Hadir")}
                                className={`p-4 border transition-all text-center cursor-pointer ${
                                    activeFilter === "Akan Hadir"
                                        ? "border-emerald-500/80 bg-emerald-950/30"
                                        : "border-wedding-gold/20 bg-wedding-dark/40 hover:border-wedding-gold/40"
                                }`}
                            >
                                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase text-emerald-400 mb-1 font-medium">
                                    <CheckCircle2 size={12} />
                                    <span>Hadir</span>
                                </div>
                                <span className="text-2xl font-serif text-emerald-300 font-medium">
                                    {hadirCount}
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => setActiveFilter("Belum Bisa Hadir")}
                                className={`p-4 border transition-all text-center cursor-pointer ${
                                    activeFilter === "Belum Bisa Hadir"
                                        ? "border-rose-500/80 bg-rose-950/30"
                                        : "border-wedding-gold/20 bg-wedding-dark/40 hover:border-wedding-gold/40"
                                }`}
                            >
                                <div className="flex items-center justify-center gap-1.5 text-[10px] uppercase text-rose-300 mb-1 font-medium">
                                    <XCircle size={12} />
                                    <span>Berhalangan</span>
                                </div>
                                <span className="text-2xl font-serif text-rose-300 font-medium">
                                    {tidakHadirCount}
                                </span>
                            </motion.button>
                        </div>

                        {/* List Pesan */}
                        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-wedding-gold/20">
                            {loading && (
                                <p className="text-wedding-tan/70 text-sm italic text-center py-12 font-normal">
                                    Memuat daftar reservasi...
                                </p>
                            )}

                            {!loading && filteredList.length === 0 && (
                                <div className="border border-dashed border-wedding-gold/20 p-10 text-center text-wedding-tan/70 text-sm italic font-normal">
                                    Belum ada konfirmasi kehadiran dalam kategori ini.
                                </div>
                            )}

                            <AnimatePresence mode="popLayout">
                                {filteredList.map((item, index) => (
                                    <motion.div
                                        key={item.id || index}
                                        layout
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={luxuryTransition}
                                        className="border border-wedding-gold/15 p-5 bg-wedding-dark/40 backdrop-blur-sm text-left hover:border-wedding-gold/30 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-3 mb-2.5">
                                            <h4 className="font-sans text-sm md:text-base text-wedding-gold font-medium tracking-normal">
                                                {item.name}
                                            </h4>

                                            {item.attendance === "Akan Hadir" ? (
                                                <span className="inline-flex items-center gap-1 font-sans text-[11px] text-emerald-400 font-medium shrink-0">
                                                    <Check size={13} />
                                                    Akan Hadir
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 font-sans text-[11px] text-rose-400 font-medium shrink-0">
                                                    <X size={13} />
                                                    Berhalangan
                                                </span>
                                            )}
                                        </div>

                                        {item.message && (
                                            <p className="font-sans text-sm text-wedding-light/90 leading-relaxed mb-3 font-normal">
                                                {item.message}
                                            </p>
                                        )}

                                        <span className="font-sans text-[11px] text-wedding-tan/70 block font-normal">
                                            {formatDate(item.createdAt)}
                                        </span>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </Section>
    );
};
