export function formatNaira(n: number): string {
  if (!Number.isFinite(n)) return "₦0";
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  const diff = Math.max(0, Date.now() - then);
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function impactCounts(type: string, amount: number): { girls: number; boys: number } {
  switch (type) {
    case "pad_girl":
      return { girls: 1, boys: 0 };
    case "fresh_boy":
      return { girls: 0, boys: 1 };
    case "both":
      return { girls: 1, boys: 1 };
    case "sponsor_10":
      return { girls: 5, boys: 5 };
    case "custom":
    default: {
      // 1 unit per ₦700, split half/half
      const units = Math.floor(amount / 700);
      const girls = Math.ceil(units / 2);
      const boys = Math.floor(units / 2);
      return { girls, boys };
    }
  }
}

export function donationLabel(type: string): string {
  switch (type) {
    case "pad_girl": return "for a girl";
    case "fresh_boy": return "for a boy";
    case "both": return "for a girl & a boy";
    case "sponsor_10": return "to sponsor 10 youth";
    default: return "for Nigerian youth";
  }
}
