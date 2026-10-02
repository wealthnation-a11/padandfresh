CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  display_name text,
  avatar_url text,
  job_title text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users create own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  subtitle text,
  summary text,
  description text,
  category text NOT NULL,
  format text NOT NULL DEFAULT 'in-person',
  location text,
  venue text,
  starts_at timestamptz,
  ends_at timestamptz,
  date_label text NOT NULL DEFAULT 'To Be Announced',
  venue_label text NOT NULL DEFAULT 'To Be Announced',
  capacity integer,
  registration_status text NOT NULL DEFAULT 'coming_soon',
  status text NOT NULL DEFAULT 'draft',
  featured boolean NOT NULL DEFAULT false,
  image_url text,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.events TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.events TO authenticated;
GRANT ALL ON public.events TO service_role;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published events are public" ON public.events FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages events" ON public.events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.event_schedule_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  day_number integer,
  sort_order integer NOT NULL DEFAULT 0,
  title text NOT NULL,
  subtitle text,
  description text,
  topics jsonb NOT NULL DEFAULT '[]'::jsonb,
  audience jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'planned'
);
GRANT SELECT ON public.event_schedule_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.event_schedule_items TO authenticated;
GRANT ALL ON public.event_schedule_items TO service_role;
ALTER TABLE public.event_schedule_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published schedules are public" ON public.event_schedule_items FOR SELECT TO anon, authenticated USING (EXISTS (SELECT 1 FROM public.events e WHERE e.id = event_id AND e.status = 'published') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages schedules" ON public.event_schedule_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.content_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  collection text NOT NULL,
  title text NOT NULL,
  summary text,
  audience jsonb NOT NULL DEFAULT '[]'::jsonb,
  format text NOT NULL DEFAULT 'event',
  potential_speakers text,
  status text NOT NULL DEFAULT 'planned',
  sort_order integer NOT NULL DEFAULT 0,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (collection, slug)
);
GRANT SELECT ON public.content_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.content_items TO authenticated;
GRANT ALL ON public.content_items TO service_role;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published content is public" ON public.content_items FOR SELECT TO anon, authenticated USING (status IN ('published','planned') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages content" ON public.content_items FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  headline text,
  summary text,
  focus_areas jsonb NOT NULL DEFAULT '[]'::jsonb,
  support_amount numeric,
  status text NOT NULL DEFAULT 'draft',
  featured boolean NOT NULL DEFAULT false,
  seo_title text,
  seo_description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.campaigns TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.campaigns TO authenticated;
GRANT ALL ON public.campaigns TO service_role;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published campaigns are public" ON public.campaigns FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages campaigns" ON public.campaigns FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.speakers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Speaker announcement coming soon',
  role text,
  organization text,
  biography text,
  category text NOT NULL,
  photo_url text,
  social_links jsonb NOT NULL DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'placeholder',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.speakers TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.speakers TO authenticated;
GRANT ALL ON public.speakers TO service_role;
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public speakers are visible" ON public.speakers FOR SELECT TO anon, authenticated USING (status IN ('published','placeholder') OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages speakers" ON public.speakers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.event_speakers (
  event_id uuid NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  speaker_id uuid NOT NULL REFERENCES public.speakers(id) ON DELETE CASCADE,
  session_title text,
  PRIMARY KEY (event_id, speaker_id)
);
GRANT SELECT ON public.event_speakers TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.event_speakers TO authenticated;
GRANT ALL ON public.event_speakers TO service_role;
ALTER TABLE public.event_speakers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Event speaker links are public" ON public.event_speakers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Team manages event speakers" ON public.event_speakers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  partnership_type text NOT NULL,
  description text,
  logo_url text,
  website_url text,
  status text NOT NULL DEFAULT 'draft',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.partners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published partners are public" ON public.partners FOR SELECT TO anon, authenticated USING (status = 'published' OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages partners" ON public.partners FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.impact_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_key text UNIQUE NOT NULL,
  label text NOT NULL,
  value numeric NOT NULL DEFAULT 0,
  suffix text,
  metric_type text NOT NULL DEFAULT 'achieved',
  context text,
  sort_order integer NOT NULL DEFAULT 0,
  is_public boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.impact_metrics TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.impact_metrics TO authenticated;
GRANT ALL ON public.impact_metrics TO service_role;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public metrics are visible" ON public.impact_metrics FOR SELECT TO anon, authenticated USING (is_public OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages metrics" ON public.impact_metrics FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES public.events(id) ON DELETE SET NULL,
  event_slug text,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  profession text NOT NULL,
  interests jsonb NOT NULL DEFAULT '[]'::jsonb,
  attendance text NOT NULL,
  status text NOT NULL DEFAULT 'registered',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.event_registrations TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.event_registrations TO authenticated;
GRANT ALL ON public.event_registrations TO service_role;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register for an event" ON public.event_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Team reads registrations" ON public.event_registrations FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages registrations" ON public.event_registrations FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Admins delete registrations" ON public.event_registrations FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.community_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  organization text,
  member_type text NOT NULL,
  interests jsonb NOT NULL DEFAULT '[]'::jsonb,
  consent_updates boolean NOT NULL DEFAULT true,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.community_members TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.community_members TO authenticated;
GRANT ALL ON public.community_members TO service_role;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can join the community" ON public.community_members FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Team reads community members" ON public.community_members FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Team manages community members" ON public.community_members FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor')) WITH CHECK (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "Admins delete community members" ON public.community_members FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.contact_messages ADD COLUMN organization text;
ALTER TABLE public.contact_messages ADD COLUMN interest text;
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
CREATE POLICY "Team reads messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

CREATE INDEX events_status_featured_idx ON public.events(status, featured);
CREATE INDEX content_items_collection_status_idx ON public.content_items(collection, status, sort_order);
CREATE INDEX event_registrations_event_created_idx ON public.event_registrations(event_slug, created_at DESC);
CREATE INDEX community_members_created_idx ON public.community_members(created_at DESC);