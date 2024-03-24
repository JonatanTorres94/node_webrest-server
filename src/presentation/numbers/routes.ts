import { Router } from "express";
import { NumbersController } from "./controllerNumbers";


export class NumberRouters {

    static get routes(): Router{
        
        const router = Router()
        const numberControler = new NumbersController()

        router.get('/',numberControler.getTodos) // aca ya se asume que parte de la base definida en las rutas principales de presentation
        
        router.get('/:id',numberControler.getTodoById)
        
        router.post('/', numberControler.createTodo)

        router.put('/:id', numberControler.updateTodo)
        
        router.delete('/:id', numberControler.deleteTodo)

        return router;
    }

}