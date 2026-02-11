import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Event } from '@/types/event';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { Layout } from "@/components/layout";
import { formatEventDate, formatTime, getEventStatus, getValidEventImageUrl } from '@/lib/event-utils';
import { Badge } from "@/components/ui/badge";
import { EventRegistrationForm } from "@/components/events/EventRegistrationForm";

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

async function getEvent(slug: string): Promise<Event | null> {
    try {
        const eventsRef = collection(db, 'events');
        const q = query(eventsRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            return null;
        }
        
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        
        const event: Event = {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            content: data.content || '',
            slug: data.slug || '',
            imageURL: data.imageURL || '',
            location: data.location || '',
            eventDate: timestampToISO(data.eventDate) || '',
            startTime: data.startTime || '',
            endTime: data.endTime || '',
            tags: data.tags || [],
            createdAt: timestampToISO(data.createdAt),
            lastUpdated: timestampToISO(data.lastUpdated),
            isFeatured: data.isFeatured || false,
        };
        
        return event;
    } catch (error) {
        console.error('Error fetching event:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const event = await getEvent(decodedSlug);
    
    if (!event) {
        return {
            title: 'Event Not Found | Great Aussie Caravans',
            description: 'The event you are looking for does not exist.',
        };
    }
    
    return {
        title: `${event.title} | Great Aussie Caravans`,
        description: event.description,
        keywords: event.tags,
        openGraph: {
            title: event.title,
            description: event.description,
            url: `https://greataussiecaravans.com.au/events/${decodedSlug}`,
            type: 'article',
            images: [{
                url: event.imageURL && event.imageURL.startsWith('http') 
                    ? event.imageURL 
                    : `https://greataussiecaravans.com.au${event.imageURL.startsWith('/') ? event.imageURL : `/events/${event.imageURL}` || '/events/event1.png'}`,
                width: 1200,
                height: 630,
                alt: event.title,
            }],
        },
    };
}

const EventDetailPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const event = await getEvent(decodedSlug);

    if (!event) {
        notFound();
    }

    const formattedDate = formatEventDate(event);
    const formattedTime = formatTime(event);
    const status = getEventStatus(event);

    return (
        <Layout>
            <main className="min-h-screen bg-white">
                <section className="relative pt-4 md:pt-4 pb-8 bg-white">
                    <div className="container-wide">
                        <div className="grid grid-cols-12 gap-y-12 lg:gap-8">
                            <div className="col-span-12">
                                <header className="mb-12 mx-auto text-center max-w-3xl">
                                    <div className="flex justify-center mb-6 mt-5">
                                        <Link href="/events">
                                            <Button variant="ghost" className="gap-2 rounded-md px-4 py-2">
                                                <ArrowLeft className="h-4 w-4" />
                                                Go Back
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4 flex-wrap justify-center">
                                        <Badge className={`${status.color} text-white`}>
                                            {status.label}
                                        </Badge>
                                        {event.tags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-sm border-none bg-secondary"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                                        {event.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-gray-500 mt-4 justify-center flex-wrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            <span>{formattedDate}</span>
                                        </div>
                                        {formattedTime && (
                                            <>
                                                <span>•</span>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="h-5 w-5" />
                                                    <span>{formattedTime}</span>
                                                </div>
                                            </>
                                        )}
                                        <span>•</span>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-5 w-5" />
                                            <span>{event.location}</span>
                                        </div>
                                    </div>
                                </header>
                                <div className="rounded-2xl overflow-hidden mb-12 aspect-video w-full">
                                    <Image
                                        src={getValidEventImageUrl(event.imageURL)}
                                        alt={event.title}
                                        width={1200}
                                        height={630}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                                {event.content ? (
                                    <article className="prose lg:prose-xl max-w-none mx-auto">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                                            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-6 mt-8 border-b pb-2" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mb-4 mt-6" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-xl font-semibold mb-3 mt-5" {...props} />,
                                            p: ({node, ...props}) => <p className="leading-relaxed mb-4" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
                                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
                                            a: ({node, ...props}) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
                                            pre: ({node, ...props}) => <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props} />,
                                            code: ({ node, className, children, ...props }) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !match ? (
                                                    <code className="bg-gray-200 text-gray-800 px-1.5 py-1 rounded text-sm font-mono" {...props}>
                                                        {children}
                                                    </code>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}>
                                            {event.content}
                                        </ReactMarkdown>
                                    </article>
                                ) : (
                                    <article className="prose lg:prose-xl max-w-none mx-auto">
                                        <p className="text-lg leading-relaxed">{event.description}</p>
                                    </article>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Event Registration Form */}
                <EventRegistrationForm 
                    eventId={event.id}
                    eventTitle={event.title}
                    eventSlug={event.slug}
                />
            </main>
        </Layout>
    );
};

export default EventDetailPage;




