import { createContext } from "react";

const CatContext = createContext({
    isAdvancedSearch: null,
    searchInput: null,
    images: []
})

export default CatContext;