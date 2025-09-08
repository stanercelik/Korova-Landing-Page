'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent } from '@/components/ui';
import { GradientText } from '@/components/ui/gradient-text';
import { WobbleCard } from '@/components/ui/wobble-card';
import { MessageCircle, Zap, Users2, Heart, Frown } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section id="problem" className="py-20 bg-gradient-to-br from-card/20 via-background to-card/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,77,77,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(100,100,100,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div 
              className="mb-6"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GradientText 
                text="The Problem with Modern Connections"
                className="heading-lg"
                gradient="linear-gradient(90deg, #FF4D4D 0%, #666666 50%, #FF4D4D 100%)"
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            <motion.p 
              className="body-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Dating apps focus on looks. Social media is superficial. 
              Real connections happen when you share the same passions.
            </motion.p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problemCards.map((card, index) => (
            <div key={card.persona} className="h-full">
              <div
                className="bg-card border border-border rounded-xl p-6 h-full flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`
                }}
              >
                <div>
                  <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl">{card.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 text-center">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 text-center italic">
                    "{card.description}"
                  </p>
                </div>
                <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs border border-destructive/20 mx-auto">
                  <Frown className="w-3 h-3 mr-1.5" />
                  {card.problem}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <ScrollReveal delay={0.8}>
          <div className="text-center">
            <motion.h3 
              className="heading-md text-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Sound Familiar?
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                { icon: MessageCircle, text: "Shallow conversations" },
                { icon: Zap, text: "Instant judgments" },
                { icon: Users2, text: "No real connection" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 bg-background/60 rounded-lg border border-border/30 hover:border-destructive/20 transition-colors duration-200"
                  style={{
                    animation: `slideInLeft 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <item.icon className="h-5 w-5 text-destructive flex-shrink-0" />
                  <span className="text-muted-foreground text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}