import { StatusCodes } from "http-status-codes";
import { CustomError } from "./custom-error.js";

export class BadRequestError extends CustomError {
    constructor(errorMessage: string){
        super(errorMessage, StatusCodes.BAD_REQUEST);
    }
};