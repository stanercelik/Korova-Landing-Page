// Dosya: netlify/functions/waitlist.ts

import { Handler } from '@netlify/functions';
import axios from 'axios';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID;

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { email } = JSON.parse(event.body || '{}');
    if (!email) {
      return { statusCode: 400, body: 'Email is required' };
    }

    await axios.post('https://api.brevo.com/v3/contacts', 
      {
        email: email,
        listIds: [Number(BREVO_LIST_ID)],
      }, 
      {
        headers: { 'api-key': BREVO_API_KEY, 'Content-Type': 'application/json' },
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Successfully subscribed!' }),
    };
  } catch (error: any) {
    console.error('Brevo API Error:', error.response?.data);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Subscription failed.' }),
    };
  }
};