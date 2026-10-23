import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import Reveal from "./Reveal.jsx";
import { useSectionProgress } from "../lib/useSectionProgress.js";

const MEDALLIONS = {
  1: { src: "/images/palace-rose/medallion-coming.webp", height: 52 },
  2: { src: "/images/palace-rose/medallion-gift.webp", height: 53 },
  3: { src: "/images/palace-rose/medallion-cake.webp", height: 54 },
};

const timeVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0 },
};

const textVariants = {
  hidden: { opacity: 0, x: 14 },
  visible: { opacity: 1, x: 0 },
};

const dotVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

export default function Program({ data }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef, "generic");
  const flowerY = useTransform(progress, [0, 1], [-40, 10]);
  const castleY = useTransform(progress, [0, 1], [-20, 0]);

  const schedule = data?.schedule || [];
  const line = "color-mix(in srgb, rgb(100, 14, 27) 40%, transparent)";

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-10 w-full overflow-visible my-2"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bg-contain bg-center bg-no-repeat -z-10 opacity-10 top-0 left-[-133.1%] mt-[-53.3%] w-[244%] md:w-[170%]"
        style={{
          aspectRatio: "1448 / 1086",
          backgroundImage: 'url("/images/palace-rose/castle2.webp")',
          y: castleY,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bg-contain bg-center bg-no-repeat top-0 left-[76%] sm:left-[80%] mt-[-20.6%] z-[1] w-[52.4%] md:w-[40%] max-w-[220px]"
        style={{
          aspectRatio: "806 / 1254",
          backgroundImage:
            'url("/images/palace-rose/flower3-decoration.webp")',
          y: flowerY,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4 px-4 pt-[8%] pb-[8%] md:gap-6 md:pt-[5%] md:pb-[5%]">
        <Reveal
          as="h2"
          className="text-glint font-bold text-[20px] md:text-[26px] text-center uppercase tracking-[0.04em]"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          <span dir="auto">To'y Dasturi</span>
        </Reveal>

        <ol
          className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
          style={{
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          {schedule.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === schedule.length - 1;
            const medallion = MEDALLIONS[index];

            return (
              <li key={`${item.time}-${index}`} className="contents">
                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={timeVariants}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                  style={{
                    color: "rgb(171, 122, 69)",
                    fontFamily:
                      '"Times New Roman", Times, "Baskerville", serif',
                  }}
                >
                  <span className="relative inline-block">
                    {medallion && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 flex items-center justify-center -translate-y-1/2 right-full mr-3 sm:mr-5 md:mr-[39px]"
                      >
                        <span
                          aria-hidden="true"
                          className="relative z-10 block shrink-0 bg-contain bg-center bg-no-repeat transition-transform hover:scale-110"
                          style={{
                            width: 40,
                            height: medallion.height,
                            backgroundImage: `url("${medallion.src}")`,
                          }}
                        />
                      </span>
                    )}
                    {item.time}
                  </span>
                </motion.span>

                <span
                  aria-hidden="true"
                  className="relative flex items-center justify-center self-stretch"
                >
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 w-px ${
                      isFirst
                        ? "top-1/2 -bottom-8 md:-bottom-10"
                        : isLast
                          ? "-top-8 md:-top-10 bottom-1/2"
                          : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"
                    }`}
                    style={{ backgroundColor: line }}
                  />
                  <motion.span
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={dotVariants}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                    className="relative block h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: "rgb(100, 14, 27)",
                      boxShadow:
                        "color-mix(in srgb, rgb(100, 14, 27) 13%, transparent) 0 0 0 2px",
                    }}
                  />
                </span>

                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={textVariants}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                  className="text-[13px] md:text-[16px] leading-snug"
                  style={{
                    color: "rgb(171, 122, 69)",
                    fontFamily:
                      '"Times New Roman", Times, "Baskerville", serif',
                  }}
                >
                  <span dir="auto">{item.title}</span>
                </motion.span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
