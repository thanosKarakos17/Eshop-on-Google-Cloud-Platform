import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({children}){

    const [productSet, setProductSet] = useState({})

    const addToCart = (singleProduct) => {
        //setProductSet(cart => [...cart, {product: singleProduct, quantity: 1}])
        if(!productSet.singleProduct)setProductSet(prev => {
            return {...prev, singleProduct: 1}
        });

        else{setProductSet(prev => {
            const {existingProduct, ...rest} = prev;
            return {...rest, existingProduct: prev[existingProduct] + 1}
        });}
    }

    return(
        <CartContext.Provider value={{productSet, addToCart}}>
            {children}
        </CartContext.Provider>
    );

}