'use client';

import { Film, Mail, Twitter, Instagram, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { smoothScrollToSection } from '@/lib/smooth-scroll';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          subject,
          message,
          to: 'tanercelik2001@gmail.com'
        }),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        (e.target as HTMLFormElement).reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <footer className="bg-card border-t border-border/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Film className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Korova
              </span>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Find your people through the films you love. Connect with like-minded movie enthusiasts and discover new relationships based on your unique cinematic taste.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Product</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => smoothScrollToSection('problem')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How it Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => smoothScrollToSection('solution')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => smoothScrollToSection('founder-tiers')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => smoothScrollToSection('faq')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>


          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <p className="text-muted-foreground text-sm">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <form onSubmit={handleContactSubmit} className="space-y-3">
              <Input
                name="email"
                type="email"
                placeholder="Your email address"
                className="bg-background border-border"
                required
              />
              <Input
                name="subject"
                type="text"
                placeholder="Subject"
                className="bg-background border-border"
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                className="w-full px-3 py-2 text-sm rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none"
                rows={3}
                required
              />
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-border/20" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-muted-foreground text-sm">
              © 2024 Korova. All rights reserved.
            </p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
          <Button 
            variant="ghost" 
            onClick={scrollToTop}
            className="text-muted-foreground hover:text-foreground"
          >
            Back to Top ↑
          </Button>
        </div>
      </div>
    </footer>
  );
}