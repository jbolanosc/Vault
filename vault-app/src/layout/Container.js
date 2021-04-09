import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import WarehouseForm from "../pages/Warehouse/WarehouseForm";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const Container = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/warehouses" component={WarehouseForm} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
};

export default Container;
