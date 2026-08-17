import { useReducer } from "react";
import CartContext from "./cart-context";

//Cart starting state
const defaultCartState = {
    items: [],
    totalAmount: 0,
};

//Current cart, what happened
function cartReducer(state, action) {

    //If user click add button
    if (action.type === "ADD") {

        //Check if the item already exist in the cart, find its position
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        //Get the existing item
        const existingItem = state.items[existingItemIndex];

        let updatedItems;

        if (existingItem) { //if item already exits
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount, //existing amount + new amount
            };
            updatedItems = [...state.items]; //create new array
            updatedItems[existingItemIndex] = updatedItem; //replace old array with new
        } else { //if item not exist
            updatedItems = state.items.concat(action.item); //add in cart
        }

        //Update total
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        //Return new cart state
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }

    //If user click remove button
    if (action.type === "REMOVE") {

        //Search food id
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        //If trying to remove something not in the cart, do nothing
        if (existingItemIndex < 0) {
            return state;
        }

        const existingItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;

        let updatedItems;

        if (existingItem.amount === 1) { //If there is only one left
            updatedItems = state.items.filter((item) => item.id !== action.id); //remove it completely
        } else { //Else, reduce amount one by one
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: Math.max(0, updatedTotalAmount),
        };
    }

    //If user click clear, return to default cart state
    if (action.type === "CLEAR") {
        return defaultCartState;
    }

    return state;
}

function CartProvider(props) {

    //Manage cart state using cartReducer
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer, //handle changes to the cart
        defaultCartState // initial state of the cart
    );

    //When user add to cart
    function addItemToCartHandler(item) {
        // guard against malformed items (missing price/id)
        if (!item || !item.id || typeof item.price !== "number") {
            console.error("addItem called with invalid item:", item);
            return;
        }
        dispatchCartAction({ type: "ADD", item: item });
    }

    //When user remove item from card
    function removeItemFromCartHandler(id) {
        if (!id) {
            console.error("removeItem called without an id");
            return;
        }
        dispatchCartAction({ type: "REMOVE", id: id });
    }

    //When click clear cart
    function clearCartHandler() {
        dispatchCartAction({ type: "CLEAR" });
    }

    //Define from cart-context.js
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler,
    };

    return (
        //Provide cart data and functions to child component
        <CartContext.Provider value={cartContext}> 
            {props.children} {/*<App /> */}
        </CartContext.Provider>
    );
}

export default CartProvider;