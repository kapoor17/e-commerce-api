import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send(err.message || "Something went wrong, try again later!");
}

export default errorHandler;