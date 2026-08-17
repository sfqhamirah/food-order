import { useReducer, useState } from "react";
import ItemsContext from "./items-context";

//Food menu
const defaultItemsState = {
    itemsData: [
        {
            id: "i1",
            name: "Schnitzel",
            description: "Breaded chicken cutlet, pan-fried until golden",
            price: 16.50,
            image: "https://images.unsplash.com/photo-1599921841143-819065a55cc6?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i2",
            name: "Fries",
            description: "Crispy golden fries, lightly salted",
            price: 22.99,
            image: "https://images.unsplash.com/photo-1676566399758-51b0d3927d48?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i3",
            name: "Chicken Burger",
            description: "Crispy chicken with fresh vegetables and bun",
            price: 18.50,
            image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i4",
            name: "Margherita Pizza",
            description: "Classic pizza with tomato and mozzarella",
            price: 24.99,
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i5",
            name: "Spaghetti Bolognese",
            description: "Spaghetti with rich beef tomato sauce",
            price: 21.50,
            image: "https://images.unsplash.com/photo-1622973536968-3ead9e780960?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i6",
            name: "Caesar Salad",
            description: "Fresh lettuce with dressing and croutons",
            price: 15.99,
            image: "https://images.unsplash.com/photo-1746211108786-ca20c8f80ecd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i7",
            name: "Fish and Chips",
            description: "Crispy fried fish served with fries",
            price: 23.50,
            image: "https://images.unsplash.com/photo-1706711053549-f52f73a8960c?q=80&w=1175&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i8",
            name: "Beef Steak",
            description: "Grilled beef steak with vegetables",
            price: 35.99,
            image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i9",
            name: "Chicken Pasta",
            description: "Creamy pasta with grilled chicken",
            price: 20.50,
            image: "https://images.unsplash.com/photo-1676471771228-c4cdbfbd2a7f?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i10",
            name: "Chocolate Cake",
            description: "Rich and moist chocolate cake",
            price: 12.99,
            image: "https://images.unsplash.com/photo-1639744211487-b27e3551b07c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i11",
            name: "Strawberry Mille-Feuille",
            description: "Layered pastry with cream and strawberries",
            price: 22.00,
            image: "https://images.unsplash.com/photo-1688458296325-3cca99d28676?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i12",
            name: "Matcha Cloud Latte",
            description: "Smooth matcha blended with creamy milk",
            price: 14.00,
            image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i13",
            name: "Velvet Chocolate Bliss",
            description: "Rich chocolate blended with creamy milk",
            price: 15.00,
            image: "https://images.unsplash.com/photo-1661529548674-8dae0330fe04?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i14",
            name: "Drinking Water",
            description: "Chilled water, available to refill",
            price: 5.00,
            image: "https://images.unsplash.com/photo-1553564552-02656d6a2390?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            id: "i15",
            name: "Tropical Trio",
            description: "Orange, lime, and dragon fruit coolers",
            price: 18.00,
            image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1257&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ],
};

function itemsReducer(state, action) {

    //Admin click add item
    if (action.type === "ADD_ITEM") {
        return {
            itemsData: state.itemsData.concat(action.item)
        }
    }

    //Admin click remove item
    if (action.type === "REMOVE_ITEM") {
        return {
            itemsData: state.itemsData.filter((item) => item.id !== action.id)
        }
    }

    //Admin update item
    if (action.type === "UPDATE_ITEM") {
        const updateItems = state.itemsData.map((item) => 
            item.id === action.id? {...item, ...action.updates} : item)
        return {
            itemsData: updateItems
        }
    }
    return defaultItemsState
}

function ItemsProvider(props) {
    const [itemsState, dispatchItemsAction] = useReducer(itemsReducer, defaultItemsState) //current food menu
    const [switchPage, setSwitchPage] = useState(true) //admin or user page

    //Dispatch item
    function addNewItemHandler(item) {
        dispatchItemsAction({type:"ADD_ITEM", item: item})
    }
    function removeItemHandler(id) {
        dispatchItemsAction({type:"REMOVE_ITEM", id: id})
    }
    function updateItemHandler(id, updates) {
        dispatchItemsAction({type:"UPDATE_ITEM", id: id, updates: updates})
    }

    //User or admin page
    function togglePageHandler() {
        setSwitchPage((prevState) => !prevState);
    }

    //Create into one object
    const itemsContext = {
        itemsData: itemsState.itemsData,
        switchPage: switchPage,
        addNewItem: addNewItemHandler,
        removeItem: removeItemHandler,
        updateItem: updateItemHandler,
        togglePage: togglePageHandler,
    }

    return (
        <ItemsContext.Provider value={itemsContext}>
            {props.children}
        </ItemsContext.Provider>
    )
}

export default ItemsProvider
