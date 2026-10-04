import { createFileRoute } from '@tanstack/react-router';
import { TopicCollection } from '@/components/TopicCollection';
import { COLLECTIONS, pageHead } from '@/lib/prescribly-content';
const data = COLLECTIONS['youth-digital-health'];
export const Route = createFileRoute('/events/youth-digital-health')({head:()=>pageHead('/events/youth-digital-health',data.title,data.copy),component:()=> <TopicCollection slug="youth-digital-health" />});
