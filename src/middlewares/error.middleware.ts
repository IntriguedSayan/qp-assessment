import { Request, Response, NextFunction } from "express"
import logger from "../utils/logger"

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    logger.error(err.message+"-------"+err.stack);
    res.status(500).json({error:err.message});
}