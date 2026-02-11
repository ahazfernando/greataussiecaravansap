"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Review } from "@/types/review";
import Link from "next/link";
import { Layout } from "@/components/layout";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reviews'));
      const reviewsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Handle both old and new review formats
        if (data.reviewerName) {
          // New format - convert to old format for display
          const dateStr = `${data.reviewMonth} ${data.reviewYear}`;
          return {
            id: doc.id,
            name: data.reviewerName || '',
            rating: data.starRating || 5,
            date: dateStr,
            content: data.reviewText || '',
            caravan: data.purchasedCaravanModel || '',
          } as Review;
        } else {
          // Old format
          return {
            id: doc.id,
            name: data.name || '',
            rating: data.rating || 5,
            date: data.date || '',
            content: data.content || '',
            caravan: data.caravan || '',
          } as Review;
        }
      });
      
      // Filter only published reviews
      const publishedReviews = reviewsData.filter((review) => {
        const doc = querySnapshot.docs.find(d => d.id === review.id);
        const data = doc?.data();
        return data?.publishStatus !== 'hidden';
      });
      
      publishedReviews.sort((a, b) => {
        const dateA = typeof a.date === 'string' ? new Date(a.date).getTime() : 0;
        const dateB = typeof b.date === 'string' ? new Date(b.date).getTime() : 0;
        return dateB - dateA;
      });
      setReviews(publishedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to empty array
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "0.0";
  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const fiveStarPercent = totalReviews > 0 
    ? Math.round((fiveStarCount / totalReviews) * 100)
    : 0;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-black py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Customer Reviews
              </h1>
              <p className="text-lg text-gray-300">
                Don't just take our word for it—hear from the Australian families who've chosen Great Aussie Caravans for their adventures.
              </p>
            </div>
            {totalReviews > 0 && (
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-display font-bold text-white">{avgRating}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">Based on {totalReviews} reviews</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-12">5 star</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${fiveStarPercent}%` }} />
                    </div>
                    <span className="text-sm text-gray-400 w-12">{fiveStarPercent}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-12">4 star</span>
                    <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${100 - fiveStarPercent}%` }} />
                    </div>
                    <span className="text-sm text-gray-400 w-12">{100 - fiveStarPercent}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section-padding bg-black">
        <div className="container-wide">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
                  <Skeleton className="h-5 w-20 bg-gray-800" />
                  <Skeleton className="h-4 w-full bg-gray-800" />
                  <Skeleton className="h-4 w-full bg-gray-800" />
                  <Skeleton className="h-4 w-3/4 bg-gray-800" />
                  <div className="border-t border-gray-800 pt-4 space-y-2">
                    <Skeleton className="h-4 w-32 bg-gray-800" />
                    <Skeleton className="h-3 w-40 bg-gray-800" />
                    <Skeleton className="h-3 w-24 bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No reviews yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.08}s`, animationFillMode: "forwards" }}
                >
                  <ReviewCard
                    id={review.id}
                    name={review.name}
                    rating={review.rating}
                    date={typeof review.date === 'string' ? review.date : 'Date not available'}
                    content={review.content}
                    caravan={review.caravan}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-black border-t border-gray-800 py-16">
        <div className="container-wide text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Join Our Happy Customers?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Visit our showroom to see why Australian families choose Great Aussie Caravans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" asChild>
              <Link href="/caravans">Browse Our Range</Link>
            </Button>
            <Button variant="outline" size="lg" className="border-gray-800 text-white hover:bg-gray-900 hover:border-accent" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
