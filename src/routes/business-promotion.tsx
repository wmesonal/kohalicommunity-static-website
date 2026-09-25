import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Megaphone, User, Building2, Tag, FileText, MapPin, Navigation, Phone,
  MessageCircle, Globe, Link2, Image as ImageIcon, Video, Layers,
  Plus, X, CheckCircle2, ShieldCheck,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Section } from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/business-promotion")({
  head: () => ({
    meta: [{ title: "व्यवसाय प्रचार — कोहळी समाज विकास मंडळ नागपूर" }],
  }),
  component: BusinessPromotionPage,
});

/* ============================================================
   Applicant info — already captured by the survey form
   ============================================================ */
const applicant = {
  name: "Sanjay Kohali",
  mobile: "+91 98765 43210",
  village: "Nagpur, Maharashtra",
};

const categories = [
  "Construction & Real Estate",
  "Hotels & Restaurants",
  "Retail & Grocery",
  "Other",
] as const;

const adTypes = [
  { id: "poster", label: "Poster", icon: ImageIcon },
  { id: "video", label: "Video", icon: Video },
  { id: "both", label: "Poster + Video", icon: Layers },
] as const;

type AdType = (typeof adTypes)[number]["id"];

const FOCUS_RING =
  "focus:outline-none focus:ring-2 focus:ring-[var(--gold-500)]/40 focus:border-[var(--maroon-700)]";
const INPUT_CLS = `w-full rounded-lg border border-border bg-white px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors ${FOCUS_RING}`;

function Required() {
  return <span className="text-[var(--maroon-700)]">*</span>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-xs font-semibold text-foreground/80">{children}</label>;
}

function SectionCard({
  step,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  step: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold-500)]/15 text-xs font-bold text-[var(--maroon-800)]">
          {step}
        </span>
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
            <Icon className="h-4 w-4 text-[var(--maroon-800)]" />
            {title}
          </h3>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="my-5 border-t-2 border-dashed border-[var(--gold-500)]/40" />
      {children}
    </div>
  );
}

function BusinessPromotionPage() {
  const { t } = useLang();

  const [form, setForm] = useState({
    businessName: "",
    category: "",
    description: "",
    address: "",
    location: "",
    contact: "",
    whatsapp: "",
    website: "",
    adType: "" as AdType | "",
    adTitle: "",
    adDescription: "",
    agree: false,
  });
  const [socialLinks, setSocialLinks] = useState<string[]>([""]);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const updateSocial = (i: number, value: string) =>
    setSocialLinks((links) => links.map((l, idx) => (idx === i ? value : l)));
  const addSocial = () => setSocialLinks((links) => [...links, ""]);
  const removeSocial = (i: number) => setSocialLinks((links) => links.filter((_, idx) => idx !== i));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !form.businessName.trim() ||
      !form.category ||
      !form.description.trim() ||
      !form.address.trim() ||
      !form.contact.trim() ||
      !form.adType
    ) {
      setError(t("कृपया * चिन्हांकित सर्व आवश्यक माहिती भरा."));
      return;
    }
    if (!form.agree) {
      setError(t("पुढे जाण्यासाठी जाहिरात मार्गदर्शक तत्त्वांशी सहमत होणे आवश्यक आहे."));
      return;
    }
    setError("");
    // TODO: wire up to real submission endpoint
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SiteLayout>
        <Section>
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[var(--gold-500)]/15">
              <CheckCircle2 className="h-7 w-7 text-[var(--maroon-800)]" />
            </span>
            <h2 className="font-display text-lg font-bold text-foreground">
              {t("अर्ज यशस्वीरित्या सादर झाला")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("आमची समिती लवकरच तुमच्या अर्जाचा आढावा घेईल आणि तुमच्याशी संपर्क साधेल.")}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className={`mt-2 rounded-lg border border-[var(--maroon-800)] px-5 py-2 text-sm font-semibold text-[var(--maroon-800)] transition-colors hover:bg-[var(--maroon-800)]/5 ${FOCUS_RING}`}
            >
              {t("आणखी एक अर्ज सादर करा")}
            </button>
          </div>
        </Section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Header banner */}
      <div className="bg-gradient-to-br from-[var(--maroon-800)] to-[var(--maroon-700)] px-4 py-10 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--gold-500)]">
            <Megaphone className="h-6 w-6 text-[var(--maroon-950)]" />
          </span>
          <div>
            <h1 className="font-display text-xl font-bold text-white sm:text-2xl">
              {t("आपल्या व्यवसायाची जाहिरात करा")}
            </h1>
            <p className="mt-1 text-sm text-white/75">
              {t("Business Promotion Application Form")}
            </p>
          </div>
        </div>
      </div>

      <Section>
        <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl flex-col gap-6 py-8">
          {/* 01 — Applicant Information */}
          <SectionCard
            step="01"
            icon={User}
            title={t("Applicant Information")}
            subtitle={t("तुमच्या सर्वेक्षण फॉर्ममधून आधीच घेतलेली माहिती")}
          >
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Name")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{applicant.name}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Mobile")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{applicant.mobile}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">{t("Village / City")}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{applicant.village}</p>
              </div>
            </div>
          </SectionCard>

          {/* 02 — Business Information */}
          <SectionCard step="02" icon={Building2} title={t("Business Information")}>
            <div className="grid gap-4">
              <div>
                <Label>{t("Business Name")}<Required /></Label>
                <input
                  className={INPUT_CLS}
                  placeholder={t("उदा. कोहळी बिल्डकॉन प्रा. लि.")}
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label><Tag className="mr-1 inline h-3 w-3" />{t("Business Category")}<Required /></Label>
                  <select
                    className={INPUT_CLS}
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                  >
                    <option value="">{t("श्रेणी निवडा")}</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{t(c)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label><Phone className="mr-1 inline h-3 w-3" />{t("Contact Number")}<Required /></Label>
                  <input
                    type="tel"
                    className={INPUT_CLS}
                    placeholder="+91 XXXXX XXXXX"
                    value={form.contact}
                    onChange={(e) => update("contact", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label><FileText className="mr-1 inline h-3 w-3" />{t("Business Description")}<Required /></Label>
                <textarea
                  rows={3}
                  className={INPUT_CLS}
                  placeholder={t("तुमच्या व्यवसायाबद्दल थोडक्यात सांगा...")}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </div>

              <div>
                <Label><MapPin className="mr-1 inline h-3 w-3" />{t("Business Address")}<Required /></Label>
                <input
                  className={INPUT_CLS}
                  placeholder={t("पूर्ण पत्ता")}
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                />
              </div>

              <div>
                <Label><Navigation className="mr-1 inline h-3 w-3" />{t("Business Location")}</Label>
                <input
                  className={INPUT_CLS}
                  placeholder={t("शहर, गुगल मॅप्स लिंक किंवा पिनकोड")}
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label><MessageCircle className="mr-1 inline h-3 w-3" />{t("WhatsApp Number")}</Label>
                  <input
                    type="tel"
                    className={INPUT_CLS}
                    placeholder="+91 XXXXX XXXXX"
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                  />
                </div>
                <div>
                  <Label><Globe className="mr-1 inline h-3 w-3" />{t("Website")}</Label>
                  <input
                    className={INPUT_CLS}
                    placeholder="https://"
                    value={form.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label><Link2 className="mr-1 inline h-3 w-3" />{t("Social Media Links")}</Label>
                <div className="space-y-2">
                  {socialLinks.map((link, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        className={INPUT_CLS}
                        placeholder={t("Facebook, Instagram इ. लिंक")}
                        value={link}
                        onChange={(e) => updateSocial(i, e.target.value)}
                      />
                      {socialLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSocial(i)}
                          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground hover:border-[var(--maroon-700)] hover:text-[var(--maroon-700)] ${FOCUS_RING}`}
                          aria-label={t("Remove link")}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addSocial}
                    className={`flex items-center gap-1.5 text-xs font-semibold text-[var(--maroon-800)] ${FOCUS_RING}`}
                  >
                    <Plus className="h-3.5 w-3.5" /> {t("आणखी लिंक जोडा")}
                  </button>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 03 — Advertisement Information */}
          <SectionCard step="03" icon={Megaphone} title={t("Advertisement Information")}>
            <div className="grid gap-4">
              <div>
                <Label>{t("Advertisement Type")}<Required /></Label>
                <div className="grid grid-cols-3 gap-3">
                  {adTypes.map(({ id, label, icon: Icon }) => {
                    const active = form.adType === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => update("adType", id)}
                        aria-pressed={active}
                        className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-xs font-semibold transition-colors ${FOCUS_RING} ${
                          active
                            ? "border-[var(--maroon-800)] bg-[var(--maroon-800)]/5 text-[var(--maroon-800)]"
                            : "border-border text-muted-foreground hover:border-[var(--gold-500)]"
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${active ? "text-[var(--maroon-800)]" : ""}`} />
                        {t(label)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <Label>{t("Advertisement Title")}</Label>
                <input
                  className={INPUT_CLS}
                  placeholder={t("आकर्षक जाहिरात शीर्षक")}
                  value={form.adTitle}
                  onChange={(e) => update("adTitle", e.target.value)}
                />
              </div>

              <div>
                <Label>{t("Advertisement Description")}</Label>
                <textarea
                  rows={3}
                  className={INPUT_CLS}
                  placeholder={t("जाहिरातीत काय दाखवायचे आहे ते लिहा...")}
                  value={form.adDescription}
                  onChange={(e) => update("adDescription", e.target.value)}
                />
              </div>
            </div>
          </SectionCard>

          {/* Declaration */}
          <div className="rounded-2xl border border-[var(--gold-500)]/40 bg-[var(--gold-500)]/5 p-5">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.agree}
                onChange={(e) => update("agree", e.target.checked)}
                className={`mt-0.5 h-4 w-4 shrink-0 rounded border-border text-[var(--maroon-800)] ${FOCUS_RING}`}
              />
              <span className="flex items-start gap-2 text-sm text-foreground/80">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--maroon-800)]" />
                {t("I agree to the advertisement guidelines.")}
              </span>
            </label>
          </div>

          {error && (
            <p className="rounded-lg bg-[var(--maroon-800)]/5 px-4 py-2.5 text-sm font-medium text-[var(--maroon-800)]">
              {error}
            </p>
          )}

          <button
            type="submit"
            className={`rounded-xl bg-[var(--maroon-800)] px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-[var(--maroon-700)] ${FOCUS_RING}`}
          >
            {t("Submit")}
          </button>
        </form>
      </Section>
    </SiteLayout>
  );
}