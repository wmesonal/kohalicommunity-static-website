import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, Section } from "@/components/ui/Section";
import { AlertCircle, AlertTriangle, Info, ArrowLeft, ArrowRight, Bell } from "lucide-react";
import { notices } from "@/lib/events-data";
import type { ReactNode } from "react";
import notice from "@/assets/notice.jpg"
import { useLang } from "@/lib/i18n";
export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: "सूचना | कोहळी समाज विकास मंडळ नागपूर" },
      { name: "description", content: "कोहळी समाज विकास मंडळ नागपूरच्या सर्व अधिकृत सूचना — महत्त्वाची, तातडीची व सामान्य सूचनांची सविस्तर माहिती." },
      { property: "og:title", content: "सूचना | कोहळी समाज" },
      { property: "og:description", content: "समाजाच्या सर्व अधिकृत सूचनांची यादी." },
    ],
  }),
  component: NoticesPage,
});

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] focus-visible:ring-offset-2";
const FOCUS_RING_DARK =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-400)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2C050D]";

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
function NoticesPage() {
   const { t } = useLang();
   const router = useRouter();
  return (
    <SiteLayout>
      <PageHero eyebrow="Notices" title="सूचना" subtitle="समाजाच्या सर्व अधिकृत सूचना एकाच ठिकाणी." backgroundImage={notice} />
      
      <Section>
        <div className="mx-auto max-w-7xl">
          <button
              type="button"
              onClick={() => router.history.back()}
              className="cursor-pointer group inline-flex items-center justify-center gap-1 rounded-[2px] bg-gradient-to-br from-[var(--gold-300)] via-[var(--gold-600)] to-[var(--gold-400)] px-4 py-2 sm:px-[26px] sm:py-3 font-['Mukta'] text-xs sm:text-[0.88rem] font-bold tracking-[0.02em] text-[var(--maroon-950)] shadow-[0_8px_22px_-8px_rgba(212,175,55,0.65)] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_12px_28px_-8px_rgba(212,175,55,0.75)]"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("मुख्यपृष्ठावर परत जा")}
            </button>
          <div className="relative mx-auto w-full h-full max-w-full rotate-[-0.3deg] lg:mx-0  mt-8">
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
                  {notices.map((n, i) => {
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
              </div>

              {/* ===== BOTTOM DOWEL ===== */}
              <div className="relative z-20 -mt-2 lg:mx-[-16px] flex items-center">
                <div className="h-6 w-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fdf3c7,var(--gold-400)_45%,var(--gold-600)_75%,#7a5a12_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
                <div className="relative h-3.5 flex-1 rounded-full bg-[linear-gradient(180deg,#fdf3c7_0%,var(--gold-400)_20%,var(--gold-600)_55%,#8a6510_100%)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),inset_0_-2px_3px_rgba(0,0,0,0.35),0_2px_5px_rgba(0,0,0,0.3)]" />
                <div className="h-6 w-6 shrink-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fdf3c7,var(--gold-400)_45%,var(--gold-600)_75%,#7a5a12_100%)] shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
