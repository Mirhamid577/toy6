import { useEffect, useState } from "react";
import Reveal from "./Reveal.jsx";

const STORAGE_KEY = "palace-rose-wishes";

function loadWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function Wishes({ data }) {
  const [wishes, setWishes] = useState(() => data?.wishes || []);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = loadWishes();
    if (stored.length) {
      setWishes((prev) => [...stored, ...prev]);
    }
  }, []);

  const handleAi = () => {
    const presets = data?.aiWishes?.length
      ? data.aiWishes
      : ["Baxtingiz abadiy bo'lsin!"];
    const next = presets[Math.floor(Math.random() * presets.length)];
    setMessage(next);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedMessage) return;

    const wish = {
      id: `local-${Date.now()}`,
      name: trimmedName,
      message: trimmedMessage,
      createdAt: new Date().toLocaleDateString("en-US"),
    };

    setWishes((prev) => {
      const next = [wish, ...prev];
      try {
        const stored = loadWishes();
        localStorage.setItem(STORAGE_KEY, JSON.stringify([wish, ...stored]));
      } catch {
        /* ignore */
      }
      return next;
    });

    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div id="rsvp" className="relative isolate z-10 w-full overflow-visible my-2">
      <section
        className="relative z-10 px-[6%] pt-[6%] pb-[5%] md:px-[14%]"
        data-landing-screenshot-id="invite-guestbook"
        style={{
          backgroundColor: "transparent",
          color: "rgb(171, 122, 69)",
          fontFamily:
            'Baskerville, "Libre Baskerville", "Times New Roman", serif',
        }}
      >
        <Reveal
          delay={0}
          className="text-center"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <h2
            className="text-glint font-bold text-[20px] md:text-[26px] text-center uppercase tracking-[0.04em] mb-2"
            style={{
              color: "rgb(100, 14, 27)",
              fontFamily:
                '"Times New Roman", Times, "Baskerville", serif',
            }}
          >
            <span dir="auto">Tilaklar</span>
          </h2>
          <p
            className="text-[12px] md:text-[14px] italic text-center max-w-md mx-auto mb-6"
            style={{
              color: "rgb(171, 122, 69)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            To'y egaslariga o'z ezgu tilaklaringizni qoldiring
          </p>
        </Reveal>

        <Reveal
          as="form"
          delay={0.05}
          amount={0.15}
          onSubmit={handleSubmit}
          className="mt-4 mx-auto w-full max-w-full md:max-w-[600px]"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div>
            <div className="mb-4">
              <input
                type="text"
                required
                maxLength={500}
                placeholder="Ismingiz*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none transition-colors placeholder-[rgb(171,122,69)]/60"
                style={{
                  borderColor: "rgb(171, 122, 69)",
                  borderRadius: 6,
                  color: "rgb(100, 14, 27)",
                  backgroundColor: "transparent",
                  fontFamily: "Roboto, system-ui, sans-serif",
                }}
              />
            </div>
            <textarea
              rows={4}
              required
              maxLength={10000}
              placeholder="Kelin-kuyovga tilagingiz...*"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none transition-colors placeholder-[rgb(171,122,69)]/60"
              style={{
                borderColor: "rgb(171, 122, 69)",
                borderRadius: 6,
                color: "rgb(100, 14, 27)",
                backgroundColor: "transparent",
                fontFamily: "Roboto, system-ui, sans-serif",
                resize: "none",
              }}
            />
            <div className="mt-4 flex items-center justify-between text-xs">
              <div className="flex items-center text-xs space-x-1">
                <button
                  type="button"
                  title="AI yordamida tilak yaratish"
                  onClick={handleAi}
                  className="p-2 rounded-lg transition-all duration-200 hover:scale-110 text-base leading-none"
                  style={{
                    backgroundColor: "rgba(100, 14, 27, 0.1)",
                    color: "rgb(100, 14, 27)",
                  }}
                >
                  🪄
                </button>
                {submitted && (
                  <span
                    className="text-[11px] md:text-[12px] italic"
                    style={{ color: "rgb(171, 122, 69)" }}
                  >
                    Tilagingiz qabul qilindi!
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="rounded-full px-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
                style={{
                  backgroundColor: "rgb(100, 14, 27)",
                  fontFamily:
                    '"Times New Roman", Times, "Baskerville", serif',
                }}
              >
                <span dir="auto">Tilak yuborish</span>
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px] scrollbar-none">
          {wishes.map((wish, index) => (
            <Reveal
              key={wish.id || index}
              delay={Math.min(index * 0.05, 0.3)}
              amount={0.05}
              className="rounded-md border p-4 text-sm shadow-sm transition-all hover:scale-[1.01]"
              style={{
                borderColor: "rgba(171, 122, 69, 0.35)",
                backgroundColor: "rgba(255, 255, 255, 0.55)",
              }}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-start justify-between">
                <span
                  className="font-semibold"
                  style={{
                    color: "rgb(100, 14, 27)",
                    fontFamily:
                      '"Times New Roman", Times, "Baskerville", serif',
                  }}
                >
                  {wish.name}
                </span>
                <span
                  className="text-xs opacity-70"
                  style={{ color: "rgb(171, 122, 69)" }}
                >
                  {wish.createdAt}
                </span>
              </div>
              <p
                className="mt-2 leading-relaxed"
                style={{
                  color: "rgb(100, 14, 27)",
                  fontFamily:
                    'Baskerville, "Libre Baskerville", "Times New Roman", serif',
                }}
              >
                {wish.message}
              </p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
