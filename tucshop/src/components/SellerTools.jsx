import ProductCreation from "./ProductCreation";
import ProductEditor from "./ProductEditor";
import '../styles/Products.scss';
import SellerProducts from "./SellerProducts";
import EditProductProvider from "../context/editProduct.context";
import { useEffect, useState } from "react";

export default function SellerTools(){
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        fetch(`${global.config.PRODUCT_URL}/`).then(res => res.json()).then(res => setProductList(res));
    }, []);

    return(
        <div className='seller-container'>
        <ProductCreation></ProductCreation>
        <EditProductProvider>
            <ProductEditor/>
            <SellerProducts productList={productList}/>
        </EditProductProvider>
        </div>
    );
}