import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, ArrowLeft, Check, Lock, CreditCard, Smartphone, Building2, Heart } from "lucide-react";
import { completeDonation } from "@/lib/donations.functions";
import { createDonation } from "@/lib/public-submissions.functions";
import { formatNaira } from "@/lib/format";
import { toast } from "sonner";

const SearchSchema = z.object({
  type: z.string().optional().transform((v) => (v === "pad_girl" || v === "fresh_boy" || v === "both" ? v : undefined)),
});

export const Route = createFileRoute("/donate")({
  validateSearch: (s) => SearchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Donate — PadAndFresh.ng" },
      { name: "description", content: "Give freely to keep a Nigerian girl in school or a Nigerian boy confident. Secured by Paystack." },
      { property: "og:title", content: "Donate to PadAndFresh.ng" },
      { property: "og:description", content: "Every gift changes a life. Secure, transparent, real-time tracked." },
    ],
  }),
  component: DonatePage,
});

type Plan = "pad_girl" | "fresh_boy" | "both";

const PLAN_INFO: Record<Plan, { label: string; emoji: string; desc: string; tone: string }> = {
  pad_girl:  { label: "Pad a Teenage Girl",   emoji: "💜", desc: "Pads + reproductive health education for one teenage girl", tone: "girl" },
  fresh_boy: { label: "Guard a Teenage Boy",  emoji: "💙", desc: "Deodorant, cologne + hygiene workshop for one teenage boy", tone: "boy" },
  both:      { label: "Support Both",          emoji: "💚", desc: "One girl + one boy. Maximum impact.",                        tone: "success" },
};

const MIN_AMOUNT = 100;

function DonatePage() {
  const startDonation = useServerFn(createDonation);
  const search = Route.useSearch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<Plan>(search.type ?? "pad_girl");
  const [amount, setAmount] = useState<number>(0);
  const [recurring, setRecurring] = useState<"once" | "monthly">("once");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [displayPublicly, setDisplayPublicly] = useState(true);
  const [anonymous, setAnonymous] = useState(false);
  const [updates, setUpdates] = useState(true);
  const [paying, setPaying] = useState(false);

  function next() {
    if (step === 3 && amount < MIN_AMOUNT) return toast.error(`Please enter at least ${formatNaira(MIN_AMOUNT)}.`);
    if (step === 4) {
      if (!name.trim() && !anonymous) return toast.error("Please enter your name or mark anonymous.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email.");
    }
    setStep((s) => Math.min(5, s + 1));
  }
  function back() { setStep((s) => Math.max(1, s - 1)); }

  async function handlePay() {
    setPaying(true);
    let ref: string;
    try {
      const created = await startDonation({ data: {
        amount,
        donation_type: plan,
        donor_name: anonymous ? null : name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        is_anonymous: anonymous,
        display_publicly: displayPublicly,
        is_recurring: recurring === "monthly",
        receive_updates: updates,
      } });
      if (!created.ok) throw new Error("Could not save donation");
      ref = created.reference;
    } catch {
      setPaying(false);
      toast.error("Could not start donation. Please try again.");
      return;
    }

    await new Promise((r) => setTimeout(r, 1400));
    const result = await completeDonation({ data: { reference: ref } });
    setPaying(false);

    if (!result.ok) { toast.error(result.error); return; }
    toast.success("Donation confirmed! 💜");
    navigate({
      to: "/thank-you",
      search: {
        ref, amount, type: plan,
        ...(anonymous ? {} : { name: name.trim() || undefined }),
        ...(email.trim() ? { email: email.trim() } : {}),
      },
    });
  }

  const showRunningTotal = step >= 3 && amount >= MIN_AMOUNT;

  return (
    <div className="bg-gradient-soft">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">Make a Donation</h1>
        <p className="mt-2 text-center text-muted-foreground">Give freely. 100% goes toward changing lives.</p>

        <Stepper step={step} />

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
          {step === 1 && <Step1 plan={plan} setPlan={setPlan} />}
          {step === 2 && <Step2 recurring={recurring} setRecurring={setRecurring} />}
          {step === 3 && <Step3Amount amount={amount} setAmount={setAmount} />}
          {step === 4 && (
            <Step4Info
              name={name} setName={setName}
              email={email} setEmail={setEmail}
              phone={phone} setPhone={setPhone}
              displayPublicly={displayPublicly} setDisplayPublicly={setDisplayPublicly}
              anonymous={anonymous} setAnonymous={setAnonymous}
              updates={updates} setUpdates={setUpdates}
            />
          )}
          {step === 5 && (
            <Step5Pay amount={amount} plan={plan} recurring={recurring} paying={paying} onPay={handlePay} />
          )}

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <button onClick={back} disabled={step === 1} className="inline-flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent disabled:opacity-40">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="text-sm text-muted-foreground">
              {showRunningTotal ? (
                <>Your gift: <span className="font-bold text-foreground">{formatNaira(amount)}</span>{recurring === "monthly" && <span className="ml-1 text-xs">/ month</span>}</>
              ) : (
                <span className="text-xs">Give whatever feels right.</span>
              )}
            </div>
            {step < 5 ? (
              <button onClick={next} className="inline-flex items-center gap-1 rounded-full bg-gradient-hero px-5 py-2 text-sm font-semibold text-white shadow-glow-girl">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : <span className="w-[88px]" />}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">🔒 Payments are processed securely. We never store your card details.</p>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const items = ["Program", "Type", "Gift", "Info", "Pay"];
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {items.map((label, i) => {
        const idx = i + 1;
        const active = step === idx;
        const done = step > idx;
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={"grid h-9 w-9 place-items-center rounded-full text-sm font-bold transition-colors " + (done ? "bg-success text-white" : active ? "bg-gradient-hero text-white shadow-glow-girl" : "bg-muted text-muted-foreground")}>
              {done ? <Check className="h-4 w-4" /> : idx}
            </div>
            <span className={"hidden text-sm font-medium sm:inline " + (active ? "text-foreground" : "text-muted-foreground")}>{label}</span>
            {idx < items.length && <span className="mx-1 h-px w-6 bg-border sm:w-10" />}
          </div>
        );
      })}
    </div>
  );
}

function Step1({ plan, setPlan }: { plan: Plan; setPlan: (p: Plan) => void }) {
  const options: Plan[] = ["pad_girl", "fresh_boy", "both"];
  return (
    <div>
      <h2 className="text-xl font-bold">Step 1 — Choose what you're supporting</h2>
      <p className="mt-1 text-sm text-muted-foreground">Pick the program you want your gift to fund.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {options.map((p) => {
          const info = PLAN_INFO[p];
          const selected = plan === p;
          const tone = info.tone;
          return (
            <button key={p} onClick={() => setPlan(p)} className={"group rounded-2xl border-2 p-4 text-left transition-all " + (selected ? `border-${tone} bg-${tone}/5` : "border-border bg-card hover:border-foreground/30")}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{info.emoji}</span>
                <span className={"grid h-5 w-5 place-items-center rounded-full border-2 " + (selected ? `bg-${tone} border-${tone} text-white` : "border-muted-foreground/30")}>
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </div>
              <div className="mt-2 font-bold">{info.label}</div>
              <div className="text-xs text-muted-foreground">{info.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step2({ recurring, setRecurring }: { recurring: "once" | "monthly"; setRecurring: (v: "once" | "monthly") => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Step 2 — Donation Type</h2>
      <p className="mt-1 text-sm text-muted-foreground">Make it count once, or change a life every month.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          { id: "once" as const, title: "One-time", desc: "Single donation. Immediate impact." },
          { id: "monthly" as const, title: "Monthly", desc: "Sustained impact. Cancel anytime." },
        ].map((opt) => {
          const selected = recurring === opt.id;
          return (
            <button key={opt.id} onClick={() => setRecurring(opt.id)} className={"rounded-2xl border-2 p-5 text-left transition-all " + (selected ? "border-girl bg-girl/5" : "border-border bg-card hover:border-foreground/30")}>
              <div className="flex items-center justify-between">
                <span className="font-bold">{opt.title}</span>
                <span className={"grid h-5 w-5 place-items-center rounded-full border-2 " + (selected ? "bg-girl border-girl text-white" : "border-muted-foreground/30")}>
                  {selected && <Check className="h-3 w-3" />}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{opt.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Step3Amount({ amount, setAmount }: { amount: number; setAmount: (n: number) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Step 3 — Your Gift</h2>
      <p className="mt-1 text-sm text-muted-foreground">Give whatever feels right to you. Every naira reaches a child.</p>
      <div className="mt-6 rounded-2xl border border-border bg-accent/30 p-5">
        <label htmlFor="amount" className="text-sm font-semibold">Amount (₦)</label>
        <div className="relative mt-2">
          <span className="pointer-events-none absolute inset-y-0 left-0 grid w-12 place-items-center text-2xl font-bold text-muted-foreground">₦</span>
          <input
            id="amount"
            type="number"
            inputMode="numeric"
            min={MIN_AMOUNT}
            value={amount || ""}
            placeholder="0"
            onChange={(e) => setAmount(Math.max(0, Math.floor(Number(e.target.value) || 0)))}
            className="w-full rounded-xl border-2 border-input bg-background py-4 pl-12 pr-4 text-3xl font-extrabold tabular-nums focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Minimum {formatNaira(MIN_AMOUNT)}. There is no maximum — give what your heart says.</p>
      </div>
    </div>
  );
}

function Step4Info(props: {
  name: string; setName: (s: string) => void;
  email: string; setEmail: (s: string) => void;
  phone: string; setPhone: (s: string) => void;
  displayPublicly: boolean; setDisplayPublicly: (b: boolean) => void;
  anonymous: boolean; setAnonymous: (b: boolean) => void;
  updates: boolean; setUpdates: (b: boolean) => void;
}) {
  const { name, setName, email, setEmail, phone, setPhone, displayPublicly, setDisplayPublicly, anonymous, setAnonymous, updates, setUpdates } = props;
  return (
    <div>
      <h2 className="text-xl font-bold">Step 4 — Your Information</h2>
      <p className="mt-1 text-sm text-muted-foreground">We'll send your receipt and impact updates here.</p>
      <div className="mt-6 grid gap-4">
        <Field label="Full Name *" value={name} onChange={setName} placeholder="Adaeze Okafor" />
        <Field label="Email Address *" type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
        <Field label="Phone (optional)" value={phone} onChange={setPhone} placeholder="0801 234 5678" />
        <div className="space-y-2 rounded-xl border border-border bg-accent/30 p-4">
          <Check2 checked={displayPublicly} onChange={setDisplayPublicly} label="Display my name publicly on the donor wall" />
          <Check2 checked={anonymous} onChange={setAnonymous} label="Make this donation anonymous" />
          <Check2 checked={updates} onChange={setUpdates} label="Send me monthly impact updates via email" />
        </div>
      </div>
    </div>
  );
}

function Step5Pay({ amount, plan, recurring, paying, onPay }: { amount: number; plan: Plan; recurring: "once" | "monthly"; paying: boolean; onPay: () => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold">Step 5 — Payment</h2>
      <p className="mt-1 text-sm text-muted-foreground">Review and complete your donation.</p>
      <div className="mt-6 rounded-2xl border border-border bg-gradient-soft p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Program</span>
          <span className="font-semibold">{PLAN_INFO[plan].label}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Frequency</span>
          <span className="font-semibold capitalize">{recurring === "monthly" ? "Monthly" : "One-time"}</span>
        </div>
        <div className="mt-4 border-t border-border pt-4 flex items-center justify-between">
          <span className="font-semibold">Your gift</span>
          <span className="text-2xl font-extrabold">{formatNaira(amount)}</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { icon: <CreditCard className="h-4 w-4" />, label: "Card" },
          { icon: <Building2 className="h-4 w-4" />, label: "Bank" },
          { icon: <Smartphone className="h-4 w-4" />, label: "USSD" },
        ].map((m) => (
          <div key={m.label} className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold">
            {m.icon} {m.label}
          </div>
        ))}
      </div>

      <button onClick={onPay} disabled={paying || amount < MIN_AMOUNT} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-hero py-4 text-base font-bold text-white shadow-glow-girl transition-transform hover:-translate-y-0.5 disabled:opacity-70">
        {paying ? <>Processing your gift...</> : <><Heart className="h-5 w-5" /> DONATE {formatNaira(amount)}</>}
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" /> Secured by Paystack
      </p>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}

function Check2({ checked, onChange, label }: { checked: boolean; onChange: (b: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-2">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 rounded border-input accent-[var(--girl)]" />
      <span className="text-sm">{label}</span>
    </label>
  );
}
