'use client';

import { ScrollReveal } from '@/components/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';
import { GradientText } from '@/components/ui/gradient-text';
import { motion } from 'framer-motion';
import { Mail, MessageCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Korova's movie matching work?",
    answer: "Our proprietary algorithm analyzes your movie ratings, favorite genres, directors, and viewing habits to create a unique 'Cinema DNA' profile. We then match you with people who have compatible tastes, so you can build meaningful connections based on shared film interests."
  },
  {
    question: "Is Korova only for dating, or can I find friends too?",
    answer: "Korova is for all types of connections! Whether you're looking for romantic partners, platonic friendships, movie buddies, or people to go to film festivals with - our platform supports different relationship goals."
  },
  {
    question: "When will Korova launch?",
    answer: "We're targeting Q1 2025 for our beta version. Join the waitlist to follow our progress and be notified as soon as we're ready to launch."
  },
  {
    question: "Are my data and information secure and private?",
    answer: "Absolutely. We take privacy seriously and implement strict data protection protocols. Your movie preferences and personal information are encrypted and never shared with third parties. You control what information appears on your profile."
  },
  {
    question: "What if I don't like someone I'm matched with?",
    answer: "No problem! You can easily skip matches or report inappropriate behavior. Our algorithm learns from your preferences and feedback to improve future matches. We also have community guidelines and moderation to ensure a safe, positive experience."
  },
  {
    question: "Will there be a mobile app?",
    answer: "Yes! We're developing both iOS and Android apps alongside our web platform. The mobile apps will be ready at launch, with all features optimized for mobile use. You'll be able to browse matches, chat, and organize movie nights on the go."
  },
  {
    question: "How much will Korova cost after launch?",
    answer: "Korova will be completely free! Our goal is to bring movie lovers together and help them form meaningful connections. We may offer optional premium features in the future for additional support."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-card/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <GradientText 
                text="Frequently Asked Questions"
                className="heading-lg"
                neon={false}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            <motion.p 
              className="body-lg text-muted-foreground max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have questions about Korova? Here are our answers. 
              Don't see your question here? Feel free to reach out to us.
            </motion.p>
          </div>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={`faq-${index}`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group"
                >
                  <AccordionItem 
                    value={`item-${index}`}
                    className="bg-background/80 backdrop-blur-sm border border-border rounded-xl px-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group-hover:border-primary/20"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-6 group-hover:translate-x-1">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {faq.answer}
                      </motion.div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}