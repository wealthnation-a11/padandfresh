-- Public forms now submit through server functions that validate all fields before using the privileged database client.
-- Remove direct Data API write paths so callers cannot bypass that validation.
DROP POLICY IF EXISTS "Anyone can apply to volunteer" ON public.volunteers;
REVOKE INSERT ON public.volunteers FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can register for an event" ON public.event_registrations;
REVOKE INSERT ON public.event_registrations FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can join the community" ON public.community_members;
REVOKE INSERT ON public.community_members FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can subscribe" ON public.newsletter_subscribers;
REVOKE INSERT ON public.newsletter_subscribers FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can create a donation" ON public.donations;
REVOKE INSERT ON public.donations FROM anon, authenticated;

DROP POLICY IF EXISTS "Anyone can send a contact message" ON public.contact_messages;
REVOKE INSERT ON public.contact_messages FROM anon, authenticated;

DROP POLICY IF EXISTS "Event speaker links are public" ON public.event_speakers;
CREATE POLICY "Published event speaker links are public"
  ON public.event_speakers
  FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.events AS e
      WHERE e.id = event_speakers.event_id
        AND e.status = 'published'
    )
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'editor')
  );