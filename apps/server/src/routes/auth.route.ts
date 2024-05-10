import express from 'express';
import { handleRegister } from '../controller/auth.controller';

const authRouter = express.Router();

authRouter.post('/register', handleRegister);

export default authRouter;
