'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  config?: {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    colors?: string[];
  };
}

// Simple confetti implementation without external dependencies
export function Confetti({ active, config = {} }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultConfig = {
    particleCount: 100,
    angle: 90,
    spread: 45,
    startVelocity: 30,
    decay: 0.9,
    gravity: 0.5,
    drift: 0,
    ticks: 200,
    colors: ['#FFC107', '#00A9A5', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
  };

  const finalConfig = { ...defaultConfig, ...config };

  const createParticle = useCallback((canvas: HTMLCanvasElement) => {
    const angle = (finalConfig.angle * Math.PI) / 180;
    const spread = (finalConfig.spread * Math.PI) / 180;
    
    return {
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: Math.cos(angle + (Math.random() - 0.5) * spread) * finalConfig.startVelocity,
      vy: Math.sin(angle + (Math.random() - 0.5) * spread) * finalConfig.startVelocity,
      life: finalConfig.ticks,
      color: finalConfig.colors[Math.floor(Math.random() * finalConfig.colors.length)],
      size: Math.random() * 8 + 2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    };
  }, [finalConfig]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    for (let i = 0; i < finalConfig.particleCount; i++) {
      particles.push(createParticle(canvas));
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy + finalConfig.gravity;
        particle.vx *= finalConfig.decay;
        particle.vy *= finalConfig.decay;
        particle.vy += finalConfig.gravity;
        particle.life--;
        particle.rotation += particle.rotationSpeed;

        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate((particle.rotation * Math.PI) / 180);
        ctx.fillStyle = particle.color;
        ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();

        if (particle.life <= 0) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        requestAnimationFrame(render);
      }
    };

    render();
  }, [createParticle, finalConfig]);

  useEffect(() => {
    if (active) {
      animate();
    }
  }, [active, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${active ? 'block' : 'hidden'}`}
      style={{ background: 'transparent' }}
    />
  );
}

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  confettiConfig?: ConfettiProps['config'];
}

export function ConfettiButton({ children, confettiConfig, onClick, ...props }: ConfettiButtonProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    onClick?.(e);
  };

  return (
    <>
      <button onClick={handleClick} {...props}>
        {children}
      </button>
      <Confetti active={showConfetti} config={confettiConfig} />
    </>
  );
}