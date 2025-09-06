'use client';

import { FadeIn, FloatingElement } from '@/components/animations';
import { EmailInput } from '@/components/ui';
import { useEmailCollection } from '@/hooks';
import { Film, Heart, Users, Sparkles, Play } from 'lucide-react';

interface HeroSectionProps {
  headline?: string;
  subHeadline?: string;
  ctaText?: string;
}

export function HeroSection({
  headline = "Find Your People Through The Films You Love",
  subHeadline = "Tired of superficial connections? CineMatch connects you with friends and partners based on your unique movie taste. Discover meaningful relationships through cinema.",
  ctaText = "Join the Waitlist"
}: HeroSectionProps) {
  const { submitEmail, isSubmitting, isSubmitted } = useEmailCollection();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-background/80 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,193,7,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,193,7,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,169,165,0.05),transparent_50%)]" />
      
      {/* Floating Film Elements */}
      <FloatingElement className="absolute top-20 left-10 opacity-20" duration={4} delay={0}>
        <Film className="h-8 w-8 text-primary" />
      </FloatingElement>
      <FloatingElement className="absolute top-40 right-20 opacity-20" duration={5} delay={1}>
        <Play className="h-6 w-6 text-secondary" />
      </FloatingElement>
      <FloatingElement className="absolute bottom-40 left-20 opacity-20" duration={3} delay={2}>
        <Heart className="h-7 w-7 text-primary" />
      </FloatingElement>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeIn delay={0.2}>
          <div className="flex items-center justify-center mb-6">
            <Film className="h-16 w-16 text-primary mr-4" />
            <h1 className="heading-xl text-foreground">
              CineMatch
            </h1>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.4}>
          <h2 className="heading-lg text-foreground mb-6 max-w-4xl mx-auto">
            {headline}
          </h2>
        </FadeIn>
        
        <FadeIn delay={0.6}>
          <p className="body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {subHeadline}
          </p>
        </FadeIn>
        
        <FadeIn delay={0.8}>
          <div className="max-w-md mx-auto mb-12">
            {isSubmitted ? (
              <div className="text-center p-6 bg-card rounded-lg border border-border shadow-lg">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to the CineMatch Family!
                </h3>
                <p className="text-muted-foreground">
                  You're on the waitlist. We'll notify you when we launch.
                </p>
              </div>
            ) : (
              <EmailInput
                placeholder="Enter your email to join the waitlist"
                onSubmit={submitEmail}
                buttonText={ctaText}
                isLoading={isSubmitting}
              />
            )}
          </div>
        </FadeIn>
        
        <FadeIn delay={1.0}>
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Heart className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-foreground transition-colors">Find Love</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Users className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-foreground transition-colors">Make Friends</span>
            </div>
            <div className="flex items-center space-x-2 group cursor-pointer">
              <Film className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-foreground transition-colors">Share Movies</span>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn delay={1.2}>
          <div className="mt-16 text-sm text-muted-foreground">
            <p>Join <span className="text-primary font-semibold">5,000+</span> movie lovers already on the waitlist</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}