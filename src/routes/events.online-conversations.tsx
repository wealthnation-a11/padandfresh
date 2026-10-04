import { createFileRoute } from '@tanstack/react-router';
import { TopicCollection } from '@/components/TopicCollection';
import { COLLECTIONS, pageHead } from '@/lib/prescribly-content';
const data = COLLECTIONS['online-conversations'];
export const Route = createFileRoute('/events/online-conversations')({head:()=>pageHead('/events/online-conversations',data.title,data.copy),component:()=> <TopicCollection slug="online-conversations" />});
