import { createFileRoute } from '@tanstack/react-router';
import { CampaignPage } from '@/components/CampaignPage';
import { CAMPAIGNS, pageHead } from '@/lib/prescribly-content';
const data=CAMPAIGNS.find(c=>c.slug==='padandfresh');
export const Route=createFileRoute('/campaigns/padandfresh/')({head:()=>pageHead('/campaigns/padandfresh',data?.title??'Campaign',data?.description??'Prescribly campaign'),component:()=> <CampaignPage slug="padandfresh"/>});
