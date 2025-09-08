"use client";

import { cn } from "@/lib/utils";

interface BlurredImageBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  overlayOpacity?: number;
}

export default function BlurredImageBackground({
  src,
  alt = "",
  className,
  children,
  overlayOpacity = 0.7
}: BlurredImageBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 blur-sm"
        style={{ 
          backgroundImage: `url(${src})`,
          filter: 'blur(8px) saturate(1.2) brightness(0.8)'
        }}
        aria-label={alt}
      />
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/70 bg-gradient-to-r from-black/80 via-black/60 to-black/80"
        style={{ opacity: overlayOpacity }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}