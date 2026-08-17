import {AppBar, Toolbar, Button} from "@material-ui/core"
import { useContext } from "react"
import CartContext from "../store/cart-context"

function Appbar(props) {
    const cartCtx = useContext(CartContext)

    const totalItem = cartCtx.items.reduce((sum, item) => sum + item.amount, 0);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Button color="inherit" onClick={props.modelHandler}>
                    Your Cart ({totalItem})
                </Button>
            </Toolbar>
        </AppBar>
    )
}

export default Appbar