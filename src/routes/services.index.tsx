import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { PageHero, Section } from "@/components/ui/Section";
import { BandLabel } from "@/components/ui/Section";
import { Users, ArrowRight, CheckCircle2 } from "lucide-react";
import icon1 from "@/assets/register.png";
import icon2 from "@/assets/family_info.png";
import icon3 from "@/assets/verify_details.png";
import icon4 from "@/assets/submit_app.png";
import icon5 from "@/assets/update_app.png";
import videobg from "@/assets/bg-main.png";
import servicebg from "@/assets/sevabg.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "सेवा | कोहळी समाज विकास मंडळ नागपूर" },
      { name: "description", content: "समाजाच्या सामाजिक, शैक्षणिक आणि आर्थिक विकासासाठी Kohli Patil Socio-Economic Portal — माहिती संकलन, नियोजन आणि पारदर्शक डिजिटल व्यवस्थापन." },
      { property: "og:title", content: "सेवा | कोहळी समाज विकास मंडळ नागपूर" },
      { property: "og:description", content: "समाज विकासासाठी आधुनिक डिजिटल सेवा." },
    ],
  }),
  component: ServicesIndex,
});

const services = [
  {
    href: "https://wmegroup.in/wmeclient/kohali_connect/auth-login.php",
    icon: <Users className="h-7 w-7" />,
    no: "01",
    title: "Kohli Patil Socio-Economic Portal",
    desc: "समाजाची सामाजिक, शैक्षणिक, आर्थिक आणि व्यावसायिक माहिती एकत्रित करणारे डिजिटल विकास पोर्टल.",
  },
];

const steps = [
  {
    title: "नोंदणी करा",
    desc: "आपला मोबाईल क्रमांक वापरून पोर्टलवर नोंदणी करा आणि सुरक्षितपणे लॉगिन करा.",
    icon: icon1,
  },
  {
    title: "कुटुंबाची माहिती भरा",
    desc: "कुटुंब प्रमुख, सदस्यांची माहिती, शिक्षण, व्यवसाय, उत्पन्न, शेती, निवास आणि इतर आवश्यक तपशील अचूकपणे नोंदवा.",
    icon:icon2,
  },
  {
    title: "माहिती पडताळा",
    desc: "सबमिट करण्यापूर्वी भरलेली सर्व माहिती तपासून तिची अचूकता सुनिश्चित करा.",
    icon:icon3,
  },
  {
    title: "अर्ज सबमिट करा",
    desc: "सर्व माहिती पूर्ण झाल्यानंतर फॉर्म सबमिट करा. यानंतर आपली माहिती सुरक्षितपणे प्रणालीमध्ये जतन केली जाईल.",
    icon:icon4,
  },
  {
    title: "भविष्यात माहिती अद्यतनित करा",
    desc: "कुटुंबातील किंवा वैयक्तिक माहितीमध्ये बदल झाल्यास पोर्टलवर लॉगिन करून ती अद्यतनित करता येईल.",
    icon:icon5,
  },
];

const benefits = [
  "समाजाची अचूक व अद्ययावत माहिती उपलब्ध होते.",
  "विकासात्मक योजना आणि उपक्रमांचे प्रभावी नियोजन करता येते.",
  "शैक्षणिक, सामाजिक आणि आर्थिक गरजा ओळखण्यास मदत होते.",
  "समाजातील पात्र लाभार्थ्यांपर्यंत योजना आणि सुविधा पोहोचविणे सुलभ होते.",
  "डिजिटल आणि पारदर्शक माहिती व्यवस्थापन सुनिश्चित होते.",
];

/* ============================================================
   SERVICES PREVIEW DATA
   ============================================================ */
const servicesPreview = [
  {
    href: "https://wmegroup.in/wmeclient/kohali_connect/auth-login.php",
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
function ServicesIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Services"
        title="सेवा"
        subtitle="समाज विकासासाठी आधुनिक डिजिटल सेवा — एका व्यासपीठावर."
        backgroundImage={servicebg}
      />
      
      <Section>
        <BandLabel
            eyebrow="Services"
            title={"समाज विकासासाठी आधुनिक डिजिटल सेवा"}
            sub={"शैक्षणिक, सामाजिक आणि आर्थिक प्रगतीसाठी विविध डिजिटल सेवा एकाच व्यासपीठावर."}
          />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                  className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-[var(--maroon-900)] px-6 py-9 text-center backdrop-blur-sm transition-all duration-300 sm:px-7 sm:py-10 ${
                    comingSoon ? "cursor-default" : "hover:-translate-y-1.5"
                  }`}
                >
                  <span className="pointer-events-none absolute left-4 top-4 h-5 w-5 border-l border-t border-[var(--gold-400)]/40" />
                  <span className="pointer-events-none absolute bottom-4 right-4 h-5 w-5 border-b border-r border-[var(--gold-400)]/40" />

                  {comingSoon && (
                    <>
                      <div className="pointer-events-none absolute -right-11 top-6 w-40 rotate-45 bg-[var(--gold-stroke))] py-1 text-center shadow-md">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--maroon-950)]">
                          लवकरच
                        </span>
                      </div>
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
                    {s.title}
                  </h3>
                  <p className={`relative z-[1] mt-2.5 text-sm leading-relaxed ${comingSoon ? "text-white/35" : "text-white/60"}`}>
                    {s.desc}
                  </p>

                  {!comingSoon && (
                    <span className="relative z-[1] mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--gold-400)]">
                      अधिक जाणून घ्या <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  )}
                </CardTag>
              );
            })}
          </div>
        </Section>
        {/* How to use the portal */}
         <div
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
              
        <div className="">
          
            <BandLabel
                eyebrow={"वापराची प्रक्रिया"}
                title={"Kohli Patil Socio-Economic Portal ही सेवा कशी वापरावी?"}
                sub={"ही पोर्टल समाजातील व्यक्ती, कुटुंबे आणि संस्थांची सामाजिक, शैक्षणिक व आर्थिक माहिती संकलित करण्यासाठी विकसित करण्यात आलेली डिजिटल सेवा आहे. अचूक माहिती संकलित करून समाजाच्या विकासासाठी प्रभावी नियोजन, उपक्रमांची अंमलबजावणी आणि आवश्यक सेवा योग्य व्यक्तींपर्यंत पोहोचविण्यात हे पोर्टल महत्त्वाची भूमिका बजावते."}
              />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {steps.map((step) => (
              <div className="text-center" key={step.title}>
                <div className="relative h-full w-full group">
                  {/* Icon */}
                  <div className="mx-auto flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[var(--maroon-910)] text-[#bd8d4c] transition-all duration-300 group-hover:bg-[#ceb036] group-hover:text-[#f2e0c8]">
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="h-[60px] w-[60px] object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h4 className="mt-4 text-base font-extrabold text-[var(--maroon-910)] transition-colors duration-300 group-hover:text-[#ceb036]">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <div className="mt-2 text-[15px] leading-[1.63] text-[#070301]">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
          </div>

        </div>

        <Section>
          
          <div className="rounded-2xl">
         <div className="mb-8">
           <BandLabel
                eyebrow={"Benefits"}
                title={" या सेवेचे फायदे"}
                // sub={"ही पोर्टल समाजातील व्यक्ती, कुटुंबे आणि संस्थांची सामाजिक, शैक्षणिक व आर्थिक माहिती संकलित करण्यासाठी विकसित करण्यात आलेली डिजिटल सेवा आहे. अचूक माहिती संकलित करून समाजाच्या विकासासाठी प्रभावी नियोजन, उपक्रमांची अंमलबजावणी आणि आवश्यक सेवा योग्य व्यक्तींपर्यंत पोहोचविण्यात हे पोर्टल महत्त्वाची भूमिका बजावते."}
              />
         </div>
            
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 rounded-lg bg-[var(--maroon-910)] p-4 text-sm text-white sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-center text-lg font-bold italic text-muted-foreground">
              आपली अचूक माहिती ही समाजाच्या उज्ज्वल आणि प्रगत भविष्यासाठी महत्त्वपूर्ण योगदान आहे.
            </p>
          </div>
        </Section>
     
    </SiteLayout>
  );
}