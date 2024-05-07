import { RegisterCustomer } from '@e-commerce-app/shared/interfaces/Customer/customer.interface';
import { Request, Response } from 'express';

export const handleRegister = (
  req: Request<object, object, RegisterCustomer>,
  res: Response
) => {
  console.log(req.body);
  res.send();
};
