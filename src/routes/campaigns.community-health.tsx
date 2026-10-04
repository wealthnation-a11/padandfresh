import { createFileRoute } from '@tanstack/react-router';
import { CampaignPage } from '@/components/CampaignPage';
import { CAMPAIGNS, pageHead } from '@/lib/prescribly-content';
const data=CAMPAIGNS.find(c=>c.slug==='community-health');
export const Route=createFileRoute('/campaigns/community-health')({head:()=>pageHead('/campaigns/community-health',data?.title??'Campaign',data?.description??'Prescribly campaign'),component:()=> <CampaignPage slug="community-health"/>});
