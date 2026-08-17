import { useContext, useState } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import ItemsContext from "../store/items-context";
import "./AdminForm.css";

const MAX_IMAGE_SIZE_MB = 10; //Max upload size allowed for a food item image

function AdminForm(props) {
    const itemsCtx = useContext(ItemsContext);

    //form field values
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);

    //ui feedback state
    const [error, setError] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    //runs whenever the user picks a file in the image output
    function imageChangeHandler(event) {
        const file = event.target.files[0];
        setError("");

        //if user cancelled file picker, nothing selected
        if (!file) {
            setImageFile(null);
            return;
        }

        //reject non-image files early instead of letting the upload fail later with a confusing server error
        if (!file.type.startsWith("image/")) {
            setError("Please choose an image file (jpg, png, etc).");
            event.target.value = "";
            setImageFile(null);
            return;
        }

        //reject oversized files before wasting an upload attempt
        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
            setError(`Image must be smaller than ${MAX_IMAGE_SIZE_MB}MB.`);
            event.target.value = "";
            setImageFile(null);
            return;
        }

        setImageFile(file);
    }

    //Upload the choosen file to Cloudinary and return the hosted image URL
    async function uploadImage(file) {
        const formData = new FormData(); //send file through HTTP request
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        let response;
        try {
            //send POST request to cloudinary
            response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
        } catch (networkErr) {
            // e.g. user is offline, DNS failure, CORS block
            throw new Error("Network error while uploading image. Check your connection.");
        }

        if (!response.ok) {
            // e.g. wrong preset name, wrong cloud name, quota exceeded
            throw new Error("Image upload failed (server rejected the file).");
        }

        const data = await response.json();

        if (!data.secure_url) {
            throw new Error("Image upload succeeded but no URL was returned.");
        }

        return data.secure_url;
    }

    //Validate every input before submit
    function validateFields() {
        const trimmedName = name.trim();
        const trimmedDescription = description.trim();

        if (!trimmedName || !trimmedDescription || !price) {
            return "Please fill in all fields.";
        }
        if (trimmedName.length < 2) {
            return "Name must be at least 2 characters.";
        }
        if (trimmedDescription.length < 5) {
            return "Description must be at least 5 characters.";
        }
        if (isNaN(price)) {
            return "Price must be a number.";
        }
        if (+price <= 0) {
            return "Price must be greater than 0.";
        }
        if (+price > 10000) {
            return "Price seems too high — please double-check.";
        }
        return "";
    }

    //runs when the form is submitted
    async function submitHandler(event) {
        event.preventDefault(); //prevent browser reload page

        //If error, stop
        const validationError = validateFields();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");
        setIsUploading(true);

        //upload the image first (if one was choosen) before saving the item
        let imageUrl = "";
        try {
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }
        } catch (err) {
            setError(err.message || "Image upload failed. Try again.");
            setIsUploading(false);
            return;
        }


        //save the new item into shared state via context
        try {
            itemsCtx.addNewItem({
                id: "i" + Date.now() + Math.random().toString(36).slice(2),
                name: name.trim(),
                description: description.trim(),
                price: +price,
                image: imageUrl,
            });
        } catch (err) {
            // guard against context/reducer throwing unexpectedly
            setError("Could not save the item. Please try again.");
            setIsUploading(false);
            return;
        }

        setIsUploading(false);
        props.hideAddItemForm(); //tell the parent to close/return from this form
    }

    return (
        <Box component="form" onSubmit={submitHandler} className="admin-form">
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
            />
            <div style={{ margin: "1rem 0" }}>
                <input type="file" accept="image/*" onChange={imageChangeHandler} />
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Button
                type="submit"
                variant="contained"
                disabled={isUploading}
                style={{ marginRight: "0.5rem" }}
            >
                {isUploading ? "Adding..." : "Add"}
            </Button>
            <Button onClick={props.hideAddItemForm} disabled={isUploading}>
                Cancel
            </Button>
        </Box>
    );
}

export default AdminForm;