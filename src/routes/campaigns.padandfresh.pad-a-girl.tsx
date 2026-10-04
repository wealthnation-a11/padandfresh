import { createFileRoute } from '@tanstack/react-router';
import { ProgramPage } from '@/components/CampaignPage';
import { pageHead } from '@/lib/prescribly-content';
export const Route=createFileRoute('/campaigns/padandfresh/pad-a-girl')({head:()=>pageHead('/campaigns/padandfresh/pad-a-girl','Pad a Teenage Girl','Support menstrual products, health education and school participation through PadAndFresh.'),component:()=> <ProgramPage kind="girl"/>});
