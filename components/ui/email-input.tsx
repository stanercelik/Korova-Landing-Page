import * as React from 'react';
import { Button } from './button';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface EmailInputProps {
  placeholder?: string;
  onSubmit: (email: string) => void;
  buttonText?: string;
  isLoading?: boolean;
  className?: string;
}

export function EmailInput({
  placeholder = 'Enter your email address',
  onSubmit,
  buttonText = 'Join Waitlist',
  isLoading = false,
  className,
}: EmailInputProps) {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      onSubmit(email);
      setEmail('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('flex flex-col sm:flex-row gap-3 max-w-md', className)}
    >
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-background border-border"
        required
      />
      <Button
        type="submit"
        variant="cta"
        size="lg"
        disabled={!email || isLoading}
        className="whitespace-nowrap"
      >
        {isLoading ? 'Joining...' : buttonText}
      </Button>
    </form>
  );
}