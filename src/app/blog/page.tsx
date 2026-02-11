import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Metadata } from "next";
import { Layout } from "@/components/layout";
import { Article } from "@/types/article";
import { toISOString } from "@/lib/blog-utils";
import BlogPageClient from "./BlogPageClient";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata: Metadata = {
    title: "Blog | Great Aussie Caravans",
    description: "Discover the latest articles and insights about caravans, travel tips, and Australian adventures",
    keywords: ["blog", "articles", "caravans", "travel", "australia"],
};

async function getArticles(): Promise<Article[]> {
    try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        
        const articles = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            
            return {
                id: doc.id,
                slug: data.slug || '',
                title: data.title || '',
                excerpt: data.excerpt || '',
                imageURL: data.imageURL || '',
                tags: data.tags || [],
                content: data.content || '',
                author: data.author || { name: 'Unknown', avatarURL: '' },
                date: toISOString(data.date) || toISOString(data.createdAt),
                createdAt: toISOString(data.createdAt),
                lastUpdated: toISOString(data.lastUpdated),
                isPopular: data.isPopular || false,
            } as Article;
        });

        // Sort by date (newest first)
        articles.sort((a, b) => {
            const getDate = (article: Article): number => {
                const dateValue = article.lastUpdated || article.createdAt || article.date;
                if (!dateValue) return 0;
                try {
                    if (typeof dateValue === 'string') {
                        return new Date(dateValue).getTime();
                    }
                    return 0;
                } catch {
                    return 0;
                }
            };
            return getDate(b) - getDate(a);
        });

        return articles;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

export default async function BlogPage() {
    const articles = await getArticles();

    return (
        <Layout>
            {/* Hero Section with Featured and Small Blogs */}
            <BlogPageClient allArticles={articles} />

            {/* All Other Blogs Grid */}
            {articles.length > 4 && (
                <BlogGrid articles={articles.slice(4)} showAll={true} />
            )}

            {articles.length === 0 && (
                <section className="section-padding bg-black">
                    <div className="container-wide text-center">
                        <p className="text-gray-300">No blog posts found. Check back soon!</p>
                    </div>
                </section>
            )}
        </Layout>
    );
}
