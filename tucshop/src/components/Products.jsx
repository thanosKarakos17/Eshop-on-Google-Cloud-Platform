import ProductWidget from "./ProductWidget";
import '../styles/Products.scss';
import { useEffect, useState } from "react";

export default function Products(){

    const [productList, setProductList] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/products/').then(res => res.json()).then(res => setProductList(res));
    }, []);

    return(
        <div className='products-container'>
            {productList.map(productData => <ProductWidget productData={productData}/>)
            }
        </div>
    );
}