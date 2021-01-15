import { Router } from "express";
const clientRouter = Router();

import {
  registerAccount,
  updateClientInfo,
  getClient,
  getClientWarehouses,
  disableAccount,
} from "../../controllers/client/clientController";

clientRouter
  .get("/:id", getClient)
  .get("/:id/warehouses", getClientWarehouses)
  .post("", registerAccount)
  .put("/:id", updateClientInfo)
  .put("/:id/disable", disableAccount);

export default clientRouter;
