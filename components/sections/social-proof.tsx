'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent } from '@/components/ui';
import { Star, Quote, Users, Calendar, MessageSquare, Heart } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface Statistic {
  number: string;
  label: string;
  icon: React.ReactNode;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    role: 'Film Student',
    content: "Finally, an app that gets it! I've been waiting for something like Korova. Can't wait to find my fellow Kurosawa enthusiasts.",
    rating: 5
  },
  {
    name: 'Marcus Williams', 
    role: 'Movie Blogger',
    content: "This is exactly what the dating world needs. I'm tired of explaining why I love arthouse films to people who don't understand.",
    rating: 5
  },
  {
    name: 'Emma Rodriguez',
    role: 'Cinema Manager',
    content: "The concept is brilliant. I work in a cinema and see how movies bring people together every day. Korova will be a game-changer.",
    rating: 5
  }
];

const statistics: Statistic[] = [
  {
    number: '5,000+',
    label: 'People on waitlist',
    icon: <Users className="h-6 w-6" />
  },
  {
    number: '89%',
    label: 'Want to find movie buddies',
    icon: <Heart className="h-6 w-6" />
  },
  {
    number: '73%',
    label: 'Tired of shallow apps',
    icon: <MessageSquare className="h-6 w-6" />
  },
  {
    number: 'Q1 2025',
    label: 'Expected launch',
    icon: <Calendar className="h-6 w-6" />
  }
];

export function SocialProofSection() {
  return (
    <section id="social-proof" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-6">
              Join the Movement
            </h2>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
              Thousands of film lovers are already excited about Korova. 
              See what our early community is saying.
            </p>
          </div>
        </ScrollReveal>

        {/* Statistics */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {statistics.map((stat, index) => (
              <Card key={stat.label} className="text-center p-6 bg-background/80 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center mb-3 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal delay={0.4}>
          <div className="mb-16">
            <h3 className="heading-md text-foreground text-center mb-12">
              What People Are Saying
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={testimonial.name} className="p-6 bg-background/80 backdrop-blur-sm border border-border hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <Quote className="h-6 w-6 text-primary mr-2" />
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-primary font-semibold">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Community Features */}
        <ScrollReveal delay={0.6}>
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
            <h3 className="heading-md text-foreground mb-6">
              Join Our Growing Community
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Active Community
                </h4>
                <p className="text-muted-foreground text-sm">
                  Connect with passionate film enthusiasts who share your interests
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Weekly Updates
                </h4>
                <p className="text-muted-foreground text-sm">
                  Get exclusive behind-the-scenes content and development updates
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Early Access
                </h4>
                <p className="text-muted-foreground text-sm">
                  Be the first to try new features and shape the future of Korova
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}