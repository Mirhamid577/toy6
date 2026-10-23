import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getCalendarData } from "../lib/date.js";

const FALLING_FLOWERS = [
  { left: "78.20%", color: "#f7e3cd", size: "11.55px", duration: 21.2, delay: 0.8 },
  { left: "51.15%", color: "#ab7a45", size: "11.04px", duration: 22.5, delay: 1.6 },
  { left: "22.93%", color: "#d8407a", size: "11.17px", duration: 19.7, delay: 0.4 },
  { left: "76.57%", color: "#d8407a", size: "23.75px", duration: 23, delay: 2.1 },
  { left: "65.43%", color: "#e0698f", size: "23.49px", duration: 23.4, delay: 1.2 },
  { left: "75.45%", color: "#ab7a45", size: "17.54px", duration: 20.8, delay: 2.8 },
  { left: "77.47%", color: "#e0698f", size: "17.38px", duration: 20.5, delay: 0.1 },
  { left: "9.69%", color: "#ab7a45", size: "21.35px", duration: 24.6, delay: 1.9 },
  { left: "52.04%", color: "#ab7a45", size: "16.96px", duration: 21.1, delay: 0.6 },
  { left: "47.53%", color: "#d8407a", size: "10.50px", duration: 23.8, delay: 2.4 },
  { left: "5.20%", color: "#d8407a", size: "13.82px", duration: 26, delay: 1.5 },
  { left: "86.98%", color: "#e0698f", size: "21.55px", duration: 22, delay: 0.3 },
];

const GATE_SPARKLES = [
  { left: "-11%", top: "4%", size: 16, delay: 0 },
  { left: "104%", top: "14%", size: 13, delay: 1.1 },
  { left: "-7%", top: "44%", size: 11, delay: 0.5 },
  { left: "106%", top: "48%", size: 18, delay: 1.7 },
  { left: "-9%", top: "90%", size: 19, delay: 2.2 },
  { left: "97%", top: "88%", size: 14, delay: 0.9 },
  { left: "8%", top: "-8%", size: 15, delay: 1.4 },
  { left: "88%", top: "-7%", size: 12, delay: 0.2 },
  { left: "46%", top: "107%", size: 17, delay: 1.9 },
];

function FlowerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em">
      <g>
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(120 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(180 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(240 12 12)" />
        <ellipse cx="12" cy="5" rx="2.2" ry="4.5" transform="rotate(300 12 12)" />
      </g>
      <circle cx="12" cy="12" r="1.8" fillOpacity="0.45" />
    </svg>
  );
}

export default function EntryGate({ data, isOpening, onOpen }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const calendar = data?.date ? getCalendarData(data.date) : null;
  const day = calendar ? calendar.day : "24";
  const month = calendar ? calendar.monthName : "Dekabr";
  const year = calendar ? calendar.year : "2026";
  const dateLabel = `${month} ${day}, ${year}`;

  const groom = data?.groomName?.trim() || "";
  const bride = data?.brideName?.trim() || "";

  return (
    <motion.div
      dir="ltr"
      data-landing-screenshot-id="invite-envelope"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, rgba(100,14,27,0.86), rgba(140,45,45,0.82), rgba(171,122,69,0.80)), url(/images/palace-rose/paper.webp) center / cover",
      }}
      initial={{ opacity: 1 }}
      animate={isOpening ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.45 * (isOpening ? 1 : 0) }}
    >
      <div
        style={{ zIndex: 20 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {mounted &&
          FALLING_FLOWERS.map((flower, index) => (
            <span
              key={index}
              className={`flower-fall pointer-events-none absolute ${
                isOpening ? "flower-fall--burst" : ""
              }`}
              style={{
                left: flower.left,
                color: flower.color,
                fontSize: flower.size,
                "--fall-duration": `${flower.duration}s`,
                "--fall-delay": `${flower.delay}s`,
              }}
            >
              <FlowerIcon />
            </span>
          ))}
      </div>

      <motion.div
        style={{ zIndex: 10 }}
        animate={
          isOpening
            ? { y: -35, scale: 1.08, opacity: 0 }
            : { y: 0, scale: 1, opacity: 1 }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="gate-bob relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-[12%] -inset-y-[10%] z-0"
          >
            {GATE_SPARKLES.map((s, i) => (
              <span
                key={i}
                className="twinkle absolute"
                style={{
                  left: s.left,
                  top: s.top,
                  fontSize: `${s.size}px`,
                  color: "#e6b978",
                  textShadow:
                    "0 0 6px rgba(255,232,190,0.85), 0 1px 2px rgba(88,28,18,0.5)",
                  animationDuration: `${2.4 + (i % 4) * 0.6}s`,
                  animationDelay: `${s.delay}s`,
                }}
              >
                {i % 2 ? "✧" : "✦"}
              </span>
            ))}
          </div>

          <div
            style={{
              top: "50px",
              width: "56px",
              height: "56px",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle at 30% 30%, #640e1b, rgb(70, 0, 0))",
              boxShadow:
                "0 4px 20px rgba(100, 14, 27, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)",
              zIndex: 30,
            }}
            onClick={onOpen}
            className="absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          >
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              <svg
                style={{ fill: "#ffffff" }}
                viewBox="0 0 24 24"
                className="w-7 h-7"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
            {[0, 1.4].map((delay) => (
              <motion.span
                key={delay}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border border-[#e6b978]"
                animate={{ scale: [1, 1.95], opacity: [0.55, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay,
                }}
              />
            ))}
          </div>

          <div
            style={{
              boxShadow:
                "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(171, 122, 69, 0.15)",
            }}
            className="relative rounded-lg"
          >
            <div
              style={{
                background: "rgba(247, 227, 205, 0.98)",
                border: "1px solid rgba(171, 122, 69, 0.25)",
              }}
              className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: 'url("/images/palace-rose/paper.webp")',
                  backgroundSize: "100% auto",
                  backgroundRepeat: "repeat-y",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none bg-contain bg-center bg-no-repeat opacity-[0.14] mix-blend-multiply"
                style={{
                  backgroundImage: 'url("/images/palace-rose/castle2.webp")',
                  backgroundPosition: "center 72%",
                  backgroundSize: "130% auto",
                }}
              />
            </div>

            <div className="absolute pointer-events-none z-0 top-0 left-0 w-[58%] sm:w-[50%] md:w-[44%] max-w-[280px] -translate-x-[22%] -translate-y-[24%]">
              <motion.div
                style={{ transformOrigin: "20% 20%" }}
                animate={{ rotate: [0, 2.8, -2.2, 1.4, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="/images/palace-rose/flower1.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto -scale-x-100"
                />
              </motion.div>
            </div>

            <div className="absolute pointer-events-none z-0 bottom-0 right-0 w-[58%] sm:w-[50%] md:w-[44%] max-w-[280px] translate-x-[20%] translate-y-[18%]">
              <motion.div
                style={{ transformOrigin: "80% 80%" }}
                animate={{ rotate: [0, -2.8, 2.2, -1.4, 0] }}
                transition={{
                  duration: 6.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7,
                }}
              >
                <img
                  src="/images/palace-rose/flower1.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-auto -scale-y-100"
                />
              </motion.div>
            </div>

            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
              <div className="mb-2">
                <p
                  style={{
                    color: "rgba(100, 14, 27, 0.72)",
                    fontFamily:
                      'Baskerville, "Libre Baskerville", "Times New Roman", serif',
                  }}
                  className="text-[14px] sm:text-[15px] italic mb-1"
                >
                  <span dir="auto">Assalomu alaykum, aziz mehmon</span>
                </p>
              </div>

              <h1
                style={{
                  color: "#640e1b",
                  fontFamily:
                    '"Times New Roman", Times, "Baskerville", serif',
                }}
                className="mb-2 flex flex-col items-center leading-tight text-xl sm:text-2xl md:text-3xl uppercase tracking-[0.04em] font-semibold"
              >
                {groom && (
                  <span
                    style={{
                      fontFamily:
                        '"Times New Roman", Times, "Baskerville", serif',
                    }}
                    className="block w-full text-center"
                  >
                    {groom}
                  </span>
                )}
                {groom && bride && (
                  <span
                    style={{ color: "#ab7a45" }}
                    className="block w-full text-center text-sm sm:text-base italic my-0.5"
                  >
                    &amp;
                  </span>
                )}
                {bride && (
                  <span
                    style={{
                      fontFamily:
                        '"Times New Roman", Times, "Baskerville", serif',
                    }}
                    className="block w-full text-center"
                  >
                    {bride}
                  </span>
                )}
              </h1>

              <div className="flex items-center justify-center gap-3 mb-2">
                <div
                  style={{
                    background: "linear-gradient(to right, transparent, #ab7a45)",
                  }}
                  className="w-8 h-px"
                />
                <span
                  style={{ color: "#ab7a45", opacity: "0.7" }}
                  className="text-xs"
                >
                  ❦
                </span>
                <div
                  style={{
                    background: "linear-gradient(to left, transparent, #ab7a45)",
                  }}
                  className="w-8 h-px"
                />
              </div>

              <div
                style={{
                  color: "rgb(171, 122, 69)",
                  fontFamily:
                    'Baskerville, "Libre Baskerville", "Times New Roman", serif',
                }}
                className="text-[13px] sm:text-[14px] italic mb-5 flex flex-col items-center"
              >
                <span dir="auto">{dateLabel}</span>
              </div>

              <button
                type="button"
                onClick={onOpen}
                disabled={isOpening}
                style={{
                  backgroundColor: "#640e1b",
                  color: "#ffffff",
                  boxShadow: "0 4px 14px rgba(100, 14, 27, 0.3)",
                  fontFamily:
                    '"Times New Roman", Times, "Baskerville", serif',
                  WebkitTouchCallout: "none",
                  WebkitUserSelect: "none",
                  userSelect: "none",
                }}
                className="relative px-6 py-2 text-xs sm:text-sm font-semibold rounded-full shadow-md no-underline cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden active:scale-95 transition-transform uppercase tracking-wider"
              >
                <span dir="auto">Taklifnomani ochish</span>
                <motion.div
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  }}
                  className="absolute top-0 h-full w-8 pointer-events-none"
                  animate={{ x: [-100, 260] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
