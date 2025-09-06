'use client';

import {
  HeroSection,
  ProblemStorySection,
  SolutionSection,
  SocialProofSection,
  FounderTiersSection,
  FAQSection,
  FinalCTASection
} from '@/components/sections';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemStorySection />
      <SolutionSection />
      <SocialProofSection />
      <FounderTiersSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
