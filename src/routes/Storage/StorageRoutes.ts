import { Router } from "express";
const storageRouter = Router();

import {
  getStorages,
  getWarehouseStorages,
  createStorage,
  updateStorage,
  deleteStorage,
} from "../../controllers/storage/storageController";

storageRouter
  .get("/:id/storages", getStorages)
  .post("", createStorage)
  .put("/:id", updateStorage)
  .delete("/:id", deleteStorage)
  .get("/warehouse/:id", getWarehouseStorages);

export default storageRouter;
