"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SwipeCard, { User } from "./swipe-card";
import { Button } from "./button";
import { Heart, X, Star } from "lucide-react";

// Mock data - gerçek uygulamada bu veri API'den gelecek
const mockUsers: User[] = [
  {
    id: "1",
    name: "Emma Rodriguez",
    age: 28,
    bio: "Film tutkunu, kahve bağımlısı",
    image: "/profile-images/emma-rodriguez.jpeg",
    favoriteMovies: ["Climax", "Autumn Sonata", "In the Mood for Love", "A Ghost Story"],
    matchPercentage: 89,
    location: "İstanbul",
    occupation: "Grafik Tasarımcı",
    distance: 2
  },
  {
    id: "2", 
    name: "Marcus Williams",
    age: 32,
    bio: "Sinema ve müzik aşığı",
    image: "/profile-images/marcus-williams.jpeg",
    favoriteMovies: ["Autumn Sonata", "LOTR", "Grave of the Fireflies", "Ratatouille"],
    matchPercentage: 76,
    location: "Ankara",
    occupation: "Yazılım Geliştiricisi", 
    distance: 5
  },
  {
    id: "3",
    name: "Sarah Chen",
    age: 25,
    bio: "Sanatsever, vintage film koleksiyoncusu",
    image: "/profile-images/sarah-chen.jpeg",
    favoriteMovies: ["In the Mood for Love", "A Ghost Story", "Climax", "Airplane!"],
    matchPercentage: 93,
    location: "İzmir",
    occupation: "Sanat Yönetmeni",
    distance: 8
  },
  {
    id: "4",
    name: "Mattias",
    age: 30,
    bio: "Müzisyen, fotoğrafçı ve sanat tutkunu",
    image: "/profile-images/mattias.jpeg", 
    favoriteMovies: ["A Ghost Story", "Climax", "LOTR", "Ratatouille"],
    matchPercentage: 84,
    location: "İstanbul",
    occupation: "Müzisyen",
    distance: 3
  },
  {
    id: "5",
    name: "Selim",
    age: 27,
    bio: "Seyahat blogger'ı, belgesel meraklısı",
    image: "/profile-images/selim.jpeg",
    favoriteMovies: ["Grave of the Fireflies", "LOTR", "Airplane!", "Autumn Sonata"],
    matchPercentage: 78,
    location: "Bodrum", 
    occupation: "Content Creator",
    distance: 12
  }
];

interface SwipeInterfaceProps {
  className?: string;
}

export default function SwipeInterface({ className = "" }: SwipeInterfaceProps) {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const currentUser = users[currentIndex];
  const nextUsers = users.slice(currentIndex + 1, currentIndex + 4);

  const handleSwipe = (userId: string, direction: "left" | "right" | "up") => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log(`Swiped ${direction} on user ${userId}`);
      setCurrentIndex(prev => prev + 1);
      setLoading(false);
      
      // Load more users when running low
      if (currentIndex >= users.length - 3) {
        // In a real app, this would fetch from API
        setUsers(prev => [...prev, ...mockUsers.slice(0, 3)]);
      }
    }, 300);
  };

  const handleButtonAction = (direction: "left" | "right" | "up") => {
    if (currentUser) {
      handleSwipe(currentUser.id, direction);
    }
  };

  if (currentIndex >= users.length) {
    return (
      <div className={`relative w-full max-w-sm mx-auto aspect-[3/4] ${className}`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-black rounded-2xl border border-zinc-800">
          <div className="text-white text-xl font-bold mb-2">Tüm kartlar tamamlandı!</div>
          <div className="text-white/60 text-sm">Yeni eşleşmeler yakında...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full max-w-sm mx-auto ${className}`}>
      {/* Card Stack Container */}
      <div className="relative aspect-[3/4] w-full">
        <AnimatePresence mode="popLayout">
          {/* Background cards */}
          {nextUsers.map((user, index) => (
            <SwipeCard
              key={user.id}
              user={user}
              onSwipe={handleSwipe}
              isActive={false}
              index={index + 1}
            />
          ))}
          
          {/* Active card */}
          {currentUser && (
            <SwipeCard
              key={currentUser.id}
              user={currentUser}
              onSwipe={handleSwipe}
              isActive={!loading}
              index={0}
            />
          )}
        </AnimatePresence>
        
        {loading && (
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
      </div>

      {/* Current user counter - moved up */}
      <div className="text-center mt-4">
        <span className="text-white/60 text-xs">
          {currentIndex + 1} / {users.length}
        </span>
      </div>
    </div>
  );
}