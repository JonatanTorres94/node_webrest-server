import { Request, Response } from "express"
import { prisma } from "../../data/sqlserver"
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, DeleteTodo, GetTodoUseCase, GetTodosUseCase, TodoRepository, UpdateTodoUseCase } from "../../domain";


export class TodosController {

    //*DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = (req: Request, res: Response) => {

        new GetTodosUseCase(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }))

    }

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id; // aqui el + sirve para transformar el id de string a number
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

        new GetTodoUseCase(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))
    }

    public createTodo = (req: Request, res: Response) => {


        const [error, createTodoDto] = CreateTodoDto.create(req.body)
        if (error) return res.status(400).json({ error })


        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))

    }

    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

        if (error) return res.status(400).json({ error })

        new UpdateTodoUseCase(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))


    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({error}))

    }
}