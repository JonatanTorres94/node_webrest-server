import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";


export interface GetUserUseCase {
    execute(email: string): Promise<UserEntity>
}

export class GetUserUseCase implements GetUserUseCase {
    constructor(
        private readonly repository: UserRepository
    ){}

    execute(email: string): Promise<UserEntity> {
        return this.repository.findByEmail(email)
    }
}