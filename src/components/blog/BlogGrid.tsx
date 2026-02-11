"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Article } from '@/types/article';
import { Skeleton } from "@/components/ui/skeleton";

interface BlogGridProps {
    articles: Article[];
    showAll?: boolean; // If true, shows all articles in grid. If false, shows only 3
    isAdmin?: boolean; // If true, applies admin dashboard specific styling
}

const formatDate = (article: Article): string => {
    const dateValue = article.lastUpdated || article.createdAt || article.date;
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        const date = (dateValue as Timestamp).toDate();
        return date.toLocaleDateString('en-GB', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
        });
    }
    if (typeof dateValue === 'string') {
        const d = new Date(dateValue);
        if (!isNaN(d.getTime())) {
            return d.toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'short', 
                year: 'numeric' 
            });
        }
    }
    return 'Date not available';
};

interface BlogCardProps {
    article: Article;
    getValidImageUrl: (imageURL: string) => string;
}

const BlogCard: React.FC<BlogCardProps> = ({ article, getValidImageUrl }) => {
    const [imageLoading, setImageLoading] = useState(true);

    const formattedDate = formatDate(article);

    return (
        <div className="bg-black rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-lg hover:shadow-xl">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden">
                {imageLoading && (
                    <Skeleton className="absolute inset-0 w-full h-full rounded-2xl bg-gray-800" />
                )}
                <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block h-full">
                    <Image
                        src={getValidImageUrl(article.imageURL)}
                        alt={article.title}
                        fill
                        className="object-cover rounded-2xl"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                    />
                </Link>
            </div>
            <div className="pt-6 pr-6 pb-6 flex-grow flex flex-col">
                <p className="text-sm text-gray-400 mb-3">{formattedDate}</p>
                <h3 className="text-xl font-display font-bold text-white mb-3 line-clamp-2 leading-tight">{article.title}</h3>
                <p className="text-base text-gray-300 mb-4 flex-grow line-clamp-3 leading-relaxed">{article.excerpt}</p>
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className="text-sm px-3 py-1 rounded-md bg-accent/20 text-accent border border-accent/30"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <Link
                    href={`/blog/${encodeURIComponent(article.slug)}`}
                    className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors mt-auto"
                >
                    Read more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

const BlogGrid: React.FC<BlogGridProps> = ({ articles, showAll = false }) => {
    const getValidImageUrl = (imageURL: string): string => {
        if (!imageURL || imageURL.trim() === '') {
            return '/blogs/blog1.png';
        }
        
        try {
            new URL(imageURL);
            return imageURL;
        } catch {
            if (imageURL.startsWith('/')) {
                return imageURL;
            }
            return `/blogs/${imageURL}`;
        }
    };

    // If showAll is false, only show latest 3
    const displayArticles = showAll ? articles : articles.slice(0, 3);

    if (displayArticles.length === 0) {
        return null;
    }

    return (
        <section className="pt-5 pb-8 md:pt-20 md:pb-12 bg-black">
            <div className="container-wide">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-12">
                    {/* Reader's Bobba Button */}
                    <Link href="/blog">
                        <button className="mb-4 px-6 py-2 bg-accent text-black rounded-full flex items-center gap-2 hover:opacity-90 transition-colors font-medium">
                            <span>Reader&apos;s Blog</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                    
                    {/* Main Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">
                        Explore Insights in Our Blog
                    </h2>
                    
                    {/* Subtitle */}
                    <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
                        Are you a fan of getting to know more about Victoria with us? If so, here&apos;s the chance
                    </p>
                </div>

                {/* Blog Cards Grid */}
                <div className={`grid grid-cols-1 ${displayArticles.length === 1 ? 'md:grid-cols-1' : displayArticles.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-6 lg:gap-6`}>
                    {displayArticles.map(article => (
                        <BlogCard key={article.id} article={article} getValidImageUrl={getValidImageUrl} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogGrid;

