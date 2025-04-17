import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './StripeCheckoutForm.tsx';


// Written by Aung Myin Moe
const stripePromise = loadStripe('pk_test_51RBtJ5GBEBEiOSMS84fM0Eozu7inX60wlw19XZ8RmsFlXDdyYIgINu1R8BsdCKfD2o3v6TEGUEDqtC0N0KPZdVAd00BGENAvN7');

export default function CheckoutPage() {
    const location = useLocation();
    const { clientSecret } = location.state || {}; // from navigate("/checkout", { state: { clientSecret } })

    const options = {
        clientSecret: clientSecret,
        appearance: { theme: 'stripe' as const },
    };

    return (
        clientSecret && (
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        )
    );      
}