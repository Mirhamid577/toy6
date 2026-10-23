import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { useSectionProgress } from "../lib/useSectionProgress.js";
import { formatFooterDate } from "../lib/date.js";

export default function Footer({ data }) {
  const footerRef = useRef(null);
  const progress = useSectionProgress(footerRef, "footer");

  const castleScale = useTransform(progress, [0, 0.7, 1], [1.5, 1, 1]);
  const castleY = useTransform(progress, [0, 0.7, 1], [45, 0, 0]);

  return (
    <div className="relative isolate z-10 w-full overflow-hidden">
      <footer
        ref={footerRef}
        className="relative z-20 flex flex-col items-center px-6 md:px-10 text-center pt-10 pb-[62%] md:pb-[44%]"
      >
        <Reveal
          as="p"
          className="tracking-[0.3em] uppercase text-xs md:text-sm font-semibold"
          style={{
            color: "rgb(171, 122, 69)",
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          Abadiy baxtli hayot boshlanishi
        </Reveal>

        <Reveal
          as="h2"
          delay={0.05}
          className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[17px] sm:text-[19px] md:text-[22px] font-semibold uppercase tracking-[0.05em]"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          <span>{data?.groomName}</span>{" "}
          <span className="italic opacity-80 text-[rgb(171,122,69)]">
            &amp;
          </span>{" "}
          <span>{data?.brideName}</span>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto mt-4 h-[1.5px] w-28 origin-center"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(171, 122, 69, 0.7), transparent)",
          }}
          variants={{
            hidden: { opacity: 0, scaleX: 0 },
            visible: { opacity: 1, scaleX: 1 },
          }}
        />

        <Reveal
          as="p"
          delay={0.15}
          className="mt-4 italic text-sm md:text-base"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          {formatFooterDate(data?.date)}
        </Reveal>

        <Reveal
          as="p"
          delay={0.2}
          className="mt-2 text-xs md:text-sm opacity-80"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          {data?.familyNames}
        </Reveal>

      </footer>

      <motion.img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-15%] left-[-40.6%] z-0 h-auto w-[176.6%] max-w-none object-contain md:left-[-18%] md:w-[136%]"
        loading="eager"
        decoding="async"
        src="/images/palace-rose/castle.webp"
        style={{
          transformOrigin: "bottom center",
          willChange: "transform",
          scale: castleScale,
          y: castleY,
        }}
      />

      <div className="relative z-30 flex justify-center pb-5 pt-1">
        <a
          href="https://chorlove.uz"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-[rgb(171,122,69)]/40 bg-[#f7e3cd]/85 px-4 py-1.5 text-[11px] md:text-xs uppercase tracking-[0.35em] text-[rgb(100,14,27)] shadow-sm backdrop-blur-md transition-colors hover:bg-[#f7e3cd] hover:text-[rgb(171,122,69)]"
          style={{
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          chorlove.uz
        </a>
      </div>
    </div>
  );
}
