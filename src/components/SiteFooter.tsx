import { Link } from "@tanstack/react-router";
import { Heart, Facebook, Instagram, Twitter, Linkedin, Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("newsletter_subscribers").insert({ email });
    setLoading(false);
    if (error && !error.message.includes("duplicate")) {
      toast.error("Could not subscribe. Please try again.");
      return;
    }
    toast.success("Subscribed! Watch your inbox for monthly impact updates.");
    setEmail("");
  }

  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-hero text-white">
              <Heart className="h-4 w-4" />
            </span>
            PadAndFresh<span className="text-girl">.ng</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Keeping Nigerian youth in school and confident — one ₦700 at a time.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/events" className="hover:text-foreground">Events</Link></li>
            <li><Link to="/pad-a-teenage-girl" className="hover:text-foreground">Pad a Teenage Girl</Link></li>
            <li><Link to="/guard-a-teenage-boy" className="hover:text-foreground">Guard a Teenage Boy</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">Live Impact</Link></li>
            <li><Link to="/donate" search={{ type: undefined }} className="hover:text-foreground">Donate</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-girl" /> 0704 284 1745</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-girl" /> hello@padandfresh.ng</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-girl" /> Abuja, Nigeria</li>
          </ul>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full bg-background border border-border text-muted-foreground transition-colors hover:bg-girl hover:text-white hover:border-girl"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">Monthly Impact Updates</h4>
          <form onSubmit={subscribe} className="flex flex-col gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-gradient-hero px-4 py-2 text-sm font-semibold text-white shadow-glow-girl disabled:opacity-60"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            A <a href="https://prescribly.app" className="font-semibold text-girl hover:underline">Prescribly</a> Initiative — © 2026 PadAndFresh.ng
          </p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
