import { createContext, useState } from "react";

export const SearchProductContext = createContext();

export default function SearchProductProvider({children}){

    const [titleSearch, setTitleSearch] = useState('');

    return(
        <SearchProductContext.Provider value={{titleSearch, setTitleSearch}}>
            {children}
        </SearchProductContext.Provider>
    );
}