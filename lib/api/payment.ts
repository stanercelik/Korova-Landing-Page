// Payment processing API service
export interface PaymentSession {
  tierId: string;
  email?: string;
  successUrl?: string;
  cancelUrl?: string;
}

export interface PaymentResponse {
  success: boolean;
  sessionId?: string;
  paymentUrl?: string;
  message: string;
}

export async function createPaymentSession(
  tierId: string,
  email?: string
): Promise<PaymentResponse> {
  try {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tierId,
        email,
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment session:', error);
    throw new Error('Failed to create payment session. Please try again.');
  }
}

export async function verifyPayment(sessionId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/payment/verify/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.verified === true;
  } catch (error) {
    console.error('Error verifying payment:', error);
    return false;
  }
}