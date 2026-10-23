import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Copy, Check, X } from "lucide-react";
import Reveal from "./Reveal.jsx";

const SPARKS = [
  { style: { top: "8%", left: "14%" }, size: 22, delay: 0 },
  { style: { top: "18%", right: "10%" }, size: 16, delay: 0.3 },
  { style: { top: "32%", left: "5%" }, size: 14, delay: 0.7 },
  { style: { top: "26%", right: "5%" }, size: 14, delay: 1 },
];

const CONFETTI = [
  { left: "-5.5px", top: "-2.75px", width: 11, height: 5.5, color: "rgb(236, 72, 153)", radius: 2 },
  { left: "-5px", top: "-5px", width: 10, height: 10, color: "rgb(171, 122, 69)", radius: "50%" },
  { left: "-5.5px", top: "-2.75px", width: 11, height: 5.5, color: "rgb(34, 197, 94)", radius: 2 },
  { left: "-4.5px", top: "-4.5px", width: 9, height: 9, color: "rgb(59, 130, 246)", radius: "50%" },
  { left: "-6px", top: "-3px", width: 12, height: 6, color: "rgb(168, 85, 247)", radius: 2 },
  { left: "-5px", top: "-2.5px", width: 10, height: 5, color: "rgb(100, 14, 27)", radius: 2 },
  { left: "-4.5px", top: "-4.5px", width: 9, height: 9, color: "rgb(249, 115, 22)", radius: "50%" },
];

function formatCard(value = "") {
  return value.replace(/\s+/g, "").replace(/(.{4})/g, "$1 ").trim();
}

export default function Gift({ data }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyCard = async () => {
    try {
      await navigator.clipboard.writeText(data?.giftCardNumber || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative isolate z-10 w-full overflow-visible my-2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bg-contain bg-center bg-no-repeat -z-10 opacity-10 top-0 left-[-35.7%] mt-[-30.6%] w-[244%] md:w-[170%]"
        style={{
          aspectRatio: "1448 / 1086",
          backgroundImage: 'url("/images/palace-rose/castle2.webp")',
        }}
      />

      <section
        className="relative z-10 flex flex-col items-center justify-center py-8 px-[9%] pb-[6%] md:px-[14%]"
        style={{ backgroundColor: "transparent" }}
      >
        <Reveal
          as="h2"
          className="text-glint mb-4 font-bold text-[20px] md:text-[26px] uppercase tracking-[0.04em] flex flex-col items-center"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          <span dir="auto">To'yona</span>
        </Reveal>

        <Reveal delay={0.05}>
          <button
            type="button"
            aria-label="Open gift box"
            onClick={() => setOpen(true)}
            className="group relative cursor-pointer outline-none border-none bg-transparent transition-transform hover:scale-[1.03]"
            style={{ width: 260, height: 280 }}
          >
            <div className="relative w-full h-full flex items-end justify-center pb-[26px]">
              {SPARKS.map((spark, i) => (
                <motion.span
                  key={i}
                  className="absolute pointer-events-none z-20"
                  style={{
                    ...spark.style,
                    color: "rgb(171, 122, 69)",
                    fontSize: spark.size,
                  }}
                  animate={{ opacity: [1, 0.2, 1], scale: [1, 1.25, 1] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: spark.delay,
                  }}
                >
                  ✦
                </motion.span>
              ))}

              <div
                className="absolute pointer-events-none z-0"
                style={{ bottom: 187, left: "50%" }}
              >
                {CONFETTI.map((c, i) => (
                  <motion.div
                    key={i}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 0,
                      opacity: 0.7,
                      marginLeft: c.left,
                      marginTop: c.top,
                      width: c.width,
                      height: c.height,
                      backgroundColor: c.color,
                      borderRadius: c.radius,
                    }}
                    animate={{ y: [0, 6, 0], opacity: [0.7, 0.35, 0.7] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>

              <div className="relative" style={{ width: 200, height: 220 }}>
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: "50%",
                    bottom: -8,
                    width: 144,
                    height: 12,
                    marginLeft: -72,
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    filter: "blur(4px)",
                    zIndex: 0,
                  }}
                />
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute pointer-events-none"
                  src="/images/palace-rose/hoa_kho_orange.webp"
                  style={{
                    left: -20,
                    top: 10,
                    width: 34,
                    zIndex: 1,
                    transform: "rotate(-22deg)",
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 2px 3px)",
                  }}
                />
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute pointer-events-none"
                  src="/images/palace-rose/royal_red.webp"
                  style={{
                    left: 168,
                    top: 2,
                    width: 38,
                    zIndex: 1,
                    transform: "rotate(20deg)",
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 2px 3px)",
                  }}
                />
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute pointer-events-none"
                  src="/images/palace-rose/dragon_phoenix.webp"
                  style={{
                    left: -16,
                    top: 120,
                    width: 26,
                    zIndex: 1,
                    transform: "rotate(-18deg)",
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 2px 3px)",
                  }}
                />
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute pointer-events-none"
                  src="/images/palace-rose/dragon_phoenix_v2.webp"
                  style={{
                    left: 182,
                    top: 114,
                    width: 24,
                    zIndex: 1,
                    transform: "rotate(14deg)",
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 2px 3px)",
                  }}
                />
                <img
                  alt="Gift box"
                  loading="lazy"
                  decoding="async"
                  src="/images/palace-rose/mahal_gold.webp"
                  className="absolute pointer-events-none transition-transform duration-300 group-hover:scale-105"
                  style={{
                    left: "50%",
                    bottom: 0,
                    width: 170,
                    maxHeight: 220,
                    objectFit: "contain",
                    marginLeft: -85,
                    zIndex: 2,
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 10px 18px)",
                  }}
                />
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute pointer-events-none"
                  src="/images/palace-rose/glass_garden_pink.webp"
                  style={{
                    left: -8,
                    top: 172,
                    width: 44,
                    zIndex: 3,
                    transform: "rotate(8deg)",
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 2px 3px)",
                  }}
                />
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute pointer-events-none"
                  src="/images/palace-rose/chateau_green.webp"
                  style={{
                    left: 26,
                    top: 182,
                    width: 26,
                    zIndex: 3,
                    transform: "rotate(-10deg)",
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 2px 3px)",
                  }}
                />
                <img
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute pointer-events-none"
                  src="/images/palace-rose/double_dragon_green.webp"
                  style={{
                    left: 118,
                    top: 176,
                    width: 40,
                    zIndex: 3,
                    transform: "rotate(-14deg)",
                    filter: "drop-shadow(rgba(0,0,0,0.25) 0 2px 3px)",
                  }}
                />
              </div>
            </div>
            <p
              className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap font-medium tracking-wide"
              style={{
                color: "rgb(100, 14, 27)",
                fontFamily:
                  'Baskerville, "Libre Baskerville", "Times New Roman", serif',
              }}
            >
              <span dir="auto">Ochish uchun bosing</span>
            </p>
          </button>
        </Reveal>
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/55 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="To'yona"
              className="relative w-full max-w-[360px] overflow-hidden rounded-[22px] border p-6 md:p-7 text-center shadow-2xl"
              style={{
                borderColor: "rgba(171,122,69,0.45)",
                background:
                  "linear-gradient(160deg, #fdf5e9 0%, #f7e3cd 100%)",
                color: "rgb(100, 14, 27)",
              }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 12, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="/images/palace-rose/paper.webp"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Yopish"
                className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-[rgb(100,14,27)] transition-transform hover:scale-110"
              >
                <X size={16} />
              </button>

              <div className="relative z-10 flex flex-col items-center">
                <span className="text-2xl">🎁</span>
                <h3
                  className="text-glint mt-1 text-[20px] font-bold uppercase tracking-[0.06em]"
                  style={{
                    fontFamily:
                      '"Times New Roman", Times, "Baskerville", serif',
                  }}
                >
                  To'yona
                </h3>
                <img
                  src="/images/palace-rose/gold-line.webp"
                  alt=""
                  aria-hidden="true"
                  className="mt-2 w-32 opacity-80"
                />
                <p
                  className="mt-3 text-[12px] md:text-[13px] italic leading-relaxed"
                  style={{ color: "rgb(171, 122, 69)" }}
                >
                  {data?.giftText}
                </p>

                <div className="mt-4 w-full rounded-xl border border-[rgba(171,122,69,0.4)] bg-white/70 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Karta raqami
                  </p>
                  <p
                    className="mt-1 text-[17px] font-semibold tracking-[0.12em] tabular-nums"
                    style={{
                      fontFamily:
                        '"Times New Roman", Times, "Baskerville", serif',
                    }}
                  >
                    {formatCard(data?.giftCardNumber)}
                  </p>
                  <p className="mt-1 text-[12px] italic opacity-80">
                    {data?.giftCardOwner}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copyCard}
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold text-white transition-transform hover:scale-105"
                  style={{
                    backgroundColor: "rgb(100, 14, 27)",
                    fontFamily:
                      '"Times New Roman", Times, "Baskerville", serif',
                  }}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  <span>{copied ? "Nusxalandi" : "Kartani nusxalash"}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
