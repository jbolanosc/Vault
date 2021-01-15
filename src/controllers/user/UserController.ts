import {
  duplicateEmail,
  createSuccess,
  updateSuccess,
  disableSuccess,
  inputError,
} from "./errors/UserErrors";
import { User } from "../../entity/User";
import { createConfirmEmailLink } from "./createConfirmLink";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../util/formatResponse";
import { sendEmail } from "../../util/sendEmail";
import _ from "underscore";

export async function getUser(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const user = await User.findOne({ where: { id } });

      if (!_.isEmpty(user))
        return res.json(successResponse("User found", user)).status(200);

      return res.json(errorResponse("No user found")).status(400);
    }
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
}

export async function getUserListings(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const user = User.findOne({ where: { id }, select: ["warehouses"] });

      if (!_.isEmpty(user))
        return res.json(successResponse("user found", user)).status(200);

      return res.json(errorResponse("No user found")).status(400);
    }
    return res.json(errorResponse("User not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
}

export async function updateUserInfo(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const body = req.body;

      if (!req.body) return res.json(errorResponse(inputError)).status(400);

      const user = User.findOne({ where: { id }, select: ["warehouses"] });

      if (!_.isEmpty(user)) {
        await User.update(id, body);
        return res.json(successResponse(updateSuccess, ""));
      }

      return res.json(errorResponse("No user found")).status(400);
    }
    return res.json(errorResponse("User not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
}

export async function disableAccount(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const user = User.findOne({ where: { id }, select: ["warehouses"] });

      if (!_.isEmpty(user)) {
        await User.update(id, { confirmed: false });
        return res.json(successResponse(disableSuccess, ""));
      }

      return res.json(errorResponse("No user found")).status(400);
    }
    return res.json(errorResponse("User not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
}

export async function registerAccount(req: Request, res: Response) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      cellphone,
      company,
    } = req.body;

    const userAlreadyExists = await User.findOne({
      where: { email },
      select: ["id"],
    });

    if (userAlreadyExists) {
      return res.json(errorResponse(duplicateEmail)).status(400);
    }

    const newUser = User.create({
      company,
      firstName,
      lastName,
      email,
      cellphone,
      password,
    });

    await newUser.save();

    /*     if (process.env.NODE_ENV !== "test") {
        await sendEmail(
          email,
          await createConfirmEmailLink(url, newUser.id, redis),
          "confirm email"
        );
      } */

    return res.json(successResponse(createSuccess, newUser)).status(200);
  } catch (err) {
    return res.json(errorResponse(err.toString())).status(500);
  }
}
