import { Layout } from "@/components/layout";
import {
  HeroSection,
  // TrustBadges,
  FeaturedCaravans,
  WhyChooseUs,
  ReviewsSection,
  HomeMetrics,
  BuiltToLastSection,
} from "@/components/home";
import { DealerCTA } from "@/components/home/DealerCTA";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      {/* <TrustBadges /> */}
      {/* <FeaturedCaravans /> */}
      <WhyChooseUs />
      <BuiltToLastSection />
      <DealerCTA />
      <HomeMetrics />
      <ReviewsSection />
    </Layout>
  );
}

