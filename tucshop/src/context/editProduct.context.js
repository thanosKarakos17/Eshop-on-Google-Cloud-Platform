import { createContext, useState } from "react";

export const EditProductContext = createContext();

export default function EditProductProvider({children}){

    const [image, setImage] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [title, setTitle] = useState(null);
    const [units, setUnits] = useState(null);
    const [id, setId] = useState(null);

    return(
        <EditProductContext.Provider value={{image, setImage, price, setPrice, description, setDescription, title, setTitle, units, setUnits, id, setId}}>
            {children}
        </EditProductContext.Provider>
    );
}