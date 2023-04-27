import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const fonts = [{ cssSrc: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap" }]

export default function StripeWrapper({ children }) {
    return (
        <Elements stripe={stripePromise} options={{ fonts }}>
            {children}
        </Elements>
    );
};
