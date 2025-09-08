'use client';

import { useState } from 'react';
import { 
  InputButtonProvider, 
  InputButton, 
  InputButtonAction, 
  InputButtonSubmit, 
  InputButtonInput 
} from './input-button';
import { Confetti } from './confetti';
import { Mail } from 'lucide-react';

interface WaitlistFormProps {
  className?: string;
  buttonText?: string;
  placeholder?: string;
}

export function WaitlistForm({ 
  className = '', 
  buttonText = 'Join Waitlist',
  placeholder = 'Enter your email...'
}: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    setMessage('Adding you to the waitlist...');

    try {
      const formData = new FormData();
      formData.append('form-name', 'waitlist');
      formData.append('email', email.trim());

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      });

      if (response.ok) {
        setIsSuccess(true);
        setMessage('🎉 Amazing! You\'ve successfully joined the waitlist. Don\'t forget to check your emails for updates!');
        setEmail('');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    } catch (error) {
      setMessage('Connection error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputButtonProvider 
          showInput={showInput} 
          setShowInput={setShowInput}
          className="w-full"
        >
          <InputButton>
            <InputButtonAction disabled={isLoading || isSuccess}>
              {buttonText}
            </InputButtonAction>
            <InputButtonInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              disabled={isLoading || isSuccess}
            />
            <InputButtonSubmit 
              icon={Mail}
              disabled={isLoading || isSuccess}
              type="submit"
            >
              {isLoading ? 'Adding...' : 'Join'}
            </InputButtonSubmit>
          </InputButton>
        </InputButtonProvider>
        
        {message && (
          <p className={`text-sm text-center transition-all duration-300 ${
            isSuccess 
              ? 'text-green-600 dark:text-green-400' 
              : message.includes('Adding') 
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-red-600 dark:text-red-400'
          }`}>
            {message}
          </p>
        )}
      </form>
      
      <Confetti 
        active={showConfetti} 
        config={{
          particleCount: 150,
          angle: 90,
          spread: 60,
          startVelocity: 25,
          colors: ['#FFC107', '#00A9A5', '#FFD700', '#20B2AA', '#FF6347']
        }} 
      />
    </div>
  );
}