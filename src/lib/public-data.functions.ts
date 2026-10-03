import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

function publicClient() {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']!;
  return createClient<Database>(process.env['SUPABASE_URL']!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => { const headers = new Headers(init?.headers); if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization'); headers.set('apikey', key); return fetch(input, { ...init, headers }); } },
  });
}
export const getPublicContent = createServerFn({ method:'GET' }).handler(async () => {
  const db = publicClient();
  const [events, campaigns, metrics, content] = await Promise.all([
    db.from('events').select('id,slug,title,subtitle,summary,category,format,location,venue,date_label,venue_label,starts_at,registration_status,featured').eq('status','published').order('featured',{ ascending:false }),
    db.from('campaigns').select('slug,title,headline,summary,focus_areas,support_amount,featured').eq('status','published'),
    db.from('impact_metrics').select('metric_key,label,value,suffix,metric_type,context,sort_order').eq('is_public',true).order('sort_order'),
    db.from('content_items').select('id,slug,collection,title,summary,format,status,sort_order').in('status',['published','planned']).order('sort_order'),
  ]);
  return { events:events.data ?? [], campaigns:campaigns.data ?? [], metrics:metrics.data ?? [], content:content.data ?? [] };
});
