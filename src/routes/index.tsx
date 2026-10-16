import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, HelpCircle, Search, Frame, Hammer, Send, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import hero from "@/assets/hero.jpg";
import kheyti from "@/assets/kheyti.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daastan Studio — Weaving stories of real change" },
      { name: "description", content: "A communications agency turning impact into stories people understand, remember, and act on." },
      { property: "og:title", content: "Daastan Studio — Weaving stories of real change" },
      { property: "og:description", content: "Impact becomes communication people understand, remember, and act on." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  { n: "01", t: "Read", d: "We immerse ourselves in your reports, data and field notes.", I: BookOpen },
  { n: "02", t: "Question", d: "We ask what others overlook — and listen closely.", I: HelpCircle },
  { n: "03", t: "Find", d: "We locate the human truth at the heart of the work.", I: Search },
  { n: "04", t: "Frame", d: "We shape a narrative your audience can hold on to.", I: Frame },
  { n: "05", t: "Build", d: "We craft films, words and visuals with care.", I: Hammer },
  { n: "06", t: "Travel", d: "We help the story reach the people it's meant for.", I: Send },
];

const services = [
  { t: "Story Strategy", d: "Finding the gap between the ground and the audience, and mapping a narrative to close it.", items: ["Communication audits", "Narrative frameworks", "Audience mapping"] },
  { t: "Story Creation", d: "Turning insight into films, writing, design and AI-assisted content that feels true.", items: ["Documentary & explainers", "Reports & case stories", "Visual identity"] },
  { t: "Story Amplification", d: "Making sure the story travels — to donors, partners, communities and policymakers.", items: ["Campaigns", "Social & digital", "Media outreach"] },
];

const partners = ["NGOs", "Foundations", "CSR", "Government Programmes", "Social Enterprises"];

const btn = "inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30";

function Index() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#top" className="text-sm font-semibold tracking-[0.3em]">DAASTAN STUDIO</a>
          <div className="flex items-center gap-8">
            <div className="hidden gap-8 text-sm text-muted-foreground md:flex">
              {["Approach", "Services", "Work"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="transition-colors hover:text-primary">{l}</a>
              ))}
            </div>
            <a href="#contact" className="rounded-full border border-foreground px-5 py-2 text-sm transition-colors hover:bg-foreground hover:text-background">Contact Us</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-36 pb-24 lg:grid-cols-12 lg:pt-44">
        <div className="animate-rise lg:col-span-7">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-primary">Communications for impact</p>
          <h1 className="text-6xl leading-[0.95] md:text-8xl">
            Weaving stories of <em className="text-primary">real change.</em>
          </h1>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Impact becomes communication people understand, remember, and act on.
          </p>
          <a href="#contact" className={`${btn} mt-10`}>Book a Discovery Call <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="animate-rise lg:col-span-5" style={{ animationDelay: "200ms" }}>
          <img src={hero} alt="Hands weaving earthy threads on a loom" width={1280} height={1536} className="aspect-[4/5] w-full rounded-t-full object-cover" />
        </div>
      </section>

      {/* Problem */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
          <h2 className="text-5xl md:text-7xl">What's <em className="text-primary">missing?</em></h2>
          <p className="self-end text-xl leading-relaxed md:text-2xl">
            Most organizations have a communication team, but lack an outside lens to see the specific gap between the ground work and the audience.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="approach" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Our approach</p>
            <h2 className="text-5xl md:text-6xl">How it works</h2>
          </div>
          <p className="max-w-sm text-muted-foreground">Six deliberate steps, from listening to the ground to carrying the story outward.</p>
        </div>
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(({ n, t, d, I }) => (
            <div key={n} className="group border-b border-r border-border p-10 transition-colors hover:bg-card">
              <div className="flex items-start justify-between">
                <span className="font-display text-lg text-muted-foreground">{n}</span>
                <I strokeWidth={1.25} className="h-8 w-8 text-primary transition-transform group-hover:-rotate-6" />
              </div>
              <h3 className="mt-12 text-4xl">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-earth py-24 text-earth-foreground md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-sand">What we do</p>
          <h2 className="mb-16 text-5xl md:text-6xl">Services</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.t} className="flex flex-col rounded-xl border border-earth-foreground/15 p-8 transition-all hover:-translate-y-1 hover:border-primary">
                <span className="font-display text-6xl italic text-primary">{i + 1}</span>
                <h3 className="mt-8 text-3xl">{s.t}</h3>
                <p className="mt-4 text-sm leading-relaxed opacity-75">{s.d}</p>
                <ul className="mt-8 space-y-2 border-t border-earth-foreground/15 pt-6 text-sm">
                  {s.items.map((it) => <li key={it} className="opacity-90">— {it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section id="work" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Featured work</p>
        <div className="grid overflow-hidden rounded-2xl bg-card shadow-xl shadow-foreground/5 lg:grid-cols-2">
          <img src={kheyti} alt="Farmer watching an instructional video on his phone" loading="lazy" width={1280} height={960} className="h-full min-h-80 w-full object-cover" />
          <div className="p-10 md:p-14">
            <h2 className="text-5xl">Kheyti</h2>
            <p className="mt-2 text-muted-foreground">Farmer Education</p>
            <div className="mt-10 space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">The problem</p>
                <p className="mt-3 leading-relaxed">Teaching farmers a technical process — without the possibility of field shoots.</p>
              </div>
              <div className="h-px bg-border" />
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-primary">The outcome</p>
                <p className="mt-3 leading-relaxed">AI-generated instructional videos in Hindi, designed for mobile-first adoption in the field.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="overflow-hidden border-y border-border py-10">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">Who we work with</p>
        <div className="flex w-max animate-marquee">
          {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
            <span key={i} className="flex items-center whitespace-nowrap font-display text-4xl italic md:text-6xl">
              <span className="px-8">{p}</span><span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-earth text-earth-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="max-w-4xl font-display text-4xl leading-tight md:text-6xl">
            A story that carries meaning — that's what every <em className="text-primary">daastan</em> becomes.
          </p>
          <div className="mt-16 grid gap-6 border-t border-earth-foreground/15 pt-10 text-sm md:grid-cols-3">
            <a href="mailto:wearedastaan@gmail.com" className="flex items-center gap-3 hover:text-primary"><Mail className="h-4 w-4" /> wearedastaan@gmail.com</a>
            <a href="tel:+916268397386" className="flex items-center gap-3 hover:text-primary"><Phone className="h-4 w-4" /> +91 62683 97386</a>
            <span className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Bhopal</span>
          </div>
          <p className="mt-16 text-xs tracking-[0.3em] opacity-60">© {new Date().getFullYear()} DAASTAN STUDIO</p>
        </div>
      </footer>
    </div>
  );
}
