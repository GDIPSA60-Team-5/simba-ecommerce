import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
            return_url: "http://localhost:8080/api/payment/success", // Replace with your frontend route
            },
        });

        if (result.error) {
            console.error(result.error.message);
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>Submit Payment</button>
        </form>
    );
};

export default CheckoutForm;
