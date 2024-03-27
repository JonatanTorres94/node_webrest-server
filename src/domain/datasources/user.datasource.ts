import { RegisterUserDto,LoginUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';


export abstract class UserDataSource {


    abstract create(RegisterUserDto: RegisterUserDto): Promise<UserEntity>;

    abstract getAll(): Promise<UserEntity[]>;

    abstract findByEmail(email: string): Promise<UserEntity>;

    abstract deleteById(id: number): Promise<UserEntity>

    abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;

    abstract validateEmail(token:string): Promise<UserEntity>
}