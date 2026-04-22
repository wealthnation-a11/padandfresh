import { createFileRoute } from "@tanstack/react-router";
import { useDonations } from "@/hooks/use-donations";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { LiveDonationFeed } from "@/components/LiveDonationFeed";
import { useMemo, useState } from "react";
import { formatNaira } from "@/lib/format";
import { Trophy, Medal } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Live Impact Dashboard — PadAndFresh.ng" },
      { name: "description", content: "Track every donation live. Total raised, girls padded, boys freshed, and our top donors — updated in real time." },
      { property: "og:title", content: "Live Impact Dashboard — PadAndFresh.ng" },
      { property: "og:description", content: "Total raised, girls padded, boys freshed — updated in real time." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { donations, stats } = useDonations(50);
  const [tab, setTab] = useState<"month" | "all">("month");
  const goal = 1000;

  const leaderboard = useMemo(() => {
    const cutoff = tab === "month" ? Date.now() - 30 * 24 * 60 * 60 * 1000 : 0;
    const filtered = donations.filter((d) => new Date(d.created_at).getTime() >= cutoff);
    const map = new Map<string, { name: string; amount: number; youth: number }>();
    for (const d of filtered) {
      if (d.is_anonymous || !d.display_publicly) continue;
      const key = (d.donor_name ?? "Anonymous").toLowerCase();
      const cur = map.get(key) ?? { name: d.donor_name ?? "Anonymous", amount: 0, youth: 0 };
      cur.amount += Number(d.amount);
      cur.youth += (d.girls_count ?? 0) + (d.boys_count ?? 0);
      map.set(key, cur);
    }
    return Array.from(map.values()).sort((a, b) => b.amount - a.amount).slice(0, 10);
  }, [donations, tab]);

  // Donation type breakdown
  const breakdown = useMemo(() => {
    const out = { pad_girl: 0, fresh_boy: 0, both: 0, other: 0 };
    for (const d of donations) {
      if (d.donation_type === "pad_girl") out.pad_girl += Number(d.amount);
      else if (d.donation_type === "fresh_boy") out.fresh_boy += Number(d.amount);
      else if (d.donation_type === "both") out.both += Number(d.amount);
      else out.other += Number(d.amount);
    }
    const total = out.pad_girl + out.fresh_boy + out.both + out.other || 1;
    return { ...out, total };
  }, [donations]);

  return (
    <div className="bg-gradient-soft">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            LIVE
          </span>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Impact Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Every number is live. Every naira is tracked.</p>
        </div>

        {/* Top stats */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <BigStat label="Total raised" value={stats.total} prefix="₦" tone="hero" />
          <BigStat label="Girls padded" value={stats.girls} suffix={` / ${goal}`} tone="girl" pct={(stats.girls / goal) * 100} />
          <BigStat label="Boys freshed" value={stats.boys} suffix={` / ${goal}`} tone="boy" pct={(stats.boys / goal) * 100} />
          <BigStat label="Youth supported" value={stats.girls + stats.boys} tone="success" />
          <BigStat label="Unique donors" value={stats.donors} tone="hero" />
        </div>

        {/* Charts row */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Donation breakdown */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold">Donation Breakdown</h3>
            <p className="text-sm text-muted-foreground">By program</p>
            <div className="mt-6 space-y-4">
              <BreakdownBar label="Pad a Girl" value={breakdown.pad_girl} total={breakdown.total} colorClass="bg-gradient-girl" />
              <BreakdownBar label="Fresh Boy" value={breakdown.fresh_boy} total={breakdown.total} colorClass="bg-gradient-boy" />
              <BreakdownBar label="Support Both" value={breakdown.both} total={breakdown.total} colorClass="bg-gradient-both" />
              {breakdown.other > 0 && (
                <BreakdownBar label="Custom / Sponsor" value={breakdown.other} total={breakdown.total} colorClass="bg-gradient-hero" />
              )}
            </div>
          </div>

          {/* Live feed */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold">Live Donation Feed</h3>
            <p className="text-sm text-muted-foreground">Updates in real time</p>
            <div className="mt-6 max-h-[420px] overflow-y-auto pr-1">
              <LiveDonationFeed limit={20} />
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2"><Trophy className="h-5 w-5 text-girl" /> Top Donors</h3>
              <p className="text-sm text-muted-foreground">The people making this happen</p>
            </div>
            <div className="inline-flex rounded-full border border-border bg-background p-1">
              {[
                { id: "month" as const, label: "This Month" },
                { id: "all" as const, label: "All Time" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={"rounded-full px-4 py-1.5 text-sm font-semibold transition-colors " + (tab === t.id ? "bg-gradient-hero text-white shadow-glow-girl" : "text-muted-foreground hover:text-foreground")}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            {leaderboard.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                No public donors yet. Be the first! 💜
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Donor</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-right">Youth</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((row, i) => (
                    <tr key={row.name + i} className="border-t border-border">
                      <td className="px-4 py-3"><MedalCell rank={i + 1} /></td>
                      <td className="px-4 py-3 font-semibold">{row.name}</td>
                      <td className="px-4 py-3 text-right font-bold tabular-nums">{formatNaira(row.amount)}</td>
                      <td className="px-4 py-3 text-right tabular-nums">{row.youth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BigStat({ label, value, prefix, suffix, tone, pct }: { label: string; value: number; prefix?: string; suffix?: string; tone: "hero" | "girl" | "boy" | "success"; pct?: number }) {
  const bg = tone === "girl" ? "bg-gradient-girl" : tone === "boy" ? "bg-gradient-boy" : tone === "success" ? "bg-gradient-both" : "bg-gradient-hero";
  return (
    <div className={`rounded-3xl ${bg} p-5 text-white shadow-soft`}>
      <div className="text-sm font-semibold uppercase tracking-wider text-white/80">{label}</div>
      <div className="mt-2 text-3xl font-extrabold tabular-nums sm:text-4xl">
        <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
      {typeof pct === "number" && (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-white transition-all duration-1000" style={{ width: `${Math.min(100, pct)}%` }} />
        </div>
      )}
    </div>
  );
}

function BreakdownBar({ label, value, total, colorClass }: { label: string; value: number; total: number; colorClass: string }) {
  const pct = total > 0 ? (value / total) * 100 : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-semibold">{label}</span>
        <span className="tabular-nums text-muted-foreground">{formatNaira(value)} · {pct.toFixed(0)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full ${colorClass} transition-all duration-700`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MedalCell({ rank }: { rank: number }) {
  if (rank === 1) return <span className="inline-flex items-center gap-1 font-bold text-yellow-600"><Medal className="h-4 w-4" /> 1st</span>;
  if (rank === 2) return <span className="inline-flex items-center gap-1 font-bold text-zinc-500"><Medal className="h-4 w-4" /> 2nd</span>;
  if (rank === 3) return <span className="inline-flex items-center gap-1 font-bold text-amber-700"><Medal className="h-4 w-4" /> 3rd</span>;
  return <span className="font-bold text-muted-foreground">{rank}th</span>;
}
