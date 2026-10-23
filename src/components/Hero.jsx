import { useRef } from "react";
import { motion, useTransform } from "framer-motion";
import { useSectionProgress } from "../lib/useSectionProgress.js";

export default function Hero({ data }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef, "hero");

  const archScale = useTransform(progress, [0, 1], [1, 0.76]);
  const sandstoneScale = useTransform(progress, [0, 1], [1, 1.38]);
  const castleScale = useTransform(progress, [0, 1], [1, 1.28]);
  const fenceScale = useTransform(progress, [0, 1], [1, 1.38]);

  const groom = data?.groomName?.trim() || "";
  const bride = data?.brideName?.trim() || "";

  return (
    <section
      ref={sectionRef}
      dir="ltr"
      id="hero"
      className="relative isolate w-full overflow-hidden pt-[13.2%] pb-[16.6%]"
    >
      <div className="relative mx-auto w-full max-w-[480px] md:max-w-[680px]">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bg-contain bg-center bg-no-repeat top-0 left-[1.4%] mt-[-17.9%] z-[2] w-[32.7%]"
          style={{
            aspectRatio: "1086 / 1448",
            backgroundImage: 'url("/images/palace-rose/bells.webp")',
            transformOrigin: "35% 0%",
          }}
          animate={{ rotate: [-3.8, 3.8, -3.8] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bg-contain bg-center bg-no-repeat top-0 md:top-[-5%] left-[40.6%] mt-[-17.5%] z-[3] w-[77.1%] md:w-[90%]"
          style={{
            aspectRatio: "1 / 1",
            backgroundImage: 'url("/images/palace-rose/flower1.webp")',
            transformOrigin: "70% 15%",
          }}
          animate={{
            rotate: [0, 2.2, -1.8, 1.2, 0],
            scale: [1, 1.015, 0.995, 1.01, 1],
          }}
          transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="relative mx-auto w-[96.1%]"
          style={{ aspectRatio: "424 / 529" }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-contain bg-center bg-no-repeat opacity-[0.54]"
            style={{
              backgroundImage: 'url("/images/palace-rose/arch-frame.webp")',
              scale: archScale,
              transformOrigin: "50% 45%",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-1/2 top-[43.9%] z-20 flex w-[68%] -translate-x-1/2 flex-col items-center gap-[1.2%] text-center leading-[1.15]"
          >
            {groom && (
              <div className="w-full">
                <span
                  className="inline-block"
                  style={{
                    fontFamily:
                      '"The Nautigal", "Alex Brush", "Fz Qellia", cursive',
                    color: "rgb(100, 14, 27)",
                    fontSize: "clamp(30px, 12.5vw, 85px)",
                  }}
                >
                  {groom}
                </span>
              </div>
            )}
            {groom && bride && (
              <span
                className="block"
                style={{
                  fontFamily:
                    '"Alex Brush", "The Nautigal", "Fz Qellia", cursive',
                  color: "rgb(100, 14, 27)",
                  fontSize: "clamp(18px, 6.8vw, 47px)",
                }}
              >
                &amp;
              </span>
            )}
            {bride && (
              <div className="w-full">
                <span
                  className="inline-block"
                  style={{
                    fontFamily:
                      '"The Nautigal", "Alex Brush", "Fz Qellia", cursive',
                    color: "rgb(100, 14, 27)",
                    fontSize: "clamp(30px, 12.5vw, 85px)",
                  }}
                >
                  {bride}
                </span>
              </div>
            )}
          </motion.div>
        </div>

        <div
          className="relative z-0 mt-[-59.6%] w-full"
          style={{ aspectRatio: "441 / 546" }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bg-contain bg-center bg-no-repeat left-[74.8%] top-0 z-[2] w-[55.8%]"
            style={{
              aspectRatio: "808 / 1402",
              backgroundImage: 'url("/images/palace-rose/sandstone.webp")',
              scale: sandstoneScale,
              transformOrigin: "80% 40%",
            }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bg-contain bg-center bg-no-repeat left-[-25.9%] top-[13.4%] z-[1] w-[176.6%]"
            style={{
              aspectRatio: "1635 / 962",
              backgroundImage: 'url("/images/palace-rose/castle.webp")',
              scale: castleScale,
              transformOrigin: "left bottom",
            }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bg-contain bg-center bg-no-repeat left-[54.6%] md:left-[70%] top-[60.6%] z-[4] w-[47.6%]"
            style={{
              aspectRatio: "1 / 1",
              backgroundImage: 'url("/images/palace-rose/flower2.webp")',
              transformOrigin: "50% 90%",
            }}
            animate={{ rotate: [0, 2.8, -2.2, 1.5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bg-contain bg-center bg-no-repeat right-[54.6%] md:right-[70%] top-[60.6%] z-[4] w-[47.6%]"
            style={{
              aspectRatio: "1 / 1",
              backgroundImage: 'url("/images/palace-rose/flower2.webp")',
              transformOrigin: "50% 90%",
            }}
            animate={{
              scaleX: -1,
              rotate: [0, -2.8, 2.2, -1.5, 0],
            }}
            transition={{
              rotate: {
                duration: 5.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              },
            }}
          />

          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bg-contain bg-center bg-no-repeat left-1/2 top-[75.5%] z-[3] w-[58.5%]"
            style={{
              aspectRatio: "1774 / 887",
              backgroundImage: 'url("/images/palace-rose/fence.webp")',
              x: "-50%",
              scale: fenceScale,
              transformOrigin: "50% 100%",
            }}
          />
        </div>
      </div>
    </section>
  );
}
