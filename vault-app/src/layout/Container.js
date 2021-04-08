import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import WarehouseForm from "../pages/Warehouse/WarehouseForm";

const Container = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/warehouses" component={WarehouseForm} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Container;
