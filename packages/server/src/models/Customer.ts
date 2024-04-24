import { Customer as ICustomer, RegisterCustomer } from "@e-commerce-app/shared/interfaces/Customer"
import db from "../db/index.js";
declare global {
    namespace Express {
      interface User extends ICustomer {}
    }
}
class Customer{

    public static async create(data: RegisterCustomer): Promise<ICustomer>{
        const {first_name, last_name, email, password} = data;

        const text = `INSERT INTO Customer VALUE (first_name, last_name, email, password) RETURNING *`;
        const parameters = [first_name, last_name, email, password];

        try{
            const res = await db.query(text, parameters);
            const user = res.rows[0];
            return user;
        }
        catch(e){
            console.error(`Error while creating a new user: ${e}`);
            throw e;
        }
    }

    public static async findOneById(id: ICustomer['id']): Promise<ICustomer>{
        const text = `SELECT * FROM Customer WHERE id = $1`;
        const parameters = [id];

        try{
            const res = await db.query(text, parameters);
            const user = res.rows[0];
            return user
        }catch(e){
            console.error(`Error while fetching user by id: ${e}`)
            throw e;
        }
    }

    public static async findOneByEmail(email: ICustomer['email']): Promise<ICustomer>{
        const text = `SELECT * FROM Customer WHERE email = $1`;
        const parameters = [email];

        try{
            const res = await db.query(text, parameters);
            const user = res.rows[0];
            return user;
        }catch(e){
            console.error(`Error while fetching user by email: ${e}`)
            throw e
        }
    }
}

export default Customer