import { useContext } from "react";
import ItemsContext from "./store/items-context";
import "./Footer.css";

function Footer() {
    const itemsCtx = useContext(ItemsContext);

    return (
        <footer>
            <p>SWITCH VIEW</p>
            <button onClick={itemsCtx.togglePage}>
                {itemsCtx.switchPage ? "ADMIN" : "USER"}
            </button>
        </footer>
    );
}

export default Footer;