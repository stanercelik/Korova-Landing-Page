'use client';

import { useState, useCallback } from 'react';

export interface FounderTier {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  features: string[];
  popular?: boolean;
  badge?: string;
  description: string;
}

const founderTiers: FounderTier[] = [
  {
    id: 'early-bird',
    name: 'Early Bird',
    price: 29,
    originalPrice: 59,
    description: 'Perfect for movie enthusiasts who want to be among the first',
    badge: 'LIMITED TIME',
    features: [
      'Lifetime access to CineMatch',
      'Priority customer support',
      'Early access to new features',
      'Exclusive founder badge',
      'Access to founder community',
    ],
  },
  {
    id: 'cinephile',
    name: 'Cinephile',
    price: 49,
    originalPrice: 99,
    description: 'For serious film lovers who want the full experience',
    popular: true,
    badge: 'MOST POPULAR',
    features: [
      'Everything in Early Bird',
      'Advanced matching algorithms',
      'Personalized film recommendations',
      'Monthly virtual screening events',
      'Direct feedback line to founders',
      'Exclusive merchandise package',
    ],
  },
  {
    id: 'producer',
    name: 'Producer',
    price: 99,
    originalPrice: 199,
    description: 'Become a co-creator of the CineMatch experience',
    badge: 'VIP ACCESS',
    features: [
      'Everything in Cinephile',
      'Input on feature development',
      'Beta testing for new features',
      'Quarterly video calls with founders',
      'Your name in the app credits',
      'Lifetime premium features',
      'Annual CineMatch merchandise box',
    ],
  },
];

export function useFounderTiers() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectTier = useCallback(async (tierId: string) => {
    setSelectedTier(tierId);
    setIsProcessing(true);

    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Replace with actual payment processing
      // const response = await fetch('/api/payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ tierId }),
      // });

      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        const tier = founderTiers.find(t => t.id === tierId);
        (window as any).gtag('event', 'founder_tier_selected', {
          event_category: 'conversion',
          event_label: tier?.name,
          value: tier?.price,
        });
      }
    } catch (error) {
      console.error('Error selecting tier:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const resetSelection = useCallback(() => {
    setSelectedTier(null);
    setIsProcessing(false);
  }, []);

  return {
    tiers: founderTiers,
    selectedTier,
    isProcessing,
    selectTier,
    resetSelection,
  };
}