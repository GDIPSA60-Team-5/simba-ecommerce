import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutResult() {
    const navigate = useNavigate();

    useEffect(() => {
        // Use window.location.search to make sure it works on fresh reloads
        const queryParams = new URLSearchParams(window.location.search);
        const redirectStatus = queryParams.get('redirect_status');
        const paymentIntentId = queryParams.get('payment_intent');

        console.log('Query params:', { redirectStatus, paymentIntentId });

        if (paymentIntentId && redirectStatus === "succeeded") {
            fetch("http://localhost:8080/api/payment/success", {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ payment_intent_id: paymentIntentId }),
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Backend confirmation:', data);
                    console.log('Payment Success!');
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

    return (
        <></>
    );
}

export default CheckoutResult;
