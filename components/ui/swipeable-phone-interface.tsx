'use client';

import { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { X, Star, Check, Menu, Heart } from 'lucide-react';

interface Profile {
  id: number;
  name: string;
  age: number;
  bio: string;
  image: string;
  match: number;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Emma Rodriguez",
    age: 28,
    bio: '"Film enthusiast, coffee addict"',
    image: "/profile-images/emma-rodriguez.jpeg",
    match: 89
  },
  {
    id: 2,
    name: "Marcus Williams",
    age: 32,
    bio: '"Cinema and music lover"',
    image: "/profile-images/marcus-williams.jpeg",
    match: 76
  },
  {
    id: 3,
    name: "Sarah Chen",
    age: 25,
    bio: '"Art lover, vintage film collector"',
    image: "/profile-images/sarah-chen.jpeg",
    match: 93
  },
  {
    id: 4,
    name: "Mattias",
    age: 30,
    bio: '"Musician, photographer and art enthusiast"',
    image: "/profile-images/mattias.jpeg",
    match: 84
  },
  {
    id: 5,
    name: "Selim",
    age: 27,
    bio: '"Travel blogger, documentary enthusiast"',
    image: "/profile-images/selim.jpeg",
    match: 78
  }
];

export function SwipeablePhoneInterface() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50;
    
    if (Math.abs(info.offset.x) > threshold) {
      setCurrentIndex((prev) => (prev + 1) % profiles.length);
    }
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="h-full w-full flex flex-col bg-black text-white overflow-hidden">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 pt-3 pb-2 text-white text-sm shrink-0">
        <div className="font-medium">18:14</div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
            <path d="M2 17H22V19H2V17ZM1.15 12.2L2.85 10.8C8.6 15.9 15.4 15.9 21.15 10.8L22.85 12.2C15.8 18.7 8.2 18.7 1.15 12.2Z"/>
          </svg>
          <div className="bg-green-500 text-white px-2 py-1 text-sm rounded font-medium">100</div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="flex justify-between items-center px-4 py-3 shrink-0">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <img 
            src="/korova-logo.png" 
            alt="K" 
            className="w-4 h-4 object-contain filter brightness-0 saturate-100 invert"
          />
        </div>
        <Menu className="w-6 h-6 text-white" />
      </div>

      {/* Main Card Area */}
      <div className="flex-1 px-4 pb-2 min-h-0">
        <motion.div
          key={currentProfile.id}
          className="h-full relative bg-gray-900 rounded-2xl overflow-hidden"
          drag="x"
          dragConstraints={{ left: -20, right: 20 }}
          onDragEnd={handleDragEnd}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          dragElastic={0.1}
        >
          {/* Match Percentage */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-primary text-black px-3 py-2 rounded-xl">
              <div className="text-base font-bold leading-tight">{currentProfile.match}%</div>
              <div className="text-sm font-medium">MATCH</div>
            </div>
          </div>


          {/* Background Image */}
          <img 
            src={currentProfile.image}
            alt={currentProfile.name}
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay - stronger at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 via-transparent to-transparent"></div>

          {/* Profile Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h2 className="text-lg font-bold mb-2 leading-tight">
              {currentProfile.name}, {currentProfile.age}
            </h2>
            <p className="text-sm opacity-90 italic mb-3 leading-tight">
              {currentProfile.bio}
            </p>
            
            {/* Favorite Movies - different for each person */}
            <div>
              <p className="text-sm opacity-70 mb-2 uppercase tracking-wide">Favorite Movies</p>
              <div className="flex gap-2">
                {currentProfile.id === 1 && (
                  <>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/climax.png" alt="Climax" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Climax</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/autumn-sonata.png" alt="Autumn Sonata" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Autumn Sonata</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/in-the-mood-for-love.png" alt="In the Mood for Love" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">In the Mood</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/a-ghost-story.png" alt="A Ghost Story" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">A Ghost Story</span>
                    </div>
                  </>
                )}
                {currentProfile.id === 2 && (
                  <>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/lotr.png" alt="LOTR" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">LOTR</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/ratatouille.png" alt="Ratatouille" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Ratatouille</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/grave-of-the-fireflies.png" alt="Grave of the Fireflies" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Grave of Fireflies</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/autumn-sonata.png" alt="Autumn Sonata" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Autumn Sonata</span>
                    </div>
                  </>
                )}
                {currentProfile.id === 3 && (
                  <>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/in-the-mood-for-love.png" alt="In the Mood for Love" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">In the Mood</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/a-ghost-story.png" alt="A Ghost Story" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">A Ghost Story</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/climax.png" alt="Climax" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Climax</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/airplane.png" alt="Airplane!" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Airplane!</span>
                    </div>
                  </>
                )}
                {currentProfile.id === 4 && (
                  <>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/a-ghost-story.png" alt="A Ghost Story" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">A Ghost Story</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/climax.png" alt="Climax" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Climax</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/lotr.png" alt="LOTR" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">LOTR</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/ratatouille.png" alt="Ratatouille" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Ratatouille</span>
                    </div>
                  </>
                )}
                {currentProfile.id === 5 && (
                  <>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/grave-of-the-fireflies.png" alt="Grave of the Fireflies" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Grave of Fireflies</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/lotr.png" alt="LOTR" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">LOTR</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/airplane.png" alt="Airplane!" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Airplane!</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img src="/movie-frames/autumn-sonata.png" alt="Autumn Sonata" className="w-6 h-8 rounded object-cover" />
                      <span className="text-xs opacity-80 mt-1 text-center leading-none">Autumn Sonata</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center space-x-8 py-5 shrink-0">
        <button
          className="w-14 h-14 border-2 border-red-500/80 bg-red-500/10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-red-500/20"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % profiles.length)}
        >
          <X className="w-6 h-6 text-red-500" />
        </button>
        
        <button
          className="w-16 h-16 border-2 border-blue-500/80 bg-blue-500/10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-blue-500/20"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % profiles.length)}
        >
          <Star className="w-7 h-7 text-blue-500 fill-current" />
        </button>
        
        <button
          className="w-14 h-14 border-2 border-green-500/80 bg-green-500/10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 hover:bg-green-500/20"
          onClick={() => setCurrentIndex((prev) => (prev + 1) % profiles.length)}
        >
          <Heart className="w-6 h-6 text-green-500" />
        </button>
      </div>

    </div>
  );
}