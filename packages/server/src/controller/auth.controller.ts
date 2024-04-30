import { RegisterCustomer } from '@e-commerce-app/shared/interfaces/Customer/customer.interface';
import { NextFunction, Request, Response } from 'express';

export const handleRegister = (
  req: Request<{}, {}, RegisterCustomer>,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  res.send();
};
