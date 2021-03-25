import { Router, Request } from "express";
const userRouter = Router();
let req: Request;

import {
  registerAccount,
  getUser,
  getUserListings,
  updateUserInfo,
  disableAccount,
  pagination,
} from "../../controllers/user/UserController";
import { paginate } from "../../util/pagination";

userRouter
  .get("/:id", getUser)
  .get("/:id/listings", getUserListings)
  .put("/:id", updateUserInfo)
  .post("/", registerAccount)
  .put("/:id/disable", disableAccount)
  .post("/pagination", paginate(), pagination);

export default userRouter;
