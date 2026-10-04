import { createFileRoute } from '@tanstack/react-router';
import { TopicCollection } from '@/components/TopicCollection';
import { COLLECTIONS, pageHead } from '@/lib/prescribly-content';
const data = COLLECTIONS['health-futures'];
export const Route = createFileRoute('/events/health-futures')({head:()=>pageHead('/events/health-futures',data.title,data.copy),component:()=> <TopicCollection slug="health-futures" />});
