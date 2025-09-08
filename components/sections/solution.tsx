'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { GradientText } from '@/components/ui/gradient-text';
import { WobbleCard } from '@/components/ui/wobble-card';
import BlurredImageBackground from '@/components/ui/blurred-image-background';
import { Film, Heart, MessageSquare, Users, Target, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section id="solution" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,193,7,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(0,169,165,0.1),transparent_50%)]" />
      
      {/* Static background decoration */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-50"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Solution Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Sparkles className="h-12 w-12 text-primary mr-3" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <GradientText 
                text="Introducing Korova"
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
              The first platform that connects people through their love of cinema. 
              Find friends, dates, and movie buddies who truly understand your taste.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* How It Works */}
        <ScrollReveal delay={0.2}>
          <div className="mb-20">
            <motion.h3 
              className="heading-md text-foreground text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              How Korova Works
            </motion.h3>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div 
                  key={step.number} 
                  className="text-center relative hover:-translate-y-1 transition-transform duration-200"
                  style={{
                    animation: `scaleIn 0.7s ease-out ${index * 0.2}s both`
                  }}
                >
                  {index < steps.length - 1 && (
                    <div 
                      className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -translate-x-1/2 z-0"
                      style={{
                        animation: `slideInRight 1s ease-out ${index * 0.3 + 0.5}s both`
                      }}
                    />
                  )}
                  <div className="relative z-10">
                    <div 
                      className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                      {step.number}
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <div className="text-primary">
                        {step.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                      <ArrowRight className="w-5 h-5 text-primary/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <ScrollReveal delay={0.4}>
          <div className="mb-16">
            <motion.h3 
              className="heading-md text-foreground text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Powerful Features
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="h-full flex flex-col"
                >
                  <WobbleCard 
                    containerClassName={`h-full min-h-[280px] relative overflow-hidden flex flex-col ${
                      feature.highlight 
                        ? 'bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20' 
                        : 'bg-gradient-to-br from-background/90 to-background/80 border-border/50'
                    }`}
                  >
                    {/* Background Image for specific features */}
                    {feature.title === 'Movie DNA Matching' && (
                      <div className="absolute inset-0 opacity-25">
                        <img 
                          src="/images/main-image.jpeg" 
                          alt="Movie DNA" 
                          className="w-full h-full object-cover blur-[1px]"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                      </div>
                    )}
                    {feature.title === 'Meaningful Connections' && (
                      <div className="absolute inset-0 opacity-25">
                        <img 
                          src="/images/emma-rodriguez.jpeg" 
                          alt="Meaningful Connections" 
                          className="w-full h-full object-cover blur-[1px]"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                      </div>
                    )}
                    {feature.title === 'Film-Based Icebreakers' && (
                      <div className="absolute inset-0 opacity-25">
                        <img 
                          src="/images/sarah-chen.jpeg" 
                          alt="Film Conversations" 
                          className="w-full h-full object-cover blur-[1px]"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                      </div>
                    )}
                    <div className="relative p-6 h-full flex flex-col justify-between">
                      <div className="flex items-start space-x-4 mb-4">
                        <motion.div 
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            feature.highlight 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-primary/20 text-primary'
                          } shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {feature.title}
                          </h4>
                          <p className="text-muted-foreground text-sm">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      {feature.highlight && (
                        <motion.div 
                          className="mt-auto"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Most Popular
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </WobbleCard>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Benefits */}
        <ScrollReveal delay={0.6}>
          <motion.div 
            className="text-center bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm rounded-3xl p-8 border border-border/50 relative overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 rounded-3xl" />
            
            <div className="relative">
              <motion.h3 
                className="heading-md text-foreground mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Why Korova Works
              </motion.h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {[
                  { emoji: "🎬", title: "Deeper Connections", desc: "Movies reveal personality, values, and emotional depth. Connect on what truly matters." },
                  { emoji: "🎭", title: "Authentic Conversations", desc: "Skip the small talk. Discuss films, characters, and stories that move you." },
                  { emoji: "🎪", title: "Shared Experiences", desc: "Watch movies together, attend screenings, and build memories around cinema." },
                  { emoji: "🎨", title: "Quality Over Quantity", desc: "Find fewer, but more meaningful connections with people who truly get you." }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="text-left p-6 bg-background/50 rounded-xl border border-border/30"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <motion.h4 
                      className="text-xl font-semibold text-foreground mb-3 flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-2xl mr-3">{item.emoji}</span>
                      {item.title}
                    </motion.h4>
                    <p className="text-muted-foreground">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}