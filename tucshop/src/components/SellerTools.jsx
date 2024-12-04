import ProductCreation from "./ProductCreation";
import ProductEditor from "./ProductEditor";
import '../styles/Products.scss';
import SellerProducts from "./SellerProducts";
import EditProductProvider from "../context/editProduct.context";
import { useEffect, useState } from "react";

export default function SellerTools({token}){
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        if(token !== null){
            fetch(`${global.config.PRODUCT_URL}/username`,{
                headers:{
                    'authorization': `Bearer ${token}`
                }
            }).then(res => res.json()).then(res => setProductList(res));}
    }, [token]);

    return(
        <div className='seller-container'>
        <ProductCreation token={token}></ProductCreation>
        <EditProductProvider>
            <ProductEditor token={token}/>
            <SellerProducts productList={productList}/>
        </EditProductProvider>
        </div>
    );
}