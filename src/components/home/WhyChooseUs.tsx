import { Hammer, Users, HeartHandshake, Sparkles } from "lucide-react";

const features = [
  {
    icon: Hammer,
    title: "Australian Build Quality",
    description: "Every caravan is built right here in Australia using premium materials suited to our unique conditions.",
  },
    {
    icon: Sparkles,
    title: "Value for Money",
    description: "Premium quality at competitive prices. No hidden costs, no surprises—just value.",
  },
  {
    icon: Users,
    title: "Experienced Craftsmanship",
    description: "Our team brings decades of combined experience in caravan design and manufacturing.",
  },
  {
    icon: HeartHandshake,
    title: "After-Sales Support",
    description: "We're with you long after the sale with dedicated service, parts, and support.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-padding bg-black">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800/50 h-full">
              <img
                src="/home/HomeHeader(D1V1C3).jpg"
                alt="Built for Australian Adventures"
                className="w-full h-full object-cover"
              />
              {/* Subtle overlay for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -right-6 bg-accent text-black p-6 rounded-xl shadow-2xl border border-accent/20">
              <p className="text-4xl font-display font-bold">10+</p>
              <p className="text-sm font-medium opacity-90">Years Experience</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-accent font-display text-3xl md:text-4xl font-bold mb-2">
              Why choose us
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Built for Australian Adventures
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-lg">
              At Great Aussie Caravans, we understand what it takes to build a caravan that can handle the diverse Australian landscape. From the red centre to coastal roads, our caravans are designed to deliver comfort, reliability, and adventure.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex gap-4 opacity-0 animate-fade-up group"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/20 group-hover:bg-accent/30 border border-accent/30 group-hover:border-accent/50 flex items-center justify-center transition-all duration-300">
                    <feature.icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1 group-hover:text-accent transition-colors duration-300">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
