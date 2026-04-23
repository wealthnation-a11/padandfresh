import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Users, ArrowRight, Heart } from "lucide-react";
import flyer from "@/assets/pad-a-girl-flyer.png";
import { LiveStatsStrip } from "@/components/LiveStatsStrip";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — PadAndFresh.ng" },
      {
        name: "description",
        content:
          "Pad a Teenage Girl & Guard a Teenage Boy — upcoming community outreach events by Prescribly across Nigeria.",
      },
      { property: "og:title", content: "Events — PadAndFresh.ng" },
      {
        property: "og:description",
        content: "Join our hygiene & confidence outreach events for Nigerian youth.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/758e0d34-3757-46a8-a251-77987898d0b6/id-preview-18e79e4b--3bdcc6fb-f0bd-4b6c-9f28-5e145cbf2c94.lovable.app-1776855103436.png" },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div className="bg-gradient-soft">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-girl/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-girl">
            <Calendar className="h-3.5 w-3.5" /> Upcoming Outreach
          </span>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Events</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Outreach events that put pads, hygiene, education and confidence directly into the hands of Nigerian youth.
          </p>
        </div>

        <div className="mt-10">
          <LiveStatsStrip variant="neutral" />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Flyer */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
              <img
                src={flyer}
                alt="Pad a Teenage Girl, Guard a Teenage Boy — 500 pads sponsorship flyer by Prescribly"
                width={1024}
                height={1536}
                className="h-auto w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Event details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Pad a Teenage Girl · Guard a Teenage Boy
              </h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-girl">
                500 Pads Sponsorship Drive
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <InfoRow icon={<Calendar className="h-4 w-4" />} label="When" value="Rolling — 2026 cohorts" />
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Where" value="Kaduna, Nigeria" />
                <InfoRow icon={<Users className="h-4 w-4" />} label="Target" value="1,000 youth" />
                <InfoRow icon={<Heart className="h-4 w-4" />} label="Partner" value="Prescribly · Softcare" />
              </div>

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p className="font-semibold text-foreground">Our Mission</p>
                <ul className="space-y-1.5">
                  <li>• Providing sanitary pads to teenage girls in need</li>
                  <li>• Empowering them with knowledge about their bodies</li>
                  <li>• Educating them on sex, pregnancy and risk of pregnancy</li>
                  <li>• Hygiene education workshops for boys and girls</li>
                  <li>• Building confidence & preventing bullying</li>
                  <li>• Age-appropriate cologne / perfume for boys</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/donate"
                  search={{ type: "pad_girl" }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-girl px-6 py-3 text-sm font-bold text-white shadow-glow-girl transition-transform hover:-translate-y-0.5"
                >
                  💜 Sponsor a Girl <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/donate"
                  search={{ type: "fresh_boy" }}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-boy px-6 py-3 text-sm font-bold text-white shadow-glow-boy transition-transform hover:-translate-y-0.5"
                >
                  💙 Guard a Boy <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
              <h3 className="text-lg font-bold">For Sponsorship & Inquiries</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Reach our team to partner, volunteer, or sponsor an outreach.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><span className="font-semibold">Phone / WhatsApp:</span> +234 704 284 1745</li>
                <li><span className="font-semibold">Email:</span> hello@padandfresh.ng</li>
                <li><span className="font-semibold">Bank:</span> NomBank MFB · 0014317366 · Prescribly Limited</li>
              </ul>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-girl hover:underline"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-accent/30 p-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-hero text-white">{icon}</span>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
