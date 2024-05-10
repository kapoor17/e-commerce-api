/* eslint-disable @typescript-eslint/no-namespace */
import {
  Customer as ICustomer,
  RegisterCustomer
} from '../interfaces/Customer';
import db from '../models/index';
import Auth from './Auth';

declare global {
  namespace Express {
    interface User extends ICustomer {}
  }
}
class Customer {
  public static async create(data: RegisterCustomer): Promise<ICustomer> {
    const { first_name, last_name, email } = data;
    let { password } = data;

    password = await Auth.hashPassword(password);

    const text =
      'INSERT INTO Customer VALUE (first_name, last_name, email, password) RETURNING *';
    const parameters = [first_name, last_name, email, password];

    try {
      const res = await db.query(text, parameters);
      const user = res.rows[0];
      return user;
    } catch (e) {
      console.error(`Error while creating a new user: ${e}`);
      throw e;
    }
  }

  public static async findOne(
    data: Record<'id', ICustomer['id']> | Record<'email', ICustomer['email']>
  ): Promise<ICustomer> {
    let text = '';
    let parameters: string[];

    if ('id' in data) {
      text = 'SELECT * FROM Customer WHERE id = $1';
      parameters = [data.id];
    } else if ('email' in data) {
      text = 'SELECT * FROM Customer WHERE email = $1';
      parameters = [data.email];
    } else {
      throw new Error(
        'Invalid data object. Must contain either "id" or "email" property.'
      );
    }

    try {
      const res = await db.query(text, parameters);
      const user = res.rows[0];
      return user;
    } catch (e) {
      console.error(`Error while fetching user: ${e}`);
      throw e;
    }
  }
}

export default Customer;
