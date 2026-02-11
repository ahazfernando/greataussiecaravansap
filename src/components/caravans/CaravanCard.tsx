import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CaravanCardProps {
  id: string;
  name: string;
  image: string;
  shortDescription: string;
  sleeps: number;
  length: string;
  type: "offroad" | "family" | "touring";
  featured?: boolean;
}

export function CaravanCard({
  id,
  name,
  image,
  shortDescription,
  sleeps,
  length,
  type,
  featured = false,
}: CaravanCardProps) {
  const typeLabels = {
    offroad: "Off-Road",
    family: "Family",
    touring: "Touring",
  };

  return (
    <article
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300",
        featured && "ring-2 ring-accent"
      )}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
          <Star className="h-3 w-3 fill-current" />
          Featured
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
            {typeLabels[type]}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
          {name}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {shortDescription}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <span>Sleeps {sleeps}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 6H3" />
              <path d="M10 12H3" />
              <path d="M10 18H3" />
            </svg>
            <span>{length}</span>
          </div>
        </div>

        <Button variant="outline" className="w-full" asChild>
          <Link href={`/caravans/${id}`}>View Details</Link>
        </Button>
      </div>
    </article>
  );
}
