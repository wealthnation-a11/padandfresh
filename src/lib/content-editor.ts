import { z } from 'zod';

export const contentTables = ['events', 'campaigns', 'speakers', 'partners'] as const;
export type ContentTable = typeof contentTables[number];
export type ContentRecord = Record<string, string | number | boolean | null>;
export type EditorField = { key: string; label: string; required?: boolean; multiline?: boolean; options?: string[]; type?: 'number' | 'datetime-local' | 'url' };
const optionalText = z.string().trim().max(20000).nullable();
const title = z.string().trim().min(1).max(300);
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words separated by hyphens.').max(180);
const webUrl = z.union([z.literal(''), z.string().url().refine(v => v.startsWith('https://'), 'Use an HTTPS address.')]).nullable();
const status = z.enum(['draft', 'published', 'archived']);
export const editorSchemas = {
 events: z.object({ title, slug, subtitle: optionalText, summary: optionalText, description: optionalText, category: title, format: z.enum(['in-person','online','hybrid']), location: optionalText, venue: optionalText, date_label: title, venue_label: title, starts_at: z.string().datetime().nullable(), ends_at: z.string().datetime().nullable(), capacity: z.number().int().positive().nullable(), registration_status: z.enum(['coming_soon','open','closed']), status, featured: z.boolean(), image_url: webUrl, seo_title: optionalText, seo_description: optionalText }),
 campaigns: z.object({ title, slug, headline: optionalText, summary: optionalText, support_amount: z.number().positive().nullable(), status, featured: z.boolean(), seo_title: optionalText, seo_description: optionalText }),
 speakers: z.object({ name: title, role: optionalText, organization: optionalText, biography: optionalText, category: title, photo_url: webUrl, status: z.enum(['placeholder','draft','published','archived']) }),
 partners: z.object({ name: title, partnership_type: title, description: optionalText, logo_url: webUrl, website_url: webUrl, status, sort_order: z.number().int().min(0) }),
};
export const editorFields: Record<ContentTable, EditorField[]> = {
 events: [{key:'title',label:'Title',required:true},{key:'slug',label:'Page address',required:true},{key:'subtitle',label:'Subtitle'},{key:'summary',label:'Summary',multiline:true},{key:'description',label:'Description',multiline:true},{key:'category',label:'Category',required:true},{key:'format',label:'Format',options:['in-person','online','hybrid']},{key:'location',label:'Location'},{key:'venue',label:'Venue'},{key:'date_label',label:'Date label',required:true},{key:'venue_label',label:'Venue label',required:true},{key:'starts_at',label:'Start (local time)',type:'datetime-local'},{key:'ends_at',label:'End (local time)',type:'datetime-local'},{key:'capacity',label:'Capacity',type:'number'},{key:'registration_status',label:'Registration',options:['coming_soon','open','closed']},{key:'status',label:'Publication',options:['draft','published','archived']},{key:'image_url',label:'Cover image URL',type:'url'},{key:'seo_title',label:'Search title'},{key:'seo_description',label:'Search description',multiline:true}],
 campaigns: [{key:'title',label:'Title',required:true},{key:'slug',label:'Page address',required:true},{key:'headline',label:'Headline'},{key:'summary',label:'Summary',multiline:true},{key:'support_amount',label:'Suggested support (NGN)',type:'number'},{key:'status',label:'Publication',options:['draft','published','archived']},{key:'seo_title',label:'Search title'},{key:'seo_description',label:'Search description',multiline:true}],
 speakers: [{key:'name',label:'Name',required:true},{key:'role',label:'Role'},{key:'organization',label:'Organization'},{key:'biography',label:'Biography',multiline:true},{key:'category',label:'Category',required:true},{key:'photo_url',label:'Photo URL',type:'url'},{key:'status',label:'Publication',options:['placeholder','draft','published','archived']}],
 partners: [{key:'name',label:'Name',required:true},{key:'partnership_type',label:'Partnership type',required:true},{key:'description',label:'Description',multiline:true},{key:'logo_url',label:'Logo URL',type:'url'},{key:'website_url',label:'Website URL',type:'url'},{key:'status',label:'Publication',options:['draft','published','archived']},{key:'sort_order',label:'Display order',type:'number'}],
};
export function emptyRecord(table: ContentTable): ContentRecord {
 const record: ContentRecord = {};
 for (const f of editorFields[table]) record[f.key] = f.options?.[0] ?? '';
 record.status = 'draft';
 if (table === 'events') Object.assign(record,{date_label:'To Be Announced',venue_label:'To Be Announced',featured:false});
 if (table === 'campaigns') record.featured=false;
 if (table === 'partners') record.sort_order=0;
 return record;
}
export function normalizeRecord(table: ContentTable, record: ContentRecord) {
 const result: ContentRecord = {};
 for(const f of editorFields[table]) {
  const value=record[f.key];
  result[f.key]=f.type==='number' ? (value===''||value==null ? null : Number(value)) : f.type==='datetime-local' ? (value ? new Date(String(value)).toISOString() : null) : value===''&&!f.required&&!f.options ? null : value??null;
 }
 if(table==='events'||table==='campaigns') result.featured=Boolean(record.featured);
 return result;
}