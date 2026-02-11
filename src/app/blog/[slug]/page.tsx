import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types/article';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout";
import { getTagBgColor, getValidImageUrl } from "@/lib/blog-utils";

async function getArticle(slug: string): Promise<Article | null> {
    try {
        const articlesRef = collection(db, 'blogs');
        const q = query(articlesRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        
        const toISOString = (value: any): string => {
            if (!value) return '';
            if (value.toDate && typeof value.toDate === 'function') {
                return value.toDate().toISOString();
            }
            if (typeof value === 'string') {
                return value;
            }
            return '';
        };
        
        const article: Article = {
            id: doc.id,
            title: data.title || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            slug: data.slug || '',
            imageURL: data.imageURL || '',
            tags: data.tags || [],
            author: data.author || { name: 'Unknown', avatarURL: '' },
            date: toISOString(data.date) || toISOString(data.createdAt),
            createdAt: toISOString(data.createdAt),
            lastUpdated: toISOString(data.lastUpdated),
            isPopular: data.isPopular || false,
        };
        return article;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

const formatDateString = (dateValue: string | undefined | any): string => {
    if (!dateValue) return 'Date not available';
    try {
        let date: Date;
        if (typeof dateValue === 'string') {
            date = new Date(dateValue);
        } else if (dateValue?.toDate && typeof dateValue.toDate === 'function') {
            date = dateValue.toDate();
        } else {
            return 'Date not available';
        }
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    } catch {
        return 'Date not available';
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const article = await getArticle(decodedSlug);
    if (!article) {
        return {
            title: 'Article Not Found | Great Aussie Caravans',
            description: 'The article you are looking for does not exist.',
        };
    }
    return {
        title: `${article.title} | Great Aussie Caravans`,
        description: article.excerpt,
        keywords: article.tags,
        openGraph: {
            title: article.title,
            description: article.excerpt,
            url: `https://greataussiecaravans.com.au/blog/${decodedSlug}`,
            type: 'article',
            images: [{
                url: getValidImageUrl(article.imageURL).startsWith('http') 
                    ? getValidImageUrl(article.imageURL)
                    : `https://greataussiecaravans.com.au${getValidImageUrl(article.imageURL)}`,
                width: 1200,
                height: 630,
                alt: article.title,
            }],
        },
    };
}

const BlogPostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const article = await getArticle(decodedSlug);

    if (!article) {
        notFound();
    }

    return (
        <Layout>
            <main className="min-h-screen bg-white">
                <section className="relative pt-4 md:pt-4 pb-8 bg-white">
                    <div className="container-wide">
                        <div className="grid grid-cols-12 gap-y-12 lg:gap-8">
                            <div className="col-span-12">
                                <header className="mb-12 mx-auto text-center max-w-3xl">
                                    <div className="flex justify-center mb-6">
                                        <Link href="/blog">
                                            <Button variant="ghost" className="gap-2 border border-border rounded-md px-4 py-2">
                                                <ArrowLeft className="h-4 w-4" />
                                                Go Back
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-4 mb-4 flex-wrap justify-center">
                                        {article.tags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-sm border-none"
                                                style={{ backgroundColor: getTagBgColor(tag) }}
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                                        {article.title}
                                    </h1>
                                    <div className="flex items-center gap-4 text-muted-foreground mt-4 justify-center">
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage src={article.author.avatarURL} alt={article.author.name} />
                                                <AvatarFallback>
                                                    {article.author.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{article.author.name}</span>
                                        </div>
                                        <span>•</span>
                                        <span>{formatDateString(article.date || article.createdAt || article.lastUpdated)}</span>
                                    </div>
                                </header>
                                <div className="rounded-2xl overflow-hidden mb-12 aspect-video w-full">
                                    <Image
                                        src={getValidImageUrl(article.imageURL)}
                                        alt={article.title}
                                        width={1200}
                                        height={630}
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </div>
                                <article className="prose lg:prose-xl max-w-none mx-auto">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            h1: ({node, ...props}) => <h1 className="text-3xl font-display font-bold mb-6 mt-8 border-b border-border pb-2" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-2xl font-display font-semibold mb-4 mt-6" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-xl font-display font-semibold mb-3 mt-5" {...props} />,
                                            p: ({node, ...props}) => <p className="leading-relaxed mb-4 text-foreground" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />,
                                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground" {...props} />,
                                            a: ({node, ...props}) => <a className="text-accent hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground my-4" {...props} />,
                                            pre: ({node, ...props}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono my-4" {...props} />,
                                            code: ({ node, className, children, ...props }) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return !match ? (
                                                    <code className="bg-muted text-foreground px-1.5 py-1 rounded text-sm font-mono" {...props}>
                                                        {children}
                                                    </code>
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}
                                    >
                                        {article.content}
                                    </ReactMarkdown>
                                </article>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
};

export default BlogPostPage;

