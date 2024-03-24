import { prisma } from '../../../data/sqlserver';
import {CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto} from '../../../domain'


export class TodoDatasourceImpl implements TodoDataSource
{
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.qatodo.create({
            data: createTodoDto 
        })
                          
        return TodoEntity.fromObject(todo)
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.qatodo.findMany()
        return todos.map(todo => TodoEntity.fromObject(todo))
    }

    async findById(id: number): Promise<TodoEntity> {

        const todo = await prisma.qatodo.findUnique({ where: { id } });
        
        if(!todo) throw new Error (`TODO with id ${id} not found`);
        return TodoEntity.fromObject(todo)

    }


    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {

        await this.findById(updateTodoDto.id)

        const updatedTodo = await prisma.qatodo.update({
            where: {id: updateTodoDto.id},
            data: updateTodoDto!.values
        })

        return TodoEntity.fromObject(updatedTodo)
        
    }


    async deleteById(id: number): Promise<TodoEntity> {
        
        const todo = await this.findById(id);
    
        if(!todo) throw new Error (`TODO with id ${id} not found`);
    
        const deleted = await prisma.qatodo.delete({
            where: { id }
        });
    
        return TodoEntity.fromObject(deleted);
    }
    

}