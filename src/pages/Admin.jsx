import { useState } from "react";
import MainAdmin from "../component/admin/MainAdmin";
import AdminForm from "../component/admin/AdminForm";
import Orders from "../component/admin/Orders";
import "./Admin.css";

function Admin() {
    // tracks which admin view is currently shown: "items", "add", or "orders"
    const [activeView, setActiveView] = useState("items");

    // used by AdminForm to jump back to the items list after
    // submitting or cancelling the add-item form
    function backToItemsHandler() {
        setActiveView("items");
    }

    return (
        <div className="admin-page">
            <div className="admin-tabs">
                {/* "active" class highlights whichever tab matches activeView */}
                <button
                    className={activeView === "items" ? "active" : ""}
                    onClick={() => setActiveView("items")}
                >
                    Food Items
                </button>
                <button
                    className={activeView === "add" ? "active" : ""}
                    onClick={() => setActiveView("add")}
                >
                    Add Food Items
                </button>
                <button
                    className={activeView === "orders" ? "active" : ""}
                    onClick={() => setActiveView("orders")}
                >
                    Orders
                </button>
            </div>

            {/* only one of these renders at a time, based on activeView */}
            {activeView === "items" && <MainAdmin />}
            {activeView === "add" && <AdminForm hideAddItemForm={backToItemsHandler} />}
            {activeView === "orders" && <Orders />}
        </div>
    );
}

export default Admin;