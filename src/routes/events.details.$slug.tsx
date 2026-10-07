import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { getPublicContent } from '@/lib/public-data.functions';
import { pageHead } from '@/lib/prescribly-content';
import { PageIntro } from '@/components/SectionUI';
import { Button } from '@/components/ui/button';
import hero from '@/assets/prescribly-events-hero.jpg';
export const Route=createFileRoute('/events/details/$slug')({
 loader:async({params})=>{const data=await getPublicContent();const event=data.events.find(e=>e.slug===params.slug);if(!event)throw notFound();return event},
 head:({loaderData})=>pageHead(`/events/details/${loaderData?.slug??''}`,loaderData?.seo_title??loaderData?.title??'Event',loaderData?.seo_description??loaderData?.summary??'Explore this Prescribly Events healthcare experience.'),
 errorComponent:()=> <p className="px-5 py-20 text-center">This event could not be loaded. Please try again.</p>,
 notFoundComponent:()=> <p className="px-5 py-20 text-center">This event is not available.</p>,
 component:EventDetails,
});
function EventDetails(){const event=Route.useLoaderData();return <div><PageIntro eyebrow={event.category} title={event.title} description={event.subtitle??event.summary??''} image={hero}/><section className="mx-auto max-w-4xl px-5 py-16"><div className="flex flex-wrap gap-6 border-b pb-6 text-sm"><span>{event.date_label}</span><span>{event.location??'Location to be announced'}</span><span>{event.venue??event.venue_label}</span></div><p className="mt-8 whitespace-pre-line leading-relaxed">{event.description??event.summary}</p><p className="mt-6 text-sm text-muted-foreground">{event.registration_status==='open'?'Registration open':event.registration_status==='closed'?'Registration closed':'Registration coming soon'}</p>{event.registration_status==='open'&&<Button asChild className="mt-6"><Link to="/register" search={{event:event.slug}}>Register for the Event</Link></Button>}</section></div>}