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
        <form style={{ maxWidth: "70%", margin: "0 auto", padding: "2rem" }}>
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
            <table style={{ width: "70%", borderCollapse: "collapse", marginBottom: "2rem" }}>
                <thead>
                    <tr className="text-gray-500 font-normal text-center pb-4">
                        <td className="w-1/5 pb-4">BOOK</td>
                        <td className="w-1/5 pb-4">PRICE (SGD)</td>
                        <td className="w-1/5 pb-4">QUANTITY</td>
                        <td className="w-1/5 pb-4">TOTAL (SGD)</td>
                        <td className="w-1/5 pb-4">ACTION</td>
                    </tr>
                </thead>
                <tbody>
                    {listCartHtml}
                    <tr style={{ borderTop: "1px solid #ccc" }}>
                        <td colSpan={3} style={{ textAlign: "right", paddingTop: "1rem", paddingBottom: "0.5rem", fontWeight: "bold" }}>
                            Subtotal
                        </td>
                        <td style={{ textAlign: "right", paddingTop: "1rem", paddingBottom: "0.5rem", paddingRight: "2rem" }}>
                            {calculateTotal().toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} style={{ textAlign: "right", paddingBottom: "0.5rem", fontWeight: "bold" }}>
                            GST (9%)
                        </td>
                        <td style={{ textAlign: "right", paddingBottom: "0.5rem", paddingRight: "2rem" }}>
                            {calculateTax().toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3} style={{ textAlign: "right", paddingBottom: "0.5rem", fontWeight: "bold" }}>
                            Delivery Fee
                        </td>
                        <td style={{ textAlign: "right", paddingBottom: "0.5rem", paddingRight: "2rem" }}>
                            {deliveryFee.toFixed(2)}
                        </td>
                    </tr>
                    <tr style={{ borderTop: "2px solid black" }}>
                        <td colSpan={3} style={{ textAlign: "center", paddingTop: "1rem", fontWeight: "bold" }}>
                            Grand Total
                        </td>
                        <td style={{ textAlign: "right", paddingTop: "1rem", paddingRight: "2rem", fontWeight: "bold" }}>
                            SGD {(calculateTotal() + calculateTax() + deliveryFee).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ marginBottom: "1.5rem" }}>
                <label htmlFor="deliveryType"><strong>Delivery Type</strong></label><br/>
                <select
                    id="deliveryType"
                    name="deliveryType"
                    ref={deliTypeElement}
                    required
                    style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
                    value={selectedDeliveryType ? selectedDeliveryType.name : ""}
                    onChange={(e) => {
                        const selectedName = e.target.value;
                        const selected = deliType.find(type => type.name === selectedName) || null;
                        setSelectedDeliveryType(selected);
                        setDeliveryFee(selected ? selected.fee : 0);
                        // Save to sessionStorage
                        sessionStorage.setItem("deliveryType", JSON.stringify(selected));
                    }}
                >
                    <option value="">-- Please choose an option --</option>
                    {Array.isArray(deliType) && deliType.map((type) => (
                        <option key={type.id} value={type.name}>
                            {type.name} – {type.description} (S${type.fee.toFixed(2)})
                        </option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "2rem" }}>
                <label htmlFor="shippingAddress"><strong>Shipping Address</strong></label><br/>
                <textarea
                    id="shippingAddress"
                    name="shippingAddress"
                    rows={4}
                    cols={50}
                    placeholder="Enter your shipping address"
                    ref={shippingAddressElement}
                    required
                    style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
                    onChange={(e) => {
                        sessionStorage.setItem("shippingAddress", e.target.value);
                    }}
                ></textarea>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
                <button type="button" onClick={handleSubmitOrder} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
                    Submit Order
                </button>
                <button type="button" onClick={handleSaveClick} disabled={isSaving || !cartChanged}
                    className={`px-6 py-3 rounded-md text-white transition-colors duration-300 
                        ${isSaving ? 'bg-blue-300 cursor-not-allowed' : cartChanged ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`} 
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
                        "Save Cart"
                    )}
                </button>
                <button type="button" onClick={handleDeleteCart} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px" }}>
                    Delete Cart
                </button>
            </div>
        </form>    
    )
}