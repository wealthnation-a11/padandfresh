import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { impactCounts } from "@/lib/format";

export interface DonationRow {
  id: string;
  payment_reference: string;
  amount: number;
  donation_type: string;
  girls_count: number;
  boys_count: number;
  donor_name: string | null;
  is_anonymous: boolean;
  display_publicly: boolean;
  created_at: string;
  payment_status: string;
}

export interface Stats {
  total: number;
  girls: number;
  boys: number;
  donors: number;
  donorsThisMonth: number;
  loading: boolean;
}

export function useDonations(limit = 20) {
  const [donations, setDonations] = useState<DonationRow[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    girls: 0,
    boys: 0,
    donors: 0,
    donorsThisMonth: 0,
    loading: true,
  });

  async function refresh() {
    const { data } = await supabase
      .from("donations")
      .select("*")
      .eq("payment_status", "completed")
      .order("created_at", { ascending: false });

    const rows = (data ?? []) as DonationRow[];
    setDonations(rows.slice(0, limit));

    const total = rows.reduce((s, r) => s + Number(r.amount), 0);
    let girls = 0;
    let boys = 0;
    rows.forEach((r) => {
      const c = impactCounts(r.donation_type, Number(r.amount));
      girls += r.girls_count || c.girls;
      boys += r.boys_count || c.boys;
    });
    const emails = new Set(rows.map((r) => r.donor_name ?? r.id));
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const monthEmails = new Set(
      rows.filter((r) => new Date(r.created_at).getTime() > monthAgo).map((r) => r.donor_name ?? r.id),
    );

    setStats({
      total,
      girls,
      boys,
      donors: emails.size,
      donorsThisMonth: monthEmails.size,
      loading: false,
    });
  }

  useEffect(() => {
    refresh();
    const channel = supabase
      .channel("donations-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "donations" },
        () => refresh(),
      )
      .subscribe();

    const interval = setInterval(refresh, 10000);
    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  return { donations, stats, refresh };
}
