import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ReviewCardProps {
  id: string;
  name: string;
  rating: number;
  date: string;
  content: string;
  caravan?: string;
  className?: string;
}

export function ReviewCard({
  name,
  rating,
  date,
  content,
  caravan,
  className,
}: ReviewCardProps) {
  return (
    <article
      className={cn(
        "relative bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-accent/30 transition-all duration-300",
        className
      )}
    >
      <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/20" />

      {/* Stars */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating ? "text-accent fill-accent" : "text-gray-600"
            )}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-4">
        "{content}"
      </p>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
        <div>
          <p className="font-medium text-white">{name}</p>
          {caravan && (
            <p className="text-xs text-gray-400">Purchased: {caravan}</p>
          )}
        </div>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </article>
  );
}
