
-- Donations table
CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_reference TEXT UNIQUE NOT NULL,
  amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
  donation_type TEXT NOT NULL CHECK (donation_type IN ('pad_girl','fresh_boy','both','custom','sponsor_10')),
  girls_count INTEGER NOT NULL DEFAULT 0,
  boys_count INTEGER NOT NULL DEFAULT 0,
  donor_name TEXT,
  email TEXT,
  phone TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  display_publicly BOOLEAN NOT NULL DEFAULT true,
  is_recurring BOOLEAN NOT NULL DEFAULT false,
  receive_updates BOOLEAN NOT NULL DEFAULT false,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending','completed','failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX donations_status_created_idx ON public.donations (payment_status, created_at DESC);
CREATE INDEX donations_email_idx ON public.donations (email);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a donation (initial pending row before payment)
CREATE POLICY "Anyone can create a donation"
  ON public.donations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Anyone can read completed donations (public feed/dashboard).
-- Sensitive fields (email/phone) should be filtered in the app layer / via a view;
-- name visibility is controlled by display_publicly + is_anonymous in the UI.
CREATE POLICY "Public can view completed donations"
  ON public.donations FOR SELECT
  TO anon, authenticated
  USING (payment_status = 'completed');

-- Allow updating a pending donation by reference (to mark completed after Paystack callback).
-- In production, this would be done via a service-role server function instead.
CREATE POLICY "Anyone can update pending donations"
  ON public.donations FOR UPDATE
  TO anon, authenticated
  USING (payment_status = 'pending')
  WITH CHECK (true);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.donations;
ALTER TABLE public.donations REPLICA IDENTITY FULL;

-- Newsletter subscribers
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON public.newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Volunteers
CREATE TABLE public.volunteers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest_area TEXT NOT NULL,
  availability TEXT,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can apply to volunteer"
  ON public.volunteers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Contact messages
CREATE TABLE public.contact_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a contact message"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
