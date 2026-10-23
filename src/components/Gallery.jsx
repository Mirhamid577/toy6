import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useAnimationFrame } from "framer-motion";

function Chevron({ direction = "left" }) {
  return (
    <svg className="w-[35%] h-[35%]" viewBox="0 0 532 532" aria-hidden="true">
      <path
        fill="currentColor"
        d={
          direction === "left"
            ? "M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            : "M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
        }
      />
    </svg>
  );
}

export default function Gallery({ data }) {
  const images = data?.galleryImages?.length ? data.galleryImages : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: images.length > 1,
      align: "center",
      containScroll: false,
    },
    [Autoplay({ delay: 2000, stopOnInteraction: false })]
  );

  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const slideRefs = useRef([]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useAnimationFrame(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = engine.scrollProgress.get(emblaApi.scrollProgress());
    const snapCount = emblaApi.scrollSnapList().length;
    if (!snapCount) return;
    const current = scrollProgress * (snapCount - 1);
    const n = images.length;

    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      let diff = i - current;
      if (n > 1) {
        diff = ((diff + n / 2) % n + n) % n - n / 2;
      }
      const t = Math.min(1, Math.abs(diff));
      const dir = diff >= 0 ? 1 : -1;
      el.style.transform = `translateX(${dir * t * 8}%) scale(${1 - 0.3 * t})`;
    });
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!images.length) return null;

  return (
    <section className="relative isolate z-10 w-full pt-[7%] pb-[10.9%] md:pt-[4%] md:pb-[7%]">
      <div className="relative z-10 flex flex-col items-center w-full pb-4 overflow-visible">
        <h2
          className="text-glint font-bold text-[20px] md:text-[26px] text-center uppercase tracking-[0.04em] mb-5 px-4"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily: '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          <span dir="auto">Foto galereya</span>
        </h2>

        <div className="relative z-10 mt-3 w-full overflow-visible">
          <div className="py-4 -my-4 w-full">
            <div
              className="overflow-hidden touch-pan-y w-full"
              ref={emblaRef}
            >
              <div className="flex">
                {images.map((src, i) => (
                  <div
                    key={src + i}
                    className="flex-[0_0_60%] sm:flex-[0_0_54%] md:flex-[0_0_46%] min-w-0 px-1 sm:px-1.5"
                  >
                    <div
                      ref={(el) => {
                        slideRefs.current[i] = el;
                      }}
                      className="embla__slide__card relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl cursor-pointer select-none"
                      style={{ backfaceVisibility: "hidden" }}
                      onClick={() => {
                        setSelected(i);
                        setLightboxOpen(true);
                      }}
                    >
                      <img
                        alt={`Wedding photo ${i + 1}`}
                        className="h-full w-full object-cover select-none"
                        src={src}
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                        style={{ objectPosition: "50% 50%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 px-4 sm:px-6 w-full">
            <div className="flex items-center gap-2">
              <button
                className="w-9 h-9 rounded-full border border-[#ab7a45]/40 flex items-center justify-center text-[rgb(100,14,27)] transition-all hover:scale-110"
                type="button"
                onClick={scrollPrev}
                aria-label="Previous slide"
              >
                <Chevron direction="left" />
              </button>
              <button
                className="w-9 h-9 rounded-full border border-[#ab7a45]/40 flex items-center justify-center text-[rgb(100,14,27)] transition-all hover:scale-110"
                type="button"
                onClick={scrollNext}
                aria-label="Next slide"
              >
                <Chevron direction="right" />
              </button>
            </div>
            <div
              className="text-xs sm:text-sm tracking-widest font-semibold select-none"
              style={{
                color: "rgb(100, 14, 27)",
                fontFamily:
                  '"Times New Roman", Times, "Baskerville", serif',
              }}
            >
              {selected + 1} / {images.length}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={selected}
        slides={images.map((src) => ({ src }))}
        on={{ view: ({ index }) => setSelected(index) }}
      />
    </section>
  );
}
