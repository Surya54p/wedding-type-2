import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { Couple } from "@/components/Couple";
import { EventDetails } from "@/components/EventDetails";
import { Gallery } from "@/components/Gallery";
import { Story } from "@/components/Story";
import { Guestbook } from "@/components/Guestbook";
import { Footer } from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { InvitationProvider } from "@/lib/invitation-context";

export default function Home() {
  return (
    <InvitationProvider>
      <main className="min-h-screen bg-wedding-dark selection:bg-wedding-gold/30 selection:text-wedding-gold">
        <Navbar />
        <Hero />
        <Countdown />
        <Couple />
        <EventDetails />
        <Gallery />
        <Story />
        <Guestbook />
        <Footer />
        <MusicPlayer />
      </main>
    </InvitationProvider>
  );
}
