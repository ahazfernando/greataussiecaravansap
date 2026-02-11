"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight } from 'lucide-react';
import { Timestamp } from 'firebase/firestore';
import Image from "next/image";
import { Article } from '@/types/article';
import { Skeleton } from "@/components/ui/skeleton";
import { getTagBgColor } from '@/lib/blog-utils';

interface MostRecentBlogProps {
    article: Article;
}

const formatDate = (article: Article): string => {
    const dateValue = article.lastUpdated || article.createdAt || article.date;
    if (dateValue && typeof (dateValue as Timestamp).toDate === 'function') {
        return (dateValue as Timestamp).toDate().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
    if (typeof dateValue === 'string') {
        const d = new Date(dateValue);
        if (!isNaN(d.getTime())) {
            return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        }
    }
    return 'Date not available';
};

const MostRecentBlog: React.FC<MostRecentBlogProps> = ({ article }) => {
    const [imageLoading, setImageLoading] = useState(true);
    
    if (!article) return null;

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

    const formattedDate = formatDate(article);

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container-wide">
                <Link href={`/blog/${encodeURIComponent(article.slug)}`} className="block group">
                    {/* Mobile Layout */}
                    <Card className="block md:hidden bg-white p-6 rounded-2xl border-0 shadow-none">
                        <div className="rounded-xl overflow-hidden mb-6 relative">
                            {imageLoading && (
                                <Skeleton className="absolute inset-0 w-full h-full" />
                            )}
                            <Image
                                src={getValidImageUrl(article.imageURL)}
                                alt={article.title}
                                width={1200}
                                height={630}
                                className="w-full h-auto object-cover"
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-4 gap-y-2 mb-4 flex-wrap">
                                {article.tags.map(tag => (
                                    <Badge key={tag} variant="outline" className="text-sm border-none" style={{ backgroundColor: getTagBgColor(tag) }}>
                                        {tag}
                                    </Badge>
                                ))}
                                <span className="text-sm text-gray-500">{formattedDate}</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3">{article.title}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
                            <div className="inline-flex items-center font-semibold text-accent">
                                Read Article <ArrowRight size={20} className="ml-2" />
                            </div>
                        </div>
                    </Card>

                    {/* Desktop Layout */}
                    <Card className="hidden md:block relative bg-white rounded-2xl overflow-hidden aspect-[16/9] border-0 shadow-none">
                        <div className="absolute inset-0">
                            {imageLoading && (
                                <Skeleton className="absolute inset-0 w-full h-full" />
                            )}
                            <Image
                                src={getValidImageUrl(article.imageURL)}
                                alt={article.title}
                                width={1200}
                                height={630}
                                className="w-full h-auto object-cover"
                                onLoad={() => setImageLoading(false)}
                                onError={() => setImageLoading(false)}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                        </div>
                        <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 mb-2 flex-wrap">
                                    {article.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-sm border-none backdrop-blur-sm" style={{ backgroundColor: getTagBgColor(tag) }}>
                                            {tag}
                                        </Badge>
                                    ))}
                                    <span className="text-sm text-gray-200 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">
                                        {formattedDate}
                                    </span>
                                </div>
                                <h2 className="text-3xl lg:text-5xl font-display font-bold text-white leading-tight">{article.title}</h2>
                                <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-3xl hidden lg:block">
                                    {article.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4">
                                    <div className="flex items-center">
                                        <Avatar className="h-12 w-12 mr-4 ring-2 ring-white/30">
                                            <AvatarImage src={article.author.avatarURL} alt={article.author.name} />
                                            <AvatarFallback className="bg-gray-700 text-white">
                                                {article.author.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-white text-base">{article.author.name}</p>
                                            <p className="text-gray-300 text-sm">Author</p>
                                        </div>
                                    </div>
                                    <div className="inline-flex items-center font-semibold text-white bg-white/10 hover:bg-white/20 transition-all px-5 py-3 rounded-lg backdrop-blur-sm">
                                        Read Article <ArrowRight size={20} className="ml-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Link>
            </div>
        </section>
    );
};

export default MostRecentBlog;

