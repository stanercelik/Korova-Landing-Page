'use client';

// 1. ADIM: Gerekli state'leri yönetmek için useState'i import edin
import { useState } from 'react';
import { FadeIn } from '@/components/animations';
import {
  InputButton,
  InputButtonAction,
  InputButtonProvider,
  InputButtonSubmit,
  InputButtonInput,
} from '@/components/ui/shadcn-io/input-button';
import { SwipeablePhoneInterface } from '@/components/ui/swipeable-phone-interface';
import Iphone15Pro from '@/components/ui/iphone-15-pro';
import { Film, Heart, Users, Star, Camera } from 'lucide-react';

interface HeroSectionProps {
  headline?: string;
  subHeadline?: string;
  ctaText?: string;
}

export function HeroSection({
  headline = "Find Your People Through The Films You Love",
  subHeadline = "Tired of superficial connections? Korova connects you with friends and partners based on your unique movie taste. Discover meaningful relationships through cinema.",
  ctaText = "Join the Waitlist"
}: HeroSectionProps) {
  
  // 2. ADIM: Gerekli state'leri ekleyin
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // 3. ADIM: Form gönderme fonksiyonunu yazın
  const handleSubmit = async () => {
    // Basit bir email format kontrolü
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { 
      setMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Thank you for joining! We will be in touch.');
        setEmail(''); // Başarılı olunca input'u temizle
      } else {
        const data = await response.json();
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const movieFrames = [
    {
      src: "/movie-frames/in-the-mood-for-love.png",
      alt: "In the Mood for Love",
      title: "In the Mood for Love"
    },
    {
      src: "/movie-frames/climax.png", 
      alt: "Climax",
      title: "Climax"
    },
    {
      src: "/movie-frames/autumn-sonata.png",
      alt: "Autumn Sonata", 
      title: "Autumn Sonata"
    },
    {
      src: "/movie-frames/a-ghost-story.png",
      alt: "A Ghost Story",
      title: "A Ghost Story"
    },
    {
      src: "/movie-frames/airplane.png",
      alt: "Airplane!",
      title: "Airplane!"
    },
    {
      src: "/movie-frames/ratatouille.png",
      alt: "Ratatouille",
      title: "Ratatouille"
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,193,7,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(0,169,165,0.1),transparent_50%)]"></div>
      
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
        style={{
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-2xl"
        style={{
          animation: 'float 8s ease-in-out infinite reverse'
        }}
      />
      <div 
        className="absolute top-1/2 left-1/6 w-20 h-20 bg-accent/10 rounded-full blur-xl"
        style={{
          animation: 'float 7s ease-in-out infinite 1s'
        }}
      />
      
      {/* Static decorative elements */}
      <div className="absolute top-20 left-10 opacity-20">
        <Film className="h-10 w-10 text-primary/50" />
      </div>
      <div className="absolute top-32 right-16 opacity-15">
        <Camera className="h-8 w-8 text-secondary/50" />
      </div>
      <div className="absolute bottom-32 left-16 opacity-10">
        <Star className="h-9 w-9 text-accent/50" />
      </div>
      <div className="absolute top-1/2 right-8 opacity-10">
        <Heart className="h-7 w-7 text-primary/50" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="text-left lg:text-left space-y-8">
            <FadeIn delay={0.2}>
              <div className="flex items-center mb-6">
                <div className="relative mr-4">
                  <img 
                    src="/korova-logo.png" 
                    alt="Korova" 
                    className="h-16 w-16 object-contain filter brightness-0 saturate-100 opacity-80"
                    style={{
                      filter: 'brightness(0) saturate(100%) invert(58%) sepia(82%) saturate(2142%) hue-rotate(16deg) brightness(104%) contrast(103%)'
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-125" />
                </div>
                <h1 className="heading-xl text-foreground bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text">
                  Korova
                </h1>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <h2 className="heading-lg text-foreground mb-6 leading-tight bg-gradient-to-r from-foreground to-foreground/90 bg-clip-text">
                {headline}
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.6}>
              <p className="body-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
                {subHeadline}
              </p>
            </FadeIn>
            
            <FadeIn delay={0.8}>
              <div className="max-w-md mb-6">
                
                {/* 4. ADIM: JSX'i state ve fonksiyonlar ile bağlayın */}
                <InputButtonProvider>
                  <InputButton>
                    <InputButtonAction>{ctaText}</InputButtonAction>
                    
                    <InputButtonSubmit 
                      onClick={handleSubmit} 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                    </InputButtonSubmit>
                  </InputButton>
                  
                  <InputButtonInput 
                    type="email" 
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </InputButtonProvider>
                
                {/* 5. ADIM: Kullanıcıya geri bildirim mesajı gösterin */}
                {message && (
                  <p className={`mt-2 text-sm transition-opacity duration-300 ${message.includes('Thank you') ? 'text-green-400' : 'text-red-400'}`}>
                    {message}
                  </p>
                )}

              </div>
            </FadeIn>
            
            <FadeIn delay={1.0}>
              <div className="text-sm text-muted-foreground mb-4">
                <p className="mb-2 text-xs"><span className="inline-flex items-center px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">✨ Early Adopter Badge</span> Waitlist members get exclusive early access badge</p>
                <p>Join <span className="text-primary font-semibold">5,000+</span> movie lovers already on the waitlist</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={1.2}>
              <div className="flex justify-start flex-wrap gap-2">
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 flex items-center space-x-2 overflow-hidden min-w-[100px] h-10">
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src="/images/find-love-image.jpeg" 
                      alt="Find Love" 
                      className="w-full h-full object-cover blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="relative flex items-center space-x-2">
                    <Heart className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-white">Find Love</span>
                  </div>
                </div>
                
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 flex items-center space-x-2 overflow-hidden min-w-[100px] h-10">
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src="/images/make-friends-image.jpeg" 
                      alt="Make Friends" 
                      className="w-full h-full object-cover blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="relative flex items-center space-x-2">
                    <Users className="h-3 w-3 text-secondary" />
                    <span className="text-xs font-medium text-white">Make Friends</span>
                  </div>
                </div>
                
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-3 py-2 flex items-center space-x-2 overflow-hidden min-w-[100px] h-10">
                  <div className="absolute inset-0 opacity-20">
                    <img 
                      src="/images/share-movies-image.jpeg" 
                      alt="Share Movies" 
                      className="w-full h-full object-cover blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                  </div>
                  <div className="relative flex items-center space-x-2">
                    <Film className="h-3 w-3 text-accent" />
                    <span className="text-xs font-medium text-white">Share Movies</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Content - iPhone Mockup with Movie Frames */}
          <div className="relative flex justify-center lg:justify-end">
            <FadeIn delay={0.6}>
              <div className="relative w-full max-w-[350px] mx-auto">
                {/* iPhone Mockup Container */}
                <div className="relative">
                  <Iphone15Pro className="w-full h-auto drop-shadow-2xl" />
                  {/* App Interface Overlay */}
                  <div className="absolute inset-0">
                    <div className="absolute" style={{
                      top: '4.3%',
                      left: '4.9%', 
                      right: '4.9%',
                      bottom: '4.3%'
                    }}>
                      <div className="w-full h-full bg-black rounded-[12%] overflow-hidden">
                        <SwipeablePhoneInterface />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Static Movie Frame Decorations - scaled proportionally */}
                <div className="absolute -top-9 -left-9 z-10 opacity-70">
                  <div className="w-21 h-30 bg-card rounded-lg overflow-hidden border border-border/30 shadow-md">
                    <img 
                      src={movieFrames[4]?.src || movieFrames[0].src}
                      alt="Movie frame"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="absolute -bottom-5 -right-6 z-10 opacity-60">
                  <div className="w-24 h-15 bg-card rounded-lg overflow-hidden border border-border/30 shadow-md">
                    <img 
                      src={movieFrames[1].src}
                      alt="Movie frame"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
          
        </div>
      </div>
    </section>
  );
}