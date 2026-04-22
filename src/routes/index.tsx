import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Sparkles, BookOpen, Shield, TrendingDown, Frown, DoorClosed, Lightbulb } from "lucide-react";
import heroImg from "@/assets/hero-youth.jpg";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { LiveDonationFeed } from "@/components/LiveDonationFeed";
import { useDonations } from "@/hooks/use-donations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PadAndFresh.ng — Keep them in school. Keep them confident." },
      {
        name: "description",
        content:
          "₦700. Two ways to change a Nigerian youth's life. Pad a Girl. Fresh Boy. Real-time impact tracking, transparent donations.",
      },
      { property: "og:title", content: "PadAndFresh.ng — Keep them in school. Keep them confident." },
      {
        property: "og:description",
        content: "₦700. Two ways to change a Nigerian youth's life. 1,000 Kaduna youth. Real impact, tracked live.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { stats } = useDonations();
  const goal = 1000;
  const girlsPct = Math.min(100, (stats.girls / goal) * 100);
  const boysPct = Math.min(100, (stats.boys / goal) * 100);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero text-white">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />

        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-20 sm:pb-28">
          <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> A Prescribly Initiative · Kaduna 2026
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              KEEP THEM IN SCHOOL.
              <br />
              <span className="bg-gradient-to-r from-white via-pink-100 to-blue-100 bg-clip-text text-transparent">
                KEEP THEM CONFIDENT.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
              ₦700. Two ways to change a Nigerian youth's life.
            </p>

            <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
              <Link
                to="/donate"
                search={{ type: "pad_girl" }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-girl px-7 py-4 text-base font-bold text-white shadow-glow-girl transition-transform hover:-translate-y-0.5 animate-float"
              >
                💜 Pad a Girl — ₦700
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/donate"
                search={{ type: "fresh_boy" }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-boy px-7 py-4 text-base font-bold text-white shadow-glow-boy transition-transform hover:-translate-y-0.5 animate-float"
                style={{ animationDelay: "0.2s" }}
              >
                💙 Fresh Boy — ₦700
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Live counters */}
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <CounterCard label="Total raised" value={stats.total} prefix="₦" />
            <CounterCard label="Girls padded" value={stats.girls} suffix={` / ${goal}`} />
            <CounterCard label="Boys freshed" value={stats.boys} suffix={` / ${goal}`} />
            <CounterCard label="Youth supported" value={stats.girls + stats.boys} />
            <CounterCard label="Donors this month" value={stats.donorsThisMonth} />
          </div>

          {/* progress bars */}
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 sm:grid-cols-2">
            <ProgressBar label="Pad a Girl progress" pct={girlsPct} colorClass="bg-girl" />
            <ProgressBar label="Fresh Boy progress" pct={boysPct} colorClass="bg-boy" />
          </div>
        </div>
      </section>

      {/* LIVE FEED */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              LIVE
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Real donations. Real time.</h2>
            <p className="mt-3 max-w-md text-muted-foreground">
              Every contribution updates this feed instantly. No spin, no marketing — just the
              kindness of Nigerians showing up for our youth.
            </p>
            <Link
              to="/dashboard"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-girl hover:underline"
            >
              View full impact dashboard <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <LiveDonationFeed limit={6} />
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-3xl font-bold sm:text-4xl">Our Mission</h2>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg text-muted-foreground">
            <p>
              Every month, thousands of Nigerian girls miss school because they can't afford
              sanitary pads. Thousands of boys lose confidence and face bullying due to poor hygiene.
            </p>
            <p className="font-semibold text-foreground">
              We're changing that — one child at a time.
            </p>
            <ul className="mx-auto inline-flex flex-col gap-2 text-left text-base">
              <li>• Quality sanitary pads + health education for girls (₦700)</li>
              <li>• Roll-on deodorant + cologne + hygiene education for boys (₦700)</li>
              <li>• Building dignity, confidence, and futures</li>
            </ul>
            <p className="text-base">
              Starting in <span className="font-semibold text-foreground">Kaduna State</span>. Expanding across Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">How It Works</h2>
        <p className="mt-3 text-center text-muted-foreground">Pick your impact. Pay securely. Watch lives change.</p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ImpactCard
            tone="girl"
            emoji="💜"
            title="PAD A GIRL"
            price="₦700"
            items={[
              "Pack of Softcare sanitary pads",
              "Reproductive health education session",
              "Keeps her in school all month long",
            ]}
            cta="Pad a Girl"
            type="pad_girl"
          />
          <ImpactCard
            tone="boy"
            emoji="💙"
            title="FRESH BOY"
            price="₦700"
            items={[
              "Quality roll-on deodorant",
              "Age-appropriate cologne / perfume",
              "Hygiene education workshop",
              "Builds confidence and prevents bullying",
            ]}
            cta="Fresh Boy"
            type="fresh_boy"
          />
          <ImpactCard
            tone="success"
            emoji="💚"
            title="SUPPORT BOTH"
            price="₦1,400"
            items={[
              "Transform two lives at once",
              "Complete gender inclusion",
              "Maximize your impact",
            ]}
            cta="Support Both"
            type="both"
          />
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="bg-gradient-soft">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">Why This Matters</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard icon={<BookOpen className="h-5 w-5" />} text="60% of Nigerian girls miss school during their periods" />
            <StatCard icon={<TrendingDown className="h-5 w-5" />} text="1 in 10 girls drops out due to period poverty" />
            <StatCard icon={<Frown className="h-5 w-5" />} text="Boys with poor hygiene face daily bullying" />
            <StatCard icon={<DoorClosed className="h-5 w-5" />} text="Lack of basic hygiene products keeps kids isolated" />
            <StatCard icon={<Lightbulb className="h-5 w-5" />} text="Your ₦700 removes these barriers entirely" highlight />
            <StatCard icon={<Shield className="h-5 w-5" />} text="100% of donations tracked publicly and transparently" />
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          In Partnership With
        </h3>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
          <PartnerLogo name="Softcare" subtitle="Sanitary pads" />
          <PartnerLogo name="Prescribly" subtitle="Founding partner" highlight />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-hero p-10 text-center text-white shadow-soft sm:p-14">
          <Heart className="mx-auto h-10 w-10 animate-pulse-glow" />
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Your ₦700 starts now.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            One donation. One child. A whole future changed.
          </p>
          <Link
            to="/donate"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-girl shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Donate Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function CounterCard({
  label,
  value,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md">
      <div className="text-2xl font-extrabold tabular-nums sm:text-3xl">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      <div className="mt-1 text-xs font-medium text-white/80">{label}</div>
    </div>
  );
}

function ProgressBar({ label, pct, colorClass }: { label: string; pct: number; colorClass: string }) {
  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between text-xs font-semibold text-white/90">
        <span>{label}</span>
        <span>{pct.toFixed(1)}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/20">
        <div
          className={`h-full rounded-full ${colorClass} transition-all duration-1000`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ImpactCard({
  tone,
  emoji,
  title,
  price,
  items,
  cta,
  type,
}: {
  tone: "girl" | "boy" | "success";
  emoji: string;
  title: string;
  price: string;
  items: string[];
  cta: string;
  type: string;
}) {
  const bg = tone === "girl" ? "bg-gradient-girl" : tone === "boy" ? "bg-gradient-boy" : "bg-gradient-both";
  const ring = tone === "girl" ? "shadow-glow-girl" : tone === "boy" ? "shadow-glow-boy" : "shadow-soft";
  return (
    <div className={`group relative overflow-hidden rounded-3xl ${bg} p-8 text-white ${ring} transition-transform hover:-translate-y-1`}>
      <div className="text-4xl">{emoji}</div>
      <h3 className="mt-3 text-2xl font-extrabold tracking-tight">{title}</h3>
      <p className="mt-1 text-3xl font-extrabold">{price}</p>
      <ul className="mt-6 space-y-2 text-sm text-white/95">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 text-[10px]">
              ✓
            </span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <Link
        to="/donate"
        search={{ type }}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-foreground transition-transform group-hover:scale-[1.02]"
      >
        {cta} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function StatCard({ icon, text, highlight }: { icon: React.ReactNode; text: string; highlight?: boolean }) {
  return (
    <div
      className={
        "flex items-start gap-3 rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 " +
        (highlight ? "border-girl bg-girl text-white" : "border-border bg-card")
      }
    >
      <span className={"grid h-9 w-9 shrink-0 place-items-center rounded-full " + (highlight ? "bg-white/20 text-white" : "bg-accent text-girl")}>
        {icon}
      </span>
      <p className={"text-sm font-medium leading-snug " + (highlight ? "text-white" : "")}>{text}</p>
    </div>
  );
}

function PartnerLogo({ name, subtitle, highlight }: { name: string; subtitle: string; highlight?: boolean }) {
  return (
    <div className={"flex items-center gap-3 rounded-2xl border px-5 py-3 " + (highlight ? "border-girl bg-accent" : "border-border bg-card")}>
      <span className={"grid h-10 w-10 place-items-center rounded-lg font-extrabold text-white " + (highlight ? "bg-gradient-hero" : "bg-gradient-boy")}>
        {name[0]}
      </span>
      <div>
        <div className="text-sm font-bold">{name}</div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>
    </div>
  );
}
