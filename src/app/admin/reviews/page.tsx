"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Review } from "@/types/admin";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ReviewModal } from "@/components/admin/ReviewModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createReview, updateReview, deleteReview } from "@/lib/admin-functions";
import { Edit, Trash2, Star, Quote } from "lucide-react";
import { StarRating } from "@/components/admin/StarRating";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Caravan models list - you can expand this or fetch from a database
const caravanModels = [
  "Family Cruiser 23",
  "Off-Road Explorer 25",
  "Touring Elite 20",
  "Adventure Seeker 22",
  "Outback Warrior 24",
  "Coastal Cruiser 21",
  "Mountain Range 26",
  "Desert Nomad 23",
];

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const { toast } = useToast();

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
          // New format
          return {
            id: doc.id,
            reviewerName: data.reviewerName || '',
            starRating: data.starRating || 5,
            reviewText: data.reviewText || '',
            purchasedCaravanModel: data.purchasedCaravanModel || '',
            reviewMonth: data.reviewMonth || 'January',
            reviewYear: data.reviewYear || new Date().getFullYear(),
            publishStatus: data.publishStatus || 'published',
            createdAt: data.createdAt,
            lastUpdated: data.lastUpdated,
          } as Review;
        } else {
          // Old format - convert to new format
          const date = data.date ? new Date(data.date) : new Date();
          return {
            id: doc.id,
            reviewerName: data.name || '',
            starRating: data.rating || 5,
            reviewText: data.content || '',
            purchasedCaravanModel: data.caravan || '',
            reviewMonth: date.toLocaleString('default', { month: 'long' }),
            reviewYear: date.getFullYear(),
            publishStatus: 'published',
            createdAt: data.createdAt,
            lastUpdated: data.lastUpdated,
          } as Review;
        }
      });
      
      // Sort by year and month (newest first)
      reviewsData.sort((a, b) => {
        const monthOrder = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const yearDiff = b.reviewYear - a.reviewYear;
        if (yearDiff !== 0) return yearDiff;
        return monthOrder.indexOf(b.reviewMonth) - monthOrder.indexOf(a.reviewMonth);
      });
      
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error",
        description: "Failed to fetch reviews",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: Omit<Review, "id" | "createdAt">) => {
    try {
      if (editingReview) {
        await updateReview(editingReview.id, data);
        toast({
          title: "Success",
          description: "Review updated successfully",
        });
      } else {
        await createReview(data);
        toast({
          title: "Success",
          description: "Review created successfully",
        });
      }
      setModalOpen(false);
      setEditingReview(null);
      fetchReviews();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save review",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (review: Review) => {
    setEditingReview(review);
    setModalOpen(true);
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(reviewId);
      toast({
        title: "Success",
        description: "Review deleted successfully",
      });
      fetchReviews();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete review",
        variant: "destructive",
      });
    }
  };

  const handleNewReview = () => {
    setEditingReview(null);
    setModalOpen(true);
  };

  // Filter published reviews for display
  const publishedReviews = reviews.filter(r => r.publishStatus === 'published');
  const hiddenReviews = reviews.filter(r => r.publishStatus === 'hidden');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold">Review Management</h1>
            <p className="text-muted-foreground">Create and manage customer reviews</p>
          </div>
          <Button onClick={handleNewReview}>
            New Review
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{reviews.length}</div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{publishedReviews.length}</div>
              <p className="text-sm text-muted-foreground">Published</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{hiddenReviews.length}</div>
              <p className="text-sm text-muted-foreground">Hidden</p>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="relative">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="border-t pt-4 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-40" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No reviews found. Create your first review!
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="relative group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleEdit(review)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(review.id)}
                      className="h-8 w-8"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <Quote className="h-8 w-8 text-muted-foreground/20" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <StarRating rating={review.starRating} size="md" />
                      {review.publishStatus === 'hidden' && (
                        <Badge variant="secondary">Hidden</Badge>
                      )}
                    </div>
                    
                    <p className="text-sm leading-relaxed text-muted-foreground italic line-clamp-4">
                      &ldquo;{review.reviewText}&rdquo;
                    </p>
                    
                    <div className="border-t pt-4 space-y-1">
                      <p className="font-semibold text-sm">{review.reviewerName}</p>
                      <p className="text-xs text-muted-foreground">
                        Purchased: {review.purchasedCaravanModel}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.reviewMonth} {review.reviewYear}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <ReviewModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          review={editingReview}
          onSave={handleSave}
          caravanModels={caravanModels}
        />
      </div>
    </AdminLayout>
  );
}
