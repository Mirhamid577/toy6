import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import config from "./config.js";
import SparkleField from "./components/SparkleField.jsx";
import EntryGate from "./components/EntryGate.jsx";
import Hero from "./components/Hero.jsx";
import Invitation from "./components/Invitation.jsx";
import Gallery from "./components/Gallery.jsx";
import SaveDate from "./components/SaveDate.jsx";
import Venue from "./components/Venue.jsx";
import Program from "./components/Program.jsx";
import Wishes from "./components/Wishes.jsx";
import Gift from "./components/Gift.jsx";
import Contacts from "./components/Contacts.jsx";
import Footer from "./components/Footer.jsx";
import MusicButton from "./components/MusicButton.jsx";

export default function App() {
  const [gateVisible, setGateVisible] = useState(true);
  const [isOpening, setIsOpening] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!gateVisible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = previous;
    };
  }, [gateVisible]);

  useEffect(() => {
    if (gateVisible) return;
    window.scrollTo(0, 0);
  }, [gateVisible]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  const openInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    window.setTimeout(() => setGateVisible(false), 1050);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#f7e3cd]">
      {/* Keng ekranlarda taklifnoma atrofidagi fon (oq o'rniga) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 hidden min-[900px]:block"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 50% 38%, #7d2d31 0%, #5c131d 48%, #360811 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-20 mix-blend-soft-light"
          style={{
            backgroundImage: 'url("/images/palace-rose/paper.webp")',
            backgroundSize: "480px auto",
            backgroundRepeat: "repeat",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 32%, rgba(0,0,0,0) 30%, rgba(26,3,7,0.62) 100%)",
          }}
        />
        <motion.div
          className="absolute -left-[130px] bottom-[-160px] w-[480px] opacity-40"
          style={{ transformOrigin: "80% 15%" }}
          animate={{ rotate: [-2.2, 2.2, -2.2], y: [0, -14, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src="/images/palace-rose/flower1.webp"
            alt=""
            className="h-auto w-full -scale-x-100"
          />
        </motion.div>
        <motion.div
          className="absolute -right-[130px] top-[-160px] w-[480px] opacity-40"
          style={{ transformOrigin: "20% 85%" }}
          animate={{ rotate: [2.2, -2.2, 2.2], y: [0, 16, 0] }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <img
            src="/images/palace-rose/flower1.webp"
            alt=""
            className="h-auto w-full -scale-y-100"
          />
        </motion.div>
      </div>

      {!gateVisible && <SparkleField />}

      <main className="relative min-h-screen w-full">
        <div
          className="flex w-full justify-center overflow-x-clip bg-transparent overflow-clip scrollbar-none"
          data-testid="palace-rose-template"
        >
          <div
            className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden md:border md:border-[#ab7a4533] isolate min-[900px]:shadow-[0_40px_90px_-20px_rgba(0,0,0,0.55),0_0_0_1px_rgba(247,227,205,0.18)]"
            style={{
              backgroundColor: "rgb(247, 227, 205)",
              color: "rgb(171, 122, 69)",
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-20 mix-blend-darken"
              style={{
                backgroundImage: 'url("/images/palace-rose/paper.webp")',
                backgroundSize: "100% auto",
                backgroundRepeat: "repeat-y",
                opacity: 0.4,
              }}
            />

            <Hero data={config} />

            <div className="relative z-10 flex flex-col gap-6 md:gap-8">
              <Invitation data={config} />
              <Gallery data={config} />
              <SaveDate data={config} />
              <Venue data={config} />
              <Program data={config} />
              <Wishes data={config} />
              <Gift data={config} />
              <Contacts data={config} />
              <Footer data={config} />
            </div>
          </div>
        </div>
      </main>

      <audio
        ref={audioRef}
        src={config.musicUrl}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      <MusicButton playing={playing} onToggle={toggleMusic} />

      {gateVisible && (
        <EntryGate
          data={config}
          isOpening={isOpening}
          onOpen={openInvitation}
        />
      )}
    </div>
  );
}
