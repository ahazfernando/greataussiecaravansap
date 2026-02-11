import { Layout } from "@/components/layout";
import {
  HeroSection,
  // TrustBadges,
  FeaturedCaravans,
  WhyChooseUs,
  ReviewsSection,
  MetricsSection,
} from "@/components/home";

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      {/* <TrustBadges /> */}
      {/* <FeaturedCaravans /> */}
      <WhyChooseUs />
      <MetricsSection />
      <ReviewsSection />
    </Layout>
  );
}

