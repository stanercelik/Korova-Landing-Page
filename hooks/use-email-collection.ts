'use client';

import { useState, useCallback } from 'react';

interface EmailState {
  email: string;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

export function useEmailCollection() {
  const [state, setState] = useState<EmailState>({
    email: '',
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  });

  const submitEmail = useCallback(async (email: string) => {
    setState(prev => ({
      ...prev,
      isSubmitting: true,
      error: null,
    }));

    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/waitlist', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to submit email');
      // }

      setState(prev => ({
        ...prev,
        email,
        isSubmitting: false,
        isSubmitted: true,
      }));

      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'waitlist_signup', {
          event_category: 'engagement',
          event_label: 'email_collection',
        });
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  }, []);

  const resetState = useCallback(() => {
    setState({
      email: '',
      isSubmitting: false,
      isSubmitted: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    submitEmail,
    resetState,
  };
}