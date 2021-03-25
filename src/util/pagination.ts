import { NextFunction, Request, Response } from "express";

export function paginate(element?: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const page: any =
      typeof req.query.page == "string" ? parseInt(req.query.page) : 1;
    const limit: any =
      typeof req.query.limit == "string" ? parseInt(req.query.limit) : 1;
    const startIndex: number = (page - 1) * limit;
    const endIndex: number = page * limit;

    let model = element ? element : req.body.elements;
    const result: any = {};

    if (endIndex < model.length) {
      result.previous = {
        page: page + 1,
        limit: limit,
      };
    }
    if (endIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result.results = model.slice(startIndex, endIndex);
    res.paginatedResult = result;
    return next();
  };
}
