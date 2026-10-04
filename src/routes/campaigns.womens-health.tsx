import { createFileRoute } from '@tanstack/react-router';
import { CampaignPage } from '@/components/CampaignPage';
import { CAMPAIGNS, pageHead } from '@/lib/prescribly-content';
const data=CAMPAIGNS.find(c=>c.slug==='womens-health');
export const Route=createFileRoute('/campaigns/womens-health')({head:()=>pageHead('/campaigns/womens-health',data?.title??'Campaign',data?.description??'Prescribly campaign'),component:()=> <CampaignPage slug="womens-health"/>});
