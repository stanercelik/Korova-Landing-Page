"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { Card } from "./card";

export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  image: string;
  favoriteMovies: string[];
  matchPercentage: number;
  location?: string;
  occupation?: string;
  distance?: number;
}

interface SwipeCardProps {
  user: User;
  onSwipe: (userId: string, direction: "left" | "right" | "up") => void;
  isActive?: boolean;
  index?: number;
}

export default function SwipeCard({ user, onSwipe, isActive = true, index = 0 }: SwipeCardProps) {
  const [isSwipedAway, setIsSwipedAway] = useState(false);
  
  // Motion values for drag
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform values for rotation and opacity
  const rotate = useTransform(x, [-300, 0, 300], [-30, 0, 30]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const dislikeOpacity = useTransform(x, [-150, -50], [1, 0]);
  const superLikeOpacity = useTransform(y, [-150, -50], [1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    const velocity = Math.abs(info.velocity.x) + Math.abs(info.velocity.y);
    
    if (Math.abs(info.offset.x) > threshold || velocity > 500) {
      if (info.offset.x > 0) {
        // Swipe right - Like
        setIsSwipedAway(true);
        onSwipe(user.id, "right");
      } else {
        // Swipe left - Pass
        setIsSwipedAway(true);
        onSwipe(user.id, "left");
      }
    } else if (info.offset.y < -threshold || (info.offset.y < 0 && velocity > 500)) {
      // Swipe up - Super like
      setIsSwipedAway(true);
      onSwipe(user.id, "up");
    }
  };

  if (isSwipedAway) {
    return null;
  }

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x,
        y,
        rotate,
        zIndex: 10 - index,
      }}
      initial={{
        scale: 1 - index * 0.05,
        y: index * 10,
      }}
      drag={isActive}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.1 }}
      animate={{
        scale: isActive ? 1 : 1 - index * 0.05,
        y: isActive ? 0 : index * 10,
      }}
      exit={{
        x: 300,
        opacity: 0,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="w-full h-full overflow-hidden bg-gradient-to-b from-zinc-900 to-black border-zinc-800">
        {/* Photo Section */}
        <div className="relative h-2/3">
          <img
            src={user.image}
            alt={user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=400&background=1f2937&color=f3f4f6`;
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Match percentage */}
          <motion.div 
            className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1.5 rounded-full font-bold text-sm"
            style={{ opacity: likeOpacity }}
          >
            {user.matchPercentage}% UYUM
          </motion.div>
          
          {/* Action overlays */}
          <motion.div
            className="absolute inset-0 bg-red-500/80 flex items-center justify-center"
            style={{ opacity: dislikeOpacity }}
          >
            <span className="text-white text-4xl font-bold tracking-wider">GEÇ</span>
          </motion.div>
          
          <motion.div
            className="absolute inset-0 bg-green-500/80 flex items-center justify-center"
            style={{ opacity: likeOpacity }}
          >
            <span className="text-white text-4xl font-bold tracking-wider">BEĞEN</span>
          </motion.div>
          
          <motion.div
            className="absolute inset-0 bg-blue-500/80 flex items-center justify-center"
            style={{ opacity: superLikeOpacity }}
          >
            <span className="text-white text-4xl font-bold tracking-wider">SÜPER BEĞEN</span>
          </motion.div>
          
          {/* User info overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-white text-2xl font-bold">
              {user.name}, {user.age}
            </h2>
            {user.location && (
              <p className="text-white/80 text-sm mt-1">📍 {user.location}</p>
            )}
          </div>
        </div>
        
        {/* Info Section */}
        <div className="h-1/3 p-3 bg-zinc-900">
          {user.bio && (
            <p className="text-white/80 text-xs italic mb-2 line-clamp-1">
              &ldquo;{user.bio}&rdquo;
            </p>
          )}
          
          {user.occupation && (
            <p className="text-white/60 text-xs mb-1">💼 {user.occupation}</p>
          )}
          
          {user.distance && (
            <p className="text-white/60 text-xs mb-2">📍 {user.distance}km uzakta</p>
          )}
          
          {/* Movies - 4 in a row */}
          {user.favoriteMovies.length > 0 && (
            <div>
              <p className="text-white/60 text-xs mb-2 uppercase tracking-wide">
                Sevdiği Filmler
              </p>
              <div className="grid grid-cols-4 gap-1">
                {user.favoriteMovies.slice(0, 4).map((movie, index) => {
                  // Map movie names to image files
                  const getMovieImage = (movieName: string) => {
                    const movieMap: { [key: string]: string } = {
                      "Climax": "/movie-frames/climax.png",
                      "Autumn Sonata": "/movie-frames/autumn-sonata.png", 
                      "In the Mood for Love": "/movie-frames/in-the-mood-for-love.png",
                      "A Ghost Story": "/movie-frames/a-ghost-story.png",
                      "Airplane!": "/movie-frames/airplane.png",
                      "Grave of the Fireflies": "/movie-frames/grave-of-the-fireflies.png",
                      "LOTR": "/movie-frames/lotr.png",
                      "Ratatouille": "/movie-frames/ratatouille.png"
                    };
                    return movieMap[movieName] || null;
                  };
                  
                  const movieImage = getMovieImage(movie);
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      {movieImage ? (
                        <img
                          src={movieImage}
                          alt={movie}
                          className="w-8 h-12 bg-zinc-700 rounded object-cover mb-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : (
                        <div className="w-8 h-12 bg-zinc-700 rounded text-xs flex items-center justify-center text-white/60 mb-1">
                          🎬
                        </div>
                      )}
                      <div className="w-8 h-12 bg-zinc-700 rounded text-xs flex items-center justify-center text-white/60 hidden mb-1">
                        🎬
                      </div>
                      <p className="text-white/60 text-xs w-8 truncate text-center leading-tight">
                        {movie}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}