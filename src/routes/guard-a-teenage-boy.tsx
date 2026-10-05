import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowRight, Shield, Sparkles, Check, Heart, Smile, Users } from "lucide-react";
import { LiveStatsStrip } from "@/components/LiveStatsStrip";

export const Route = createFileRoute("/guard-a-teenage-boy")({
  beforeLoad: () => { throw redirect({ to: "/campaigns/padandfresh/guard-a-boy", replace: true }); },
  head: () => ({
    meta: [
      { title: "Guard a Teenage Boy — PadAndFresh.ng" },
      {
        name: "description",
        content:
          "Sponsor hygiene, deodorant, cologne and education for a Nigerian teenage boy. Build his confidence and protect him from bullying.",
      },
      { property: "og:title", content: "Guard a Teenage Boy — PadAndFresh.ng" },
      {
        property: "og:description",
        content: "Give freely. Hygiene, confidence, and dignity for one Nigerian teenage boy.",
      },
    ],
  }),
  component: GuardABoyPage,
});

function GuardABoyPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-boy text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> A Prescribly Initiative
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            GUARD A TEENAGE BOY
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Confidence is contagious. Bullying is not. Help us hand a Nigerian teenage boy
            the simple hygiene tools he needs to walk into class with his head held high.
          </p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            <Link
              to="/donate"
              search={{ type: "fresh_boy" }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-base font-bold text-boy shadow-soft transition-transform hover:-translate-y-0.5"
            >
              💙 Guard a Boy <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              See the Outreach
            </Link>
          </div>
        </div>
      </section>

      {/* Live impact */}
      <section className="mx-auto -mt-8 max-w-5xl px-4 sm:px-6">
        <LiveStatsStrip variant="boy" />
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">What Your Gift Provides</h2>
        <p className="mt-2 text-center text-muted-foreground">Every donation funds a complete fresh kit for one teenage boy.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <FeatureCard icon={<Smile className="h-5 w-5" />} title="Quality Roll-On Deodorant" desc="A safe, age-appropriate roll-on so he stays fresh through long school days." />
          <FeatureCard icon={<Heart className="h-5 w-5" />} title="Cologne / Perfume" desc="A subtle age-appropriate cologne to reinforce dignity and personal pride." />
          <FeatureCard icon={<Shield className="h-5 w-5" />} title="Hygiene Workshop" desc="A facilitated session on grooming, confidence, and protecting his peers." />
        </div>
      </section>

      {/* Why */}
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">Why It Matters</h2>
          <ul className="mt-6 space-y-3 text-base text-muted-foreground">
            {[
              "Boys with poor hygiene face daily bullying and silent isolation",
              "Many homes simply can't afford basic toiletries for teenage boys",
              "Confidence early shapes a lifetime of better outcomes",
              "Your gift removes the barrier and replaces it with pride",
            ].map((p) => (
              <li key={p} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-boy" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-boy p-10 text-center text-white shadow-glow-boy sm:p-14">
          <Users className="mx-auto h-10 w-10" />
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">One boy. A whole new walk.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">Give freely. Build the confidence that lasts a lifetime.</p>
          <Link
            to="/donate"
            search={{ type: "fresh_boy" }}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-boy shadow-soft hover:-translate-y-0.5 transition-transform"
          >
            Guard a Boy <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-boy/10 text-boy">{icon}</span>
      <h3 className="mt-4 font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
