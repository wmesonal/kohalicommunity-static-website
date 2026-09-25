import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, ArrowRight, ChevronRight, Search } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Section, BandLabel, PageHero } from "@/components/ui/Section";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLang } from "@/lib/i18n";
import heroImg from "@/assets/hero-slide-1.jpg"; // swap per business once real photos exist
import servicebg from "@/assets/sevabg.jpg";

export const Route = createFileRoute("/businesses")({
  head: () => ({
    meta: [{ title: "आपले व्यवसाय — कोहळी समाज विकास मंडळ नागपूर" }],
  }),
  component: BusinessesPage,
});

/* ============================================================
   DATA — replace with real business directory data later
   ============================================================ */
const categories = ["All", "Construction & Real Estate", "Hotels & Restaurants", "Retail & Grocery"] as const;

type Business = {
  id: string;
  name: string;
  location: string;
  category: string;
  tag: string;
  img: string;
};

const businesses: Business[] = [
  { id: "1", name: "Kohali Buildcon Pvt Ltd", location: "Pune, Maharashtra", category: "Construction & Real Estate", tag: "Construction", img: heroImg },
  { id: "2", name: "Hotel Royal Palace", location: "Mumbai, Maharashtra", category: "Hotels & Restaurants", tag: "Hospitality", img: heroImg },
  { id: "3", name: "Kohali Supermart", location: "Nagpur, Maharashtra", category: "Retail & Grocery", tag: "Retail", img: heroImg },
];

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] focus-visible:ring-offset-2";

/* ============================================================
   PAGE — branches on device, shares the same data
   ============================================================ */
function BusinessesPage() {
  const isMobile = useIsMobile();
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const { t } = useLang();

  const filtered = category === "All" ? businesses : businesses.filter((b) => b.category === category);

  if (isMobile) {
    return (
      <SiteLayout>
        <MobileBusinesses categories={categories} category={category} setCategory={setCategory} businesses={filtered} />
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
         <PageHero
        eyebrow="Our Businesses"
        title="आपले व्यवसाय"
        subtitle="कोहळी समाज बांधवांचे व्यवसाय आणि सेवा एकाच ठिकाणी शोधा व त्यांना सहकार्य करा."
        backgroundImage={servicebg}
        />
      <Section>
        <BandLabel
          eyebrow="Our Businesses"
          title={t("आपले व्यवसाय")}
          sub={t("कोहळी समाज बांधवांचे व्यवसाय आणि सेवा एकाच ठिकाणी शोधा व त्यांना सहकार्य करा.")}
        />

        {/* Category filter */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {categories.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${FOCUS_RING} ${
                  active
                    ? "border-[var(--maroon-800)] bg-[var(--maroon-800)] text-white"
                    : "border-[var(--gold-500)]/50 bg-card text-[var(--maroon-800)] hover:border-[var(--gold-500)] hover:bg-[var(--gold-500)]/10"
                }`}
              >
                {t(c)}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="mt-6 text-sm font-medium text-muted-foreground">
          {filtered.length} {t("व्यवसाय सापडले")}
        </p>

        {/* Business grid */}
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <Link
              key={b.id}
              to="/business/$id"
              params={{ id: b.id }}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--maroon-950)]/10 ${FOCUS_RING}`}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={b.img}
                  alt={b.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute left-3 top-3 rounded-full bg-[var(--gold-500)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--maroon-950)]">
                  {t(b.tag)}
                </span>
              </div>

              <div className="flex flex-1 flex-col border-t-2 border-dashed border-[var(--gold-500)]/40 p-5">
                <h3 className="font-display text-base font-bold text-foreground transition-colors group-hover:text-[var(--maroon-800)]">
                  {t(b.name)}
                </h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {t(b.location)}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--maroon-800)]">
                  {t("View Details")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold-500)]/10">
              <Search className="h-5 w-5 text-[var(--maroon-700)]" />
            </span>
            <p className="text-sm font-medium text-muted-foreground">
              {t("या श्रेणीत सध्या कोणताही व्यवसाय नोंदणीकृत नाही.")}
            </p>
          </div>
        )}
      </Section>
    </SiteLayout>
  );
}

/* ============================================================
   MOBILE VIEW — banner header + sticky filters + card grid
   ============================================================ */
function MobileBusinesses<C extends string>({
  categories,
  category,
  setCategory,
  businesses,
}: {
  categories: readonly C[];
  category: C;
  setCategory: (c: C) => void;
  businesses: Business[];
}) {
  const { t } = useLang();

  return (
    <div className="min-h-screen bg-[var(--ivory-50,#FBF7F0)] pb-10">
      {/* Header banner */}
      <div className="bg-gradient-to-br from-[var(--maroon-800)] to-[var(--maroon-700)] px-4 pb-6 pt-5">
        <h1 className="font-display text-xl font-bold text-white">{t("आपले व्यवसाय")}</h1>
        <p className="mt-1 text-xs text-white/75">{t("कोहळी समाज बांधवांचे व्यवसाय शोधा")}</p>
      </div>

      {/* Category pills — pulled up over the header, sticky while scrolling */}
      <div className="sticky top-0 z-10 -mt-4 bg-[var(--ivory-50,#FBF7F0)] px-4 pb-3 pt-1">
        <div className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-md shadow-[var(--maroon-950)]/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={
                  active
                    ? "shrink-0 rounded-xl bg-[var(--maroon-800)] px-4 py-2 text-xs font-semibold text-white"
                    : "shrink-0 rounded-xl px-4 py-2 text-xs font-semibold text-neutral-500 hover:bg-neutral-50"
                }
              >
                {t(c)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="px-5 pt-1 text-xs font-medium text-neutral-400">
        {businesses.length} {t("व्यवसाय सापडले")}
      </p>

      {/* Business grid */}
      <div className="mt-3 grid grid-cols-2 gap-3 px-4">
        {businesses.map((b) => (
          <Link
            key={b.id}
            to="/business/$id"
            params={{ id: b.id }}
            className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="relative h-28 w-full overflow-hidden">
              <img
                src={b.img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent" />
              <span className="absolute left-2 top-2 rounded-full bg-[var(--gold-500)] px-2 py-0.5 text-[9.5px] font-bold text-[var(--maroon-950)]">
                {t(b.tag)}
              </span>
            </div>
            <div className="p-3">
              <p className="truncate text-[12.5px] font-bold text-neutral-900">{t(b.name)}</p>
              <div className="mt-1 flex items-center justify-between gap-1">
                <p className="flex min-w-0 items-center gap-1 truncate text-[10.5px] text-neutral-500">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {t(b.location)}
                </p>
                <ChevronRight className="h-4 w-4 shrink-0 text-[var(--maroon-700)] opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {businesses.length === 0 && (
        <div className="mx-4 mt-6 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gold-500)]/10">
            <Search className="h-5 w-5 text-[var(--maroon-700)]" />
          </span>
          <p className="text-sm font-medium text-neutral-600">
            {t("या श्रेणीत सध्या कोणताही व्यवसाय नाही.")}
          </p>
        </div>
      )}
    </div>
  );
}