import { useEffect, useState, useRef } from 'react'
import CartItem from './CartItem'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import { useCart } from '../../../hooks/useCart';


// written by Aung Myin Moe & Haziq
export default function ListCartItem() {
    const {
        myCart,
        deliveryFee,
        setDeliveryFee,
        updatedQuantities,
        setUpdatedQuantities,
        retrieveCart,
        deliType, 
        retrieveDeliType,
        selectedDeliveryType,
        setSelectedDeliveryType
    } = useCart();

    const deliTypeElement = useRef<HTMLSelectElement>(null);
    const shippingAddressElement = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const [isSaving, setIsSaving] = useState(false);
    const [cartChanged, setCartChanged] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

    
    const updateCartQtyState = (cartItemId: number, quantity: number) => {
        setUpdatedQuantities(prev => ({ ...prev, [cartItemId]: quantity }));
        setCartChanged(true); // cart has unsaved changes
    }

    const handleSaveClick = async() => {
        setIsSaving(true);
        await handleSaveCart();
        setIsSaving(false);
    };
    
    const handleSaveCart = async() => {
        for (const myCartItem of myCart) {
            const updatedItem = {
                ...myCartItem,
                quantity: updatedQuantities[myCartItem.id] ?? myCartItem.quantity,
            };
            try {
                await axios.put(
                    `http://localhost:8080/api/cart/update-quantity`,
                    updatedItem,
                    { withCredentials: true }
                );
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    alert(err.response?.data?.message || "Failed to update quantity");
                    console.error("Update quantity error:", err);
                } else {
                    alert("An unknown error occurred");
                    console.error("Unknown error:", err);
                }   
            }
        }
        setCartChanged(false); // now cart has no unsaved changes
    }

    useEffect(() => {
        console.log("retrieving cart and delivery type from server");
        retrieveCart();
        retrieveDeliType();

        // restore the delivery type and shipping information to cart page
        const savedDeliveryType = sessionStorage.getItem("deliveryType");
        const savedShippingAddress = sessionStorage.getItem("shippingAddress");

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

        if (savedShippingAddress && shippingAddressElement.current) {
            shippingAddressElement.current.value = savedShippingAddress;
        }
    }, []);

    async function handleSubmitOrder(e: any) {
        e.preventDefault();

        const orderDetails = {
            deliveryType: selectedDeliveryType?.name,
            shippingAddress: shippingAddressElement.current?.value
        }

        try {
            // Save cart quantities if there are unsaved changes
            if (cartChanged) {
                await handleSaveCart();
            }

            // Send orderDetails to backend
            const response = await axios.post("http://localhost:8080/api/cart/submit", orderDetails, {
                withCredentials: true
            });

            const clientSecret = response.data.clientSecret;

            // Navigate to checkout page and pass clientSecret via state
            navigate("/checkout", { state: { clientSecret } });
        }
        catch (error: any) {
            if (axios.isAxiosError(error) && typeof error.response?.data === 'object') {
                setValidationErrors(error.response.data);
            }else {
                alert("Unknown error");
                console.error("Unexpected error: ", error);
            }
            }
        }

    function handleDeleteCart() {
        axios.delete(`http://localhost:8080/api/delete-cart`, {
            withCredentials: true
        })
            .then(() => {
                retrieveCart();
            })
            .catch(err => {
                alert(err.response?.data?.message || "Failed to delete cart");
                console.error("Remove error:", err);
            });
    }

    function calculateTotal() {
        let total = 0;
        myCart.forEach((myCartItem) => {
            const updatedQty = updatedQuantities[myCartItem.id];
            const quantityToUse = updatedQty !== undefined ? updatedQty : myCartItem.quantity;
            total += myCartItem.product.price * quantityToUse;
        });
        return total;
    }    

    function calculateTax() {
        const tax = calculateTotal() * 0.09;
        return tax;
    }   

    const listCartHtml = myCart.map((myCartItem) =>
        <CartItem myCartItem={myCartItem} key={myCartItem.id} retrieveCart={retrieveCart} updateCartQtyState={updateCartQtyState} />
    );

    return( 
        <form className="max-w-[75%] mx-auto p-8">
            <div className="flex items-center justify-between mb-15 relative">
                <Link
                    type="button"
                    to="/books"
                    className="text-gray-700 hover:text-gray-900 active:text-gray-900 font-medium transition-colors duration-200 transform hover:scale-110 active:scale-100"
                >
                    &#x25c0; BACK TO SHOPPING
                </Link>

                {/* Title centered absolutely */}
                <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-light text-center">
                    My Cart
                </h1>
            </div>

            <div className="flex justify-between gap-8 mb-8">
                <div className="w-[70%]">
                    {/* Table on the left */}
                    <table className="w-full mr-7 border-collapse">
                        <thead>
                        <tr className="text-sm text-gray-600 text-center pb-4">
                            <th className="w-1/5 pb-4 font-normal">BOOK</th>
                            <th className="w-1/5 pb-4 font-normal">PRICE (SGD)</th>
                            <th className="w-1/5 pb-4 font-normal">QUANTITY</th>
                            <th className="w-1/5 pb-4 font-normal">TOTAL (SGD)</th>
                            <th className="w-1/5 pb-4 font-normal">REMOVE</th>
                        </tr>
                        </thead>
                        <tbody>{listCartHtml}</tbody>
                    </table>
                    <div className="flex gap-6 mt-6">
                        {myCart.length > 0 && (
                            <button
                                type="button"
                                onClick={handleSaveClick}
                                disabled={isSaving || !cartChanged}
                                className={`px-4 py-3 text-white font-semibold transition-all duration-200 block mt-1
                                    ${isSaving ? 'bg-gray-300 cursor-not-allowed' : cartChanged ? 'bg-green-600 hover:contrast-[115%] cursor-pointer active:scale-[0.98] active:brightness-90' : 'bg-gray-400 cursor-not-allowed'}`}
                                >
                                    SAVE CART
                            </button>
                        )}
                        
                        {myCart.length > 0 && (
                            <button
                                type="button"
                                onClick={handleDeleteCart}
                                className="px-4 py-3 bg-red-600 text-white font-semibold cursor-pointer transition-all duration-200 hover:contrast-[115%] active:brightness-90 active:scale-[0.98] block mt-1"
                            >
                                DELETE CART
                            </button>
                        )}
                    </div>

                    {myCart.length === 0 && (
                        <div className="text-center">
                            <img 
                                src="/images/empty-cart.png" 
                                alt="Empty Cart" 
                                className="mx-auto w-80 h-80 mb-4"
                            />
                            <h1 className="text-3xl font-bold text-gray-600">Your Cart is <span className="text-3xl font-bold text-red-600">Empty!</span></h1>
                            <p className="my-7 font-normal text-gray-600">Must add items on the cart before you proceed to checkout.</p>
                        </div>
                    )}
                </div>
                
                {/* Totals on the right with delivery inputs */}
                <div className="w-[30%] min-w-[220px] border-t-18 border-black ml-5 mt-2 pt-4">
                    <table className="w-full border-collapse text-sm">
                        <tbody>
                            <tr>
                                <td className="w-2/4 text-left pt-4 pb-2 font-normal">CART TOTAL</td>
                                <td className="w-2/4 text-right pt-4 pb-2 font-normal">{calculateTotal().toFixed(2)}</td>
                                <td className="w-1/4"></td>
                            </tr>
                            <tr>
                                <td className="text-left py-2 font-normal">GST (9%)</td>
                                <td className="text-right py-2 font-normal">{calculateTax().toFixed(2)}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="text-left pt-2 pb-4 font-normal">DELIVERY FEE</td>
                                <td className="text-right pt-2 pb-4 font-normal">{deliveryFee.toFixed(2)}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td className="border-t border-gray-400 text-left py-4 font-bold text-gray-800">TOTAL</td>
                                <td className="border-t border-gray-400 text-right py-4 font-bold text-gray-800">
                                    SGD {(calculateTotal() + calculateTax() + deliveryFee).toFixed(2)}
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    {validationErrors.cart && (
                        <div style={{ color: "red", marginBottom: "1rem" }}>
                            {validationErrors.cart}
                        </div>
                    )}

                    {/* Delivery Type */}
                    <div className="w-full mt-8 mb-10">
                        <label
                        htmlFor="deliveryType"
                        className="block text-sm text-gray-600 font-normal mb-2 tracking-wide uppercase"
                        >
                        Delivery Type
                        </label>
                        <select
                        id="deliveryType"
                        name="deliveryType"
                        ref={deliTypeElement}
                        required
                        className="w-full p-3 bg-white border border-gray-300 rounded-sm shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition ease-in-out"
                        value={selectedDeliveryType ? selectedDeliveryType.name : ""}
                        onChange={(e) => {
                            const selectedName = e.target.value;
                            const selected = deliType.find(type => type.name === selectedName) || null;
                            setSelectedDeliveryType(selected);
                            setDeliveryFee(selected ? selected.fee : 0);
                            sessionStorage.setItem("deliveryType", JSON.stringify(selected));
                        }}
                        >
                        <option value="" className="text-gray-400">
                            -- Please select a delivery type --
                        </option>
                        {Array.isArray(deliType) &&
                            deliType.map((type) => (
                            <option
                                key={type.id}
                                value={type.name}
                                className="text-gray-700 bg-white"
                            >
                                {`${type.name} (SGD ${type.fee.toFixed(2)}) -- ${type.description} --`}
                            </option>
                            ))}
                        </select>
                        {validationErrors.deliveryType && (
                        <div className="text-red-600 mt-2 text-sm">
                            {validationErrors.deliveryType}
                        </div>
                        )}
                    </div>

                    {/* Shipping Address */}
                    <div className="w-full mt-8 mb-4">
                        <label
                            htmlFor="shippingAddress"
                            className="block text-sm text-gray-600 font-normal mb-2 tracking-wide uppercase"
                        >
                            Shipping Address
                        </label>
                        <textarea
                            id="shippingAddress"
                            name="shippingAddress"
                            rows={4}
                            placeholder="Enter your shipping address"
                            ref={shippingAddressElement}
                            required
                            className="w-full p-3 bg-white border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition ease-in-out resize-none"
                            onChange={(e) => {
                                sessionStorage.setItem("shippingAddress", e.target.value);
                            }}
                        ></textarea>
                        {validationErrors.shippingAddress && (
                            <div className="text-red-600 mt-2 text-sm">
                                {validationErrors.shippingAddress}
                            </div>
                        )}
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleSubmitOrder}
                            className="px-4 py-3 bg-black text-white font-semibold cursor-pointer transition-all duration-200 hover:contrast-[115%] active:brightness-90 active:scale-[0.98] block mt-4"
                            >
                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </form>    
    )
}