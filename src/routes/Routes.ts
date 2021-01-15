import { Request, Response } from "express";
import userRouter from "./User/UserRoutes";
import storageRouter from "./Storage/StorageRoutes";
import clientRouter from "./Client/ClientRoutes";
import warehouseRouter from "./warehouse/WarehouseRoutes";

class Routes {
  constructor() {}

  public routes(app): void {
    app.route("/").get((request: Request, response: Response) => {
      response.status(200).send({
        message: "GET request successfully.",
      });
    });
    app.use("/user", userRouter);
    app.use("/storage", storageRouter);
    app.use("/client", clientRouter);
    app.use("/warehouse", warehouseRouter);
  }
}

export { Routes };
