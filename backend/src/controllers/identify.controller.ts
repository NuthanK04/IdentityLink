import { Request, Response } from "express";
import { IdentifyService } from "../services/identify.service";

const service = new IdentifyService();

export const identify = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, phoneNumber } = req.body;

    // Basic validation
    if (!email && !phoneNumber) {
      res.status(400).json({
        message: "Either email or phoneNumber is required.",
      });
      return;
    }

    const result = await service.identify({
      email,
      phoneNumber,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Identify API Error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};