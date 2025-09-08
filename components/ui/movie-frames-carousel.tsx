'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface MovieFrame {
  src: string;
  alt: string;
  title: string;
}

interface MovieFramesCarouselProps {
  frames: MovieFrame[];
  autoplay?: boolean;
  interval?: number;
  className?: string;
}

export function MovieFramesCarousel({
  frames,
  autoplay = true,
  interval = 4000,
  className
}: MovieFramesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay || frames.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % frames.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, frames.length]);

  if (frames.length === 0) return null;

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20">
        {frames.map((frame, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-out",
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            )}
          >
            <Image
              src={frame.src}
              alt={frame.alt}
              fill
              className="object-cover rounded-xl"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl" />
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white font-semibold text-xs drop-shadow-lg truncate">
                {frame.title}
              </h3>
            </div>
          </div>
        ))}
        
        {/* Floating overlay with subtle animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 animate-pulse rounded-xl" />
      </div>
      
      {/* Dots indicator */}
      {frames.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {frames.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}