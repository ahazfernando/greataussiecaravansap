import { Layout } from "@/components/layout";
import {
  HeroSection,
  // TrustBadges,
  FeaturedCaravans,
  WhyChooseUs,
  ReviewsSection,
  HomeMetrics,
  BuiltToLastSection,
  DealerHeroSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      {/* <TrustBadges /> */}
      {/* <FeaturedCaravans /> */}
      <WhyChooseUs />
      <BuiltToLastSection />
      <DealerHeroSection />
      <HomeMetrics />
      <ReviewsSection />
    </Layout>
  );
}

