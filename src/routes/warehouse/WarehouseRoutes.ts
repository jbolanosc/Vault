import { Router } from "express";
const warehouseRouter = Router();

import {
  getClientWarehouses,
  getWarehouses,
  getUserWarehouses,
  deleteWarehouse,
  updateWarehouse,
  getWarehouseStorages,
  createWarehouse,
} from "../../controllers/warehouse/WarehouseController";

warehouseRouter
  .get("/client/:id", getClientWarehouses)
  .get("/", getWarehouses)
  .get("/user/:id", getUserWarehouses)
  .get("/:id/storage", getWarehouseStorages)
  .put("/:id", updateWarehouse)
  .delete("/:id", deleteWarehouse)
  .post("/", createWarehouse);

export default warehouseRouter;
