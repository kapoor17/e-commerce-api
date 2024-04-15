import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from "../errors";

interface CustomJwtPayload extends JwtPayload {
    userId: string,
    userName: string
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.isAuthenticated && req.session.userId){
        //check the userId in the DB and attach more information if needed to the session object.
        //if not present then throw new error
        next();
    }else{
        throw new UnauthenticatedError('Request not authorized');
    }
}

export default authenticate