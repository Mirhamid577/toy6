import { MapPin, Navigation } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function Venue({ data }) {
  return (
    <div className="relative isolate z-10 w-full pt-[9%] md:pt-[5%]">
      <div className="relative z-10 flex w-full flex-col items-center">
        <section
          className="relative flex w-full flex-col items-center gap-3 px-[6%] sm:px-[10%] pb-6 md:px-[14%]"
          data-landing-screenshot-id="invite-map"
        >
          <Reveal
            as="p"
            className="tracking-[0.25em] uppercase text-[11px] md:text-[12px] font-semibold text-center"
            style={{
              color: "rgb(171, 122, 69)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            To'y manzili
          </Reveal>

          <Reveal
            as="h2"
            delay={0.05}
            className="text-glint font-bold text-[18px] sm:text-[22px] md:text-[26px] text-center uppercase tracking-[0.04em]"
            style={{
              color: "rgb(100, 14, 27)",
              fontFamily:
                '"Times New Roman", Times, "Baskerville", serif',
            }}
          >
            <span dir="auto">To'yxona</span>
          </Reveal>

          <Reveal
            delay={0.1}
            className="whitespace-pre-line mx-auto mt-1 max-w-[280px] sm:max-w-[360px] md:max-w-[460px] text-center text-[12px] md:text-[14px] flex flex-col items-center"
            style={{
              backgroundColor: "transparent",
              color: "rgb(171, 122, 69)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            <span dir="auto">
              {data?.locationName} — {data?.address}
            </span>
          </Reveal>

          <div className="mt-6 w-full max-w-[440px] md:max-w-[720px] flex flex-col gap-6 md:gap-8">
            <Reveal
              delay={0.15}
              className="flex flex-col rounded-[20px] border border-[rgb(171,122,69)]/35 bg-white/60 p-4 sm:p-5 md:p-6 backdrop-blur-md shadow-sm"
            >
              <div className="overflow-hidden rounded-[15px] border border-[rgb(171,122,69)]/25 bg-white/40 max-h-[240px] md:max-h-[300px]">
                <img
                  src={data?.venueImage}
                  alt={`${data?.locationName} — wedding venue`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  decoding="async"
                />
              </div>
              <div className="mt-4 sm:mt-5 flex flex-col items-center text-center">
                <h3
                  className="text-glint text-[18px] sm:text-[22px] md:text-[24px] font-bold uppercase tracking-[0.04em]"
                  style={{
                    color: "rgb(100, 14, 27)",
                    fontFamily:
                      '"Times New Roman", Times, "Baskerville", serif',
                  }}
                >
                  {data?.locationName}
                </h3>
                <div
                  className="mt-2 flex items-center justify-center gap-2 text-[12px] sm:text-[13px] md:text-[14px]"
                  style={{
                    color: "rgb(171, 122, 69)",
                    fontFamily:
                      'Baskerville, "Libre Baskerville", "Times New Roman", serif',
                  }}
                >
                  <MapPin
                    size={16}
                    strokeWidth={2}
                    className="shrink-0 text-[rgb(171,122,69)]"
                    aria-hidden="true"
                  />
                  <span>{data?.address}</span>
                </div>
                <div className="mt-5">
                  <a
                    href={data?.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-[13px] md:text-[14px] font-medium tracking-wider text-white transition-transform hover:scale-[1.03] shadow-sm"
                    style={{
                      backgroundColor: "rgb(100, 14, 27)",
                      fontFamily:
                        'Baskerville, "Libre Baskerville", "Times New Roman", serif',
                    }}
                  >
                    <Navigation size={15} strokeWidth={1.8} aria-hidden="true" />
                    <span>Xaritada ko'rish</span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal
              delay={0.2}
              className="relative flex flex-col items-center gap-4 md:gap-5 w-full"
            >
              <div
                className="relative w-full rounded-[15px] overflow-hidden shadow-sm"
                style={{ border: "1px solid rgb(171, 122, 69)" }}
              >
                <iframe
                  title="Map to the venue"
                  src={data?.mapEmbed}
                  className="w-full h-[250px] md:h-[330px] border-0 block"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-4">
                  <div className="pointer-events-auto rounded-xl border border-[rgb(171,122,69)]/40 bg-white/90 px-4 py-1.5 text-center backdrop-blur-md shadow-sm">
                    <p
                      className="text-[12px] md:text-[13px] font-semibold text-[rgb(100,14,27)]"
                      style={{
                        fontFamily:
                          '"Times New Roman", Times, "Baskerville", serif',
                      }}
                    >
                      {data?.locationName}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <Reveal
          delay={0.1}
          className="mx-auto block h-auto max-w-[300px] object-contain w-[53.7%] mt-4 md:mt-6"
        >
          <img
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-contain"
            loading="lazy"
            decoding="async"
            src="/images/palace-rose/gold-line.webp"
          />
        </Reveal>
      </div>
    </div>
  );
}
