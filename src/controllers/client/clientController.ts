import {
  duplicateEmail,
  createSuccess,
  updateSuccess,
  disableSuccess,
  inputError,
} from "./errors/ClientErrors";
import { Client } from "../../entity/Client";
import { createConfirmEmailLink } from "./createConfirmLink";
import { Request, Response } from "express";
import { errorResponse, successResponse } from "../../util/formatResponse";
import { sendEmail } from "../../util/sendEmail";
import _ from "underscore";

export async function getClient(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const client = Client.findOne({ where: { id } });

      if (!_.isEmpty(client))
        return res.json(successResponse("User found", client)).status(200);

      return res.json(errorResponse("No user found")).status(400);
    }
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
}

export async function getClientWarehouses(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const client = Client.findOne({ where: { id }, select: ["warehouses"] });

      if (!_.isEmpty(client))
        return res.json(successResponse("user found", client)).status(200);

      return res.json(errorResponse("No user found")).status(400);
    }
    return res.json(errorResponse("User not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
}

export async function updateClientInfo(req: Request, res: Response) {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const body = req.body;

      if (!req.body) return res.json(errorResponse(inputError)).status(400);

      const client = Client.findOne({ where: { id }, select: ["warehouses"] });

      if (!_.isEmpty(client)) {
        await Client.update(id, body);
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
      const client = Client.findOne({ where: { id }, select: ["warehouses"] });

      if (!_.isEmpty(client)) {
        await Client.update(id, { confirmed: false });
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

    const userAlreadyExists = await Client.findOne({
      where: { email },
      select: ["id"],
    });

    if (!_.isEmpty(userAlreadyExists)) {
      return res.json(errorResponse(duplicateEmail)).status(400);
    }

    const newClient = Client.create({
      firstName,
      lastName,
      email,
      cellphone,
      password,
    });

    await newClient.save();

    /*     if (process.env.NODE_ENV !== "test") {
          await sendEmail(
            email,
            await createConfirmEmailLink(url, newUser.id, redis),
            "confirm email"
          );
        } */

    return res.json(successResponse(createSuccess, "")).status(200);
  } catch (err) {
    return res.json(errorResponse(err.toString())).status(500);
  }
}
