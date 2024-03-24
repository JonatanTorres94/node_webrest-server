import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";



export interface CreateUserUseCase {
    execute(dto:RegisterUserDto) : Promise<UserEntity>
}

export class CreateUser implements CreateUserUseCase {

    constructor(
        private readonly repository: UserRepository
    ){}

    execute(dto: RegisterUserDto): Promise<UserEntity> {
        return this.repository.create(dto)
    }
    
}