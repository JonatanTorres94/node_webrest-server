import { CreateTodoDto, UpdateTodoDto } from '../dtos';
import { TodoEntity } from '../entities/todo.entity';


export abstract class TodoDataSource {


    abstract create(CreateTodoDto: CreateTodoDto): Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id: number): Promise<TodoEntity>;

    abstract updateById(UpdateTodoDto: UpdateTodoDto): Promise <TodoEntity>;

    abstract deleteById(id: number): Promise<TodoEntity>
}