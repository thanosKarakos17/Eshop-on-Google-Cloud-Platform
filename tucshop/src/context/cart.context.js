import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({children}){

    const [productSet, setProductSet] = useState([]);

    const CART_KEY = 'cart';

    useEffect(() => {
        const savedCart = JSON.parse(sessionStorage.getItem(CART_KEY));
        if(savedCart !== null){setProductSet(savedCart);}
        return ;
    }, []);

    const saveCart = (cart) => {
        sessionStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    const addToCart = (singleProduct) => {
        setProductSet(cart => [...cart, {product: singleProduct, quantity: 1}])
    }

    const showCart = () => {
        const groupFn = ({product}) => {return product['_id']};
        const groupCart = Object.values(Object.groupBy(productSet, groupFn));
        const quantityFn = (arr) => {return arr.reduce((acc, item) => acc + item.quantity, 0)};
        const result = groupCart.map(arr => ({product: arr[0].product, quantity: quantityFn(arr)}));

        return result
    }

    return(
        <CartContext.Provider value={{productSet, addToCart, showCart, setProductSet, saveCart}}>
            {children}
        </CartContext.Provider>
    );

}