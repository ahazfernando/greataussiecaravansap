"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import { ArrowRight } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import { Article } from '@/types/article';
import { Skeleton } from "@/components/ui/skeleton";

// Date formatting helper
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

// Featured Blog Card (Large - Left Side)
const FeaturedBlogCard: React.FC<BlogCardProps> = ({ article, getValidImageUrl }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const formattedDate = formatDate(article);

    return (
        <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block h-full group">
            <div className="bg-black border border-gray-800 rounded-2xl overflow-hidden flex flex-col h-full shadow-lg hover:shadow-xl hover:border-accent/30 transition-all">
                <div className="relative w-full aspect-[3/1] rounded-2xl overflow-hidden">
                    {imageLoading && (
                        <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
                    )}
                    <Image
                        src={getValidImageUrl(article.imageURL)}
                        alt={article.title}
                        fill
                        className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                    />
                </div>
                <div className="pt-6 px-6 pb-6 flex-grow flex flex-col">
                    <p className="text-sm text-gray-400 mb-2">{formattedDate}</p>
                    <div className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors mb-3">
                        Read more <ArrowRight className="ml-1 w-4 h-4" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                        {article.title}
                    </h3>
                    <p className="text-base text-gray-300 mb-4 flex-grow line-clamp-3 leading-relaxed">
                        {article.excerpt}
                    </p>
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
                </div>
            </div>
        </Link>
    );
};

// Small Blog Card (Right Side - Stacked)
const SmallBlogCard: React.FC<BlogCardProps> = ({ article, getValidImageUrl }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const formattedDate = formatDate(article);

    return (
        <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block h-full group">
            <div className="bg-black border border-gray-800 rounded-xl overflow-hidden flex gap-4 shadow-md hover:shadow-lg hover:border-accent/30 transition-all h-full">
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0 rounded-xl overflow-hidden">
                    {imageLoading && (
                        <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
                    )}
                    <Image
                        src={getValidImageUrl(article.imageURL)}
                        alt={article.title}
                        fill
                        className="object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                        onLoad={() => setImageLoading(false)}
                        onError={() => setImageLoading(false)}
                    />
                </div>
                <div className="flex-1 py-4 pr-4 flex flex-col justify-between min-w-0">
                    <div>
                        {article.tags && article.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {article.tags.slice(0, 1).map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs px-2 py-1 rounded-md bg-accent/20 text-accent border border-accent/30"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                        <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                            {article.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-1">{formattedDate}</p>
                        <div className="inline-flex items-center text-accent font-medium hover:text-accent/80 transition-colors text-sm mb-2">
                            Read more <ArrowRight className="ml-1 w-3 h-3" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

// Main Component
const BlogPageClient: React.FC<{ allArticles: Article[] }> = ({ allArticles }) => {
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

    // Get first 4 articles (1 featured + 3 small)
    const heroArticles = allArticles.slice(0, 4);
    const featuredArticle = heroArticles[0];
    const smallArticles = heroArticles.slice(1, 4);

    return (
        <section className="pt-5 pb-8 md:pt-20 md:pb-12 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col items-center text-center mb-12">
                    {/* Reader's Digest Button */}
                    <Link href="/blog">
                        <button className="mb-4 px-6 py-2 bg-accent text-black rounded-full flex items-center gap-2 hover:bg-accent/90 transition-colors">
                            <span>Reader&apos;s Digest</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                    
                    {/* Main Title */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Explore Insights in Our Blog
                    </h2>
                    
                    {/* Subtitle */}
                    <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
                        Are you a fan of getting knowing more about Victoria with us, if so here&apos;s the chance
                    </p>
                </div>

                {/* Hero Section - Featured Blogs Layout */}
                {heroArticles.length > 0 && (
                    <div className="mb-16">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                            {/* Featured Blog (Left - Large) */}
                            {featuredArticle && (
                                <div className="lg:col-span-2 h-full">
                                    <FeaturedBlogCard 
                                        article={featuredArticle} 
                                        getValidImageUrl={getValidImageUrl} 
                                    />
                                </div>
                            )}
                            
                            {/* Small Blogs (Right - Stacked) */}
                            <div className="flex flex-col gap-6 h-full">
                                {smallArticles.map(article => (
                                    <div key={article.id} className="flex-1">
                                        <SmallBlogCard 
                                            article={article} 
                                            getValidImageUrl={getValidImageUrl} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogPageClient;

