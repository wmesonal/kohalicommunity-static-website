import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Section } from "@/components/ui/Section";
import { BandLabel } from "@/components/ui/Section";

import {
  Radio,
  Calendar,
  MapPin,
  ArrowRight,
  Bell,
  History,
  Building2,
  Youtube,
  Target,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Scale,
  TrendingUp, ChevronRight, ChevronLeft,
  type LucideIcon,
} from "lucide-react";
import parichayHero from "@/assets/samaj-parichay-hero.jpg";
import parichaySlide1 from "@/assets/hero-slide-1.jpg";
import parichaySlide2 from "@/assets/hero-slide-2.jpg";
import parichaySlide3 from "@/assets/hero-slide-3.jpg";
import parichaySlide4 from "@/assets/hero-slide-4.jpg";
import videobg from "@/assets/bg-main.png";
import about_shape from "@/assets/about-shape.png";
import mandala from "@/assets/mandala.png";

import { YOUTUBE_CHANNEL_URL } from "@/lib/live-events-data";
import { notices, upcomingEvents, pastEvents } from "@/lib/events-data";
import { members } from "@/lib/members-data";
import { MemberCard } from "@/components/MemberCard";
import { galleryPhotos } from "@/lib/gallery-data";
import { samajVideos } from "@/lib/videos-data";
import { useLang } from "@/lib/i18n";
import { CommunityFeedback } from "@/components/CommunityFeedback";

// About-section imagery
import aboutIcon from "@/assets/kohali-logo.png";
import aboutImg1 from "@/assets/about1.png";
import aboutImg2 from "@/assets/about2.png";
import aboutShape from "@/assets/about-line-shape.png";



const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] focus-visible:ring-offset-2";
const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--maroon-950)]";

const galleryRotations = ["rotate-[-4deg]", "rotate-[3deg]", "rotate-[-2deg]", "rotate-[4deg]"];

/* ============================================================
   SHARED CTA BUTTONS
   ============================================================ */
const goldButtonBase =
"group inline-flex items-center justify-center gap-1.5 rounded-[2px] px-5 py-2.5 sm:px-7 sm:py-3 font-['Mukta'] text-xs sm:text-sm font-bold tracking-[0.02em] transition-all duration-300 ease-in-out hover:-translate-y-1";

function GoldLink({
  to,
  params,
  children,
  className = "",
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      params={params}
      className={`${goldButtonBase} bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] text-[var(--maroon-950)] shadow-[0_8px_22px_-8px_rgba(212,175,55,0.65)] hover:shadow-[0_12px_28px_-8px_rgba(212,175,55,0.75)] ${FOCUS_RING} ${className}`}
    >
      {children}
    </Link>
  );
}

function GoldOutlineAnchor({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${goldButtonBase} border border-[var(--gold-500)] bg-transparent text-[var(--gold-300)] hover:bg-[rgba(212,175,55,0.12)] hover:shadow-lg ${FOCUS_RING_DARK} ${className}`}
    >
      {children}
    </a>
  );
}

/* ============================================================
   ABOUT IMAGE SECTION
   ============================================================ */
const AboutImageSection = ({
  iconSrc = aboutIcon,
  mainImageSrc = aboutImg1,
  secondImageSrc = aboutImg2,
  shapeSrc = aboutShape,
  iconBgColor = "bg-white",
  mainImageAlt = "About Image",
  secondImageAlt = "About Image",
  shapeAlt = "decorative frame",
}: {
  iconSrc?: string;
  mainImageSrc?: string;
  secondImageSrc?: string;
  shapeSrc?: string;
  iconBgColor?: string;
  mainImageAlt?: string;
  secondImageAlt?: string;
  shapeAlt?: string;
}) => {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative">
        {/* Icon medallion — centered on the seam between the two photos */}
        {/* <div
          className={`absolute left-1/2 top-1/2 z-10 h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white ${iconBgColor} text-center shadow-lg transition-all duration-500 sm:h-[100px] sm:w-[100px]`}
        >
          <img src={iconSrc} alt="" className="inline-block h-full w-full object-contain p-3" />
        </div> */}

        {/* Main photo */}
        <div className="mr-6 overflow-hidden rounded-lg sm:mr-[30px]">
          <img
            src={mainImageSrc}
            alt={mainImageAlt}
            loading="lazy"
            className="w-full transform transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Secondary photo — bottom-left inset */}
        <div className="absolute bottom-0 left-0 h-[100px] w-[100px] overflow-hidden rounded-tr-[10px] border-t-4 border-r-4 border-[var(--ivory-100)] sm:h-[220px] sm:w-[220px] sm:border-t-8 sm:border-r-8">
          <img src={secondImageSrc} alt={secondImageAlt} loading="lazy" className="h-full w-full object-cover" />
        </div>

        {/* Decorative frame, right edge — hidden on small screens to avoid clipping */}
        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 hidden h-full sm:block">
          <img src={shapeSrc} alt={shapeAlt} className="h-full object-contain" />
        </span>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "कोहळी समाज विकास मंडळ नागपूर" },
      {
        name: "description",
        content: "कोहळी समाज विकास मंडळ नागपूर — शिक्षण, रोजगार, सामाजिक न्याय आणि सर्वांगीण विकासासाठी समर्पित डिजिटल व्यासपीठ.",
      },
      { property: "og:title", content: "कोहळी समाज विकास मंडळ नागपूर" },
      { property: "og:description", content: "एक समाज • एक ओळख • एक दिशा • एक विकास" },
    ],
  }),
  component: HomePage,
});

/* ============================================================
   Decorative divider (kept available for future sections)
   ============================================================ */
function Toran({ tone = "gold" }: { tone?: "gold" | "maroon-on-cream" }) {
  const color = tone === "gold" ? "var(--gold-500)" : "var(--maroon-800)";
  return (
    <div aria-hidden="true" className="relative flex h-14 w-full items-center justify-center sm:h-20">
      <span className="h-px w-16 sm:w-24 md:w-40" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      <span className="mx-3 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: color }} />
      <span className="h-px w-16 sm:w-24 md:w-40" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
    </div>
  );
}


const pillars: { label: string; icon: LucideIcon }[] = [
  { label: "शिक्षण", icon: GraduationCap },
  { label: "रोजगार", icon: Briefcase },
  { label: "सामाजिक न्याय", icon: Scale },
  { label: "सर्वांगीण विकास", icon: TrendingUp },
];

/* ============================================================
   VIDEO CARD (Samajdarshan section)
   ============================================================ */
function VideoCard({ video }: { video: (typeof samajVideos)[number] }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group overflow-hidden rounded-2xl border border-[var(--gold-500)]/30 bg-[var(--maroon-925)] transition-transform duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-video">
       {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={video.youtubeUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
            className={`absolute inset-0 flex h-full w-full items-center justify-center bg-cover bg-center ${FOCUS_RING_DARK}`}
            style={{ backgroundImage: `url('${video.thumbnail}')` }}
          >
            <span className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
            <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--gold-500)] transition-transform duration-200 group-hover:scale-110 sm:h-[52px] sm:w-[52px]">
              <svg viewBox="0 0 24 24" className="ml-[3px] h-5 w-5 fill-[var(--maroon-950)]">
                <path d="M6 4 L20 12 L6 20 Z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="p-5">
        <h4 className="font-bold text-lg text-[var(--gold-text-alt)] sm:text-[22px]">{video.title}</h4>
        <p className="mb-3 mt-2 text-sm leading-relaxed text-[var(--cream-text)]/75 sm:text-base">{video.description}</p>
        <p className="flex items-center gap-2 text-sm font-bold text-[var(--gold-500)]">
          <Calendar className="h-[15px] w-[15px]" /> {video.date}
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   HOME PAGE
   ============================================================ */
function HomePage() {
  const { t } = useLang();

  // The AGM live stream is only embedded when it is actually live.
  // Wire this to your real stream-status source; defaulting to
  // false avoids ever showing YouTube's "video unavailable" state.
  const [isLive] = useState(false);

  return (
    <SiteLayout>
      {/* HERO CAROUSEL */}
      <HeroCarousel />

      {/* ================= ABOUT US ================= */}
      <section className="relative overflow-hidden py-14 sm:py-18">
        <img src={mandala} className="absolute -left-[150px] top-10 hidden h-[300px] opacity-30 sm:block" />
        <img src={about_shape} className="absolute right-10 bottom-10 hidden h-[300px] md:block" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <AboutImageSection iconBgColor="bg-white" />
            </div>

            <div className="order-1 lg:order-2">
              <BandLabel align="left" eyebrow="Who We Are" title={t("आमच्याविषयी")} />

              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base lg:text-lg">
                {t(
                  "कोहळी समाज विकास मंडळ नागपूर हे समाजबांधवांना एका छत्राखाली आणून त्यांच्या शिक्षण, रोजगार, सामाजिक न्याय आणि सर्वांगीण विकासासाठी अविरत कार्य करणारे व्यासपीठ आहे. पिढ्यानपिढ्यांचा वारसा जपत, आम्ही उद्याच्या पिढीसाठी नव्या वाटा घडवत आहोत.",
                )}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base lg:text-lg">
                {t(
                  "संस्थेच्या माध्यमातून शिक्षण, रोजगार, सामाजिक न्याय, युवक व महिला सक्षमीकरण, सांस्कृतिक जतन, आरोग्य जनजागृती आणि समाजकल्याणाच्या विविध उपक्रमांची सातत्याने अंमलबजावणी केली जाते. विद्यार्थ्यांना शैक्षणिक मार्गदर्शन, गुणवंतांचा सत्कार, स्पर्धा परीक्षा मार्गदर्शन, करिअर समुपदेशन तसेच गरजू समाजबांधवांना आवश्यक ते सहकार्य देण्याचे कार्य संस्था निष्ठेने पार पाडत आहे.",
                )}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base lg:text-lg">
                {t(
                  '"एकता • शिक्षण • विकास • सेवा" या ब्रीदवाक्याने प्रेरित होऊन, कोहळी समाज विकास मंडळ, नागपूर समाजाच्या उज्ज्वल भविष्यासाठी आणि भावी पिढ्यांच्या प्रगतीसाठी अविरत कार्यरत आहे.',
                )}
              </p>

              {/* Mobile-only pillar grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:hidden">
                {pillars.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center gap-3 rounded-xl border bg-card p-3 shadow-soft"
                    style={{ borderColor: "var(--gold-500)" }}
                  >
                    <div
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
                      style={{ background: "linear-gradient(160deg, var(--gold-300), var(--gold-600))" }}
                    >
                      <p.icon className="h-[18px] w-[18px] text-[var(--maroon-icon-ink)]" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--maroon-800)" }}>
                      {t(p.label)}
                    </span>
                  </div>
                ))}
              </div>

              <GoldLink to="/samaj-parichay/$topicId" params={{ topicId: "itihas-varsa" }} className="mt-8">
                {t("आमची कथा वाचा")} <ArrowRight className="h-4 w-4" />
              </GoldLink>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LIVE / UPCOMING EVENT ================= */}
      <section
        className="relative overflow-hidden"
      >
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${videobg})` }} />

      
        <div className="pointer-events-none absolute inset-0 texture-maroon-grain opacity-60" />
        <div className="pointer-events-none absolute -top-40 -right-24 h-96 w-96 rounded-full ambient-glow-gold" />
        <div
          className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(212,175,55,0.14), transparent 70%)", filter: "blur(60px)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-18">
          <BandLabel
            eyebrow={isLive ? "Live Right Now" : "Live Events"}
            title={t("Community Live Programs")}
            sub={t("वार्षिक सर्वसाधारण सभेत सहभागी व्हा — जोडले जा, सहभागी व्हा, एकत्र वाढा")}
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:gap-8 lg:mt-12">
            {/* Event details card */}
            <div className="flex flex-col justify-between gap-6 rounded-3xl border border-white/10 bg-[var(--maroon-910)] p-6 backdrop-blur-sm sm:p-8">
              <div>
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex shrink-0 flex-col items-center rounded-2xl bg-gradient-to-br from-[var(--gold-300)] to-[var(--gold-600)] px-3.5 py-2.5 text-[var(--maroon-icon-ink)] shadow-[0_10px_24px_-8px_rgba(212,175,55,0.55)] sm:px-4 sm:py-3">
                    <span className="text-2xl font-black leading-none sm:text-3xl">१५</span>
                    <span className="mt-1 text-[9px] font-bold uppercase tracking-widest sm:text-[10px]">जून २०२६</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-bold leading-snug text-white sm:text-xl md:text-2xl">
                      {t("कोहळी समाज वार्षिक अधिवेशन सभा")}
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-sm text-white/60">
                      <MapPin className="h-4 w-4 shrink-0 text-[var(--gold-400)]" />
                      {t("समाज भवन, नागपूर")}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-[11px] font-semibold text-red-300 ring-1 ring-red-500/30">
                          <Radio className="h-3 w-3 animate-pulse" />
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--gold-500)]/15 px-3 py-1 text-[11px] font-semibold text-[var(--gold-300)] ring-1 ring-[var(--gold-500)]/30">
                          <Calendar className="h-3 w-3" />
                          {t("लवकरच")}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70 ring-1 ring-white/10">
                        <Target className="h-3 w-3" />
                        {t("वार्षिक आढावा")}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-relaxed text-white/70 sm:text-[16px]">
                  {t(
                    "कोहळी समाज विकास मंडळ नागपूरच्या वतीने आयोजित वार्षिक सर्वसाधारण सभेमध्ये समाजाच्या शैक्षणिक, सामाजिक आणि आर्थिक विकासाचा आढावा घेतला जाईल.",
                  )}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <GoldLink to="/live-events">
                  {t("अधिक पहा")} <ArrowRight className="h-4 w-4" />
                </GoldLink>
                <GoldOutlineAnchor href={YOUTUBE_CHANNEL_URL}>
                  <Youtube className="h-4 w-4" /> YouTube
                </GoldOutlineAnchor>
              </div>
            </div>

            {/* Stream card */}
            <div
              className="relative rounded-3xl p-[1.5px]"
              style={{ background: "linear-gradient(135deg, var(--gold-600), rgba(212,175,55,0.2), var(--gold-600))" }}
            >
              <div className="overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-black">
                <div className="flex items-center justify-between px-4 py-3 sm:px-5" style={{ background: "var(--maroon-910)" }}>
                  <span className="flex items-center gap-2 text-xs font-semibold text-[var(--gold-300)] sm:text-sm">
                    <span className="relative flex h-2.5 w-2.5 shrink-0">
                      {isLive && (
                        <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-red-400 opacity-75" />
                      )}
                      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${isLive ? "bg-red-500" : "bg-white/30"}`} />
                    </span>
                    <span>{t(isLive ? "थेट प्रसारण" : "प्रसारण लवकरच सुरू होईल")}</span>
                  </span>
                </div>
                <div className="relative aspect-video w-full">
                  {isLive ? (
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/live_stream?channel=UCBR8-60-B28hp2BmDPdntcQ"
                      title="YouTube Live Stream"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-black to-[var(--maroon-black)] px-6 text-center">
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--gold-500)]/40 bg-[var(--gold-500)]/10">
                        <Radio className="h-6 w-6 text-[var(--gold-400)]" />
                      </span>
                      <p className="text-sm text-white/70">{t("सभेच्या दिवशी येथे थेट प्रसारण सुरू होईल")}</p>
                      <GoldOutlineAnchor href={YOUTUBE_CHANNEL_URL} className="mt-1 !px-4 !py-2 text-[11px] sm:!px-5 sm:!py-2.5">
                        {t("चॅनेल सबस्क्राइब करा")}
                      </GoldOutlineAnchor>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NOTICES & UPCOMING EVENTS ================= */}
      <Section>
        <BandLabel
          eyebrow="Notices & Events"
          title={t("Notices, Upcoming Events & Initiatives")}
          sub={t("Detailed information about the community's important notices and upcoming events.")}
        />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-5">
          {/* ============ Left — notices scroll ============ */}
          <div className="relative mx-auto w-full max-w-sm rotate-[-0.3deg] lg:mx-0">
            <div className="mb-6 flex items-center gap-3 lg:mb-7">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] text-[var(--maroon-950)] shadow-[0_8px_22px_-8px_rgba(212,175,55,0.65)] shadow-soft">
                <Bell className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">{t("सूचना")}</h3>
            </div>

            {/* drop shadow layer sitting behind the whole scroll, for lift off the page */}
            <div className="relative">
              <div className="absolute inset-x-4 -bottom-3 top-6 rounded-[50%] bg-black/25 blur-xl" aria-hidden />

              {/* ===== TOP DOWEL ===== */}
              <div className="relative z-20 lg:mx-[-16px] -mb-[10px] flex items-center">
                <div className="h-6 w-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fdf3c7,var(--gold-400)_45%,var(--gold-600)_75%,#7a5a12_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
                <div className="relative h-3.5 flex-1 rounded-full bg-[linear-gradient(180deg,#fdf3c7_0%,var(--gold-400)_20%,var(--gold-600)_55%,#8a6510_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.35),0_2px_5px_rgba(0,0,0,0.3)]" />
                <div className="h-6 w-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fdf3c7,var(--gold-400)_45%,var(--gold-600)_75%,#7a5a12_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
              </div>

              {/* ===== PARCHMENT BODY — deckled edges via clip-path, no straight ruler-cut sides ===== */}
              <div
                className="relative px-6 pb-9 pt-5 sm:px-7"
                style={{
                  background: `
                    radial-gradient(140% 70% at 10% 0%, rgba(150,110,40,0.12), transparent 55%),
                    radial-gradient(140% 70% at 90% 100%, rgba(150,110,40,0.14), transparent 55%),
                    radial-gradient(60% 40% at 75% 30%, rgba(150,110,40,0.06), transparent 60%),
                    radial-gradient(45% 40% at 30% 90%, rgba(150,110,40,0.08), transparent 60%),
                    linear-gradient(180deg, #fbf3d9 0%, #f6ecc9 45%, #f0e2b3 100%)
                  `,
                  clipPath: `polygon(
                    0% 0%, 100% 0%,
                    100% 4%, 98.5% 8%, 100% 12%, 98.3% 16%, 100% 20%, 98.6% 24%, 100% 28%,
                    98.4% 32%, 100% 36%, 98.5% 40%, 100% 44%, 98.3% 48%, 100% 52%,
                    98.6% 56%, 100% 60%, 98.4% 64%, 100% 68%, 98.5% 72%, 100% 76%,
                    98.3% 80%, 100% 84%, 98.6% 88%, 100% 92%, 98.4% 96%, 100% 100%,
                    0% 100%,
                    0% 96%, 1.6% 92%, 0% 88%, 1.4% 84%, 0% 80%, 1.7% 76%, 0% 72%,
                    1.5% 68%, 0% 64%, 1.6% 60%, 0% 56%, 1.4% 52%, 0% 48%,
                    1.7% 44%, 0% 40%, 1.5% 36%, 0% 32%, 1.6% 28%, 0% 24%,
                    1.4% 20%, 0% 16%, 1.7% 12%, 0% 8%, 1.5% 4%
                  )`,
                  boxShadow: "inset 0 0 30px rgba(120,80,20,0.15)",
                }}
              >
                {/* fine paper grain — soft, not a mechanical grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />

                <div className="relative space-y-5">
                  {notices.slice(0, 2).map((n, i) => {
                    const dot = n.type === "तातडीची" ? "bg-destructive" : n.type === "महत्त्वाची" ? "bg-primary" : "bg-[var(--maroon-850)]";
                    return (
                      <div key={n.id}>
                        {i > 0 && <div className="mb-5 border-t border-dashed border-[var(--maroon-850)]/25" />}
                        <div className="flex items-start gap-3">
                          <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${dot}`} />
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--maroon-850)]/70">{t(n.type)}</span>
                              <span className="text-[10px] text-[var(--maroon-850)]/50">{n.date}</span>
                            </div>
                            <h4 className="mt-1 font-display text-base font-bold leading-snug text-[var(--maroon-950)]">{t(n.title)}</h4>
                            <p className="mt-1 text-sm leading-relaxed text-[var(--maroon-850)]/80">{t(n.desc)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <GoldLink to="/notices" className="relative mt-8 w-full sm:w-auto">
                  {t("सर्व सूचना पहा")} <ArrowRight className="h-3.5 w-3.5" />
                </GoldLink>
              </div>

              {/* ===== BOTTOM DOWEL ===== */}
              <div className="relative z-20 -mt-2 lg:mx-[-16px] flex items-center">
                <div className="h-6 w-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fdf3c7,var(--gold-400)_45%,var(--gold-600)_75%,#7a5a12_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
                <div className="relative h-3.5 flex-1 rounded-full bg-[linear-gradient(180deg,#fdf3c7_0%,var(--gold-400)_20%,var(--gold-600)_55%,#8a6510_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.35),0_2px_5px_rgba(0,0,0,0.3)]" />
                <div className="h-6 w-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fdf3c7,var(--gold-400)_45%,var(--gold-600)_75%,#7a5a12_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
              </div>
            </div>
          </div>

          {/* ============ Right — event cards ============ */}
          <div>
            <div className="mb-6 flex items-center gap-3 lg:mb-7">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] text-[var(--maroon-950)] shadow-[0_8px_22px_-8px_rgba(212,175,55,0.65)] shadow-soft">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">{t("कार्यक्रम व उपक्रम")}</h3>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "पुढील कार्यक्रम", ev: upcomingEvents[0], tone: "primary" as const },
                { label: "झालेले कार्यक्रम", ev: pastEvents[0], tone: "secondary" as const },
                { label: "झालेले कार्यक्रम", ev: pastEvents[1], tone: "secondary" as const },
              ].map(({ label, ev, tone }, idx) =>
                ev ? (
                  <Link
                    key={`${label}-${idx}`}
                    to="/events/$eventId"
                    params={{ eventId: ev.id }}
                    className={`group relative flex flex-col rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant ${FOCUS_RING}`}
                  >
                    <span
                      className={`absolute -top-2.5 left-5 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-soft ${
                        tone === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {t(label)}
                    </span>

                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-muted">
                      <img
                        src={ev.image}
                        alt={ev.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute -right-2 -top-1 flex rotate-6 flex-col items-center rounded-md border-2 border-dashed border-card/80 bg-card/95 px-3 py-2 text-center shadow-soft backdrop-blur">
                        <span className="font-display text-xl font-bold leading-none text-primary">{ev.dateShort.day}</span>
                        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">{ev.dateShort.month}</span>
                      </div>
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 text-xs font-medium text-white/90">
                        <MapPin className="h-3.5 w-3.5" />
                        {t(ev.location)}
                      </span>
                    </div>

                    <div className="border-t-2 border-dashed border-border" />

                    <div className="flex flex-1 flex-col p-5 pt-4">
                      <h4 className="font-display text-base text-[15px] font-bold text-foreground transition-colors group-hover:text-primary">
                        {t(ev.name)}
                      </h4>
                      <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                        {t(ev.shortDesc)}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        {t("सविस्तर पहा")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ) : null,
              )}
            </div>

            <GoldLink to="/events" className="mt-8">
              {t("सर्व कार्यक्रम पहा")} <ArrowRight className="h-4 w-4" />
            </GoldLink>
          </div>
        </div>
      </Section>

      {/* ================= DIGITAL SEVA (SERVICES) ================= */}
      <section
        className="relative overflow-hidden py-16 sm:py-18"
        style={{ background: `linear-gradient(175deg, var(--maroon-950) 0%, var(--maroon-800) 100%)` }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(60deg, rgba(212,175,55,0.05) 0 1.5px, transparent 1.5px 26px),
              repeating-linear-gradient(-60deg, rgba(212,175,55,0.05) 0 1.5px, transparent 1.5px 26px)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 texture-maroon-grain opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BandLabel
            eyebrow="Services"
            title={t("समाज विकासासाठी आधुनिक डिजिटल सेवा")}
            sub={t("शैक्षणिक, सामाजिक आणि आर्थिक प्रगतीसाठी विविध डिजिटल सेवा एकाच व्यासपीठावर.")}
            dark
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3">
            {servicesPreview.map((s) => {
              const comingSoon = s.href === "#";
              const CardTag = comingSoon ? "div" : "a";

              return (
                <CardTag
                  key={s.title}
                  {...(!comingSoon && {
                    href: s.href,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-9 text-center backdrop-blur-sm transition-all duration-300 sm:px-7 sm:py-10 ${
                    comingSoon
                      ? "cursor-default"
                      : `hover:-translate-y-1.5 hover:border-[var(--gold-400)]/60 hover:bg-white/[0.06] ${FOCUS_RING_DARK}`
                  }`}
                >
                  <span className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-[var(--gold-400)]/40" />
                  <span className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-[var(--gold-400)]/40" />

                  {comingSoon && (
                    <>
                      {/* diagonal ribbon */}
                      <div className="pointer-events-none absolute -right-11 top-6 w-40 rotate-45 bg-[var(--gold-stroke)] py-1 text-center shadow-md">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--maroon-950)]">
                          {t("लवकरच")}
                        </span>
                      </div>
                      {/* subtle dark veil so the whole card reads as inactive */}
                      <div className="pointer-events-none absolute inset-0 bg-[var(--maroon-950)]/35" />
                    </>
                  )}

                  <div
                    className={`relative z-[1] mb-5 grid h-16 w-16 place-items-center rounded-full border-2 bg-gradient-to-br transition-all ${
                      comingSoon
                        ? "border-white/20 from-white/5 to-white/[0.02] grayscale opacity-50"
                        : "border-[var(--gold-500)] from-[var(--service-icon-from)] to-[var(--service-icon-to)]"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <h3
                    className={`relative z-[1] font-display text-base font-bold sm:text-lg ${
                      comingSoon ? "text-white/50" : "text-[var(--gold-300)]"
                    }`}
                  >
                    {t(s.title)}
                  </h3>
                  <p className={`relative z-[1] mt-2.5 text-sm leading-relaxed ${comingSoon ? "text-white/35" : "text-white/60"}`}>
                    {t(s.desc)}
                  </p>

                  {!comingSoon && (
                    <span className="relative z-[1] mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-400)]">
                      {t("अधिक जाणून घ्या")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </CardTag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= EXECUTIVE COMMITTEE ================= */}
      <section className="py-16 sm:py-18 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12 lg:items-center">
            {/* Left column */}
            <div className="lg:col-span-1">
              <BandLabel
                align="left"
                eyebrow="Executive Committee"
                title={t("कार्यकारिणी मंडळ")}
                sub={t("समाजाच्या प्रगतीसाठी समर्पित प्रमुख पदाधिकारी")}
              />
              <GoldLink to="/committee" className="mt-6">
                {t("संपूर्ण कार्यकारिणी पहा")} <ArrowRight className="h-4 w-4" />
              </GoldLink>
            </div>

            {/* Right column — member cards */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
                {members.slice(0, 3).map((m) => (
                  <MemberCard key={m.id} member={m} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SAMAJ PARICHAY ================= */}
      <SamajParichaySection />

      {/* ================= PHOTO GALLERY ================= */}
      <section className="py-16 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BandLabel
            eyebrow="Photo Gallery"
            title={t("फोटो गॅलरी")}
            sub={t("समाजातील विविध कार्यक्रम, उपक्रम आणि अविस्मरणीय क्षणांचे छायाचित्र संग्रह")}
          />

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-16 md:grid-cols-4 sm:gap-x-6 sm:gap-y-10">
            {galleryPhotos.slice(0, 4).map((p, i) => (
              <div key={p.id} className={`group relative ${galleryRotations[i % galleryRotations.length]}`}>
                <span
                  aria-hidden="true"
                  className="absolute -top-3.5 left-1/2 z-[99] h-6 w-6 -translate-x-1/2 rounded-full shadow-md"
                  style={{ background: "radial-gradient(circle at 35% 30%, #ffe9b0, var(--gold-600))" }}
                />
                <div className="relative bg-white p-2 pb-3 shadow-xl transition-all duration-300 ease-out group-hover:z-10 group-hover:-translate-y-2 group-hover:rotate-0 group-hover:shadow-2xl sm:p-2.5 sm:pb-4">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img src={p.image} alt={t(p.title)} loading="lazy" className="block h-full w-full object-cover" />
                  </div>
                  <p
                    className="mt-2.5 truncate text-center font-display text-[13px] font-bold uppercase tracking-wide sm:mt-3 sm:text-[16px]"
                    style={{ color: "var(--maroon-900)" }}
                  >
                    {t(p.title)}
                  </p>
                  <p className="mt-1 inline-flex w-full items-center justify-center gap-1.5 text-[11px] font-medium text-secondary sm:text-xs">
                    <Calendar className="h-3.5 w-3.5 text-secondary" />
                    {p.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center sm:mt-14">
            <GoldLink to="/gallery">
              {t("सर्व फोटो पहा")} <ArrowRight className="h-4 w-4" />
            </GoldLink>
          </div>
        </div>
      </section>

      {/* ================= SAMAJDARSHAN — VIDEO GALLERY ================= */}
      <section className="relative overflow-hidden py-16 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${videobg})` }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BandLabel
            eyebrow="Samajdarshan"
            title={t("समाजदर्शन")}
            sub={t("समाजातील विविध कार्यक्रम, उपक्रम आणि महत्त्वाच्या क्षणांचे व्हिडिओ संग्रह.")}
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {samajVideos.slice(0, 3).map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <GoldLink to="/samajdarshan">
              {t("सर्व व्हिडिओ पहा")} <ArrowRight className="h-4 w-4" />
            </GoldLink>
          </div>
        </div>
      </section>

      {/* ================= COMMUNITY FEEDBACK ================= */}
      <CommunityFeedback />
    </SiteLayout>
  );
}

/* ============================================================
   SAMAJ PARICHAY
   ============================================================ */
// const parichayCards: { id: string; eyebrow: string; title: string; icon: LucideIcon }[] = [
//   { id: "itihas-varsa", eyebrow: "History & Origin", title: "समाजाची उत्पत्ती", icon: History },
//   { id: "samaj-bhavan", eyebrow: "Community Halls", title: "समाज भवन", icon: Building2 },
//   { id: "education", eyebrow: "Education", title: "शैक्षणिक सहाय्य", icon: GraduationCap },
//   { id: "employment", eyebrow: "Career Support", title: "रोजगार सहाय्य", icon: Briefcase },
//   { id: "social-service", eyebrow: "Social Welfare", title: "सामाजिक सेवा", icon: HeartHandshake },
// ];

// const parichaySlides = [parichayHero, parichaySlide1, parichaySlide2, parichaySlide3, parichaySlide4];

// function SamajParichaySection() {
//   const { t } = useLang();
//   const [active, setActive] = useState(0);
//   const activeCard = parichayCards[active];
//   const total = parichayCards.length;

//   return (
//     <section
//       className="relative overflow-hidden py-16 sm:py-16 lg:py-18"
//     >
//       <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${videobg})` }} />
//       {/* warm gold glow, top-right */}
//       <div
//         className="pointer-events-none absolute -top-20 right-0 h-[440px] w-[440px] rounded-full"
//         style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)", filter: "blur(70px)" }}
//       />
//       {/* soft maroon glow, bottom-left */}
//       <div
//         className="pointer-events-none absolute -bottom-24 -left-16 h-[360px] w-[360px] rounded-full"
//         style={{ background: "radial-gradient(circle, rgba(138,28,61,0.08), transparent 70%)", filter: "blur(60px)" }}
//       />

//       <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <BandLabel
//           eyebrow="Samaj Parichay"
//           title={t("समाज परिचय")}
//           sub={t("कोहळी समाजाचा इतिहास, वारसा आणि समाज भवनांची सविस्तर माहिती.")}
//         />

//         <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_2fr] lg:gap-5">
//           {/* Left — chapter rail */}
//           <div className="flex flex-col justify-center">
//             {parichayCards.map((card, i) => {
//               const isActive = i === active;
//               const isPast = i < active;
//               const isLast = i === total - 1;
//               return (
//                 <div key={card.id} className="relative flex gap-4 sm:gap-5">
//                   <div className="flex flex-col items-center">
//                     <button
//                       type="button"
//                       aria-label={t(card.title)}
//                       onMouseEnter={() => setActive(i)}
//                       onFocus={() => setActive(i)}
//                       onClick={() => setActive(i)}
//                       className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-bold transition-all duration-300 ${FOCUS_RING} ${
//                         isActive
//                           ? "scale-110 border-[var(--maroon-800)] bg-[var(--maroon-800)] text-white shadow-[0_0_0_5px_rgba(138,28,61,0.12)]"
//                           : isPast
//                             ? "border-[var(--gold-500)] bg-[var(--gold-500)] text-white"
//                             : "border-[var(--maroon-900)]/15 text-[var(--maroon-900)]/35 hover:border-[var(--maroon-900)]/30"
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                     {!isLast && (
//                       <span
//                         className={`min-h-[40px] w-px flex-1 transition-colors duration-500 sm:min-h-[46px] ${
//                           isPast ? "bg-[var(--gold-500)]" : "bg-[var(--maroon-900)]/10"
//                         }`}
//                       />
//                     )}
//                   </div>

//                   <button
//                     type="button"
//                     onMouseEnter={() => setActive(i)}
//                     onFocus={() => setActive(i)}
//                     onClick={() => setActive(i)}
//                     className={`group -mt-1 flex-1 pb-8 text-left sm:pb-5 ${FOCUS_RING}`}
//                   >
//                     <span
//                       className={`block text-[10px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 ${
//                         isActive ? "text-[var(--maroon-700)]" : "text-[var(--maroon-900)]/35"
//                       }`}
//                     >
//                       {card.eyebrow}
//                     </span>
//                     <span
//                       className={`mt-1.5 block font-display text-lg font-bold transition-all duration-300 sm:text-xl md:text-2xl ${
//                         isActive
//                           ? "translate-x-1.5 text-[var(--maroon-900)]"
//                           : "text-[var(--maroon-900)]/40 group-hover:translate-x-1 group-hover:text-[var(--maroon-900)]/70"
//                       }`}
//                     >
//                       {t(card.title)}
//                     </span>
//                   </button>
//                 </div>
//               );
//             })}

//           <div>
//              <Link
//               to="/samaj-parichay/$topicId"
//               params={{ topicId: "itihas-varsa" }}
//               className={`group inline-flex items-center justify-center gap-1.5 rounded-[2px] px-5 py-2.5 sm:px-7 sm:py-3 font-['Mukta'] text-xs sm:text-sm font-bold tracking-[0.02em] transition-all duration-300 ease-in-out hover:-translate-y-1 bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] text-[var(--maroon-950)] shadow-[0_8px_22px_-8px_rgba(212,175,55,0.65)] hover:shadow-[0_12px_28px_-8px_rgba(212,175,55,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] focus-visible:ring-offset-2 mt-3`}
//             >
//               {t("सर्व प्रकरणे पहा")} <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
          
//           </div>

//           {/* Right — image stage (stays dark: the one deliberate contrast note on the light section) */}
//           <div className="relative lg:sticky lg:top-24">
//             <div
//               className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-3xl shadow-[0_20px_50px_-15px_rgba(61,10,26,0.25)]"
//               style={{ border: "1px solid rgba(138,28,61,0.12)" }}
//             >
//               {parichaySlides.map((src, i) => (
//                 <img
//                   key={i}
//                   src={src}
//                   alt=""
//                   loading="lazy"
//                   className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-out ${
//                     i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
//                   }`}
//                 />
//               ))}
//               <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-950)]/85 via-[var(--maroon-950)]/0 to-[var(--maroon-950)]/5" />

//               <div className="absolute right-5 top-5 rounded-full bg-[var(--maroon-950)]/45 px-3 py-1.5 text-xs font-bold tracking-wider text-white/90 ring-1 ring-white/20 backdrop-blur">
//                 {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
//               </div>

//               <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
//                 <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--gold-400)]">{activeCard.eyebrow}</p>
//                 <h3 className="mt-2 font-display text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
//                   {t(activeCard.title)}
//                 </h3>
//                 {/* <Link
//                   to="/samaj-parichay/$topicId"
//                   params={{ topicId: activeCard.id }}
//                   className={`group mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] px-5 py-2.5 text-sm font-bold text-[var(--maroon-950)] shadow-[0_10px_24px_-10px_rgba(212,175,55,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(212,175,55,0.75)] ${FOCUS_RING}`}
//                 >
//                   {t("हा अध्याय वाचा")}
//                   <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//                 </Link> */}
//               </div>
//             </div>
//           </div>
          
//         </div>
//       </div>
//     </section>
//   );
// }

const parichayLinks: { id: string; eyebrow: string; title: string; icon: LucideIcon }[] = [
  { id: "itihas-varsa", eyebrow: "History & Origin", title: "समाजाची उत्पत्ती", icon: History },
  { id: "samaj-bhavan", eyebrow: "Community Halls", title: "समाज भवन", icon: Building2 },
];

const parichaySlides = [parichayHero, parichaySlide1, parichaySlide2, parichaySlide3, parichaySlide4];

function SamajParichaySection() {
  const { t } = useLang();
  const [slide, setSlide] = useState(0);
  const total = parichaySlides.length;

  // autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(timer);
  }, [total]);

  const goTo = (i: number) => setSlide((i + total) % total);

  return (
    <section className="relative overflow-hidden py-16 sm:py-16 lg:py-18">
      <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${videobg})` }} />
      <div
        className="pointer-events-none absolute -top-20 right-0 h-[440px] w-[440px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,175,55,0.18), transparent 70%)", filter: "blur(70px)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-[360px] w-[360px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(138,28,61,0.08), transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BandLabel
          eyebrow="Samaj Parichay"
          title={t("समाज परिचय")}
          sub={t("कोहळी समाजाचा इतिहास, वारसा आणि समाज भवनांची सविस्तर माहिती.")}
        />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[1fr_2fr] lg:gap-5">
          {/* Left — two direct-link cards */}
          <div className="flex flex-col justify-center gap-4">
            {parichayLinks.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.id}
                  to="/samaj-parichay/$topicId"
                  params={{ topicId: card.id }}
                  className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[var(--maroon-900)]/10 bg-[var(--card)] px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--gold-500)]/40 hover:shadow-[0_14px_30px_-14px_rgba(138,28,61,0.25)] sm:px-6 sm:py-6 ${FOCUS_RING}`}
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] text-[var(--maroon-950)] shadow-[0_8px_18px_-8px_rgba(212,175,55,0.6)] transition-transform duration-300 group-hover:scale-105 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>

                  <span className="flex-1">
                    <span className="block text-[14px] font-bold uppercase  text-[var(--maroon-900)]/45">
                      {card.eyebrow}
                    </span>
                    <span className="mt-1 block font-display text-lg font-extrabold text-[var(--maroon-900)] transition-colors duration-300 group-hover:text-[var(--maroon-700)] sm:text-xl">
                      {t(card.title)}
                    </span>
                  </span>

                  <ArrowRight className="h-5 w-5 shrink-0 text-[var(--maroon-900)]/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--gold-600)]" />
                </Link>
              );
            })}

            {/* <Link
              to="/samaj-parichay/$topicId"
              params={{ topicId: "itihas-varsa" }}
              className={`group inline-flex items-center justify-center gap-1.5 rounded-[2px] px-5 py-2.5 sm:px-7 sm:py-3 font-['Mukta'] text-xs sm:text-sm font-bold tracking-[0.02em] transition-all duration-300 ease-in-out hover:-translate-y-1 bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] text-[var(--maroon-950)] shadow-[0_8px_22px_-8px_rgba(212,175,55,0.65)] hover:shadow-[0_12px_28px_-8px_rgba(212,175,55,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] focus-visible:ring-offset-2 mt-3`}
            >
              {t("सर्व प्रकरणे पहा")} <ArrowRight className="h-4 w-4" />
            </Link> */}
          </div>

          {/* Right — independent image slider */}
          <div className="relative lg:sticky lg:top-24">
            <div
              className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-[400px] overflow-hidden rounded-3xl shadow-[0_20px_50px_-15px_rgba(61,10,26,0.25)]"
              style={{ border: "1px solid rgba(138,28,61,0.12)" }}
            >
              {parichaySlides.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1100ms] ease-out ${
                    i === slide ? "scale-100 opacity-100" : "scale-110 opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-950)]/85 via-[var(--maroon-950)]/0 to-[var(--maroon-950)]/5" />

              {/* prev / next arrows */}
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => goTo(slide - 1)}
                className={`absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[var(--maroon-950)]/40 text-white backdrop-blur transition-colors hover:bg-[var(--maroon-950)]/60 ${FOCUS_RING}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => goTo(slide + 1)}
                className={`absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-[var(--maroon-950)]/40 text-white backdrop-blur transition-colors hover:bg-[var(--maroon-950)]/60 ${FOCUS_RING}`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              <div className="absolute right-5 top-5 rounded-full bg-[var(--maroon-950)]/45 px-3 py-1.5 text-xs font-bold tracking-wider text-white/90 ring-1 ring-white/20 backdrop-blur">
                {String(slide + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </div>

              {/* dot indicators */}
              <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-2">
                {parichaySlides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slide ? "w-6 bg-[var(--gold-400)]" : "w-1.5 bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVICES PREVIEW DATA
   ============================================================ */
const servicesPreview = [
  {
    // href: "https://ksvm.lovable.app/",
    href: "https://play.google.com/store/apps/details?id=com.kohaliconnect.wme.globle",
    icon: (
      <svg className="h-[30px] w-[30px] stroke-[var(--gold-stroke)]" viewBox="0 0 24 24" fill="none" strokeWidth={1.6}>
        <path d="M12 21 C 6 17 3 13 3 9 C 3 6 5 4 8 4 C 10 4 12 6 12 8 C 12 6 14 4 16 4 C 19 4 21 6 21 9 C 21 13 18 17 12 21 Z" />
      </svg>
    ),
    title: "Socio-Economic Portal",
    desc: "समाजाची सामाजिक, शैक्षणिक, आर्थिक आणि व्यावसायिक माहिती एकत्रित करणारे डिजिटल पोर्टल.",
  },
  {
    href: "#",
    icon: (
      <svg className="h-[30px] w-[30px] stroke-[var(--gold-stroke)]" viewBox="0 0 24 24" fill="none" strokeWidth={1.6}>
        <path d="M8 12 C 5.5 10.5 4 8.5 4 6.5 C 4 4.5 5.5 3 7.5 3 C 9 3 10 4 10 5.5" />
        <path d="M16 12 C 18.5 10.5 20 8.5 20 6.5 C 20 4.5 18.5 3 16.5 3 C 15 3 14 4 14 5.5" />
        <circle cx="8" cy="16" r="4" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
    title: "Matrimonial Services",
    desc: "समाजातील विवाहेच्छुक तरुण-तरुणींसाठी विश्वासार्ह वधू-वर सूचक मंच.",
  },
  {
    href: "#",
    icon: (
      <svg className="h-[30px] w-[30px] stroke-[var(--gold-stroke)]" viewBox="0 0 24 24" fill="none" strokeWidth={1.6}>
        <rect x="3" y="8" width="18" height="12" rx="1.5" />
        <path d="M8 8 V6 C8 4.9 8.9 4 10 4 H14 C15.1 4 16 4.9 16 6 V8" />
        <path d="M3 13 H21" />
        <path d="M10 13 V15 H14 V13" />
      </svg>
    ),
    title: "Job Portal",
    desc: "समाजबांधवांसाठी रोजगाराच्या संधी आणि करिअर मार्गदर्शन उपलब्ध करून देणारे व्यासपीठ.",
  },
];