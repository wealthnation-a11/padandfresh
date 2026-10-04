import { createFileRoute } from '@tanstack/react-router';
import { PageIntro, SectionHeading } from '@/components/SectionUI';
import { pageHead } from '@/lib/prescribly-content';
import hero from '@/assets/prescribly-events-hero.jpg';
const categories=['Healthcare Professionals','Technology & Innovation','Business & Entrepreneurship','Community & Development','Youth'];
export const Route=createFileRoute('/speakers')({head:()=>pageHead('/speakers','Speakers','Meet the people shaping healthcare at Prescribly Events. Speaker announcements are coming soon.'),component:Speakers});
function Speakers(){return <div><PageIntro eyebrow="The people" title="THE PEOPLE SHAPING HEALTHCARE" description="Healthcare, technology and community voices will take the stage. Speaker announcements are coming soon." image={hero}/><section className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><SectionHeading eyebrow="Speaker categories" title="More perspectives. Better conversations."/><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{categories.map(x=><article key={x} className="border border-border bg-card p-6"><div className="grid size-14 place-items-center bg-secondary text-2xl font-bold text-primary">?</div><h2 className="mt-9 text-xl font-bold">{x}</h2><p className="mt-3 text-sm text-muted-foreground">Speaker announcement coming soon.</p></article>)}</div></section></div>}
