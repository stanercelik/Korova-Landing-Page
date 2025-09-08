"use client";

import SwipeInterface from "./swipe-interface";
import Iphone15Pro from "./iphone-15-pro";

interface PhoneMockupProps {
  className?: string;
}

export default function PhoneMockup({ className = "" }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      <Iphone15Pro width={350} height={714}>
        <div className="w-full h-full bg-black flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-4 pt-12 bg-zinc-900/50 backdrop-blur-sm">
            <img 
              src="/korova-logo.png" 
              alt="Korova" 
              className="w-8 h-8 object-contain"
            />
            <div className="text-white text-sm font-medium">Korova</div>
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-5 flex flex-col justify-between">
                <div className="w-full h-0.5 bg-white/60"></div>
                <div className="w-full h-0.5 bg-white/60"></div>
                <div className="w-full h-0.5 bg-white/60"></div>
              </div>
            </div>
          </div>
          
          {/* Swipe Interface */}
          <div className="flex-1 p-4 pb-8">
            <SwipeInterface className="h-full" />
          </div>
        </div>
      </Iphone15Pro>
    </div>
  );
}