import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function MusicButton({ playing, onToggle }) {
  const label = playing ? "Musiqani o'chirish" : "Musiqa";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={label}
      aria-pressed={playing}
      className="group fixed bottom-6 right-6 z-[110] flex h-14 w-14 items-center justify-center rounded-full border border-[#ab7a45]/70 bg-[#f7e3cd]/95 text-[#640e1b] shadow-[0_10px_30px_rgba(60,10,17,0.35)] backdrop-blur-md transition-colors hover:bg-white"
      whileTap={{ scale: 0.92 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
    >
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full border border-[rgb(171,122,69)]/60"
          animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {playing ? (
        <Volume2 size={22} strokeWidth={1.8} aria-hidden="true" />
      ) : (
        <VolumeX size={22} strokeWidth={1.8} aria-hidden="true" />
      )}

      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-full border border-[#ab7a45]/45 bg-[#f7e3cd]/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#640e1b] opacity-0 shadow-md backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 md:block"
      >
        {label}
      </span>
    </motion.button>
  );
}
