import { MapPin, Phone, Mail, Globe, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Dealer {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website?: string;
  hours: string;
}

interface DealerCardProps {
  dealer: Dealer;
  index?: number;
}

export const DealerCard = ({ dealer, index }: DealerCardProps) => {
  return (
    <div
      className={`dealer-card group relative rounded-3xl p-[2px] overflow-hidden transition-all hover:scale-[1.02] ${index !== undefined ? "animate-slide-in-right" : ""
        }`}
      style={index !== undefined ? { animationDelay: `${index * 100}ms` } : {}}
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-accent/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Card Content */}
      <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-900 to-black rounded-3xl p-5 backdrop-blur-sm flex flex-col h-full">
        {/* Decorative gradient orb */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />

        {/* Dealer Name with gradient text */}
        <h3 className="relative text-xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent mb-2">
          {dealer.name}
        </h3>

        {/* Location Badge */}
        <Badge className="relative mb-4 w-fit bg-gradient-to-r from-accent/20 to-accent/10 text-accent border border-accent/30 px-2.5 py-1 rounded-full hover:from-accent/30 hover:to-accent/20 transition-all text-xs">
          <MapPin className="h-3 w-3 mr-1" />
          {dealer.city}, {dealer.state}
        </Badge>

        {/* Contact Information */}
        <div className="relative space-y-2.5 mb-4 flex-grow">
          {/* Address */}
          <div className="flex items-start gap-2.5 text-xs text-gray-300 group/item hover:text-white transition-colors">
            <div className="mt-0.5 p-1.5 rounded-lg bg-accent/10 group-hover/item:bg-accent/20 transition-colors flex-shrink-0">
              <MapPin className="h-3.5 w-3.5 text-accent" />
            </div>
            <span className="leading-relaxed">{dealer.address}, {dealer.city}, {dealer.state}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2.5 text-xs text-gray-300 group/item hover:text-white transition-colors">
            <div className="p-1.5 rounded-lg bg-accent/10 group-hover/item:bg-accent/20 transition-colors flex-shrink-0">
              <Phone className="h-3.5 w-3.5 text-accent" />
            </div>
            <a
              href={`tel:${dealer.phone}`}
              className="hover:text-accent transition-colors font-medium"
            >
              {dealer.phone}
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2.5 text-xs text-gray-300 group/item hover:text-white transition-colors">
            <div className="p-1.5 rounded-lg bg-accent/10 group-hover/item:bg-accent/20 transition-colors flex-shrink-0">
              <Mail className="h-3.5 w-3.5 text-accent" />
            </div>
            <a
              href={`mailto:${dealer.email}`}
              className="hover:text-accent transition-colors font-medium break-all"
            >
              {dealer.email}
            </a>
          </div>

          {/* Website */}
          {dealer.website && (
            <div className="flex items-center gap-2.5 text-xs text-gray-300 group/item hover:text-white transition-colors">
              <div className="p-1.5 rounded-lg bg-accent/10 group-hover/item:bg-accent/20 transition-colors flex-shrink-0">
                <Globe className="h-3.5 w-3.5 text-accent" />
              </div>
              <a
                href={dealer.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors font-medium"
              >
                {dealer.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}

          {/* Hours */}
          <div className="flex items-center gap-2.5 text-xs text-gray-300 pt-2 border-t border-gray-800/50">
            <div className="p-1.5 rounded-lg bg-accent/10 flex-shrink-0">
              <Clock className="h-3.5 w-3.5 text-accent" />
            </div>
            <span className="text-gray-400 text-xs">{dealer.hours}</span>
          </div>
        </div>

        {/* Contact Dealer Button with gradient */}
        <Button
          variant="accent"
          className="relative w-full bg-gradient-to-r from-accent via-accent to-accent/90 hover:from-accent/90 hover:via-accent hover:to-accent text-black font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300 h-9 text-sm"
          asChild
        >
          <a href={`mailto:${dealer.email}?subject=Inquiry about Great Aussie Caravans`}>
            Contact Dealer
          </a>
        </Button>
      </div>
    </div>
  );
};
