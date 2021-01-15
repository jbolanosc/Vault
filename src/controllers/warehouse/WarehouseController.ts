import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Warehouse } from "../../entity/Warehouse";
import { User } from "../../entity/User";
import { successResponse, errorResponse } from "../../util/formatResponse";
import { inputError, successUpdate } from "./errors/warehouseErrors";
import _ from "underscore";

export const createWarehouse = async (req: Request, res: Response) => {
  try {
    const {
      name,
      space,
      bathrooms,
      floor,
      description,
      amenities,
      priceMonth,
      priceDay,
      userId,
    } = req.body;

    let { latitude, longitude } = req.body;

    const pictureUrl = "";

    latitude = parseFloat(latitude);
    longitude = parseFloat(longitude);

    const user = await User.findOne({ where: { id: userId } });

    const newWarehouse = Warehouse.create({
      name,
      space,
      bathrooms,
      floor,
      description,
      amenities,
      pictureUrl,
      priceMonth,
      priceDay,
      latitude,
      longitude,
      user,
    });

    await newWarehouse.save();

    return res.json(successResponse("Warehouse saved.", newWarehouse));
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const getWarehouses = async (req: Request, res: Response) => {
  try {
    const warehouses = await getRepository(Warehouse).find();
    if (!_.isEmpty(warehouses)) {
      return res.json(successResponse("", warehouses)).status(200);
    }
    return res.json(errorResponse("Warehouses not found"));
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const getUserWarehouses = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (userId) {
      const user = await User.findOne({ where: { id: userId } });

      const warehouses = await getRepository(Warehouse).find({
        where: { user: user },
      });
      if (_.isEmpty(warehouses))
        return res.json(errorResponse("No warehouses found")).status(400);

      res.json(successResponse("Warehouse Found", warehouses)).status(200);
    }
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const getClientWarehouses = async (req: Request, res: Response) => {
  try {
    const client = req.body;
    if (client) {
      const warehouses = await getRepository(Warehouse).find({
        where: { client: client },
      });
      if (!_.isEmpty(warehouses))
        return res.json(errorResponse("No warehouses found")).status(400);

      res.json(successResponse("Warehouse Found", warehouses)).status(200);
    }
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const getWarehouseStorages = async (req: Request, res: Response) => {
  try {
    const { warehouseId } = req.body;
    const warehouses = await getRepository(Warehouse).findOne({
      where: { id: warehouseId },
      select: ["storages"],
    });

    if (_.isEmpty(warehouses))
      return res.json(errorResponse("No warehouses found")).status(400);

    res.json(successResponse("Warehouse Found", warehouses)).status(200);
  } catch (error) {
    res.json(errorResponse(error)).status(500);
  }
};

export const updateWarehouse = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const id = req.params.id;
      const body = req.body;

      if (!req.body) return res.json(errorResponse(inputError)).status(400);

      const warehouse = Warehouse.findOne({ where: { id }, select: ["id"] });

      if (!_.isEmpty(warehouse)) {
        await Warehouse.update(id, body);
        return res.json(successResponse(successUpdate, ""));
      }

      return res.json(errorResponse("No user found")).status(400);
    }
    return res.json(errorResponse("User not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
};

export const deleteWarehouse = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const id = req.params.id;

      if (!req.body) return res.json(errorResponse(inputError)).status(400);

      const warehouse = Warehouse.findOne({ where: { id }, select: ["id"] });

      if (!_.isEmpty(warehouse)) {
        await Warehouse.delete(id);
        return res.json(successResponse(successUpdate, ""));
      }

      return res.json(errorResponse("No user found")).status(400);
    }
    return res.json(errorResponse("User not found")).status(400);
  } catch (err) {
    return res.json(errorResponse(err.toString()));
  }
};
