'use client';

import { ScrollReveal } from '@/components/animations';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does Korova's movie matching work?",
    answer: "Our proprietary algorithm analyzes your movie ratings, favorite genres, directors, and viewing patterns to create a unique 'Cinema DNA' profile. We then match you with people who have compatible taste, ensuring meaningful connections based on shared film interests."
  },
  {
    question: "Is Korova just for dating or can I find friends too?",
    answer: "Korova is for all types of connections! Whether you're looking for romantic partners, platonic friendships, movie buddies, or people to attend film festivals with - our platform accommodates different relationship goals."
  },
  {
    question: "When will Korova launch?",
    answer: "We're targeting a Q1 2025 launch for our beta version. Founder program members will get early access 30 days before the public launch. Join our waitlist to stay updated on our progress and get notified as soon as we're ready."
  },
  {
    question: "What's included in the Founder program?",
    answer: "Founder members get lifetime access to Korova (no subscription fees), exclusive founder badges, priority customer support, input on feature development, beta testing access, and special merchandise. It's our way of thanking early supporters who believe in our vision."
  },
  {
    question: "Is my data safe and private?",
    answer: "Absolutely. We take privacy seriously and follow strict data protection protocols. Your movie preferences and personal information are encrypted and never shared with third parties. You control what information is visible on your profile."
  },
  {
    question: "What if I don't like someone I'm matched with?",
    answer: "No problem! You can easily skip matches or report inappropriate behavior. Our algorithm learns from your preferences and feedback to improve future matches. We also have community guidelines and moderation to ensure a safe, positive experience."
  },
  {
    question: "Can I get a refund if I don't like Korova?",
    answer: "Yes! We offer a 30-day money-back guarantee for all founder program purchases. If you're not satisfied with Korova within 30 days of launch, we'll refund your payment in full - no questions asked."
  },
  {
    question: "Will there be a mobile app?",
    answer: "Yes! We're developing both iOS and Android apps alongside our web platform. Mobile apps will be available at launch, with all the same features optimized for mobile use. You'll be able to browse matches, chat, and organize watch parties on the go."
  },
  {
    question: "How much will Korova cost after launch?",
    answer: "Our regular pricing will be $19.99/month for premium features. However, founder program members get lifetime access for a one-time payment - making it an incredible value. This is a limited-time opportunity to lock in lifetime access."
  }
];

export function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="heading-lg text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="body-lg text-muted-foreground max-w-3xl mx-auto">
              Have questions about Korova? We've got answers. 
              If you don't see your question here, feel free to reach out to us.
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ Accordion */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={`faq-${index}`} 
                  value={`item-${index}`}
                  className="bg-background/80 backdrop-blur-sm border border-border rounded-lg px-6 hover:shadow-md transition-all duration-300"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary transition-colors py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>

        {/* Contact CTA */}
        <ScrollReveal delay={0.4}>
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                We're here to help! Reach out to our team and we'll get back to you as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:hello@korova.app"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  Email Us
                </a>
                <a 
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}