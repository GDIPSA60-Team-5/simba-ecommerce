import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutResult() {
    const navigate = useNavigate();
    const hasSubmitted = useRef(false); // Add this ref to track submission

    useEffect(() => {
        if (hasSubmitted.current) return; // Prevent double submission
        hasSubmitted.current = true;

        const queryParams = new URLSearchParams(window.location.search);
        const redirectStatus = queryParams.get('redirect_status');
        const paymentIntentId = queryParams.get('payment_intent');

        if (paymentIntentId && redirectStatus === "succeeded") {
            fetch("http://localhost:8080/api/payment/success", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ payment_intent_id: paymentIntentId }),
            })
                .then(res => res.text())
                .then(data => {
                    console.log('Backend confirmation:', data);
                    navigate("/account/orders");
                    setTimeout(() => {
                        alert("Payment Success!");
                    }, 500);
                })
                .catch(err => {
                    console.error('Backend error:', err);
                });
        } else if (paymentIntentId && redirectStatus === "failed") {
            navigate("/cart");
            setTimeout(() => {
                alert("Payment failed");
            }, 500);
        }
    }, [navigate]);

    return null;
}

export default CheckoutResult;