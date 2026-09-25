import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin, User, Info, Globe, Mail, Share2, Star, Phone, MessageCircle, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Section } from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";
import { businessDetails } from "@/lib/business-detail-data";

export const Route = createFileRoute("/business/$id")({
  loader: ({ params }) => {
    const business = businessDetails[params.id];
    if (!business) throw notFound();
    return business;
  },
  component: BusinessDetailPage,
});

const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold-500)] focus-visible:ring-offset-2";

function BusinessDetailPage() {
  const business = Route.useLoaderData();
  const { t } = useLang();

  return (
    <SiteLayout>
      <Section>
        {/* HERO — full-bleed cover photo with name/rating overlaid */}
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl bg-muted shadow-lg shadow-[var(--maroon-950)]/15">
          <img src={business.img} alt={business.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--maroon-950)]/90 via-[var(--maroon-950)]/10 to-transparent" />

          <span className="absolute left-6 top-6 rounded-full bg-[var(--gold-500)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--maroon-950)]">
            {t(business.category)}
          </span>

          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 sm:p-8">
            <div>
              <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">{t(business.name)}</h1>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/80">
                <Star className="h-4 w-4 fill-[var(--gold-500)] text-[var(--gold-500)]" />
                <span className="font-semibold text-white">{business.rating}</span>
                <span>({business.reviews} {t("Reviews")})</span>
                <span className="text-white/40">•</span>
                <span className={business.isOpen ? "font-semibold text-[var(--gold-300,#EFCB68)]" : "text-white/70"}>
                  {t(business.isOpen ? "Open Now" : "Closed")}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ACTION BAR — overlaps the hero, anchors the page */}
        <div className="relative z-10 -mt-8 mx-4 flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-xl shadow-[var(--maroon-950)]/10 sm:mx-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <a
              href={`tel:${business.phone}`}
              className={`flex items-center justify-center gap-2 rounded-lg bg-[var(--maroon-800)] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--maroon-700)] ${FOCUS_RING}`}
            >
              <Phone className="h-4 w-4" /> {t("Call Now")}
            </a>
            <a
              href={`https://wa.me/${business.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-95 ${FOCUS_RING}`}
            >
              <MessageCircle className="h-4 w-4" /> {t("WhatsApp")}
            </a>
          </div>

          <div className="flex items-center gap-2 sm:border-l sm:border-border sm:pl-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t("Share")}</span>
            {[Globe, Mail, Share2].map((Icon, i) => (
              <button
                key={i}
                type="button"
                className={`grid h-9 w-9 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-[var(--maroon-800)] hover:text-[var(--maroon-800)] ${FOCUS_RING}`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* BODY — about (wide) + address/owner (sidebar) */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
              <Info className="h-4 w-4 text-[var(--maroon-800)]" /> {t("About Business")}
            </h3>
            <div className="my-4 border-t-2 border-dashed border-[var(--gold-500)]/40" />
            <p className="text-sm leading-relaxed text-foreground/80">{t(business.about)}</p>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--maroon-800)]" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Address")}</p>
                <p className="mt-1 text-sm text-foreground">{t(business.address)}</p>
                {business.mapsUrl && (
                  <a
                    href={business.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-[var(--maroon-800)]"
                  >
                    {t("Get Directions")} <ArrowRight className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            <Link
              to="/committee/$memberId"
              params={{ memberId: business.ownerId }}
              className={`flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-[var(--maroon-800)]/40 ${FOCUS_RING}`}
            >
              <User className="h-4 w-4 shrink-0 text-[var(--maroon-800)]" />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Owner")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{t(business.ownerName)}</p>
              </div>
            </Link>
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}