import { Layout } from "@/components/layout";
import {
  HeroSection,
  // TrustBadges,
  FeaturedCaravans,
  WhyChooseUs,
  ReviewsSection,
  HomeMetrics,
} from "@/components/home";
import { DealerCTA } from "@/components/home/DealerCTA";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      {/* <TrustBadges /> */}
      {/* <FeaturedCaravans /> */}
      <DealerCTA />
      <WhyChooseUs />
      <HomeMetrics />
      <ReviewsSection />
    </Layout>
  );
}

