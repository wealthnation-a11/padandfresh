import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useDonations, type DonationRow } from "@/hooks/use-donations";
import { donationLabel, formatNaira, timeAgo } from "@/lib/format";

function displayName(d: DonationRow): string {
  if (d.is_anonymous) return "Anonymous";
  if (!d.display_publicly) return "A kind donor";
  return d.donor_name?.trim() || "Anonymous";
}

export function LiveDonationFeed({ limit = 10 }: { limit?: number }) {
  const { donations } = useDonations(limit);

  if (donations.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
        Be the first to make a donation today — your name will appear right here. 💜
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      <AnimatePresence initial={false}>
        {donations.slice(0, limit).map((d) => (
          <motion.li
            key={d.id}
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm"
          >
            <span
              className={
                "grid h-9 w-9 shrink-0 place-items-center rounded-full text-white " +
                (d.donation_type === "fresh_boy"
                  ? "bg-gradient-boy"
                  : d.donation_type === "both" || d.donation_type === "sponsor_10"
                  ? "bg-gradient-both"
                  : "bg-gradient-girl")
              }
            >
              <Heart className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">
                <span className="font-semibold">{displayName(d)}</span>{" "}
                <span className="text-muted-foreground">donated</span>{" "}
                <span className="font-semibold">{formatNaira(Number(d.amount))}</span>{" "}
                <span className="text-muted-foreground">{donationLabel(d.donation_type)}</span>
              </p>
              <p className="text-xs text-muted-foreground">{timeAgo(d.created_at)}</p>
            </div>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
