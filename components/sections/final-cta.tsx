'use client';

import { FadeIn, ScrollReveal } from '@/components/animations';
import { EmailInput, Button } from '@/components/ui';
import { useEmailCollection } from '@/hooks';
import { Film, Sparkles, ArrowRight, Clock } from 'lucide-react';

export function FinalCTASection() {
  const { submitEmail, isSubmitting, isSubmitted } = useEmailCollection();

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,193,7,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,169,165,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
              <Film className="h-12 w-12 text-primary mr-3" />
              <Sparkles className="h-8 w-8 text-secondary" />
            </div>
            
            <h2 className="heading-xl text-foreground mb-6">
              Ready to Find Your Cinematic Soulmate?
            </h2>
            
            <p className="body-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join thousands of film lovers who are tired of superficial connections. 
              Be among the first to experience meaningful relationships through the movies you love.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mb-12 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">5,000+ people waiting</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Launching Q1 2025</span>
              </div>
            </div>

            {/* Main CTA */}
            {!isSubmitted ? (
              <div className="max-w-md mx-auto mb-12">
                <EmailInput
                  placeholder="Enter your email for early access"
                  onSubmit={submitEmail}
                  buttonText="Join the Waitlist"
                  isLoading={isSubmitting}
                  className="gap-4"
                />
                <p className="text-xs text-muted-foreground mt-3">
                  Free to join • No spam • Unsubscribe anytime
                </p>
              </div>
            ) : (
              <div className="max-w-md mx-auto mb-12 p-6 bg-card rounded-lg border border-border shadow-lg">
                <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  You're In! 🎬
                </h3>
                <p className="text-muted-foreground mb-4">
                  Welcome to the Korova family! You'll be notified as soon as we launch.
                </p>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('founder-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full"
                >
                  Explore Founder Benefits
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                variant="outline"
                size="lg"
                onClick={() => document.getElementById('founder-tiers')?.scrollIntoView({ behavior: 'smooth' })}
                className="group"
              >
                Become a Founder
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-primary mb-1">5,000+</div>
                <div className="text-sm text-muted-foreground">Film lovers waiting</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-primary mb-1">Q1 2025</div>
                <div className="text-sm text-muted-foreground">Expected launch</div>
              </div>
              <div className="text-center p-4 bg-background/50 rounded-lg border border-border/50">
                <div className="text-2xl font-bold text-primary mb-1">30-day</div>
                <div className="text-sm text-muted-foreground">Money-back guarantee</div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bottom Message */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16 max-w-2xl mx-auto">
            <p className="text-muted-foreground italic">
              "The best way to find out if you can trust somebody is to trust them." 
              <br />
              <span className="text-sm">— Ernest Hemingway</span>
            </p>
            <p className="text-muted-foreground mt-4">
              Trust Korova to help you find people who truly understand your passions.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}