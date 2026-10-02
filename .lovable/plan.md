# Prescribly Events transformation

## Goal
Transform the current PadAndFresh donation site into **Prescribly Events**, a premium healthcare events, campaigns, and community platform. PadAndFresh remains a campaign within the wider Prescribly ecosystem. Existing donation tracking and support functionality will be retained under the campaign structure.

## Public experience

### Brand and shared layout
- Replace the charity-led visual identity with an institutional African healthcare and technology direction: crisp editorial typography, deep clinical green, bright signal green, ink, warm neutral surfaces, restrained motion, and documentary-style imagery.
- Rebuild the shared header and footer around Home, Events, Campaigns, Community, Impact, About, and Partner With Us.
- Make **Register for an Event** the primary action and **Partner With Us** the secondary action, with a polished mobile menu.
- Replace all global PadAndFresh metadata and social copy with Prescribly Events branding.

### Homepage
- Build the requested conversation-led opening with Prescribly identity, the exact headline and copy, and links to Events and Community.
- Feature Kaduna Digital Health & Wellness Week 2027 as the next major event, with location and clearly unconfirmed date/venue fields.
- Add the “Healthcare Is Bigger Than an App” narrative, six What We Do pillars, ecosystem pathways, campaigns, community, partnership, and speaker previews.
- Clearly label all Kaduna numbers as **2027 Event Targets**, never completed impact.

### Events and content library
- Rebuild `/events` with featured, upcoming, series, online, and past views plus category, date, location, format, and registration-status filters.
- Add dedicated pages for:
  - `/events/health-futures`
  - `/events/kaduna-digital-health-wellness-week-2027`
  - `/events/webinars`
  - `/events/online-conversations`
  - `/events/womens-health`
  - `/events/youth-digital-health`
- Populate the supplied topic libraries exactly, without invented dates, venues, speakers, endorsements, or medical claims.
- Present Kaduna’s three-day programme, campaign connection, audience groups, recognition initiative, and event targets with appropriate “Planned”, “Coming Soon”, and “To Be Announced” states.

### Campaigns and community
- Add `/campaigns` plus dedicated pages for PadAndFresh, Pad a Teenage Girl, Guard a Teenage Boy, Women’s Health, Community Health, and Youth & Digital Health.
- Keep support amounts configurable and preserve the existing freewill donation flow and live donation data under PadAndFresh.
- Add `/community` with audience pathways and a working community registration form.
- Add `/speakers` using explicit announcement placeholders only.
- Add `/partners` and `/sponsors` with the requested partnership and sponsorship models.

### Registration, impact, about, and contact
- Add `/register` with event-aware registration, profession, interests, and attendance choices.
- Add a success page with WhatsApp, follow, and calendar actions.
- Rebuild `/impact` for editable Prescribly-wide metrics, while retaining PadAndFresh’s live support information as a campaign view.
- Rewrite `/about` around Prescribly Limited, Prescribly Events, and the six stated values.
- Update `/contact` with organization and the requested interest options while retaining working message submission.

### Legacy URL handling
- Permanently redirect old campaign paths to their new equivalents:
  - `/pad-a-teenage-girl` → `/campaigns/padandfresh/pad-a-girl`
  - `/guard-a-teenage-boy` → `/campaigns/padandfresh/guard-a-boy`
  - `/donate` remains available as the PadAndFresh support flow, reached from the campaign pages.
  - `/dashboard` redirects to the relevant Prescribly impact experience.
- Preserve old public links rather than leaving dead pages.

## Data and administration

### Scalable content model
- Add structured tables for events, schedules, content-library items, speakers, event-speaker links, campaigns, partners, impact metrics, registrations, community members, profiles, and user roles.
- Keep existing donations, volunteers, newsletter subscribers, and contact messages, extending only what the new forms require.
- Include editable event date, venue, capacity, registration status, publishing status, programme, speakers, and SEO fields.
- Include configurable content status, audience, format, potential speakers, and SEO fields for the topic libraries.

### Security and access
- Add private email/password and Google sign-in for Prescribly administrators.
- Store team profile details separately from role assignments; use a dedicated user-roles table and server-validated admin checks.
- Protect administration routes and every private read/write operation; public visitors receive only published event, campaign, speaker, partner, and metric data.
- Apply row-level security and explicit grants to every new table. Public form tables allow insert-only access and do not expose personal submissions.

### Administration area
- Build a private `/admin` workspace with sections for Dashboard, Events, Registrations, Speakers, Campaigns, Donations/Support, Partners, Sponsors, Volunteers, Community Members, Impact Metrics, Messages, Content, and Settings.
- Support event publishing, schedule/topic/speaker management, capacity and registration controls, editable event fields, and CSV registration export.
- Support content-library management and editable public impact metrics.
- Provide clear empty, draft, published, planned, closed, and error states.

## Safety and accuracy
- Treat all healthcare material as general education, not diagnosis or personalised advice.
- Add visible educational disclaimers where health topic libraries require them.
- Never fabricate speakers, dates, venues, sponsors, outcomes, completed impact, medical claims, or organizational commitments.
- Keep targets visually and semantically distinct from achieved metrics.

## Search, sharing, and quality
- Give every public route unique title, description, Open Graph text, Twitter card, canonical URL, and appropriate structured data.
- Add a sitemap and crawler rules for all public routes; keep administration and success pages out of search.
- Use responsive images, stable layouts, accessible controls, reduced-motion support, and mobile-first validation.
- Verify core journeys on desktop and mobile: browsing and filtering events, registering, joining the community, contacting the team, supporting PadAndFresh, signing into administration, editing content, and exporting registrations.

## Technical approach
- Keep the existing TanStack Start structure and Lovable Cloud backend.
- Centralize supplied editorial content and route metadata in reusable typed content modules while dynamic event/campaign records come from the database.
- Use authenticated server functions for administration and public server reads for published content.
- Add migrations with literal initial records for the supplied event series, campaign structure, and content libraries so the first screen is populated immediately.
- Record architecture rules in `AGENTS.md`, retain route-specific metadata, and validate the final build and live preview before completion.
