import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


export interface ValidateEmailUseCase {
    execute(token: string): Promise<UserEntity>
}

export class ValidateEmailUseCase implements ValidateEmailUseCase {
    constructor(
        private readonly repository: UserRepository
    ){}

    execute(tolken: string): Promise<UserEntity> {
        return this.repository.validateEmail(tolken)
    }
}