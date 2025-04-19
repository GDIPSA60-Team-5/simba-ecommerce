import { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { CartItemType, DeliveryType } from '../../../types/types'
import axios, { AxiosResponse } from 'axios'
import { useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';


// written by Aung Myin Moe & Haziq
export default function ListCartItem() {
    const [myCart, updateMyCart] = useState<CartItemType[]>([]);
    const deliTypeElement = useRef<HTMLSelectElement>(null);
    const shippingAddressElement = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const [deliType, updateDeliType] = useState<DeliveryType[]>([]);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | null>(null);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [updatedQuantities, setUpdatedQuantities] = useState<{ [cartItemId: number]: number }>({});
    const [isSaving, setIsSaving] = useState(false);
    const [cartChanged, setCartChanged] = useState(false);

    
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

    function retrieveCart() {
        axios
            .get("http://localhost:8080/api/cart", {
                withCredentials: true
            })
            .then((response: AxiosResponse) => {
                console.log("server response:", response.data);
                updateMyCart(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    function retrieveDeliType() {
        axios
            .get("http://localhost:8080/api/deli-type")
            .then((response: AxiosResponse) => {
                console.log("delivery type response", response.data);
                updateDeliType(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

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
        catch (error) {
            console.error("Error:", error);
            alert("Failed to process order.");
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
        <form style={{ maxWidth: "75%", margin: "0 auto", padding: "2rem" }}>
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
                {/* Table on the left */}
                <table className="w-[70%] mr-6 border-collapse">
                    <thead>
                    <tr className="text-sm text-gray-600 font-medium text-center pb-4">
                        <th className="w-1/5 pb-4">BOOK</th>
                        <th className="w-1/5 pb-4">PRICE (SGD)</th>
                        <th className="w-1/5 pb-4">QUANTITY</th>
                        <th className="w-1/5 pb-4">TOTAL (SGD)</th>
                        <th className="w-1/5 pb-4">ACTION</th>
                    </tr>
                    </thead>
                    <tbody>{listCartHtml}</tbody>
                </table>
                
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
                                <td className="border-t border-gray-400 text-left py-4 font-medium text-gray-800">TOTAL</td>
                                <td className="border-t border-gray-400 text-right py-4 font-medium text-gray-800">
                                    SGD {(calculateTotal() + calculateTax() + deliveryFee).toFixed(2)}
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delivery Type
            <div className="mt-8 mb-10">
            <label htmlFor="deliveryType" className="block text-sm text-gray-600 font-medium mb-2 tracking-wide uppercase">
                Delivery Type
            </label>
            <select
                id="deliveryType"
                name="deliveryType"
                ref={deliTypeElement}
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
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
                    Please select a delivery type
                </option>
                {Array.isArray(deliType) &&
                deliType.map((type) => (
                    <option key={type.id} value={type.name}>
                        {`${type.name} (${type.fee.toFixed(2)} SGD) - ${type.description}`}   
                    </option>
                ))}
            </select>
            </div> */}

            <div className="mt-8 mb-10">
            <label
                htmlFor="deliveryType"
                className="block text-sm text-gray-600 font-medium mb-2 tracking-wide uppercase"
            >
                Delivery Type
            </label>
            <select
                id="deliveryType"
                name="deliveryType"
                ref={deliTypeElement}
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition ease-in-out"
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
                Please select a delivery type
                </option>
                {Array.isArray(deliType) &&
                deliType.map((type) => (
                    <option
                    key={type.id}
                    value={type.name}
                    className="text-gray-700 bg-white hover:bg-gray-100" // `hover:bg-*` often has limited support for `<option>`
                    >
                    {`${type.name} (${type.fee.toFixed(2)} SGD) - ${type.description}`}
                    </option>
                ))}
            </select>
            </div>



            {/* Shipping Address */}
            <div className="mt-8 mb-10">
            <label htmlFor="shippingAddress" className="block text-sm text-gray-600 font-medium mb-2 tracking-wide uppercase">
                Shipping Address
            </label>
            <textarea
                id="shippingAddress"
                name="shippingAddress"
                rows={4}
                placeholder="Enter your shipping address"
                ref={shippingAddressElement}
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out resize-none"
                onChange={(e) => {
                sessionStorage.setItem("shippingAddress", e.target.value);
                }}
            ></textarea>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
                <button
                    type="button"
                    onClick={handleSubmitOrder}
                    className="px-6 py-4 bg-black text-white border-none rounded-none hover:bg-gray-800 active:bg-gray-900 transition duration-200"
                    >
                    CHECKOUT
                </button>
                <button type="button" onClick={handleSaveClick} disabled={isSaving || !cartChanged}
                    className={`px-6 py-4 text-white transition-colors duration-300 
                        ${isSaving ? 'bg-gray-300 cursor-not-allowed' : cartChanged ? 'bg-gray-500 hover:bg-gray-600' : 'bg-gray-400 cursor-not-allowed'}`} 
                >
                    {isSaving ? (
                        <div className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                            Saving...
                        </div>
                    ) : (
                        "SAVE CART"
                    )}
                </button>
                <button
                    type="button"
                    onClick={handleDeleteCart}
                    className="py-4 px-6 bg-red-600 text-white border-none hover:bg-red-700 active:bg-red-800 transition duration-200"
                    >
                    DELETE CART
                </button>
            </div>
        </form>    
    )
}