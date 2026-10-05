import { Outlet, Link, createRootRoute, HeadContent, Scripts, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import appCss from '../styles.css?url';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
export const Route = createRootRoute({
 head:() => ({meta:[{charSet:'utf-8'},{name:'viewport',content:'width=device-width, initial-scale=1'},{property:'og:type',content:'website'},{property:'og:site_name',content:'Prescribly Events'},{name:'twitter:card',content:'summary_large_image'}],links:[{rel:'stylesheet',href:appCss},{rel:'icon',type:'image/svg+xml',href:'/favicon.svg'},{rel:'preconnect',href:'https://fonts.googleapis.com'},{rel:'preconnect',href:'https://fonts.gstatic.com',crossOrigin:'anonymous'},{rel:'stylesheet',href:'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap'}]}),
 shellComponent:({children}:{children:React.ReactNode})=><html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>,
 component:RootComponent,
 notFoundComponent:()=><div className="mx-auto max-w-3xl px-5 py-32 text-center"><p className="text-sm font-bold text-primary">404</p><h1 className="mt-4 text-4xl font-bold">Page not found</h1><p className="mt-4 text-muted-foreground">This page is unavailable.</p><Button asChild className="mt-8"><Link to="/">Return home</Link></Button></div>,
});

function RootComponent(){
 const router=useRouter();
 useEffect(()=>{const {data}=supabase.auth.onAuthStateChange(event=>{if(event==='SIGNED_IN'||event==='SIGNED_OUT'||event==='USER_UPDATED')router.invalidate()});return()=>data.subscription.unsubscribe()},[router]);
 return <div className="flex min-h-screen flex-col"><SiteHeader /><main className="flex-1"><Outlet /></main><SiteFooter /><Toaster richColors position="top-right" /></div>
}
