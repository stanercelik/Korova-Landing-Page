'use client';

import { ScrollReveal } from '@/components/animations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button, Badge } from '@/components/ui';
import { useFounderTiers } from '@/hooks';
import { Check, Star, Crown, Zap } from 'lucide-react';

export function FounderTiersSection() {
  const { tiers, selectedTier, isProcessing, selectTier } = useFounderTiers();

  return (
    <section id="founder-tiers" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-6">
              Become a Korova Founder
            </h2>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
              Join our exclusive founder program and help shape the future of Korova. 
              Get lifetime access, special perks, and be part of our founding community.
            </p>
            <div className="inline-flex items-center mt-4 px-4 py-2 bg-primary/10 rounded-full">
              <Star className="h-4 w-4 text-primary mr-2" />
              <span className="text-primary font-medium">Limited Time: 60% Off Regular Price</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <ScrollReveal key={tier.id} delay={0.2 * (index + 1)}>
              <Card 
                className={`relative p-6 h-full flex flex-col ${
                  tier.popular 
                    ? 'border-primary shadow-xl ring-2 ring-primary/20 scale-105' 
                    : 'border-border hover:shadow-lg'
                } transition-all duration-300 hover:scale-105 group`}
              >
                {tier.badge && (
                  <Badge 
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                      tier.popular 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {tier.badge}
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    tier.popular 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {tier.id === 'early-bird' && <Zap className="h-8 w-8" />}
                    {tier.id === 'cinephile' && <Star className="h-8 w-8" />}
                    {tier.id === 'producer' && <Crown className="h-8 w-8" />}
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">
                    {tier.name}
                  </CardTitle>
                  
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-3xl font-bold text-foreground">
                        ${tier.price}
                      </span>
                      {tier.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${tier.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      One-time payment
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm">
                    {tier.description}
                  </p>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant={tier.popular ? "cta" : "outline"}
                    size="lg"
                    className="w-full"
                    onClick={() => selectTier(tier.id)}
                    disabled={isProcessing}
                  >
                    {isProcessing && selectedTier === tier.id 
                      ? 'Processing...' 
                      : `Choose ${tier.name}`
                    }
                  </Button>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Benefits Summary */}
        <ScrollReveal delay={0.8}>
          <div className="mt-16 text-center bg-card/50 rounded-2xl p-8 border border-border">
            <h3 className="heading-md text-foreground mb-8">
              Why Become a Founder?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Lifetime Access</h4>
                <p className="text-sm text-muted-foreground">Never pay subscription fees again</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Exclusive Status</h4>
                <p className="text-sm text-muted-foreground">Special founder badge and recognition</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Shape the Future</h4>
                <p className="text-sm text-muted-foreground">Direct input on features and development</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Premium Support</h4>
                <p className="text-sm text-muted-foreground">Priority customer service and features</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Money Back Guarantee */}
        <ScrollReveal delay={1.0}>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-500 font-medium">
                30-day money-back guarantee
              </span>
            </div>
            <p className="text-muted-foreground text-sm mt-2">
              If you're not satisfied, we'll refund your payment in full.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}