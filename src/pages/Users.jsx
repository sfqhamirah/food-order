import { useState } from "react";
import Appbar from "../component/user/Appbar";
import Cart from "../component/user/Cart";
import Meals from "../component/Meals";
import Banner from "../component/user/Banner";
import AboutUs from "../component/user/AboutUs";
import CartProvider from "../component/store/CartProvider";

function Users() {
    const [isValid, setIsValid] = useState(false);

    function showModalHandler() {
        setIsValid(true);
    }

    function hideModealHandler() {
        setIsValid(false);
    }

    return (
        <CartProvider>
            <Appbar modelHandler={showModalHandler} />
            {isValid && <Cart onHide={hideModealHandler} />}
            <Banner />
            <AboutUs />
            <div id="meals-section">
                <Meals />
            </div>
        </CartProvider>
    );
}

export default Users;