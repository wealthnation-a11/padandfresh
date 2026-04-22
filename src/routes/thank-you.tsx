import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Check, Facebook, Twitter, Linkedin, MessageCircle, Repeat, Home, Heart, Download, Mail } from "lucide-react";
import { formatNaira } from "@/lib/format";
import { downloadReceiptPDF, buildReceiptMailto, type ReceiptData } from "@/lib/receipt";
import { toast } from "sonner";

const SearchSchema = z.object({
  ref: z.string().optional(),
  amount: z.coerce.number().optional(),
  type: z.string().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
});

export const Route = createFileRoute("/thank-you")({
  validateSearch: (s) => SearchSchema.parse(s),
  head: () => ({
    meta: [{ title: "Thank you — PadAndFresh.ng" }],
  }),
  component: ThankYou,
});

function ThankYou() {
  const { ref, amount, type, name, email } = Route.useSearch();
  const shareText = encodeURIComponent(
    "I just supported a Nigerian youth through PadAndFresh.ng — ₦700 keeps a girl in school or a boy confident. Join me!"
  );
  const shareUrl = encodeURIComponent("https://padandfresh.ng");

  const receipt: ReceiptData = {
    reference: ref ?? "—",
    amount: amount ?? 0,
    type: type ?? "custom",
    donorName: name,
    email,
  };
  const canDownload = Boolean(ref && amount);

  function handleDownload() {
    if (!canDownload) {
      toast.error("Receipt details missing. Please contact support.");
      return;
    }
    try {
      downloadReceiptPDF(receipt);
      toast.success("Receipt downloaded 📄");
    } catch (e) {
      console.error(e);
      toast.error("Could not generate receipt.");
    }
  }

  function handleEmail() {
    if (!canDownload) {
      toast.error("Receipt details missing.");
      return;
    }
    window.location.href = buildReceiptMailto(receipt);
  }

  return (
    <div className="bg-gradient-soft">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-hero text-white shadow-glow-girl animate-pulse-glow">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold sm:text-5xl">THANK YOU!</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Your donation is changing a life right now. 💜💙
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Donation Summary</h2>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Paid</span>
          </div>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <Row label="Reference" value={ref ?? "—"} />
            <Row label="Amount" value={amount ? formatNaira(amount) : "—"} />
            <Row label="Program" value={prettyType(type)} />
            <Row label="Date" value={new Date().toLocaleString("en-NG")} />
          </dl>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!canDownload}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-hero px-5 py-3 text-sm font-semibold text-white shadow-glow-girl transition-opacity disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> Download receipt (PDF)
            </button>
            <button
              type="button"
              onClick={handleEmail}
              disabled={!canDownload}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-girl px-5 py-3 text-sm font-semibold text-girl transition-opacity disabled:opacity-50"
            >
              <Mail className="h-4 w-4" /> Email me a copy
            </button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Your receipt includes the Paystack reference, amount, program, and impact details.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="text-lg font-bold">What happens next</h2>
          <ol className="mt-4 space-y-3">
            {[
              "Your donation is logged immediately",
              "We purchase supplies within 48 hours",
              "Distribution to schools happens monthly",
              "You receive photo documentation within 2 weeks",
              "Monthly impact reports sent to your email",
            ].map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-hero text-xs font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 rounded-3xl bg-gradient-hero p-6 text-white shadow-soft sm:p-8">
          <h2 className="text-lg font-bold">Share Your Impact</h2>
          <p className="mt-1 text-sm text-white/90">Help us reach more donors. One share = more children supported.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Share href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`} icon={<Facebook className="h-4 w-4" />} label="Facebook" />
            <Share href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} icon={<Twitter className="h-4 w-4" />} label="Twitter" />
            <Share href={`https://wa.me/?text=${shareText}%20${shareUrl}`} icon={<MessageCircle className="h-4 w-4" />} label="WhatsApp" />
            <Share href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} icon={<Linkedin className="h-4 w-4" />} label="LinkedIn" />
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link to="/donate" search={{ type: undefined }} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-hero px-5 py-3 text-sm font-semibold text-white shadow-glow-girl">
            <Heart className="h-4 w-4" /> Donate Again
          </Link>
          <Link to="/donate" search={{ type: "pad_girl" }} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-girl px-5 py-3 text-sm font-semibold text-girl">
            <Repeat className="h-4 w-4" /> Set Up Monthly Giving
          </Link>
          <Link to="/" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold">
            <Home className="h-4 w-4" /> Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-accent/30 p-3">
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words font-semibold">{value}</dd>
    </div>
  );
}

function Share({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg bg-white/15 py-2.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/25">
      {icon} {label}
    </a>
  );
}

function prettyType(t?: string): string {
  switch (t) {
    case "pad_girl": return "Pad a Girl 💜";
    case "fresh_boy": return "Fresh Boy 💙";
    case "both": return "Support Both 💚";
    case "sponsor_10": return "Sponsor 10 Youth ✨";
    default: return "Custom donation";
  }
}
