"use client";

import React, { useState, useEffect, useRef } from "react";
import { Disc3, VolumeX } from "lucide-react";
import { useInvitation } from "@/lib/invitation-context";

export const MusicPlayer: React.FC = () => {
  const { isOpened } = useInvitation();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const cleanupListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };

    const handleInteraction = () => {
      if (!audio) return;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          cleanupListeners();
        })
        .catch(() => {});
    };

    // 1. Coba putar langsung saat halaman termuat
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        // Jika diblokir oleh Autoplay Policy browser, pasang listener gestur
        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);
        window.addEventListener("scroll", handleInteraction);
        window.addEventListener("keydown", handleInteraction);
      });

    // 2. Listener event khusus dari tombol 'Open Invitation'
    const handleTriggerPlay = () => {
      handleInteraction();
    };

    window.addEventListener("play-wedding-music", handleTriggerPlay);

    return () => {
      cleanupListeners();
      window.removeEventListener("play-wedding-music", handleTriggerPlay);
    };
  }, []);

  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  }, [isOpened]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Audio play failed:", err);
        });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src="/mp3/lagu-pernikahan-kita.mp3"
        loop
        autoPlay
        playsInline
        preload="auto"
      />

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-wedding-dark/90 border border-wedding-gold/50 shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105 hover:border-wedding-gold"
      >
        {isPlaying ? (
          <Disc3 className="w-6 h-6 text-wedding-gold animate-spin-slow" />
        ) : (
          <VolumeX className="w-5 h-5 text-wedding-tan/70 group-hover:text-wedding-gold transition-colors" />
        )}
      </button>
    </div>
  );
};
