import { createFileRoute } from '@tanstack/react-router';
import { TopicCollection } from '@/components/TopicCollection';
import { COLLECTIONS, pageHead } from '@/lib/prescribly-content';
const data = COLLECTIONS['webinars'];
export const Route = createFileRoute('/events/webinars')({head:()=>pageHead('/events/webinars',data.title,data.copy),component:()=> <TopicCollection slug="webinars" />});
