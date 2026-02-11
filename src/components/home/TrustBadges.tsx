import { Map, Award, Wrench, DollarSign } from "lucide-react";

const badges = [
  {
    icon: Map,
    title: "Australian Owned",
    description: "100% family-owned Australian business",
  },
  {
    icon: Award,
    title: "Quality Build",
    description: "Premium materials & craftsmanship",
  },
  {
    icon: Wrench,
    title: "Warranty Backed",
    description: "Comprehensive warranty coverage",
  },
  {
    icon: DollarSign,
    title: "Value Guaranteed",
    description: "Competitive pricing, no hidden costs",
  },
];

export function TrustBadges() {
  return (
    <section className="bg-white py-8 border-y border-border">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {badges.map((badge, index) => (
            <div
              key={badge.title}
              className="flex items-center gap-4 opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <badge.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{badge.title}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
