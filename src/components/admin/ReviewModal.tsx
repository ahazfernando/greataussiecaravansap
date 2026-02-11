"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { StarRating } from "./StarRating";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Review } from "@/types/admin";

const reviewSchema = z.object({
  reviewerName: z.string().min(1, "Reviewer name is required"),
  starRating: z.number().min(1).max(5),
  reviewText: z.string().min(10, "Review text must be at least 10 characters"),
  purchasedCaravanModel: z.string().min(1, "Caravan model is required"),
  reviewMonth: z.string().min(1, "Month is required"),
  reviewYear: z.number().min(2020).max(2030),
  publishStatus: z.enum(["published", "hidden"]),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  review: Review | null;
  onSave: (data: Omit<Review, "id" | "createdAt">) => void;
  caravanModels: string[];
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

export function ReviewModal({
  open,
  onOpenChange,
  review,
  onSave,
  caravanModels,
}: ReviewModalProps) {
  const [previewRating, setPreviewRating] = useState(5);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: review
      ? {
          reviewerName: review.reviewerName,
          starRating: review.starRating,
          reviewText: review.reviewText,
          purchasedCaravanModel: review.purchasedCaravanModel,
          reviewMonth: review.reviewMonth,
          reviewYear: review.reviewYear,
          publishStatus: review.publishStatus,
        }
      : {
          reviewerName: "",
          starRating: 5,
          reviewText: "",
          purchasedCaravanModel: "",
          reviewMonth: months[new Date().getMonth()],
          reviewYear: currentYear,
          publishStatus: "published",
        },
  });

  const formData = watch();
  const watchedRating = watch("starRating");

  useEffect(() => {
    if (review) {
      reset({
        reviewerName: review.reviewerName,
        starRating: review.starRating,
        reviewText: review.reviewText,
        purchasedCaravanModel: review.purchasedCaravanModel,
        reviewMonth: review.reviewMonth,
        reviewYear: review.reviewYear,
        publishStatus: review.publishStatus,
      });
      setPreviewRating(review.starRating);
    } else {
      reset({
        reviewerName: "",
        starRating: 5,
        reviewText: "",
        purchasedCaravanModel: "",
        reviewMonth: months[new Date().getMonth()],
        reviewYear: currentYear,
        publishStatus: "published",
      });
      setPreviewRating(5);
    }
  }, [review, reset]);

  useEffect(() => {
    setPreviewRating(watchedRating || 5);
  }, [watchedRating]);

  const onSubmit = (data: ReviewFormData) => {
    onSave(data as Omit<Review, "id" | "createdAt">);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{review ? "Edit Review" : "Add New Review"}</DialogTitle>
          <DialogDescription>
            {review ? "Update review details" : "Create a new customer review"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Form Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reviewerName">Reviewer Full Name *</Label>
                <Input
                  id="reviewerName"
                  {...register("reviewerName")}
                  placeholder="John Smith"
                />
                {errors.reviewerName && (
                  <p className="text-sm text-destructive">{errors.reviewerName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Star Rating *</Label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => {
                        setValue("starRating", rating);
                        setPreviewRating(rating);
                      }}
                      className="focus:outline-none"
                    >
                      <StarRating
                        rating={rating}
                        size="lg"
                        className={watchedRating >= rating ? "" : "opacity-30"}
                      />
                    </button>
                  ))}
                </div>
                <input type="hidden" {...register("starRating", { valueAsNumber: true })} />
                {errors.starRating && (
                  <p className="text-sm text-destructive">{errors.starRating.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewText">Review Quote Text *</Label>
                <Textarea
                  id="reviewText"
                  {...register("reviewText")}
                  placeholder="Enter the review text..."
                  rows={4}
                />
                {errors.reviewText && (
                  <p className="text-sm text-destructive">{errors.reviewText.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchasedCaravanModel">Purchased Caravan Model *</Label>
                <Select
                  value={formData.purchasedCaravanModel}
                  onValueChange={(value) => setValue("purchasedCaravanModel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select caravan model" />
                  </SelectTrigger>
                  <SelectContent>
                    {caravanModels.map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.purchasedCaravanModel && (
                  <p className="text-sm text-destructive">{errors.purchasedCaravanModel.message}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reviewMonth">Review Month *</Label>
                  <Select
                    value={formData.reviewMonth}
                    onValueChange={(value) => setValue("reviewMonth", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.reviewMonth && (
                    <p className="text-sm text-destructive">{errors.reviewMonth.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewYear">Review Year *</Label>
                  <Select
                    value={formData.reviewYear?.toString()}
                    onValueChange={(value) => setValue("reviewYear", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.reviewYear && (
                    <p className="text-sm text-destructive">{errors.reviewYear.message}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="publishStatus">Publish Status</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {formData.publishStatus === "published" ? "Published" : "Hidden"}
                  </span>
                  <Switch
                    id="publishStatus"
                    checked={formData.publishStatus === "published"}
                    onCheckedChange={(checked) =>
                      setValue("publishStatus", checked ? "published" : "hidden")
                    }
                  />
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <Label>Preview</Label>
              <Card className="relative">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="absolute top-4 right-4">
                      <Quote className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                    <StarRating rating={previewRating} size="md" />
                    <p className="text-sm leading-relaxed text-muted-foreground italic">
                      &ldquo;{formData.reviewText || "Review text will appear here..."}&rdquo;
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">
                        {formData.reviewerName || "Customer Name"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Purchased: {formData.purchasedCaravanModel || "Caravan Model"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.reviewMonth} {formData.reviewYear}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Review</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

