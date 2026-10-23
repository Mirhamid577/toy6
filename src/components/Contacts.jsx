import { ArrowUpRight, Camera, Phone, Send } from "lucide-react";
import Reveal from "./Reveal.jsx";

function ContactRow({ href, label, value, hint, icon, delay }) {
  return (
    <Reveal
      as="a"
      href={href}
      target={href.startsWith("tel:") ? undefined : "_blank"}
      rel={href.startsWith("tel:") ? undefined : "noreferrer"}
      delay={delay}
      amount={0.2}
      className="group flex items-center gap-3.5 sm:gap-4 rounded-[12px] border border-[rgb(171,122,69)]/25 bg-white/80 p-3.5 sm:p-4 transition-all hover:bg-white hover:border-[rgb(171,122,69)]/60 hover:shadow-md text-left"
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <span
        className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-[10px] transition-all shadow-sm group-hover:scale-105"
        style={{
          backgroundColor: "rgba(100, 14, 27, 0.08)",
          color: "rgb(100, 14, 27)",
          border: "1px solid rgba(171, 122, 69, 0.2)",
        }}
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold"
          style={{
            color: "rgb(171, 122, 69)",
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          {label}
        </p>
        <p
          className="truncate text-[14px] sm:text-[16px] font-semibold tracking-wide mt-0.5"
          style={{
            color: "rgb(100, 14, 27)",
            fontFamily:
              '"Times New Roman", Times, "Baskerville", serif',
          }}
        >
          {value}
        </p>
        <p
          className="truncate text-[11px] sm:text-[12px] italic mt-0.5"
          style={{
            color: "rgba(100, 14, 27, 0.65)",
            fontFamily:
              'Baskerville, "Libre Baskerville", "Times New Roman", serif',
          }}
        >
          {hint}
        </p>
      </div>
      <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-[rgb(171,122,69)]/10 text-[rgb(171,122,69)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-[rgb(100,14,27)] group-hover:text-white">
        <ArrowUpRight size={15} strokeWidth={2} aria-hidden="true" />
      </span>
    </Reveal>
  );
}

export default function Contacts({ data }) {
  const telegramUser = String(data?.telegram || "").replace(/^@/, "");
  const instagramUser = String(data?.instagram || "").replace(/^@/, "");

  return (
    <section className="relative z-10 mx-auto my-6 w-[90%] max-w-[420px] md:max-w-[560px]">
      <Reveal
        amount={0.15}
        duration={0.7}
        className="relative overflow-hidden rounded-[20px] border border-[rgb(171,122,69)]/35 bg-white/70 px-5 py-8 md:px-7 md:py-10 shadow-[0_8px_24px_rgba(100,14,27,0.06)] backdrop-blur-md"
        variants={{
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover opacity-25 mix-blend-multiply"
          src="/images/palace-rose/paper.webp"
        />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <Reveal
            as="h2"
            className="text-glint text-center font-bold text-[20px] md:text-[26px] uppercase tracking-[0.04em]"
            style={{
              color: "rgb(100, 14, 27)",
              fontFamily:
                '"Times New Roman", Times, "Baskerville", serif',
            }}
          >
            <span dir="auto">Bog'lanish uchun</span>
          </Reveal>

          <img
            src="/images/palace-rose/gold-line.webp"
            alt=""
            aria-hidden="true"
            className="w-28 sm:w-36 h-auto object-contain opacity-75"
          />

          <Reveal
            as="p"
            delay={0.05}
            className="text-[12px] md:text-[14px] italic text-center max-w-sm"
            style={{
              color: "rgb(171, 122, 69)",
              fontFamily:
                'Baskerville, "Libre Baskerville", "Times New Roman", serif',
            }}
          >
            Har qanday savol yoki tabrik uchun biz bilan bog'laning.
          </Reveal>

          <div className="mt-3 w-full flex flex-col gap-3">
            <ContactRow
              href={`tel:${String(data?.phone || "").replace(/\s+/g, "")}`}
              label="Telefon raqam"
              value={data?.phone}
              hint="Savollar uchun qo'ng'iroq qiling"
              icon={<Phone size={19} strokeWidth={1.75} aria-hidden="true" />}
              delay={0.1}
            />
            <ContactRow
              href={`https://t.me/${telegramUser}`}
              label="Telegram"
              value={data?.telegram}
              hint="Tezkor javob uchun yozing"
              icon={<Send size={19} strokeWidth={1.75} aria-hidden="true" />}
              delay={0.15}
            />
            <ContactRow
              href={`https://instagram.com/${instagramUser}`}
              label="Instagram"
              value={data?.instagram}
              hint="Suratlarni kuzatib boring"
              icon={<Camera size={19} strokeWidth={1.75} aria-hidden="true" />}
              delay={0.2}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
