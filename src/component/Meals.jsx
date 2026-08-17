import { useContext } from "react";
import { Grid } from "@material-ui/core";
import ItemsContext from "./store/items-context";
import MealsItem from "./MealsItem";

//Display food items from ItemsContext
function Meals(props) {
  const itemsCtx = useContext(ItemsContext);

  return (
    <Grid container spacing={4} style={{ padding: "2rem 3rem" }}>
      {itemsCtx.itemsData.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item.id}>
          <MealsItem
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
            isAdmin={props.isAdmin}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Meals;