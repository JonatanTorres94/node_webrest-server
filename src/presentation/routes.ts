import { Router } from "express";
import { TodoRoutes } from "./todos/routes";
import { NumberRouters } from "./numbers/routes";
import { Authroutes } from "./auth/routes";


export class AppRoutes {

    static get routes(): Router{
        
        const router = Router()

        router.use('/api/todos', TodoRoutes.routes)

        router.use('/api/numbers', NumberRouters.routes)

        router.use('/api/auth', Authroutes.routes)


        return router;
    }

}