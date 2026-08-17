import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import CartContext from "../store/cart-context";
import "./Cart.css";

//Sub component for row in cart
function CartItem(props) {
    return (
        <li>
            <div>
                <h2>{props.name}</h2>
                <div>
                    RM{props.price.toFixed(2)} x {props.amount}
                </div>
            </div>
            <div>
                <button onClick={props.onRemove}>-</button>
                <button onClick={props.onAdd}>+</button>
            </div>
        </li>
    );
}

function Cart(props) {
    const cartCtx = useContext(CartContext); //take data from cart context
    const [orderPlaced, setOrderPlaced] = useState(false); //track if order is send
    const [orderError, setOrderError] = useState(""); //error message if has problem
    const [remarks, setRemarks] = useState("");

    const totalAmount = `RM${cartCtx.totalAmount.toFixed(2)}`; //formating total amount
    const hasItems = cartCtx.items.length > 0; //check if cart has item or not

    function cartItemRemoveHandler(id) {
        cartCtx.removeItem(id);
    }

    function cartItemAddHandler(item) {
        cartCtx.addItem({ ...item, amount: 1 });
    }

    function orderHandler() {
        if (!hasItems) {
            setOrderError("Your cart is empty.");
            return;
        }

        //Create new object, copy all items to cart
        const newOrder = {
            id: "order" + Date.now(),
            items: cartCtx.items,
            totalAmount: cartCtx.totalAmount,
            date: new Date().toISOString(),
            remarks: remarks.trim(),
        };

        try {
            const raw = localStorage.getItem("orders"); //take order from local storage
            let existingOrders = [];

            if (raw) {
                try {
                    existingOrders = JSON.parse(raw);
                    if (!Array.isArray(existingOrders)) {
                        existingOrders = []; //convert to array from JSON
                    }
                } catch (parseErr) {
                    existingOrders = []; //corrupted array, reset to null array
                }
            }

            existingOrders.push(newOrder);
            localStorage.setItem("orders", JSON.stringify(existingOrders)); //push to local storage

            cartCtx.clearCart();
            setOrderError("");
            setOrderPlaced(true);
        } catch (err) {
            setOrderError("Could not save your order. Please try again.");
        }
    }

    //If order placed, display message
    //If order not placed, display full cart view
    const cartContent = orderPlaced ? (
        <div className="cart">
            <div>
                <p>Thank you! Your order has been placed.</p>
                <div className="cart-actions">
                    <button onClick={props.onHide}>Close</button>
                </div>
            </div>
        </div>
    ) : (
        <div className="cart">
            <div>
                {hasItems ? (
                    <ul>
                        {cartCtx.items.map((item) => (
                            <CartItem
                                key={item.id}
                                name={item.name}
                                price={item.price}
                                amount={item.amount}
                                onRemove={() => cartItemRemoveHandler(item.id)}
                                onAdd={() => cartItemAddHandler(item)}
                            />
                        ))}
                    </ul>
                ) : (
                    <p>Your cart is empty.</p>
                )}

                {hasItems && (
                    <div className="cart-remarks">
                        <label htmlFor="remarks">Remarks (optional)</label>
                        <textarea
                            id="remarks"
                            placeholder="e.g. no onions, extra spicy..."
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            maxLength={200}
                        />
                    </div>
                )}

                <div className="cart-total">
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                {orderError && <p style={{ color: "red" }}>{orderError}</p>}
                <div className="cart-actions">
                    <button onClick={props.onHide}>Close</button>
                    {hasItems && <button onClick={orderHandler}>Order</button>}
                </div>
            </div>
        </div>
    );

    const overlayTarget = document.getElementById("overlays"); //find from index.html

    if (!overlayTarget) {
        console.error('Missing <div id="overlays"> in index.html');
        return null;
    }

    return ReactDOM.createPortal(cartContent, overlayTarget); //render cartContent into overlays
}

export default Cart;