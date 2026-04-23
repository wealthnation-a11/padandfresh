import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Heart, Shield, Sparkles, Check } from "lucide-react";
import flyer from "@/assets/pad-a-girl-flyer.jpg";
import { LiveStatsStrip } from "@/components/LiveStatsStrip";

export const Route = createFileRoute("/pad-a-teenage-girl")({
  head: () => ({
    meta: [
      { title: "Pad a Teenage Girl — PadAndFresh.ng" },
      {
        name: "description",
        content:
          "Sponsor sanitary pads + reproductive health education for a Nigerian teenage girl. Keep her in school, healthy, and confident.",
      },
      { property: "og:title", content: "Pad a Teenage Girl — PadAndFresh.ng" },
      {
        property: "og:description",
        content: "Give freely. Pads, education, dignity — for one Nigerian teenage girl.",
      },
    ],
  }),
  component: PadAGirlPage,
});

function PadAGirlPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-girl text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> A Prescribly Initiative
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              PAD A TEENAGE GIRL
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/90">
              Every month, thousands of Nigerian girls miss school because they can't afford sanitary pads.
              Your gift gives her pads, knowledge, and the dignity to stay in class.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/donate"
                search={{ type: "pad_girl" }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-girl shadow-soft transition-transform hover:-translate-y-0.5"
              >
                💜 Sponsor a Girl <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-transform hover:-translate-y-0.5"
              >
                See the Outreach
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border-4 border-white/20 bg-white/10 p-2 shadow-soft backdrop-blur">
            <img
              src={flyer}
              alt="Pad a Teenage Girl outreach flyer"
              width={1024}
              height={1536}
              className="h-auto w-full rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Live impact */}
      <section className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
        <LiveStatsStrip variant="girl" />
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">What Your Gift Provides</h2>
        <p className="mt-2 text-center text-muted-foreground">Every donation funds a complete care package for one teenage girl.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <FeatureCard icon={<Heart className="h-5 w-5" />} title="Quality Sanitary Pads" desc="A pack of Softcare sanitary pads — enough for an entire monthly cycle." />
          <FeatureCard icon={<BookOpen className="h-5 w-5" />} title="Reproductive Health Education" desc="A facilitated session on body literacy, hygiene, periods, and self-care." />
          <FeatureCard icon={<Shield className="h-5 w-5" />} title="Confidence & Safety" desc="Education on pregnancy risks, consent, and staying safe — keeping her in school." />
        </div>
      </section>

      {/* Why */}
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">Why It Matters</h2>
          <ul className="mt-6 space-y-3 text-base text-muted-foreground">
            {[
              "60% of Nigerian girls miss school during their periods",
              "1 in 10 girls drops out entirely due to period poverty",
              "Many girls go without basic body literacy until it's too late",
              "Your gift removes these barriers entirely — and quietly changes a life",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-girl" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-girl p-10 text-center text-white shadow-glow-girl sm:p-14">
          <Heart className="mx-auto h-10 w-10" />
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">One girl. One whole future.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">Give freely. 100% of your gift goes toward her dignity.</p>
          <Link
            to="/donate"
            search={{ type: "pad_girl" }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-girl shadow-soft hover:-translate-y-0.5 transition-transform"
          >
            Sponsor a Girl <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-girl/10 text-girl">{icon}</span>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
