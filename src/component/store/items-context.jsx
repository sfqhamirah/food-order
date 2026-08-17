import { createContext } from "react";

//Share data about foot either in admin or user
const ItemContext = createContext({
    itemsData: [],
    switchPage: null, 
    addNewItem: (item) => {},
    removeItem: (id) => {},
    updateItem: (id) => {},
    togglePage: () => {}
});

export default ItemContext;