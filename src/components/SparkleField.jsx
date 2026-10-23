import { useMemo } from "react";

const SYMBOLS = ["✦", "✧", "✦", "✧", "✶"];

/*
 * "Oltin chang": butun sahifa bo'ylab sekin yog'iladigan, miltillovchi
 * yulduzchalar. Rasm va matnga xalaqit bermaydi (pointer-events-none).
 */
export default function SparkleField({ count = 16 }) {
  const sparkles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        symbol: SYMBOLS[i % SYMBOLS.length],
        left: ((i * 137) % 96) + 2,
        size: i % 6 === 0 ? 20 + (i % 3) * 4 : 10 + (i % 4) * 3,
        duration: 13 + ((i * 7) % 10),
        delay: -((i * 53) % 20),
        drift: (i % 2 ? 1 : -1) * (12 + ((i * 13) % 26)),
        fade: i % 6 === 0 ? 0.95 : 0.65,
        twinkle: 2.2 + (i % 5) * 0.7,
      })),
    [count]
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
    >
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-fall"
          style={{
            left: `${s.left}%`,
            fontSize: `${s.size}px`,
            "--drift": `${s.drift}px`,
            "--sparkle-opacity": s.fade,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          <span
            className="twinkle"
            style={{
              animationDuration: `${s.twinkle}s`,
              animationDelay: `${-((s.id * 3) % 7)}s`,
            }}
          >
            {s.symbol}
          </span>
        </span>
      ))}
    </div>
  );
}
