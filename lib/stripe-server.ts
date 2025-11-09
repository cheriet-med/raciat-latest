import Stripe from 'stripe';

// Validate server environment variable
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
});

// Your price ID - replace with your actual price ID
export const SUBSCRIPTION_PRICE_ID = 'price_1S7YgOGIHlrjHR0Dodbyuh2f';