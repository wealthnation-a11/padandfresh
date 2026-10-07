import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CompleteSchema = z.object({
  reference: z.string().min(4).max(128).regex(/^[A-Za-z0-9_-]+$/),
});

/**
 * Marks a pending donation as completed. In production, this would be invoked
 * by a Paystack webhook AFTER signature verification + transaction lookup
 * against the Paystack API. For the demo flow, the client calls it after the
 * (stubbed) checkout succeeds.
 */
export const completeDonation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => CompleteSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: updated, error } = await supabaseAdmin
      .from("donations")
      .update({ payment_status: "completed" })
      .eq("payment_reference", data.reference)
      .eq("payment_status", "pending")
      .select()
      .maybeSingle();

    if (error) {
      console.error("completeDonation error", error);
      return { ok: false as const, error: "Could not confirm donation." };
    }
    if (!updated) {
      return { ok: false as const, error: "Donation reference not found or already processed." };
    }
    return { ok: true as const, donation: updated };
  });
