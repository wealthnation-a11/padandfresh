import { createFileRoute } from '@tanstack/react-router';
import { ProgramPage } from '@/components/CampaignPage';
import { pageHead } from '@/lib/prescribly-content';
export const Route=createFileRoute('/campaigns/padandfresh/guard-a-boy')({head:()=>pageHead('/campaigns/padandfresh/guard-a-boy','Guard a Teenage Boy','Support hygiene education, grooming and confidence through PadAndFresh.'),component:()=> <ProgramPage kind="boy"/>});
