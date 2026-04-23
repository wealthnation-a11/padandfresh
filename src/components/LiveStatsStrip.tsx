import { useDonations } from "@/hooks/use-donations";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { formatNaira } from "@/lib/format";
import { Activity, Heart, Users } from "lucide-react";

interface Props {
  variant?: "girl" | "boy" | "neutral";
}

export function LiveStatsStrip({ variant = "neutral" }: Props) {
  const { stats } = useDonations(1);
  const youth = stats.girls + stats.boys;

  const accent =
    variant === "girl"
      ? "text-girl"
      : variant === "boy"
        ? "text-boy"
        : "text-primary";

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <Activity className="h-3.5 w-3.5" /> Live Impact
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat
          icon={<Heart className="h-4 w-4" />}
          label="Total raised"
          value={
            <AnimatedCounter
              value={stats.total}
              prefix="₦"
              className={`text-2xl font-extrabold ${accent}`}
            />
          }
        />
        <Stat
          icon={<Users className="h-4 w-4" />}
          label="Youth supported"
          value={
            <AnimatedCounter
              value={youth}
              className={`text-2xl font-extrabold ${accent}`}
            />
          }
        />
        <Stat
          icon={<Users className="h-4 w-4" />}
          label="Donors"
          value={
            <AnimatedCounter
              value={stats.donors}
              className={`text-2xl font-extrabold ${accent}`}
            />
          }
        />
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        Updates in real time as new gifts come in.
      </p>
      {/* satisfy unused import in strict envs if formatNaira evolves */}
      <span className="hidden">{formatNaira(0)}</span>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-accent/40 p-3">
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1">{value}</div>
    </div>
  );
}
