import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Storage } from "../../entity/Storage";
import { successResponse, errorResponse } from "../../util/formatResponse";
import { inputError, successUpdate } from "./errors/storageErrors";
import _ from "underscore";

export const createStorage = async (req: Request, res: Response) => {
  try {
    const { name, space, description, location, warehouse } = req.body;

    const newStorage = Storage.create({
      name,
      space,
      description,
      location,
      warehouse,
    });

    await newStorage.save();

    return res.json(successResponse("Storage saved.", newStorage));
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const getStorages = async (req: Request, res: Response) => {
  try {
    const storages = await getRepository(Storage).find();
    if (!_.isEmpty(storages)) {
      return res.json(successResponse("", storages)).status(200);
    }
    return res.json(errorResponse("Storage not found"));
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const getWarehouseStorages = async (req: Request, res: Response) => {
  try {
    const { warehouseId } = req.body;
    const storages = await getRepository(Storage).findOne({
      where: { warehouse: warehouseId },
    });

    if (!_.isEmpty(storages))
      return res.json(errorResponse("No storage found")).status(400);

    res.json(successResponse("Storage Found", storages)).status(200);
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const updateStorage = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const body = req.body;

      if (!req.body) return res.json(errorResponse(inputError)).status(400);

      const storage = Storage.findOne({ where: { id }, select: ["id"] });

      if (!_.isEmpty(storage)) {
        await Storage.update(id, body);
        return res.json(successResponse(successUpdate, ""));
      }

      return res.json(errorResponse("No storage found")).status(400);
    }
    return res.json(errorResponse("Storage not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
};

export const deleteStorage = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const id = req.params.id;

      if (!req.body) return res.json(errorResponse(inputError)).status(400);

      const storage = Storage.findOne({ where: { id }, select: ["id"] });

      if (!_.isEmpty(storage)) {
        await Storage.delete(id);
        return res.json(successResponse(successUpdate, ""));
      }

      return res.json(errorResponse("No storage found")).status(400);
    }
    return res.json(errorResponse("Storage not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
};
