'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Film, Heart, MessageSquare, Users, Target, Zap } from 'lucide-react';

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
}

const features: FeatureCard[] = [
  {
    icon: <Film className="h-8 w-8" />,
    title: 'Movie DNA Matching',
    description: 'Our AI analyzes your film preferences to find people with compatible taste.',
    highlight: true
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: 'Meaningful Connections',
    description: 'Connect over shared cinematic experiences, not just profile photos.'
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: 'Film-Based Icebreakers',
    description: 'Start conversations about movies you both love - no more awkward small talk.'
  }
];

const steps = [
  {
    number: '01',
    title: 'Create Your Film Profile',
    description: 'Rate movies, select favorites, and tell us what genres move you.',
    icon: <Target className="h-6 w-6" />
  },
  {
    number: '02', 
    title: 'Get Matched',
    description: 'Our algorithm finds people with compatible cinematic DNA.',
    icon: <Zap className="h-6 w-6" />
  },
  {
    number: '03',
    title: 'Connect & Watch',
    description: 'Start meaningful conversations and enjoy movies together.',
    icon: <Users className="h-6 w-6" />
  }
];

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Solution Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-6">
              Introducing Korova
            </h2>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
              The first platform that connects people through their love of cinema. 
              Find friends, dates, and movie buddies who truly understand your taste.
            </p>
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal delay={0.2}>
          <div className="mb-20">
            <h3 className="heading-md text-foreground text-center mb-12">
              How Korova Works
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={step.number} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2 z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg">
                      {step.number}
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <ScrollReveal delay={0.4}>
          <div className="mb-16">
            <h3 className="heading-md text-foreground text-center mb-12">
              Powerful Features
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className={`p-6 hover:shadow-lg transition-all duration-300 group ${
                    feature.highlight 
                      ? 'bg-primary/5 border-primary/20 ring-1 ring-primary/10' 
                      : 'bg-card border-border'
                  }`}
                >
                  <CardHeader className="p-0 mb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                      feature.highlight 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-primary/20 text-primary'
                    } group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-lg">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Benefits */}
        <ScrollReveal delay={0.6}>
          <div className="text-center bg-card/50 rounded-2xl p-8 border border-border">
            <h3 className="heading-md text-foreground mb-8">
              Why Korova Works
            </h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-left">
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  🎬 Deeper Connections
                </h4>
                <p className="text-muted-foreground">
                  Movies reveal personality, values, and emotional depth. Connect on what truly matters.
                </p>
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  🎭 Authentic Conversations
                </h4>
                <p className="text-muted-foreground">
                  Skip the small talk. Discuss films, characters, and stories that move you.
                </p>
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  🎪 Shared Experiences
                </h4>
                <p className="text-muted-foreground">
                  Watch movies together, attend screenings, and build memories around cinema.
                </p>
              </div>
              <div className="text-left">
                <h4 className="text-xl font-semibold text-foreground mb-3">
                  🎨 Quality Over Quantity
                </h4>
                <p className="text-muted-foreground">
                  Find fewer, but more meaningful connections with people who truly get you.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}