import { createFileRoute } from '@tanstack/react-router';
import { CampaignPage } from '@/components/CampaignPage';
import { CAMPAIGNS, pageHead } from '@/lib/prescribly-content';
const data=CAMPAIGNS.find(c=>c.slug==='youth-digital-health');
export const Route=createFileRoute('/campaigns/youth-digital-health')({head:()=>pageHead('/campaigns/youth-digital-health',data?.title??'Campaign',data?.description??'Prescribly campaign'),component:()=> <CampaignPage slug="youth-digital-health"/>});
