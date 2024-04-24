import { RegisterCustomer, Customer as ICustomer } from "@e-commerce-app/shared/interfaces/Customer"
import bcrypt from 'bcrypt'
import Customer from "../models/Customer.js";
import { BadRequestError, CustomError, NotFoundError } from "../errors/index.js";

class AuthService {
    public static async login(email: string, password: string): Promise<ICustomer>{
        try{
            const customer = await Customer.findOneByEmail(email);
            if(!customer){
                throw new NotFoundError('User does not exists');
            }
            if(await this.comparePassword(customer.password, password)){
                throw new BadRequestError('Wrong password');
            }
            return customer;
        }catch(e){
            console.error(`Error while logging in a customer: ${e}`);
            throw e;
        }
    }

    public static async register(customerData: RegisterCustomer){
        try{
            if(!!(await Customer.findOneByEmail(customerData.email))){
                throw new CustomError('User already exists', 409)
            }
            const customer = await Customer.create(customerData);
            return customer;
        }catch(e){
            console.error(`Error while registering new customer: ${e}`)
            throw e;
        }
    }

    public static async hashPassword(password: RegisterCustomer['password']): Promise<String>{
        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        }catch(e){
            console.error(`Error while generating password hash: ${e}`);
            throw e;
        }
    }

    public static async comparePassword(hash: RegisterCustomer['password'], password: string): Promise<boolean>{
        try{
            return await bcrypt.compare(password, hash);
        }catch(e){
            console.error(`Error while comparing password hash: ${e}`);
            throw e;
        }
    }
}

export default AuthService