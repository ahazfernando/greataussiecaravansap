import { Layout } from "@/components/layout";
import {
  HeroSection,
  // TrustBadges,
  FeaturedCaravans,
  WhyChooseUs,
  ReviewsSection,
  HomeMetrics,
} from "@/components/home";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      {/* <TrustBadges /> */}
      {/* <FeaturedCaravans /> */}
      <WhyChooseUs />
      <HomeMetrics />
      <ReviewsSection />
    </Layout>
  );
}

