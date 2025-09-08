'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button, Badge } from '@/components/ui';
import { GradientText } from '@/components/ui/gradient-text';
import { WobbleCard } from '@/components/ui/wobble-card';
import { useFounderTiers } from '@/hooks';
import { Check, Star, Crown, Zap, Shield, Sparkles, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function FounderTiersSection() {
  const { tiers, selectedTier, isProcessing, selectTier } = useFounderTiers();

  return (
    <section id="founder-tiers" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,193,7,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,169,165,0.15),transparent_50%)]" />
      
      {/* Static decoration */}
      <div className="absolute top-1/4 left-1/6 w-20 h-20 bg-primary/10 rounded-full blur-2xl opacity-50"></div>

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
              <Crown className="h-12 w-12 text-primary mr-3" />
              <Trophy className="h-8 w-8 text-secondary" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="mb-6"
            >
              <GradientText 
                text="Become a Korova Founder"
                className="heading-lg"
                neon={false}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            
            <motion.p 
              className="body-lg text-muted-foreground max-w-3xl mx-auto mb-6"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Join our exclusive founder program and help shape the future of Korova. 
              Get lifetime access, special perks, and be part of our founding community.
            </motion.p>
            
            <motion.div 
              className="inline-flex items-center mt-4 px-6 py-3 bg-gradient-to-r from-primary/15 to-secondary/15 rounded-full border border-primary/20"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-4 w-4 text-primary mr-2" />
              </motion.div>
              <span className="text-primary font-medium">Limited Time: 60% Off Regular Price</span>
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <ScrollReveal key={tier.id} delay={0.2 * (index + 1)}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full relative hover:-translate-y-2 transition-transform duration-300"
              >
                <WobbleCard 
                  containerClassName={`relative min-h-[500px] ${
                    tier.popular 
                      ? 'bg-gradient-to-br from-primary/15 to-secondary/10 border-primary/30 shadow-2xl' 
                      : 'bg-gradient-to-br from-background/90 to-background/80 border-border/50'
                  }`}
                >
                  {tier.badge && (
                    <motion.div
                      className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-20 px-4 py-1 rounded-full text-sm font-medium ${
                        tier.popular 
                          ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' 
                          : 'bg-gradient-to-r from-secondary/80 to-accent/80 text-secondary-foreground'
                      }`}
                      initial={{ y: -20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tier.badge}
                    </motion.div>
                  )}
                  
                  <div className="p-6 h-full flex flex-col">
                    <div className="text-center pb-6">
                      <motion.div 
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center shadow-lg ${
                          tier.popular 
                            ? 'bg-gradient-to-br from-primary to-secondary text-primary-foreground' 
                            : 'bg-gradient-to-br from-primary/20 to-secondary/20 text-primary'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {tier.id === 'early-bird' && <Zap className="h-8 w-8" />}
                        {tier.id === 'cinephile' && <Star className="h-8 w-8" />}
                        {tier.id === 'producer' && <Crown className="h-8 w-8" />}
                      </motion.div>
                      
                      <motion.h3 
                        className="text-2xl font-bold text-foreground mb-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        {tier.name}
                      </motion.h3>
                      
                      <div className="text-center mb-4">
                        <motion.div 
                          className="flex items-center justify-center space-x-2"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.4, type: "spring", bounce: 0.5 }}
                        >
                          <span className="text-3xl font-bold text-foreground">
                            ${tier.price}
                          </span>
                          {tier.originalPrice && (
                            <motion.span 
                              className="text-lg text-muted-foreground line-through"
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.6 }}
                            >
                              ${tier.originalPrice}
                            </motion.span>
                          )}
                        </motion.div>
                        <div className="text-sm text-muted-foreground mt-1">
                          One-time payment
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm">
                        {tier.description}
                      </p>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <ul className="space-y-3 mb-6 flex-1">
                        {tier.features.map((feature, featureIndex) => (
                          <motion.li 
                            key={featureIndex} 
                            className="flex items-start space-x-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + featureIndex * 0.1 + 0.5 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            </motion.div>
                            <span className="text-muted-foreground text-sm">
                              {feature}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={tier.popular ? "cta" : "outline"}
                          size="lg"
                          className="w-full shadow-lg"
                          onClick={() => selectTier(tier.id)}
                          disabled={isProcessing}
                        >
                          {isProcessing && selectedTier === tier.id 
                            ? 'Processing...' 
                            : `Choose ${tier.name}`
                          }
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </WobbleCard>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Benefits Summary */}
        <ScrollReveal delay={0.8}>
          <motion.div 
            className="mt-16 text-center bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm rounded-3xl p-8 border border-border/50 relative overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              style={{ backgroundSize: '200% 200%' }}
            />
            
            <div className="relative z-10">
              <motion.h3 
                className="heading-md text-foreground mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Why Become a Founder?
              </motion.h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Star, title: "Lifetime Access", desc: "Never pay subscription fees again", delay: 0.1 },
                  { icon: Crown, title: "Exclusive Status", desc: "Special founder badge and recognition", delay: 0.2 },
                  { icon: Zap, title: "Shape the Future", desc: "Direct input on features and development", delay: 0.3 },
                  { icon: Check, title: "Premium Support", desc: "Priority customer service and features", delay: 0.4 }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="text-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <item.icon className="h-6 w-6 text-primary" />
                    </motion.div>
                    <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Money Back Guarantee */}
        <ScrollReveal delay={1.0}>
          <motion.div 
            className="mt-12 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/10 to-green-400/10 border border-green-500/20 rounded-full"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="h-5 w-5 text-green-500 mr-2" />
              </motion.div>
              <span className="text-green-500 font-medium">
                30-day money-back guarantee
              </span>
            </motion.div>
            <motion.p 
              className="text-muted-foreground text-sm mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              If you're not satisfied, we'll refund your payment in full.
            </motion.p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}