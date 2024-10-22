import ProductWidget from "./ProductWidget";
import '../styles/Products.scss';
import { useContext, useEffect, useState } from "react";
import { SearchProductContext } from "../context/search.context";

export default function Products(){

    const [productList, setProductList] = useState([]);
    const {titleSearch} = useContext(SearchProductContext);

    useEffect(() => {
        if(titleSearch !== ''){
            fetch(`http://localhost:5000/products/title?title=${titleSearch}`).then(res => res.json()).then(res => setProductList(res));
        }
        else{
            fetch('http://localhost:5000/products').then(res => res.json()).then(res => setProductList(res));
        }
    }, [titleSearch]);

    return(
        <>
        {titleSearch && (<h1>Found {productList.length} results matching your search</h1>)}
        <div className='products-container'>
            {productList.map(productData => <ProductWidget productData={productData}/>)
            }
        </div>
        </>
    );
}