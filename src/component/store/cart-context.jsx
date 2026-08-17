import { createContext } from "react";

//Share data about shopping cart
const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
});

export default CartContext;