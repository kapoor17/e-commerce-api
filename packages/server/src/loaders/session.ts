import { Express } from "express";
import session, { SessionOptions } from "express-session";

declare module "express-session" {
    interface SessionData {
        userId: string,
        isAuthenticated: boolean
    }
}

const sessionLoader = (app: Express) => {
    const sessionObject: SessionOptions = {
        secret: process.env.SESSION_SECRET || "",
        resave: false,
        saveUninitialized: false,
        store: new session.MemoryStore(),
        cookie: {
            maxAge: 60000*60*24
        }
    }

    if(app.get('env') === 'production'){
        app.set('trust proxy', 1)
        sessionObject.cookie = {
            maxAge: 6000*60*24,
            secure: true
        }
        /**
         * change the session store to a DB
         * sessionObject.cookie = { 
         *  store: 'here'
         * }
         */
    }
    
    app.use(session(sessionObject));
}

export default sessionLoader;