import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useState } from 'react';


// Written by Aung Myin Moe
const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "http://localhost:8080/",
            },
        });

        if (result.error) {
            console.error(result.error.message);
            alert("Payment failed. Please try again.");
        }

        setIsProcessing(false);
    };

    return (
        <main>
            <form id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement />
                <button disabled={isProcessing} id="submit" className="stripe-button">
                    <span id="button-text">
                        {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
            </form>
        </main>
    );
};

export default CheckoutForm;
