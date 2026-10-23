import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { useSectionProgress } from "../lib/useSectionProgress.js";
import { invitationDateLabel } from "../lib/date.js";

export default function Invitation({ data }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef, "generic");

  const leftY = useTransform(progress, [0, 1], [-85, 105]);
  const rightY = useTransform(progress, [0, 1], [105, -85]);

  const groom = data?.groomName?.trim() || "";
  const bride = data?.brideName?.trim() || "";
  const dateLabel = invitationDateLabel(data);

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-10 w-full px-[8.5%] pt-[5.2%] pb-10 md:px-[12%] md:pt-[5.2%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bg-contain bg-center bg-no-repeat -z-10 opacity-10 top-0 left-[-18.8%] mt-[12%] w-[244%] md:w-[170%]"
        style={{
          aspectRatio: "1448 / 1086",
          backgroundImage: 'url("/images/palace-rose/castle2.webp")',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bg-contain bg-center bg-no-repeat top-0 left-[6.1%] mt-[-9.5%] z-[1] w-[87.5%]"
        style={{
          aspectRatio: "1302 / 253",
          backgroundImage: 'url("/images/palace-rose/pattern.webp")',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-22%] sm:left-[-17%] md:left-[-12%] top-[8%] z-[1] w-[44%] sm:w-[38%] md:w-[30%] max-w-[215px]"
        style={{
          aspectRatio: "837 / 1843",
          backgroundImage: 'url("/images/palace-rose/sandstone-flower.webp")',
          y: leftY,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] sm:right-[-11%] md:right-[-7%] top-[38%] z-[1] w-[42%] sm:w-[36%] md:w-[28%] max-w-[195px]"
        style={{
          aspectRatio: "806 / 1254",
          y: rightY,
        }}
      >
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("/images/palace-rose/flower3-decoration.webp")',
            transformOrigin: "80% 90%",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center px-2 py-2 md:py-4 max-w-[540px] mx-auto">
        <Reveal
          as="p"
          className="tracking-[0.35em] uppercase font-bold text-[14px] md:text-[16px]"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          NIKOH TO'YI
        </Reveal>

        <Reveal
          as="p"
          delay={0.05}
          className="mt-6 tracking-[0.25em] uppercase text-[11px] md:text-[12px]"
          style={{
            color: "rgb(171, 122, 69)",
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          Kuyov &amp; Kelin
        </Reveal>

        <Reveal
          as="h2"
          delay={0.1}
          className="text-glint mt-3 break-words text-[36px] md:text-[50px] leading-tight font-light"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily: '"EB Garamond", "Fz Qellia", serif',
          }}
        >
          {groom}
        </Reveal>

        <Reveal
          as="p"
          delay={0.15}
          className="my-1 text-[26px] md:text-[34px] italic"
          style={{
            color: "rgb(171, 122, 69)",
            fontFamily: '"EB Garamond", serif',
          }}
        >
          &amp;
        </Reveal>

        <Reveal
          as="h2"
          delay={0.2}
          className="text-glint break-words text-[36px] md:text-[50px] leading-tight font-light"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily: '"EB Garamond", "Fz Qellia", serif',
          }}
        >
          {bride}
        </Reveal>

        <Reveal delay={0.25} className="mt-8 flex flex-col items-center">
          <p
            className="tracking-[0.25em] uppercase text-[11px] md:text-[12px]"
            style={{
              color: "rgb(171, 122, 69)",
              fontFamily:
                '"Times New Roman", Times, "Baskerville", serif',
            }}
          >
            Vaqt
          </p>
          <p
            className="mt-2 tracking-[0.1em] text-[15px] md:text-[18px] font-medium"
            style={{
              color: "rgb(100, 14, 27)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            {dateLabel}
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-8 w-full flex justify-center">
          <img
            alt=""
            aria-hidden="true"
            className="block h-auto max-w-[260px] object-contain w-[55%]"
            loading="lazy"
            decoding="async"
            src="/images/palace-rose/gold-line.webp"
          />
        </Reveal>

        <Reveal
          as="p"
          delay={0.35}
          className="mx-auto mt-6 max-w-md italic text-[15px] md:text-[18px] leading-relaxed"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          {data?.message}
        </Reveal>

        <Reveal delay={0.4} className="mt-6 w-full flex justify-center">
          <img
            alt=""
            aria-hidden="true"
            className="block h-auto max-w-[260px] object-contain w-[55%]"
            loading="lazy"
            decoding="async"
            src="/images/palace-rose/gold-line.webp"
          />
        </Reveal>

        <Reveal delay={0.45} className="mt-8">
          <p
            className="tracking-[0.2em] uppercase text-[11px] md:text-[12px]"
            style={{
              color: "rgb(171, 122, 69)",
              fontFamily:
                '"Times New Roman", Times, "Baskerville", serif',
            }}
          >
            Hurmat bilan:
          </p>
          <p
            className="mt-2 text-[18px] md:text-[22px] font-semibold"
            style={{
              color: "rgb(100, 14, 27)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            {data?.familyNames}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
