import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../domain/infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../domain/infrastructure/repositories/todo.repository.impl";


export class TodoRoutes {

    static get routes(): Router{
        
        const router = Router()

        const datasource = new TodoDatasourceImpl
        
        const todoRepository = new TodoRepositoryImpl(datasource)

        const todoController = new TodosController(todoRepository)

        router.get('/',todoController.getTodos) // aca ya se asume que parte de la base definida en las rutas principales de presentation
        
        router.get('/:id',todoController.getTodoById)
        
        router.post('/', todoController.createTodo)

        router.put('/:id', todoController.updateTodo)
        
        router.delete('/:id', todoController.deleteTodo)

        return router;
    }

}