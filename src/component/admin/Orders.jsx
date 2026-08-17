import { useState, useEffect } from "react";
import "./Orders.css";

function Orders() {
    
    const [orders, setOrders] = useState([]); // orders = list of past orders to display
    const [loadError, setLoadError] = useState(""); // loadError = error message if reading from localStorage fails

    // runs once when this page first loads, to pull saved orders
    // out of localStorage (empty array [] means "run once, not on every render")
    useEffect(() => {
        try {
            // localStorage only stores text, so we saved orders as a JSON string.
            // getItem() returns that string (or null if nothing is saved yet)
            const raw = localStorage.getItem("orders");

            // convert the string back into a real array, or default to empty
            const savedOrders = raw ? JSON.parse(raw) : [];

            // guard: make sure what we loaded is actually an array
            // (protects against corrupted or unexpected data in storage)
            if (!Array.isArray(savedOrders)) {
                throw new Error("Corrupted orders data");
            }

            setOrders(savedOrders);
        } catch (err) {
            // JSON.parse can throw if the saved text isn't valid JSON
            setLoadError("Could not load past orders.");
            setOrders([]);
        }
    }, []);

    // if loading failed, show the error and stop here
    if (loadError) {
        return (
            <div className="admin-content">
                <p style={{ color: "red" }}>{loadError}</p>
            </div>
        );
    }

    // if there are no orders yet, show a simple message instead of an empty page
    if (orders.length === 0) {
        return (
            <div className="admin-content">
                <p>No orders yet.</p>
            </div>
        );
    }

    // main view: loop through every saved order and display it as a card
    return (
        <div className="admin-content">
            <h2 style={{ padding: "0 2rem" }}>Orders</h2>
            <div className="orders-grid">
                {orders.map((order) => (
                    <div key={order.id} className="order-card">
                        {/* format the ISO date string into a readable date/time */}
                        <p className="order-date">
                            {new Date(order.date).toLocaleString()}
                        </p>

                        {/* list every item in this order with quantity and subtotal */}
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.id}>
                                    {item.name} x {item.amount} — RM
                                    {(item.price * item.amount).toFixed(2)}
                                </li>
                            ))}
                        </ul>

                        {/* only show remarks if the customer actually left one */}
                        {order.remarks && (
                            <p className="order-remarks">
                                <strong>Remarks:</strong> {order.remarks}
                            </p>
                        )}

                        <p className="order-total">
                            Total: RM{order.totalAmount.toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;