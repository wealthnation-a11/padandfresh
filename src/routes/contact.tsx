import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — PadAndFresh.ng" },
      { name: "description", content: "Get in touch with PadAndFresh.ng for partnerships, volunteering, media, and general inquiries." },
      { property: "og:title", content: "Contact PadAndFresh.ng" },
      { property: "og:description", content: "Reach our team about partnerships, volunteering, and media inquiries." },
    ],
  }),
  component: Contact,
});

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.enum(["General Inquiry", "Corporate Partnership", "Volunteer Application", "Media Request", "Other"]),
  message: z.string().trim().min(5, "Please write a longer message").max(2000),
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState<z.infer<typeof ContactSchema>["subject"]>("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = ContactSchema.safeParse({ name, email, phone, subject, message });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject,
      message: parsed.data.message,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    toast.success("Message sent! We'll get back to you within 48 hours.");
    setName(""); setEmail(""); setPhone(""); setMessage(""); setSubject("General Inquiry");
  }

  return (
    <div className="bg-gradient-soft">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Get in Touch</h1>
          <p className="mt-3 text-muted-foreground">
            Partnerships, volunteers, media, or just to say hi — we'd love to hear from you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          <form onSubmit={submit} className="lg:col-span-3 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full Name *" value={name} onChange={setName} />
              <Field label="Email *" type="email" value={email} onChange={setEmail} />
              <Field label="Phone (optional)" value={phone} onChange={setPhone} />
              <label className="block">
                <span className="text-sm font-semibold">Subject *</span>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value as typeof subject)}
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option>General Inquiry</option>
                  <option>Corporate Partnership</option>
                  <option>Volunteer Application</option>
                  <option>Media Request</option>
                  <option>Other</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-sm font-semibold">Message *</span>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Tell us how we can help..."
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-hero px-6 py-3 text-sm font-semibold text-white shadow-glow-girl disabled:opacity-70"
            >
              <Send className="h-4 w-4" /> {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <aside className="lg:col-span-2 space-y-3">
            <ContactRow icon={<Phone className="h-5 w-5" />} label="Phone" value="0704 284 1745" />
            <ContactRow icon={<MessageCircle className="h-5 w-5" />} label="WhatsApp" value="0704 284 1745" />
            <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value="hello@padandfresh.ng" />
            <ContactRow icon={<MapPin className="h-5 w-5" />} label="Address" value="Kaduna State, Nigeria" />
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (s: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-hero text-white">{icon}</span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}
