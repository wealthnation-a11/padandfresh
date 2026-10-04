import { createFileRoute } from '@tanstack/react-router';
import { TopicCollection } from '@/components/TopicCollection';
import { COLLECTIONS, pageHead } from '@/lib/prescribly-content';
const data = COLLECTIONS['womens-health'];
export const Route = createFileRoute('/events/womens-health')({head:()=>pageHead('/events/womens-health',data.title,data.copy),component:()=> <TopicCollection slug="womens-health" />});
