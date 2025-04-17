import { useEffect, useState, useRef } from 'react'
import CartItem from './CartItem'
import { CartItemType } from '../../../types/types'
import axios, { AxiosResponse } from 'axios'
import { useNavigate } from "react-router-dom";


export default function ListCartItem() {
    const [myCart, updateMyCart] = useState<CartItemType[]>([]);
    const deliTypeElement = useRef<HTMLSelectElement>(null);
    const shippingAddressElement = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("retrieving cart from server");
        retrieveCart();
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

    async function handleSubmitOrder(e: any) {
        e.preventDefault();

        const orderDetails = {
            deliveryType: deliTypeElement.current?.value,
            shippingAddress: shippingAddressElement.current?.value
        }

        try {
            // 1. send orderDetails to backend
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

    const listCartHtml = myCart.map((myCartItem) =>
        <CartItem myCartItem={myCartItem} key={myCartItem.id} />
    );

    return(
        <div>
            <form>
                <table>
                    <tbody>
                        {myCart.length === 0 ? (
                            <tr>
                                <td colSpan={2}>Your cart is empty.</td>
                            </tr>
                        ) : (
                            listCartHtml
                        )}
                    </tbody>
                </table>

                <h3>Choose Delivery Type</h3>
                
                <label htmlFor="deliveryType"><strong>Delivery Type</strong></label>
                <select id="deliveryType" name="deliveryType" ref={deliTypeElement} required>
                    <option value="">
                        -- Please choose an option --
                    </option>
                    <option value="Standard Delivery">
                        Standard Delivery – Delivered within 3–5 working days ($3.50)
                    </option>
                    <option value="Express Delivery">
                        Express Delivery – Delivered within 1–2 working days ($7.90)
                    </option>
                    <option value="Same-Day Delivery">
                        Same-Day Delivery – Delivered on the same day if ordered before 12pm ($12.00)
                    </option>
                </select>

            
                <h3>Shipping Address</h3>
                <div>
                    <label htmlFor="shippingAddress">Address:</label><br/>
                    <textarea id="shippingAddress" name="shippingAddress" rows={4} cols={50} placeholder="Enter your shipping address" ref={shippingAddressElement} required></textarea>
                </div>
            
                <br/>
                <button onClick={handleSubmitOrder}>Submit Order</button>
            </form>  
        </div>
    )
}