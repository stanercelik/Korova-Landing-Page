// Email submission API service
export interface WaitlistSubmission {
  email: string;
  source?: string;
  timestamp?: Date;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
  id?: string;
}

export async function submitToWaitlist(
  email: string,
  source: string = 'landing-page'
): Promise<WaitlistResponse> {
  try {
    const response = await fetch('/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        source,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting to waitlist:', error);
    throw new Error('Failed to submit email. Please try again.');
  }
}

export async function validateEmail(email: string): Promise<boolean> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}