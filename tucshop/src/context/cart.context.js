import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({children}){

    const [productSet, setProductSet] = useState([]);
    const [totalCart, setTotalCart] = useState([]);

    const addToCart = (singleProduct) => {
        setProductSet(cart => [...cart, {product: singleProduct, quantity: 1}])
    }

    const showCart = () => {
        const groupFn = ({product}) => {return product.id};
        const groupCart = Object.values(Object.groupBy(productSet, groupFn));
        const result = groupCart.map(arr => ({product: arr[0].product, quantity: arr.length}))
        
        return result
    }

    return(
        <CartContext.Provider value={{productSet, addToCart, showCart}}>
            {children}
        </CartContext.Provider>
    );

}