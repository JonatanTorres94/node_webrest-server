import { Request, Response } from "express"
import { prisma } from "../../data/sqlserver"
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from "../../domain";


export class TodosController {

    //*DI
    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll()
        return res.json(todos)
    }

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id; // aqui el + sirve para transformar el id de string a number
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })
        try {
            const todo = await this.todoRepository.findById(id)
            res.json(todo)

        } catch (error) {
            if (error instanceof Error && error.message.startsWith("TODO with id")) {
                return res.status(404).json({ error: error.message });
            }
            res.status(500).json({ error: "Internal Server Error" });
        }

    }

    public createTodo = async (req: Request, res: Response) => {

        try {
            const [error, createTodoDto] = CreateTodoDto.create(req.body)
            if (error) return res.status(400).json({ error })


            const todo = await this.todoRepository.create(createTodoDto!)

            return res.status(201).json(todo);

        } catch (error) {
            console.error('Error creating todo:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public updateTodo = async (req: Request, res: Response) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id })

        if (error) return res.status(400).json({ error })

        try {
            const todo = await this.todoRepository.updateById(updateTodoDto!)

            res.json(todo);
        } catch (error) {
            if (error) { // Assuming Prisma error code for "not found"
                return res.status(404).json({ error: `TODO with id ${id} not found` });
            }
            console.error('Error updating todo:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }


    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        try {

            const deletedTodo = await this.todoRepository.deleteById(id)
            res.json(deletedTodo)
            
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }
}