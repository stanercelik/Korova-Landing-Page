'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  transparent?: boolean;
  showFounderCTA?: boolean;
}

export function Header({ transparent = false, showFounderCTA = true }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        transparent && !isScrolled
          ? 'bg-transparent'
          : 'bg-background/80 backdrop-blur-md border-b border-border/20'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <Film className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Korova
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('problem')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Problem
            </button>
            <button
              onClick={() => scrollToSection('solution')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Solution
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {showFounderCTA && (
              <Button
                variant="default"
                onClick={() => scrollToSection('founder-tiers')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Become a Founder
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => scrollToSection('hero')}
              className="border-border hover:bg-accent"
            >
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('problem')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Problem
              </button>
              <button
                onClick={() => scrollToSection('solution')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Solution
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </button>
              <div className="px-3 pt-2 space-y-2">
                {showFounderCTA && (
                  <Button
                    variant="default"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => scrollToSection('founder-tiers')}
                  >
                    Become a Founder
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full border-border hover:bg-accent"
                  onClick={() => scrollToSection('hero')}
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}