'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent } from '@/components/ui';
import { GradientText } from '@/components/ui/gradient-text';
import { WobbleCard } from '@/components/ui/wobble-card';
import { Star, Quote, Users, Calendar, MessageSquare, Heart, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section id="social-proof" className="py-20 bg-gradient-to-br from-secondary/5 via-background to-primary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,169,165,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,193,7,0.1),transparent_50%)]" />
      
      {/* Static decoration */}
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <TrendingUp className="h-12 w-12 text-secondary mr-3" />
              <Sparkles className="h-8 w-8 text-primary" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <GradientText 
                text="Join the Movement"
                className="heading-lg"
                neon={false}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            
            <motion.p 
              className="body-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Thousands of film lovers are already excited about Korova. 
              See what our early community is saying.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className="h-full"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="bg-card border border-border rounded-lg min-h-[120px] p-4 text-center hover:shadow-md transition-shadow duration-200">
                <div className="flex items-center justify-center mb-2 text-primary">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-foreground mb-1">
                  {stat.number}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="heading-md text-foreground text-center mb-8">
            What People Are Saying
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="h-full"
                style={{
                  animation: `fadeIn 0.8s ease-out ${index * 0.15}s both`
                }}
              >
                <div className="bg-card border border-border rounded-lg min-h-[220px] p-5 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center mb-3">
                    <Quote className="h-5 w-5 text-primary mr-2" />
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 border border-primary/20">
                      <img
                        src={`/images/${testimonial.name.toLowerCase().replace(' ', '-')}.jpeg`}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div 
                        className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full hidden items-center justify-center"
                        style={{ marginTop: '-32px' }}
                      >
                        <span className="text-primary font-semibold text-xs">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Features */}
        <div className="text-center bg-gradient-to-r from-primary/5 via-background to-secondary/5 rounded-2xl p-6 border border-border/50">
          <h3 className="heading-md text-foreground mb-6">
            Join Our Growing Community
          </h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "Active Community", desc: "Connect with passionate film enthusiasts who share your interests" },
              { icon: MessageSquare, title: "Weekly Updates", desc: "Get exclusive behind-the-scenes content and development updates" },
              { icon: Calendar, title: "Early Access", desc: "Be the first to try new features and shape the future of Korova" }
            ].map((item, index) => (
              <div
                key={item.title}
                className="text-center hover:-translate-y-1 transition-transform duration-200"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1 + 0.2}s both`
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-muted-foreground text-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}