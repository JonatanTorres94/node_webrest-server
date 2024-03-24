import { Request, Response } from "express"

const numbers = [
    {id: 1, numb: [1, 2, 3, 5],  createdAt: new Date()},
    {id: 2, numb: [1, 2, 3, 8],  createdAt: null},
    {id: 3, numb: [1, 2, 3, 4],  createdAt: new Date()}
]

export class NumbersController{

    //*DI
    constructor(){

    }

    public getTodos =  (req: Request, res:Response) =>{ 
        const numbersOnly = numbers.map(todo => todo.numb);
        return res.json(numbersOnly)
    }

    public getTodoById = (req: Request, res: Response) =>{
        const id = +req.params.id;
        const todo = numbers.find(todo => todo.id === id);
        
        (todo)
            ? res.json(todo)
            : res.status(404).json({error: `TODO with id ${id} not found`})
    } 

    public createTodo = (req: Request, res: Response) => {

        const {text} = req.body

        if(!text) return res.status(400).json({error: 'Text property is required'})
        const newTodo = {
            id: numbers.length + 1,
            numb: text,
            createdAt: null
        }

        numbers.push(newTodo)

        res.json(newTodo)
    }

    public updateTodo = (req: Request, res: Response) =>{

        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = numbers.find( todo => todo.id === id );
        if(!todo) return res.status(404).json({error: `TODO with id ${id} not found` });

        const {text,createdAt } = req.body;

        todo.numb = text || todo.numb
        
        res.json(todo)
    }

    public deleteTodo = ( req: Request, res: Response) => {
        const id = +req.params.id;
        const todo = numbers.find(todo => todo.id === id);

        if (!todo) return res.status(400).json({error: `Todo with id: ${id} was not found`})

        numbers.splice( numbers.indexOf(todo, 1));
        res.json(todo)
    }
}