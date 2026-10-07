import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { INTERESTS, PROFESSIONS } from '@/lib/prescribly-content';

const email = z.string().trim().email().max(254).transform((value) => value.toLowerCase());
const optionalText = (max: number) => z.string().trim().max(max).nullable().optional();

const volunteerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email,
  phone: optionalText(40),
  interest_area: z.string().trim().min(2).max(120),
  availability: optionalText(300),
  message: optionalText(2000),
});

export const submitVolunteerApplication = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => volunteerSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('volunteers').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      interest_area: data.interest_area,
      availability: data.availability || null,
      message: data.message || null,
    });
    return { ok: error === null };
  });

const registrationSchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email,
  phone: optionalText(40),
  organization: optionalText(150),
  profession: z.enum(PROFESSIONS),
  interests: z.array(z.enum(INTERESTS)).min(1).max(INTERESTS.length),
  attendance: z.enum(['Day 1', 'Day 2', 'Day 3', 'All 3 Days']),
  event_slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
});

export const submitEventRegistration = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => registrationSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { data: event, error: eventError } = await supabaseAdmin
      .from('events')
      .select('slug')
      .eq('slug', data.event_slug)
      .maybeSingle();
    if (eventError || !event) return { ok: false as const };

    const { error } = await supabaseAdmin.from('event_registrations').insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization || null,
      profession: data.profession,
      interests: data.interests,
      attendance: data.attendance,
      event_slug: event.slug,
    });
    return { ok: error === null, event_slug: event.slug };
  });

const communitySchema = z.object({
  first_name: z.string().trim().min(1).max(100),
  last_name: z.string().trim().min(1).max(100),
  email,
  phone: optionalText(40),
  organization: optionalText(150),
  member_type: z.enum(['Doctor', 'Student', 'Founder', 'Organization', 'Volunteer', 'Healthcare Professional', 'Community Member', 'Other']),
  interests: z.array(z.enum(INTERESTS)).min(1).max(INTERESTS.length),
});

export const joinCommunity = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => communitySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('community_members').insert({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization || null,
      member_type: data.member_type,
      interests: data.interests,
    });
    return { ok: error === null };
  });

export const subscribeToNewsletter = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => z.object({ email }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('newsletter_subscribers').insert({ email: data.email });
    if (error?.code === '23505') return { ok: true as const };
    return { ok: error === null };
  });

const donationSchema = z.object({
  amount: z.number().int().min(100).max(9_999_999_999),
  donation_type: z.enum(['pad_girl', 'fresh_boy', 'both']),
  donor_name: optionalText(120),
  email,
  phone: optionalText(40),
  is_anonymous: z.boolean(),
  display_publicly: z.boolean(),
  is_recurring: z.boolean(),
  receive_updates: z.boolean(),
}).refine((value) => value.is_anonymous || Boolean(value.donor_name?.trim()), {
  path: ['donor_name'],
  message: 'A donor name is required unless the donation is anonymous.',
});

export const createDonation = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => donationSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const reference = `PAF-${crypto.randomUUID().toUpperCase()}`;
    const girls = data.donation_type === 'pad_girl' || data.donation_type === 'both' ? 1 : 0;
    const boys = data.donation_type === 'fresh_boy' || data.donation_type === 'both' ? 1 : 0;
    const { error } = await supabaseAdmin.from('donations').insert({
      payment_reference: reference,
      amount: data.amount,
      donation_type: data.donation_type,
      girls_count: girls,
      boys_count: boys,
      donor_name: data.is_anonymous ? null : (data.donor_name || null),
      email: data.email,
      phone: data.phone || null,
      is_anonymous: data.is_anonymous,
      display_publicly: data.display_publicly && !data.is_anonymous,
      is_recurring: data.is_recurring,
      receive_updates: data.receive_updates,
      payment_status: 'pending',
    });
    if (error) return { ok: false as const };
    return { ok: true as const, reference };
  });

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email,
  phone: optionalText(40),
  organization: optionalText(150),
  interest: z.enum(['Event Registration', 'Sponsorship', 'Partnership', 'Speaking', 'Volunteering', 'Media', 'Campaigns', 'General Enquiry']),
  message: z.string().trim().min(5).max(2000),
});

export const sendContactMessage = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('contact_messages').insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      organization: data.organization || null,
      interest: data.interest,
      subject: data.interest,
      message: data.message,
    });
    return { ok: error === null };
  });