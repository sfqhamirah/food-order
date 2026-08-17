import { useContext, useState } from "react";
import {Card, CardActionArea, CardMedia, CardContent, CardActions, Button, TextField} from "@material-ui/core";
import CartContext from "./store/cart-context";
import ItemsContext from "./store/items-context";

//Display one meal and handle button
function MealsItem(props) {
    const cartCtx = useContext(CartContext); //User
    const itemsCtx = useContext(ItemsContext); //Admin

    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(props.name);
    const [editDescription, setEditDescription] = useState(props.description);
    const [editPrice, setEditPrice] = useState(props.price);
    const [editError, setEditError] = useState("");

    //Add to cart
    function addToCartHandler() {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: 1,
        });
    }

    //Admin click delete
    function deleteItemHandler() {
        itemsCtx.removeItem(props.id);
    }

    function startEditHandler() {
        // reset fields to current values each time edit is opened,
        // in case a previous edit attempt was cancelled halfway
        setEditName(props.name);
        setEditDescription(props.description);
        setEditPrice(props.price);
        setEditError("");
        setIsEditing(true);
    }

    //If admin click cancel edit
    function cancelEditHandler() {
        setIsEditing(false);
        setEditError("");
    }

    function saveEditHandler() {

        //Remove space front and back
        const trimmedName = editName.trim();
        const trimmedDescription = editDescription.trim();

        //Input validation
        if (!trimmedName || !trimmedDescription || !editPrice) {
            setEditError("Please fill in all fields.");
            return;
        }
        if (isNaN(editPrice) || +editPrice <= 0) {
            setEditError("Please enter a valid price.");
            return;
        }

        //All valid then item is updated
        itemsCtx.updateItem(props.id, {
            name: trimmedName,
            description: trimmedDescription,
            price: +editPrice,
        });

        setIsEditing(false); //Exit from edit mode
        setEditError("");
    }

    if (isEditing) {
        return (
            <Card>
                <CardContent>
                    <TextField
                        label="Name"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Description"
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        label="Price"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        fullWidth
                        margin="dense"
                    />
                    {editError && <p style={{ color: "red" }}>{editError}</p>}
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={saveEditHandler}>
                        Save
                    </Button>
                    <Button size="small" onClick={cancelEditHandler}>
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        );
    }

    return (
        <Card>
            <CardActionArea>
                <CardMedia component="img" image={props.image} alt={props.name} />
                <CardContent>
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <p>RM{props.price.toFixed(2)}</p>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {props.isAdmin ? (
                    <>
                        <Button size="small" onClick={startEditHandler}>
                            Edit
                        </Button>
                        <Button size="small" color="secondary" onClick={deleteItemHandler}>
                            Delete
                        </Button>
                    </>
                ) : (
                    <Button size="small" onClick={addToCartHandler}>
                        Add to Cart
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default MealsItem;