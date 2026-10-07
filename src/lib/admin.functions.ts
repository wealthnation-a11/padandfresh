import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import { contentTables, editorSchemas } from '@/lib/content-editor';
async function assertTeam(context: {supabase:any;userId:string}) { const {data}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'admin'}); if(data)return; const {data:editor}=await context.supabase.rpc('has_role',{_user_id:context.userId,_role:'editor'}); if(!editor) throw new Error('Forbidden'); }
export const getAdminOverview=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{await assertTeam(context);const tables=['events','event_registrations','speakers','campaigns','donations','partners','volunteers','community_members','impact_metrics','contact_messages','content_items'] as const;const counts:Record<string,number>={};for(const table of tables){const {count}=await context.supabase.from(table).select('*',{count:'exact',head:true});counts[table]=count??0}return counts});
export const listAdminRegistrations=createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async({context})=>{await assertTeam(context);const {data,error}=await context.supabase.from('event_registrations').select('first_name,last_name,email,phone,organization,profession,attendance,event_slug,status,created_at').order('created_at',{ascending:false});if(error)throw error;return data??[]});
export const listAdminContent=createServerFn({method:'POST'}).middleware([requireSupabaseAuth])
 .inputValidator((input:unknown)=>z.object({table:z.enum(contentTables)}).parse(input))
 .handler(async({data,context})=>{await assertTeam(context);const {data:rows,error}=await context.supabase.from(data.table).select('*').order('created_at',{ascending:false});if(error)throw new Error('Could not load content.');return rows??[];});
export const saveAdminContent=createServerFn({method:'POST'}).middleware([requireSupabaseAuth])
 .inputValidator((input:unknown)=>z.object({table:z.enum(contentTables),id:z.string().uuid().optional(),record:z.record(z.string(),z.unknown())}).parse(input))
 .handler(async({data,context})=>{
  await assertTeam(context);
  const parsed=editorSchemas[data.table].safeParse(data.record);
  if(!parsed.success) throw new Error(parsed.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; '));
  const record=parsed.data;
  if(data.table==='events') { const event=editorSchemas.events.parse(record); if(event.starts_at&&event.ends_at&&event.ends_at<=event.starts_at) throw new Error('End time must be after the start time.'); }
  const db=context.supabase;
  const result=data.id ? await db.from(data.table).update(record).eq('id',data.id).select('id').single() : await db.from(data.table).insert(record).select('id').single();
  if(result.error) throw new Error(result.error.code==='23505'?'This page address is already used. Choose another.':'Could not save content. Please try again.');
  return result.data;
 });
