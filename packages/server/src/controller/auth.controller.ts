import { Request, Response } from 'express';
import { RegisterCustomer } from '../interfaces/Customer/customer.interface';

export const handleRegister = (
  req: Request<object, object, RegisterCustomer>,
  res: Response
) => {
  console.log(req.body);
  res.send();
};
