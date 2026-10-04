import { createFileRoute, Link } from '@tanstack/react-router';
import { PageIntro, SectionHeading, FeatureGrid } from '@/components/SectionUI';
import { pageHead } from '@/lib/prescribly-content';
import { Button } from '@/components/ui/button';
import hero from '@/assets/prescribly-events-hero.jpg';
const types=['Strategic Partner','Event Sponsor','Community Health Partner',"Women's Health Partner",'Youth & Education Partner','Technology Partner','Media Partner'];
export const Route=createFileRoute('/partners')({head:()=>pageHead('/partners','Partner With Prescribly','Connect your organization with healthcare events, community health, innovation and youth initiatives.'),component:Partners});
function Partners(){return <div><PageIntro eyebrow="Partner With Us" title="LET'S BUILD SOMETHING BIGGER THAN AN EVENT." description="Our events and campaigns create opportunities for organizations to contribute expertise, resources, technology, funding and community reach." image={hero}/><section className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><SectionHeading eyebrow="Ways to collaborate" title="A partnership for every kind of contribution."/><div className="mt-10"><FeatureGrid items={types.map(x=>[x,'Collaborate with Prescribly Events on meaningful healthcare experiences and community programmes.'] as const)}/></div><div className="mt-10 flex gap-3"><Button asChild><Link to="/contact">Become a Partner</Link></Button><Button asChild variant="outline"><Link to="/sponsors">Explore Sponsorship</Link></Button></div></section></div>}
