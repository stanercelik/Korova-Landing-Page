'use client';

import {
  HeroSection,
  ProblemStorySection,
  SolutionSection,
  SocialProofSection,
  FAQSection
} from '@/components/sections';

function HemingwayQuoteSection() {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background with blurred user image */}
      <div className="absolute inset-0">
        <img 
          src="/images/main-image.jpeg" 
          alt="Community" 
          className="w-full h-full object-cover blur-[2px] opacity-40"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-foreground italic text-lg leading-relaxed mb-4 font-medium">
            "The best way to find out if you can trust somebody is to trust them."
          </p>
          <p className="text-sm text-muted-foreground mb-6">— Ernest Hemingway</p>
          <p className="text-foreground/90">
            Trust Korova to help you find people who truly understand your passions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemStorySection />
      <SolutionSection />
      <SocialProofSection />
      <FAQSection />
      <HemingwayQuoteSection />
    </div>
  );
}
