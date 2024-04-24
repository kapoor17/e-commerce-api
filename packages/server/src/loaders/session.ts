import { Express } from "express";
import session, { SessionOptions } from "express-session";
import MongoStore from 'connect-mongo';

const sessionLoader = (app: Express) => {
    let sessionStore;
    try{
        sessionStore = MongoStore.create({
            mongoUrl: process.env.MONGO_URI
        })
    }catch(e){
        console.error(`Error while connecting to Session server: ${e}`)
    }

    const sessionObject: SessionOptions = {
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            maxAge: 60000*60*24,
        }
    }

    if(app.get('env') === 'production' && sessionObject.cookie){
        app.set('trust proxy', 1)
        sessionObject.cookie.secure = true
        sessionObject.cookie.httpOnly = true
    }
    
    app.use(session(sessionObject));
}

export default sessionLoader;