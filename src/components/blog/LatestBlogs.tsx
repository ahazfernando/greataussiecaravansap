"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Article } from '@/types/article';
import BlogGrid from './BlogGrid';
import { Skeleton } from '@/components/ui/skeleton';

const LatestBlogs: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const blogsRef = collection(db, 'blogs');
                const snapshot = await getDocs(blogsRef);
                
                const blogsData = snapshot.docs.map(doc => {
                    const data = doc.data();
                    
                    // Helper to convert Firestore Timestamp to ISO string
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
                blogsData.sort((a, b) => {
                    const getDate = (article: Article): number => {
                        const dateValue = article.lastUpdated || article.createdAt || article.date;
                        if (!dateValue) return 0;
                        try {
                            // Handle Firestore Timestamp
                            if (dateValue && typeof dateValue === 'object' && 'toDate' in dateValue && typeof dateValue.toDate === 'function') {
                                return (dateValue as Timestamp).toDate().getTime();
                            }
                            // Handle string or number
                            return new Date(dateValue as string | number | Date).getTime();
                        } catch {
                            return 0;
                        }
                    };
                    return getDate(b) - getDate(a); // Descending order (newest first)
                });

                setArticles(blogsData);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section className="pt-5 pb-8 md:pt-20 md:pb-12 bg-black">
                <div className="container-wide">
                    <div className="flex flex-col items-center text-center mb-12">
                        <Skeleton className="h-10 w-48 mb-4 bg-gray-800" />
                        <Skeleton className="h-8 w-96 mb-4 bg-gray-800" />
                        <Skeleton className="h-5 w-64 bg-gray-800" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-black rounded-2xl overflow-hidden flex flex-col">
                                <Skeleton className="w-full aspect-[16/9] rounded-2xl bg-gray-800" />
                                <div className="pt-6 pr-6 pb-6 space-y-3">
                                    <Skeleton className="h-4 w-24 bg-gray-800" />
                                    <Skeleton className="h-6 w-full bg-gray-800" />
                                    <Skeleton className="h-6 w-3/4 bg-gray-800" />
                                    <Skeleton className="h-4 w-full bg-gray-800" />
                                    <Skeleton className="h-4 w-full bg-gray-800" />
                                    <Skeleton className="h-4 w-2/3 bg-gray-800" />
                                    <div className="flex gap-2 mt-4">
                                        <Skeleton className="h-6 w-16 rounded-md bg-gray-800" />
                                        <Skeleton className="h-6 w-20 rounded-md bg-gray-800" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (articles.length === 0) {
        return null; // Don't show section if no blogs
    }

    return <BlogGrid articles={articles} showAll={false} />;
};

export default LatestBlogs;

