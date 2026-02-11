import Link from "next/link";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Award,
  Users,
  Heart,
  Caravan,
  ArrowRight,
  Sparkles,
  Star,
  MapPin,
  Wrench,
  Shield,
  CheckCircle2,
  TrendingUp,
  Home,
  Compass
} from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Award,
    title: "Superior Quality",
    description: "We never compromise on materials or craftsmanship. Every caravan meets the highest Australian standards with our quality guarantee.",
  },
  {
    icon: Users,
    title: "Professional Service",
    description: "Our friendly staff provides expert advice and professional service from first inquiry to after-sales support.",
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "When you purchase a Great Aussie, you don't become a customer—you become part of the family.",
  },
  {
    icon: MapPin,
    title: "Australian Made & Owned",
    description: "Proudly Australian made and owned, using reputed Australian suppliers to support local industry.",
  },
];

const constructionTypes = [
  {
    name: "FiberTech",
    description: "100% Timber-Free Construction",
    features: ["Lightweight", "Strong", "Sustainable"],
    href: "/construction/fiber-tech",
    logo: "/constructiontypes/fibertechl.png"
  },
  {
    name: "AllyTech",
    description: "Welded Aluminium Frame",
    features: ["Durable", "Corrosion Resistant", "Premium"],
    href: "/construction/ally-tech",
    logo: "/constructiontypes/allytechl.png"
  },
  {
    name: "TimberTech",
    description: "Traditional Meranti Frame",
    features: ["Proven", "Reliable", "Value"],
    href: "/construction/timber-tech",
    logo: "/constructiontypes/timbertechl.png"
  },
];

export default function OurStoryPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/home/HomeHeader(D1V1C2).jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/30" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">
              Our Story
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Once Upon a Time in{" "}
              <span className="text-accent">Australia</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              In the vast and awe-inspiring landscapes of Australia, a dream was born. A dream of freedom, 
              exploration, and the allure of the open road. This dream gave birth to Great Aussie Caravans.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link href="#story">
                Read Our Story
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Story Narrative Section */}
      <section id="story" className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="text-center mb-16">
                <span className="inline-block px-4 py-2 border-2 border-accent/30 rounded-[24px] bg-accent/10 text-white text-sm font-semibold mb-4">
                  OUR BEGINNING
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  A Dream Born from Passion
                </h2>
              </div>
              
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p className="text-xl text-white font-medium">
                  Great Aussie was founded by a group of passionate adventurers who believed in the magic 
                  of creating homes-on-wheels that could take families to the most remote corners of this 
                  incredible country.
                </p>
                
                <p>
                  What started as a vision to build caravans that could truly handle Australia's toughest 
                  conditions has grown into something much bigger. Today, Great Aussie Caravans stands as 
                  the only manufacturer in Australia to offer you the choice of three different construction 
                  methods—each designed to meet different needs, budgets, and adventure styles.
                </p>

                <div className="bg-accent/10 border-l-4 border-accent p-6 my-8 rounded-r-lg border border-accent/30">
                  <p className="text-white font-semibold mb-2">
                    Our Unique Promise
                  </p>
                  <p className="text-gray-300">
                    Great Aussie Caravans are the only manufacturer in Australia to offer 100% timber free caravans, aluminium framed caravans with 100% timber free walls, floor, and roof, or traditional meranti framed caravans. Whether you are after an extreme off-road caravan or a lightweight touring van we’ve got you covered. Our extreme off-road range has been designed so you can “go your own way”, purpose built to tackle Australia’s toughest tracks.
                  </p>
                </div>

                <p>
                  However, the dreamers at Great Aussie knew that their journey had only just begun. The yearning to expand their horizons and offer even more options to their beloved community of travelers ignited a new vision. Their spirit of innovation and passion for travel knew no bounds. Guided by the desire to offer the complete spectrum of greatly-inspired experiences, they are now expanding towards motorhome and hybrids as well
                </p>

                <p>
                  With decades of experience in manufacturing, testing and most importantly caravanning, we truly believe that we build the best RVs in Australia and with thousands of happy customers and multiple awards we believe you’ll agree because when you purchase a Great Aussie you don’t become a customer you become part of the family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Construction Types Showcase */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-accent/30 rounded-[24px] bg-accent/10 text-white text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              Your Choice, Your Adventure
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Three Construction Methods,{" "}
              <span className="text-accent">One Mission</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              We're the only manufacturer in Australia offering you the choice of three different build 
              methods. Each designed for different needs, but all built with the same commitment to quality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {constructionTypes.map((type, index) => (
              <div
                key={type.name}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-accent/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="mb-3 flex justify-center">
                  <div className="relative h-32 w-40 md:h-40 md:w-48">
                    <Image
                      src={type.logo}
                      alt="Construction Method Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-300">{type.description}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                  {type.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="outline"
                      className="bg-accent/20 text-accent border-accent/30"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto">
                  <Button variant="outline" className="w-full border-gray-800 text-white hover:bg-gray-800 hover:border-accent" asChild>
                    <Link href={type.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 border-2 border-accent/30 rounded-[24px] bg-accent/10 text-white text-sm font-semibold mb-4">
              WHAT DRIVES US
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These values guide everything we do, from design to delivery, ensuring every Great Aussie 
              Caravan lives up to our promise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-accent/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-14 w-14 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family & Community Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-accent" />
              </div>
              <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
                More Than a Business
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                You're Part of the Family
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                When you purchase a Great Aussie Caravan, you don't become just another customer—you become 
                part of our family. We're here for you long after you drive away, providing support, advice, 
                and genuine care for your adventures.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">After-Sales Service</h3>
                    <p className="text-sm text-gray-300">
                      Our commitment doesn't end at delivery. We provide ongoing support and service to 
                      ensure your caravan continues to serve you well.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Expert Advice</h3>
                    <p className="text-sm text-gray-300">
                      Our team of experienced caravanners and professionals are always ready to share 
                      their knowledge and help you make the right choices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Community Connection</h3>
                    <p className="text-sm text-gray-300">
                      Join a community of Great Aussie owners who share stories, tips, and adventures 
                      across Australia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-800/50 aspect-square">
              <Image
                src="/widget/WidgetImages(D1V1C1).jpg"
                alt="Great Aussie Caravans Community"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20 bg-black text-white relative overflow-hidden border-t border-gray-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/home/HomeHeader(D1V1C2).jpg')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-white font-medium text-sm uppercase tracking-wide mb-4 block border-2 border-accent/30 rounded-[24px] px-4 py-2 inline-block bg-accent/10 backdrop-blur-sm">
              Looking Forward
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Expanding Our Horizons
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              As we continue to grow and evolve, we're expanding our range to include motorhomes and hybrids. 
              But no matter what we build, our commitment remains the same: quality Australian manufacturing, 
              innovative design, and putting our customers first.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-accent/20 text-accent border-accent/30 text-base px-4 py-2">
                <Caravan className="h-4 w-4 mr-2" />
                Caravans
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30 text-base px-4 py-2">
                <Home className="h-4 w-4 mr-2" />
                Motorhomes
              </Badge>
              <Badge className="bg-accent/20 text-accent border-accent/30 text-base px-4 py-2">
                <Compass className="h-4 w-4 mr-2" />
                Hybrids
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 border border-accent/30 mb-6">
              <Star className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join the Great Aussie family and discover why we're Australia's trusted choice for 
              quality caravans. Visit our showroom, explore our range, or get in touch we're here 
              to help you find your perfect adventure companion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg" asChild>
                <Link href="/caravans">
                  Explore Our Range
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-gray-800 text-white hover:bg-gray-900 hover:border-accent" asChild>
                <Link href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

