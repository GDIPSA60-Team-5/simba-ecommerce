import { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { CartItemType } from '../types/types';
import axios, { AxiosResponse } from 'axios';


export default function ListCartItem() {
    const [myCart, updateMyCart] = useState<CartItemType[]>([]);

    useEffect(() => {
        console.log("retrieving cart from server");
        retrieveCart();
    }, []);

    function retrieveCart() {
        axios
            .get("http://localhost:8080/api/cart")
            .then((response: AxiosResponse) => {
                updateMyCart(response.data)
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const listCartHtml = myCart.map((myCartItem) =>
        <CartItem myCartItem={myCartItem} key={myCartItem.id} />
    );

    return(
        <table>
            {listCartHtml}
        </table>
    )
}