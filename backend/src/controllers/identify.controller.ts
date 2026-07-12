import { Request, Response } from "express";
import { IdentifyService } from "../services/identify.service";

const service = new IdentifyService();

export const identify = async (
  req: Request,
  res: Response
) => {

  const result = await service.identify(req.body);

  res.status(200).json(result);

};