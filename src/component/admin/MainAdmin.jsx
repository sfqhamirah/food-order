import { Box } from "@material-ui/core";
import Meals from "../Meals";

function MainAdmin() {
    return (
        <Box className="admin-content" style={{ flex: 4 }}>
            <Meals isAdmin />
        </Box>
    );
}

export default MainAdmin;