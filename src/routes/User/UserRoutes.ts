import { Router } from "express";
const userRouter = Router();

import {
  registerAccount,
  getUser,
  getUserListings,
  updateUserInfo,
  disableAccount,
} from "../../controllers/user/UserController";

userRouter
  .get("/:id", getUser)
  .get("/:id/listings", getUserListings)
  .put("/:id", updateUserInfo)
  .post("/", registerAccount)
  .put("/:id/disable", disableAccount);

export default userRouter;
