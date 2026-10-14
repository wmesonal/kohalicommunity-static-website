import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Languages } from "lucide-react";
import logo from "@/assets/kohali-logo.png";
import { useLang } from "@/lib/i18n";
import "@fontsource/mukta/400.css";
import "@fontsource/mukta/500.css";
import "@fontsource/mukta/700.css";

import "@fontsource/cinzel/500.css";
import "@fontsource/cinzel/700.css";

import "@fontsource/yatra-one/400.css";

import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/700.css";

const navItems = [
  { to: "/", label: "मुख्यपृष्ठ" },
  { to: "/services", label: "सेवा" },
  { to: "/statistics", label: "समाज आकडेवारी" },
  { to: "/books", label: "पुस्तके" },
  { to: "/kohli-samaj", label: "कोहळी समाज" },
  { to: "/contact", label: "संपर्क" },
] as const;

const ADDRESS_MR = "केंद्रिय कार्यालय : प्लॉट नं. ०७, गावंडे ले-आऊट, तुकाराम सभागृहाचे मागे, रिंग रोड, नरेंद्रनगर, नागपूर, पिन कोड – ४४००२७";

/* A slim repeating zigzag strip — a stylised "shikhara" (temple-spire)
   skyline used as the shared visual signature that brackets the page:
   points downward beneath the header, and upward above the footer. */
function SpireStrip({ flip = false, opacity = 0.9 }: { flip?: boolean; opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className="h-[7px] w-full"
      style={{
        opacity,
        transform: flip ? "scaleY(-1)" : undefined,
        backgroundImage: `linear-gradient(135deg, var(--gold-500) 25%, transparent 25.5%), linear-gradient(-135deg, var(--gold-500) 25%, transparent 25.5%)`,
        backgroundPosition: "0 0, 0 0",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, toggle } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div
        className="hidden md:block relative"
        style={{ background: `linear-gradient(90deg, var(--maroon-950) 0%, var(--maroon-800) 55%, var(--maroon-950) 100%)` }}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 text-sm text-primary-foreground sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <a href="mailto:contact@kohalisamaj.org" className="inline-flex items-center gap-1.5 transition-colors hover:text-secondary">
              <Mail className="h-3.5 w-3.5" />
              <span>contact@kohalisamaj.org</span>
            </a>
            <a href="tel:+919876543210" className="inline-flex items-center gap-1.5 transition-colors hover:text-secondary">
              <Phone className="h-3.5 w-3.5" />
              <span>+91 98765 43210</span>
            </a>
            <span className="hidden items-center gap-1.5 opacity-90 lg:inline-flex">
              <span className="font-semibold text-secondary/90">{t("Society Reg. No.")}</span> MAH.680/1989 (N)
            </span>
            <span className="hidden items-center gap-1.5 opacity-90 lg:inline-flex">
              <span className="font-semibold text-secondary/90">{t("Public Trust Reg. No.")}</span> (F) 8666 (N)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="transition-all hover:scale-110 hover:text-secondary"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="transition-all hover:scale-110 hover:text-secondary"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="transition-all hover:scale-110 hover:text-secondary"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="transition-all hover:scale-110 hover:text-secondary"><Youtube className="h-4 w-4" /></a>
            <a href="#" aria-label="WhatsApp" className="transition-all hover:scale-110 hover:text-secondary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.56 0 11.91-5.34 11.91-11.9 0-3.18-1.24-6.17-3.46-8.42ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.23-.38a9.88 9.88 0 0 1-1.51-5.26c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.12-.27-.2-.57-.34Z"/></svg>
            </a>
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle language"
              className="ml-2 inline-flex items-center gap-1 rounded-full border border-secondary/40 px-3 py-1 text-sm font-medium transition-colors hover:border-secondary hover:bg-secondary hover:text-primary"
            >
              <Languages className="h-3.5 w-3.5" />
              {lang === "mr" ? "English" : "मराठी"}
            </button>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_20px_-6px_rgba(33,3,7,0.25)]" : ""
        }`}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="group flex min-w-0 items-center gap-3">
            <span
              className="relative shrink-0 rounded-full p-[2px] transition-transform duration-300 group-hover:scale-105"
              style={{ background: `linear-gradient(135deg, var(--gold-500) 0%, var(--maroon-700) 55%, var(--gold-500) 100%)` }}
            >
              <img
                src={logo}
                alt="कोहळी समाज विकास मंडळ नागपूर"
                className="h-11 w-11 rounded-full border-2 border-background object-contain bg-background sm:h-[3.25rem] sm:w-[3.25rem]"
              />
            </span>
            <div className="min-w-0">
              <p className="truncate font-display text-base font-bold tracking-wide text-primary sm:text-lg">
                {t("कोहळी समाज विकास मंडळ")}
              </p>
              <p className="truncate text-sm tracking-[0.15em] text-secondary/80">{t("नागपूर")}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:origin-left after:scale-x-0 after:bg-secondary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100 xl:text-base"
                activeProps={{
                  className:
                    "relative rounded-md px-3 py-2 text-sm font-semibold text-primary after:absolute after:bottom-1 after:left-3 after:right-3 after:h-[2px] after:origin-left after:scale-x-100 after:bg-secondary after:transition-transform after:duration-300 xl:text-base",
                }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border bg-card text-foreground transition-colors hover:border-secondary hover:text-primary lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <nav className="animate-in fade-in slide-in-from-top-2 border-t border-border bg-card duration-200 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col divide-y divide-border/60 px-4 py-2 sm:px-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
                  activeProps={{ className: "rounded-md px-3 py-3 text-sm font-semibold text-primary bg-muted" }}
                  activeOptions={{ exact: item.to === "/" }}
                >
                  {t(item.label)}
                </Link>
              ))}
            </div>
          </nav>
        )}

        <SpireStrip flip opacity={0.7} />
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  const { t } = useLang();

  return (
    <footer
      className="relative overflow-hidden text-primary-foreground"
      style={{ background: `linear-gradient(175deg, var(--maroon-950) 0%, var(--maroon-800) 100%)` }}
    >
      <SpireStrip opacity={0.85} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(60deg, rgba(212,175,55,0.05) 0 1.5px, transparent 1.5px 26px),
            repeating-linear-gradient(-60deg, rgba(212,175,55,0.05) 0 1.5px, transparent 1.5px 26px)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand block */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <span
                className="relative shrink-0 rounded-full p-[2px]"
                style={{ background: `linear-gradient(135deg, var(--gold-500) 0%, var(--maroon-700) 55%, var(--gold-500) 100%)` }}
              >
                <img
                  src={logo}
                  alt="कोहळी समाज विकास मंडळ नागपूर"
                  className="h-16 w-16 shrink-0 rounded-full bg-primary-foreground object-contain p-1"
                />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold leading-tight tracking-wide sm:text-2xl">
                  {t("कोहळी समाज विकास मंडळ")}
                </h3>
                <p className="text-sm tracking-[0.2em] text-secondary sm:text-base">{t("नागपूर")}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-primary-foreground/90">
              {t("Society Reg. No.")} MAH.680/1989 (N) &nbsp;
              <span className="text-secondary/70">•</span>&nbsp;
              {t("Public Trust Reg. No.")} (F) 8666 (N)
            </p>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">
              {t("कोहळी समाज विकास मंडळ, नागपूर हे समाजाच्या शैक्षणिक, सामाजिक, सांस्कृतिक आणि आर्थिक विकासासाठी कार्यरत असलेले एक नोंदणीकृत सामाजिक व्यासपीठ आहे.")}
            </p>

            <p className="mt-5 flex items-center gap-3 text-sm font-medium tracking-wide text-secondary">
              <span className="h-px w-8 bg-secondary/50" />
              {t("एकजूट • शिक्षण • संस्कार • प्रगती")}
              <span className="h-px w-8 bg-secondary/50" />
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Instagram, label: "Instagram" },
                { icon: Twitter, label: "Twitter" },
                { icon: Youtube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-primary hover:shadow-[0_4px_14px_-2px_rgba(212,175,55,0.5)]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <a
                href="#"
                aria-label="WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/15 bg-primary-foreground/10 text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary hover:bg-secondary hover:text-primary hover:shadow-[0_4px_14px_-2px_rgba(212,175,55,0.5)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .14 5.34.14 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.46h.01c6.56 0 11.91-5.34 11.91-11.9 0-3.18-1.24-6.17-3.46-8.42ZM12.07 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.75.98 1-3.65-.23-.38a9.88 9.88 0 0 1-1.51-5.26c0-5.46 4.45-9.9 9.91-9.9 2.65 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.45 9.9-9.91 9.9Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.21 5.08 4.5.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2-1.41.24-.7.24-1.29.17-1.41-.07-.12-.27-.2-.57-.34Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="relative inline-block font-display text-base font-semibold tracking-wide text-secondary">
              {t("संपर्क")}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-6 bg-secondary/70" />
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/85">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <span className="leading-relaxed">{t(ADDRESS_MR)}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href="mailto:contact@kohalisamaj.org" className="transition-colors hover:text-secondary">contact@kohalisamaj.org</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                <a href="tel:+919876543210" className="transition-colors hover:text-secondary">+91 98765 43210</a>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h4 className="relative inline-block font-display text-base font-semibold tracking-wide text-secondary">
              {t("महत्त्वाचे दुवे !")}
              <span className="absolute -bottom-1.5 left-0 h-[2px] w-6 bg-secondary/70" />
            </h4>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navItems.map((i) => (
                <li key={i.to}>
                  <Link
                    to={i.to}
                    className="inline-flex items-center gap-1.5 text-primary-foreground/85 transition-colors hover:text-secondary"
                  >
                    <span className="h-1 w-1 rounded-full bg-secondary/60" />
                    {t(i.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ornamental divider */}
      <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/40 to-secondary/40" />
        <span
          className="h-2 w-2 rotate-45 border border-secondary/70"
          style={{ background: "var(--gold-soft)" }}
        />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-secondary/40 to-secondary/40" />
      </div>

      {/* Bottom bar */}
      <div className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 text-center text-sm text-primary-foreground/75 sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>© {new Date().getFullYear()} {t("कोहळी समाज विकास मंडळ नागपूर")}. {t("सर्व हक्क राखीव.")}</p>
          {/* <p className="text-primary-foreground/60">{t("प्रेमाने आणि सेवाभावाने निर्मित")} ❤</p> */}
        </div>
      </div>
    </footer>
  );
}