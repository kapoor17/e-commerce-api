import { Customer as ICustomer } from "@e-commerce-app/shared/interfaces/Customer"
import bcrypt from 'bcrypt';

class Auth {
    static async hashPassword(password: ICustomer['password']){
        try{
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        }catch(e){
            console.error(`Error while generating password hash: ${e}`);
            throw e;
        }
    }

    static async comparePassword(password: ICustomer['password'], hash: string){
        try{
            return await bcrypt.compare(password, hash);
        }catch(e){
            console.error(`Error while comparing password hash: ${e}`);
            throw e;
        }
    }
}

export default Auth;