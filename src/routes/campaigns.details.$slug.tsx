import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { getPublicContent } from '@/lib/public-data.functions';
import { pageHead } from '@/lib/prescribly-content';
import { PageIntro } from '@/components/SectionUI';
import { Button } from '@/components/ui/button';
import community from '@/assets/community-health.jpg';
export const Route=createFileRoute('/campaigns/details/$slug')({
 loader:async({params})=>{const data=await getPublicContent();const campaign=data.campaigns.find(c=>c.slug===params.slug);if(!campaign)throw notFound();return campaign},
 head:({loaderData})=>pageHead(`/campaigns/details/${loaderData?.slug??''}`,loaderData?.seo_title??loaderData?.title??'Campaign',loaderData?.seo_description??loaderData?.summary??'Explore this Prescribly Events community campaign.'),
 errorComponent:()=> <p className="px-5 py-20 text-center">This campaign could not be loaded. Please try again.</p>,
 notFoundComponent:()=> <p className="px-5 py-20 text-center">This campaign is not available.</p>,
 component:CampaignDetails,
});
function CampaignDetails(){const campaign=Route.useLoaderData();return <div><PageIntro eyebrow="Community action" title={campaign.title} description={campaign.headline??''} image={community}/><section className="mx-auto max-w-4xl px-5 py-16"><p className="whitespace-pre-line leading-relaxed">{campaign.summary}</p><div className="mt-8 flex flex-wrap gap-3">{campaign.slug==='padandfresh'?<Button asChild><Link to="/donate">Support the Campaign</Link></Button>:<Button asChild><Link to="/contact">Support the Campaign</Link></Button>}<Button asChild variant="outline"><Link to="/partners">Partner With Us</Link></Button></div></section></div>}