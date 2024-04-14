import { Customer as ICustomer } from "@e-commerce-app/shared/interfaces/Customer"
import db from "../db/index.js";

type CustomerData = Pick<ICustomer, "first_name" | "last_name" | "email" | "password">
export class Customer{

    async create(data: CustomerData){
        const {first_name, last_name, email, password} = data;

        const text = `INSERT INTO Customer VALUE (first_name, last_name, email, password) RETURNING *`;
        const parameters = [first_name, last_name, email, password];

        try{
            const res = await db.query(text, parameters);
            const user = res.rows[0];
            return user;
        }
        catch(e){
            console.error(`Error while creating a new user: ${e}`)
        }
    }

    async findOneById(id: ICustomer['id']){
        const text = `SELECT * FROM Customer WHERE id = $1`;
        const parameters = [id];

        try{
            const res = await db.query(text, parameters);
            const user = res.rows[0];
            return user
        }catch(e){
            console.error(`Error while fetching user by id: ${e}`)
        }
    }

    async findOneByEmail(email: ICustomer['email']){
        const text = `SELECT * FROM Customer WHERE email = $1`;
        const parameters = [email];

        try{
            const res = await db.query(text, parameters);
            const user = res.rows[0];
            return user;
        }catch(e){
            console.error(`Error while fetching user by email: ${e}`)
        }
    }
}