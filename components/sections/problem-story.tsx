'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent } from '@/components/ui';
import { MessageCircle, Zap, Users2 } from 'lucide-react';

interface ProblemCard {
  persona: 'alex' | 'ben' | 'chloe';
  title: string;
  description: string;
  icon: string;
  problem: string;
}

const problemCards: ProblemCard[] = [
  {
    persona: 'alex',
    title: 'Alex',
    description: "I'm tired of small talk. I want to connect with someone who gets my love for indie films.",
    icon: '😔',
    problem: 'Surface-level conversations'
  },
  {
    persona: 'ben', 
    title: 'Ben',
    description: "Every dating app is the same. I want to find someone who shares my passion for cinema.",
    icon: '😞',
    problem: 'Generic dating apps'
  },
  {
    persona: 'chloe',
    title: 'Chloe', 
    description: "I want friends who understand my movie references and share my taste in films.",
    icon: '😟',
    problem: 'Lack of common interests'
  }
];

export function ProblemStorySection() {
  return (
    <section id="problem" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-6">
              The Problem with Modern Connections
            </h2>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
              Dating apps focus on looks. Social media is superficial. 
              Real connections happen when you share the same passions.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problemCards.map((card, index) => (
            <ScrollReveal key={card.persona} delay={0.2 * (index + 1)}>
              <Card className="text-center p-6 bg-background/80 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                    <span className="text-2xl">{card.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    "{card.description}"
                  </p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm">
                    {card.problem}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
        
        <ScrollReveal delay={0.8}>
          <div className="text-center">
            <h3 className="heading-md text-foreground mb-6">
              Sound Familiar?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 p-4 bg-background/50 rounded-lg border border-border">
                <MessageCircle className="h-6 w-6 text-destructive" />
                <span className="text-muted-foreground">Shallow conversations</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-background/50 rounded-lg border border-border">
                <Zap className="h-6 w-6 text-destructive" />
                <span className="text-muted-foreground">Instant judgments</span>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-background/50 rounded-lg border border-border">
                <Users2 className="h-6 w-6 text-destructive" />
                <span className="text-muted-foreground">No real connection</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}