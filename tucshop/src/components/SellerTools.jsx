import ProductCreation from "./ProductCreation";
import { PRODUCTS } from "../dummy";
import ProductEditor from "./ProductEditor";
import '../styles/Products.scss';
import SellerProducts from "./SellerProducts";
import EditProductProvider from "../context/editProduct.context";

export default function SellerTools(){
    return(
        <div className='seller-container'>
        <ProductCreation></ProductCreation>
        <EditProductProvider>
            <ProductEditor/>
            <SellerProducts productList={PRODUCTS}/>
        </EditProductProvider>
        </div>
    );
}