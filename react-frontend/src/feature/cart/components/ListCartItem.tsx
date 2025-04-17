import { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { CartItemType, DeliveryType } from '../../../types/types'
import axios, { AxiosResponse } from 'axios'
import { useRef } from 'react'
import { useNavigate } from "react-router-dom";


// written by Aung Myin Moe & Haziq
export default function ListCartItem() {
    const [myCart, updateMyCart] = useState<CartItemType[]>([]);
    const deliTypeElement = useRef<HTMLSelectElement>(null);
    const shippingAddressElement = useRef<HTMLTextAreaElement>(null);
    const navigate = useNavigate();
    const [deliType, updateDeliType] = useState<DeliveryType[]>([]);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | null>(null);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [cartChanged, setCartChanged] = useState(false);

    useEffect(() => {
        console.log("retrieving cart and delivery type from server");
        retrieveCart();
        retrieveDeliType();
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
      
      function handleDeleteProduct(productId: number) {
        axios.delete(`http://localhost:8080/api/cart/remove/${productId}`, {
          withCredentials: true
        })
        .then(() => {
          retrieveCart(); // refresh cart after deletion
        })
        .catch(err => {
          alert(err.response?.data?.message || "Failed to remove product");
          console.error("Delete error:", err);
        });
      }

    function calculateTotal() {
        let total = 0;
        myCart.forEach((myCartItem) => {
            total += myCartItem.product.price * myCartItem.quantity;
        });
        return total;
    }    

    function calculateTax() {
        const tax = calculateTotal() * 0.09;
        return tax;
    }   

    // function handleSaveCart() {
async function handleSaveCart() {
        try {
          for (const item of myCart) {
            await axios.put(`http://localhost:8080/api/cart/update-quantity`, item, {
              withCredentials: true
            });
          }
          setCartChanged(false); // cart is now up-to-date
          alert("Cart saved successfully!");
        } catch (err) {
          alert("Failed to save cart.");
          console.error("Save cart error:", err);
        }
      }
    
    // }
    function handleQtyChange(id: number, newQty: number) {
        const updated = myCart.map(item =>
          item.id === id ? { ...item, quantity: newQty } : item
        );
        updateMyCart(updated);
        setCartChanged(true); // mark that the cart has unsaved changes
      }
      
    

    const listCartHtml = myCart.map((myCartItem) =>
        <CartItem
    key={myCartItem.id}
    myCartItem={myCartItem}
    onQuantityChange={handleQtyChange}
    onDelete={handleDeleteProduct}
  />
);

    return( 
        <form style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "2rem" }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: "left", paddingBottom: "1rem" }}>Product</th>
                        <th style={{ textAlign: "left", paddingBottom: "1rem" }}>Unit Price (SGD)</th>
                        <th style={{ textAlign: "left", paddingBottom: "1rem" }}>Quantity</th>
                        <th style={{ textAlign: "left", paddingBottom: "1rem" }}>Total Price (SGD)</th>
                        <th style={{ textAlign: "left", paddingBottom: "1rem" }}>Action</th>
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
                    }}
                >
                    <option value="">-- Please choose an option --</option>
                    {Array.isArray(deliType) && deliType.map((type) => (
                        <option key={type.id} value={type.name}>
                            {type.name} – {type.description} (${type.fee.toFixed(2)})
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
                ></textarea>
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
                <button type="button" onClick={handleSubmitOrder} disabled={cartChanged} style={{ padding: "0.75rem 1.5rem", 
                    backgroundColor: cartChanged? "#9e9e9e" : "#4CAF50", color: "white", border: "none", borderRadius: "4px" }}>
                    Submit Order
                </button>
                <button type="button" onClick={handleSaveCart} disabled={!cartChanged} style={{ padding: "0.75rem 1.5rem", 
                    backgroundColor: !cartChanged? "#9e9e9e" : "#2196F3", color: "white", border: "none", borderRadius: "4px" }}>
                    Save Cart
                </button>
                <button type="button" onClick={handleDeleteCart} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "4px" }}>
                    Delete Cart
                </button>
            </div>
        </form>    
    )
}