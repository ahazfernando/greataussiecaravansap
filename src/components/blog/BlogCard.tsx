import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  className?: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  image,
  author,
  date,
  category,
  className,
}: BlogCardProps) {
  return (
    <article
      className={cn(
        "group bg-card rounded-xl overflow-hidden transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <Link href={`/blog/${id}`} className="block relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="text-xs font-medium bg-accent text-accent-foreground px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
          <span className="text-border">•</span>
          <span>{author}</span>
        </div>

        <Link href={`/blog/${id}`}>
          <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {excerpt}
        </p>

        <Link
          href={`/blog/${id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
        >
          Read More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
