import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, Heart, Quote } from "lucide-react";
import { useDonations } from "@/hooks/use-donations";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — PadAndFresh.ng" },
      { name: "description", content: "How PadAndFresh.ng started, our two programs (Pad a Girl, Fresh Boy), and the founder behind the mission." },
      { property: "og:title", content: "About PadAndFresh.ng" },
      { property: "og:description", content: "Built by Prescribly. Driven by dignity. Funded by Nigerians who care." },
    ],
  }),
  component: About,
});

function About() {
  const { stats } = useDonations();
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">About PadAndFresh</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            A Prescribly community initiative. Built before our app launches. Built because dignity can't wait.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-bold sm:text-3xl">How this started</h2>
        <div className="mt-4 space-y-4 text-muted-foreground">
          <p>
            Before bringing AI healthcare to Nigeria, the Prescribly team wanted to show up for our
            community with something tangible. Something a parent would understand. Something that
            changes a child's school day immediately.
          </p>
          <p>
            We chose two of the most-cited, most-overlooked barriers Kaduna youth face every month:
            period poverty for girls, and hygiene-related bullying for boys. ₦700 solves each.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <ProgramCard tone="girl" emoji="💜" title="Pad a Girl Program" price="₦700 per girl" body="Period poverty forces thousands of Nigerian girls to miss school monthly. Our program provides:" items={[
            "Quality Softcare sanitary pads (one month supply)",
            "Reproductive health education workshop",
            "Understanding their bodies and menstrual health",
            "Dignity and confidence to stay in school",
          ]} />
          <ProgramCard tone="boy" emoji="💙" title="Fresh Boy Program" price="₦700 per boy" body="Puberty brings challenges for boys we rarely discuss. Body odor and poor hygiene lead to bullying and isolation. Our program provides:" items={[
            "Quality roll-on deodorant (prevents body odor)",
            "Age-appropriate cologne / perfume (builds confidence)",
            "Hygiene education workshop (teaches proper grooming)",
            "Tools to walk into school with dignity",
          ]} />
        </div>
      </section>

      {/* Why Fresh Boy */}
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Why a Fresh Boy program?</h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Puberty brings challenges for boys that we rarely talk about openly. Body odor, lack
              of access to basic hygiene products, and the devastating effects of peer bullying can
              crush a young boy's confidence and lead to school avoidance.
            </p>
            <p>
              Many families in Kaduna cannot afford the ₦700 for a roll-on deodorant and cologne.
              Boys suffer in silence, face daily humiliation, and begin to isolate themselves.
            </p>
            <p>
              The Fresh Boy Program addresses this by providing quality hygiene products and
              education. For ₦700, we give a boy the tools to walk into school with his head high,
              free from bullying, ready to learn and thrive.
            </p>
            <p className="font-semibold text-foreground">
              Because dignity isn't just for girls. Every child deserves to feel confident and valued.
            </p>
          </div>
        </div>
      </section>

      {/* Live impact strip */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Our impact, live</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ImpactStat label="Youth supported" value={(stats.girls + stats.boys).toLocaleString()} />
          <ImpactStat label="Total raised" value={formatNaira(stats.total)} />
          <ImpactStat label="Donors" value={stats.donors.toLocaleString()} />
          <ImpactStat label="States covered" value="1 → expanding" />
        </div>
      </section>

      {/* Founder */}
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <div className="rounded-3xl bg-card p-6 shadow-soft sm:p-10">
            <div className="flex flex-col items-start gap-6 sm:flex-row">
              <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-hero text-3xl font-extrabold text-white shadow-glow-girl">
                JA
              </div>
              <div>
                <h3 className="text-2xl font-bold">Joshua Augustine</h3>
                <p className="text-sm text-muted-foreground">Founder · CEO, Prescribly · Tech Entrepreneur · Youth Advocate</p>
                <blockquote className="relative mt-4 rounded-xl bg-accent p-4 text-sm">
                  <Quote className="absolute -top-2 -left-2 h-5 w-5 text-girl" />
                  "Before we bring AI healthcare to Nigeria, we wanted to show up for our community
                  with something tangible. PadAndFresh isn't a side project — it's our values in action."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-success text-white">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-bold">Radical transparency</h2>
          </div>
          <p className="mt-3 text-muted-foreground">
            Every donation is tracked publicly. Every distribution is documented with photos. Every
            naira is accounted for. View our <Link to="/dashboard" className="font-semibold text-girl hover:underline">live impact dashboard</Link> any time.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-hero p-10 text-center text-white shadow-soft sm:p-14">
          <Heart className="mx-auto h-10 w-10 animate-pulse-glow" />
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Be part of the story.</h2>
          <Link
            to="/donate"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-girl shadow-soft"
          >
            Donate ₦700 now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ProgramCard({ tone, emoji, title, price, body, items }: { tone: "girl" | "boy"; emoji: string; title: string; price: string; body: string; items: string[] }) {
  const bg = tone === "girl" ? "bg-gradient-girl" : "bg-gradient-boy";
  return (
    <div className={`rounded-3xl ${bg} p-7 text-white shadow-soft`}>
      <div className="text-3xl">{emoji}</div>
      <h3 className="mt-2 text-2xl font-extrabold">{title}</h3>
      <p className="mt-1 text-sm font-semibold text-white/90">{price}</p>
      <p className="mt-4 text-sm text-white/95">{body}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/25 text-[10px]">✓</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ImpactStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 text-center shadow-sm">
      <div className="text-2xl font-extrabold tabular-nums sm:text-3xl">{value}</div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
