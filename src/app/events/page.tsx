import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Metadata } from "next";
import EventsPageClient from "./EventsPageClient";
import { Event } from "@/types/event";
import { Layout } from "@/components/layout";

// Helper function to convert Timestamp to ISO string
const timestampToISO = (value: any): string | undefined => {
    if (!value) return undefined;
    if (value && typeof value.toDate === 'function') {
        return value.toDate().toISOString();
    }
    if (typeof value === 'string') {
        return value;
    }
    return undefined;
};

export const metadata: Metadata = {
    title: "Events | Great Aussie Caravans",
    description: "Discover upcoming events, shows, and special occasions",
    keywords: ["events", "shows", "caravan events"],
};

async function getEvents(): Promise<Event[]> {
    try {
        const eventsQuery = query(collection(db, 'events'), orderBy('eventDate', 'asc'));
        const querySnapshot = await getDocs(eventsQuery);
        
        const events = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            
            return {
                id: doc.id,
                slug: data.slug || '',
                title: data.title || '',
                description: data.description || '',
                content: data.content || '',
                imageURL: data.imageURL || '',
                location: data.location || '',
                eventDate: timestampToISO(data.eventDate) || '',
                startTime: data.startTime || '',
                endTime: data.endTime || '',
                tags: data.tags || [],
                createdAt: timestampToISO(data.createdAt),
                lastUpdated: timestampToISO(data.lastUpdated),
                isFeatured: data.isFeatured || false,
            } as Event;
        });
        
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

const EventsPage = async () => {
    const events = await getEvents();
    return (
        <Layout>
            <EventsPageClient allEvents={events} />
        </Layout>
    );
};

export default EventsPage;

