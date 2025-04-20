import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './StripeCheckoutForm.tsx';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCartContext } from '../../../context/CartContext';

// Written by Aung Myin Moe
const stripePromise = await loadStripe('pk_test_51RBtJ5GBEBEiOSMS84fM0Eozu7inX60wlw19XZ8RmsFlXDdyYIgINu1R8BsdCKfD2o3v6TEGUEDqtC0N0KPZdVAd00BGENAvN7');
const GST = 0.09;

export default function CheckoutPage() {
    // Use the new context hook instead of the old useCart hook
    const {
        cart,
        deliveryFee,
        setDeliveryFee,
        refreshCart,
        refreshDeliveryTypes,
        setSelectedDeliveryType
    } = useCartContext();

    const location = useLocation();
    const { clientSecret } = location.state || {}; // from navigate("/checkout", { state: { clientSecret } })

    const options = {
        clientSecret: clientSecret,
        appearance: {
            theme: 'stripe' as const,
        },
    };

    useEffect(() => {
        console.log("retrieving cart from server");
        refreshCart();
        refreshDeliveryTypes();

        // restore the delivery type and shipping information to cart page
        const savedDeliveryType = sessionStorage.getItem("deliveryType");

        if (savedDeliveryType) {
            try {
                const parsed = JSON.parse(savedDeliveryType);
                if (parsed) {
                    setSelectedDeliveryType(parsed);
                    setDeliveryFee(parsed.fee);
                }
            } catch (err) {
                console.error("Failed to parse savedDeliveryType", err);
            }
        }
    }, [refreshCart, refreshDeliveryTypes, setSelectedDeliveryType, setDeliveryFee]);

    function calculateTotal() {
        let total = 0;
        cart.forEach((cartItem) => {
            const quantityToUse = cartItem.quantity;
            total += cartItem.product.price * quantityToUse;
        });
        return total;
    }

    function grandTotal() {
        let total = 0;
        total = (calculateTotal() * (1 + GST)) + deliveryFee;
        return total;
    }

    return (
        <div className="max-w-[75%] mx-auto p-8">
            <div className="flex items-center justify-between mb-15 relative">
                <Link
                    type="button"
                    to="/cart"
                    className="text-gray-700 hover:text-gray-900 active:text-gray-900 font-medium transition-colors duration-200 transform hover:scale-110 active:scale-100"
                >
                    &#x25c0; BACK TO CART
                </Link>

                {/* Title centered absolutely */}
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-light text-center">
                    Checkout
                </h1>
            </div>

            {clientSecret && (
                <div className="flex justify-between gap-8 mb-8">
                    <div className="w-[50%]">
                        <div className="text-left ml-10 mb-6">
                            <p className="font-medium text-lg text-gray-500 mb-3">
                                Pay CODEX
                            </p>
                            <div className="font-bold text-3xl text-gray-600">
                                SGD {grandTotal().toFixed(2)}
                            </div>
                        </div>
                        <div className="ml-10">
                            {cart.map((cartItem) => (
                                <tr key={cartItem.id} className="align-top">
                                    <td className="py-3 pr-6">
                                        <div className="flex flex-col items-center gap-4">
                                            <img
                                                src={cartItem.product.imageUrl}
                                                alt={cartItem.product.name}
                                                className="w-12 h-15 object-cover rounded"
                                            />
                                        </div>
                                    </td>

                                    <td className="w-2/3 pt-4 text-left">
                                        <span className="font-normal text-center break-words">{cartItem.product.name}</span>
                                        <br /><span className="font-light">Qty {cartItem.quantity}</span>
                                    </td>

                                    <td className="pt-4 text-right font-normal">
                                        {(cartItem.product.price * cartItem.quantity).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                            <tr className="align-top text-left">
                                <td className="py-3 pr-6"></td>
                                <td className="w-2/3 pt-4 font-medium border-t border-gray-800">Subtotal</td>
                                <td className="pt-4 text-right font-medium border-t border-gray-800">
                                    {calculateTotal().toFixed(2)}
                                </td>
                            </tr>
                            <tr className="align-top text-left">
                                <td className="py-3 pr-6"></td>
                                <td className="w-2/3 pt-4 font-medium">GST (9%)</td>
                                <td className="pt-4 text-right font-medium">
                                    {(calculateTotal() * GST).toFixed(2)}
                                </td>
                            </tr>
                            <tr className="align-top text-left">
                                <td className="py-3 pr-6"></td>
                                <td className="w-2/3 py-4 font-medium">Delivery Fee</td>
                                <td className="py-4 text-right font-medium">
                                    {deliveryFee.toFixed(2)}
                                </td>
                            </tr>
                            <tr className="align-top text-left">
                                <td className="py-3 pr-6"></td>
                                <td className="pt-4 font-bold border-t border-gray-800">TOTAL</td>
                                <td className="pt-4 text-right font-bold border-t border-gray-800">
                                    SGD {grandTotal().toFixed(2)}
                                </td>
                            </tr>
                        </div>

                    </div>
                    <div className="w-[50%] text-center">
                        {clientSecret && (
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm />
                            </Elements>
                        )}
                    </div>
                </div>
            )}

            {!clientSecret && (
                <div className="text-center">
                    <img
                        src="/images/no-checkout-session.png"
                        alt="No Checkout Session"
                        className="mx-auto w-70 h-70 mb-14"
                    />
                    <h1 className="text-3xl font-bold text-red-600">No Active Checkout Session!</h1>
                    <p className="my-7 font-normal text-gray-600">Please return to your cart and start a checkout session before proceeding.</p>
                </div>
            )}

        </div>
    );
}