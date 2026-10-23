import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { CalendarDays, CalendarPlus, Clock } from "lucide-react";
import Reveal from "./Reveal.jsx";
import { useSectionProgress } from "../lib/useSectionProgress.js";
import {
  CALENDAR_WEEKDAYS,
  MONTHS,
  buildMonthGrid,
  getCalendarData,
  getCountdown,
  googleCalendarUrl,
  parseDateTime,
} from "../lib/date.js";

function HeartDay({ day }) {
  return (
    <div className="relative w-[24px] h-[22px] sm:w-[28px] sm:h-[26px] flex items-center justify-center">
      <svg
        viewBox="0 0 24 22"
        className="absolute inset-0 w-full h-full drop-shadow-sm"
        fill="#640e1b"
      >
        <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
      </svg>
      <span className="relative z-10 text-[10.5px] sm:text-[11px] md:text-[12px] font-bold text-white">
        {day}
      </span>
    </div>
  );
}

export default function SaveDate({ data }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef, "generic");
  const rightY = useTransform(progress, [0, 1], [-85, 105]);
  const leftY = useTransform(progress, [0, 1], [105, -85]);

  const calendar = getCalendarData(data?.date);
  const { year, month, day, weekday, monthName } = calendar;
  const cells = buildMonthGrid(year, month);
  const [countdown, setCountdown] = useState(() => getCountdown(parseDateTime(data?.date, data?.time)));

  useEffect(() => {
    const target = parseDateTime(data?.date, data?.time);
    const id = setInterval(() => setCountdown(getCountdown(target)), 1000);
    return () => clearInterval(id);
  }, [data?.date, data?.time]);

  const pad = (n) => String(n).padStart(2, "0");
  const calendarUrl = googleCalendarUrl(data);

  const countdownUnits = [
    { value: countdown.days, label: "Kun" },
    { value: countdown.hours, label: "Soat" },
    { value: countdown.minutes, label: "Daqiqa" },
    { value: countdown.seconds, label: "Soniya" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate z-10 w-full px-[8%] pt-[13%] pb-12 md:px-[12%] md:pt-[9%]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bg-contain bg-center bg-no-repeat -z-10 opacity-10 top-0 left-[-103.2%] mt-[71.7%] w-[244%] md:w-[170%]"
        style={{
          aspectRatio: "1448 / 1086",
          backgroundImage: 'url("/images/palace-rose/castle2.webp")',
          transform: "scaleX(-1)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bg-contain bg-center bg-no-repeat top-0 left-[6.1%] mt-[-5.9%] z-[1] w-[87.5%]"
        style={{
          aspectRatio: "1302 / 253",
          backgroundImage: 'url("/images/palace-rose/pattern.webp")',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[16%] sm:top-[18%] md:top-[20%] right-[-15%] sm:right-[-11%] md:right-[-7%] z-[1] w-[46%] sm:w-[38%] md:w-[30%] max-w-[200px]"
        style={{
          aspectRatio: "837 / 1843",
          backgroundImage:
            'url("/images/palace-rose/sandstone-flower.webp")',
          y: rightY,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[62%] sm:top-[64%] md:top-[66%] left-[-20%] sm:left-[-15%] md:left-[-10%] z-[1] w-[44%] sm:w-[36%] md:w-[28%] max-w-[190px]"
        style={{ aspectRatio: "806 / 1254", y: leftY }}
      >
        <div
          className="w-full h-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("/images/palace-rose/flower3-decoration.webp")',
            transform: "scaleX(-1)",
            transformOrigin: "20% 90%",
          }}
        />
      </motion.div>

      <div className="relative z-10 flex w-full flex-col items-center">
        <Reveal
          as="h2"
          className="text-glint font-bold text-[20px] md:text-[26px] text-center uppercase tracking-[0.04em]"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          <span dir="auto">Sanamizni eslab qoling</span>
        </Reveal>

        <Reveal
          as="p"
          delay={0.05}
          className="mt-2 text-[13px] md:text-[15px] italic text-center max-w-md"
          style={{
            color: "rgb(171, 122, 69)",
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          Bu kunni kalendaringizda belgilab qo'ying — sizni kutamiz.
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-6 flex flex-col items-center rounded-2xl border border-[rgba(171,122,69,0.3)] bg-[rgba(247,227,205,0.45)] backdrop-blur-sm p-5 md:p-7 shadow-sm w-full max-w-[320px] md:max-w-[380px]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[rgba(171,122,69,0.15)] text-[rgb(100,14,27)]">
            <CalendarDays size={22} strokeWidth={1.5} aria-hidden="true" />
          </span>
          <p
            className="mt-3 tracking-[0.25em] uppercase text-[12px] md:text-[13px] font-medium"
            style={{
              color: "rgb(171, 122, 69)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            {weekday}
          </p>
          <p
            className="mt-1 text-[50px] md:text-[62px] leading-none font-bold"
            style={{
              color: "rgb(100, 14, 27)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            {day}
          </p>
          <p
            className="mt-1 tracking-[0.18em] uppercase text-[13px] md:text-[15px] font-medium"
            style={{
              color: "rgb(100, 14, 27)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            {monthName} {year}
          </p>
          <div className="my-4 h-px w-20 bg-gradient-to-r from-transparent via-[rgb(171,122,69)] to-transparent opacity-60" />
          <div className="flex items-center justify-center gap-2 text-[rgb(100,14,27)]">
            <Clock size={17} strokeWidth={1.6} aria-hidden="true" />
            <span
              className="text-[16px] md:text-[18px] font-medium tracking-wide"
              style={{
                color: "rgb(100, 14, 27)",
                fontFamily:
                  'Baskerville, "Libre Baskerville", "Times New Roman", serif',
              }}
            >
              {data?.time}
            </span>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative mx-auto mt-6 w-full max-w-[415px] sm:max-w-[435px] md:mt-8 md:max-w-[470px]"
          style={{ aspectRatio: "359 / 339" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 sm:inset-0 bg-contain bg-center bg-no-repeat scale-[1.12] sm:scale-100 transition-transform"
            style={{
              backgroundImage:
                'url("/images/palace-rose/calendar-frame.webp")',
            }}
          />
          <div className="relative flex h-full w-full items-center justify-center px-[8%] py-[6%] sm:px-[10%] sm:py-[8%]">
            <div
              dir="ltr"
              className="w-full max-w-[340px] sm:max-w-[360px] md:max-w-[390px] mx-auto rounded-lg overflow-hidden border-0"
              style={{ color: "rgb(100, 14, 27)" }}
            >
              <div
                className="text-center py-1.5 sm:py-2 text-[13px] sm:text-[15px] md:text-[16px] font-bold tracking-wide border-b"
                style={{
                  borderColor:
                    "color-mix(in srgb, rgb(100, 14, 27) 27%, transparent)",
                  fontFamily:
                    '"Times New Roman", Times, "Baskerville", serif',
                  color: "rgb(100, 14, 27)",
                }}
              >
                {MONTHS[month]} {year}
              </div>
              <div
                className="grid grid-cols-7 border-b-2"
                style={{ borderColor: "rgb(100, 14, 27)" }}
              >
                {CALENDAR_WEEKDAYS.map((d) => (
                  <div
                    key={d}
                    className="text-center py-1 text-[9.5px] sm:text-[10.5px] md:text-[11px] font-medium opacity-60"
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-0.5 px-0.5 py-1 sm:px-1 sm:py-1.5">
                {cells.map((cell, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center h-[26px] sm:h-[30px] md:h-[34px]"
                  >
                    {cell ? (
                      cell === day ? (
                        <HeartDay day={cell} />
                      ) : (
                        <span className="text-[11px] sm:text-[12px] md:text-[13px]">
                          {cell}
                        </span>
                      )
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-3 flex justify-center">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(171,122,69,0.4)] bg-[rgba(247,227,205,0.6)] px-5 py-2 text-xs md:text-sm font-medium text-[rgb(100,14,27)] backdrop-blur-sm transition-all hover:bg-[rgba(247,227,205,0.9)] hover:scale-105 shadow-sm"
            style={{
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            <CalendarPlus size={16} aria-hidden="true" />
            <span>Kalendariga qo'shish</span>
          </a>
        </Reveal>

        <Reveal delay={0.25} className="mt-7 w-full flex flex-col items-center">
          <p
            className="tracking-[0.25em] uppercase font-bold text-[13px] md:text-[15px]"
            style={{
              color: "rgb(171, 122, 69)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            Eng baxtli kungacha
          </p>
          <div className="mt-4 flex items-stretch justify-center gap-2.5 sm:gap-4">
            {countdownUnits.map((unit, i) => (
              <Reveal
                key={unit.label}
                delay={0.3 + i * 0.05}
                amount={0.1}
                className="flex min-w-[60px] sm:min-w-[76px] flex-col items-center rounded-xl border border-[rgba(171,122,69,0.3)] bg-[rgba(247,227,205,0.45)] backdrop-blur-sm px-2.5 py-2.5 sm:px-3.5 sm:py-3.5 shadow-sm"
              >
                <span
                  className="tabular-nums font-bold text-[20px] sm:text-[28px] leading-none"
                  style={{
                    color: "rgb(100, 14, 27)",
                    fontFamily:
                      'Baskerville, "Libre Baskerville", "Times New Roman", serif',
                  }}
                >
                  {pad(unit.value)}
                </span>
                <span
                  className="mt-1.5 tracking-[0.18em] uppercase text-[9px] sm:text-[10px] font-medium"
                  style={{
                    color: "rgb(171, 122, 69)",
                    fontFamily:
                      'Baskerville, "Libre Baskerville", "Times New Roman", serif',
                  }}
                >
                  {unit.label}
                </span>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
