import { RegisterUserDto, UserEntity, UserRepository, UserDataSource, LoginUserDto } from '../../../domain';


export class UserRepositoryImpl implements UserRepository{


    constructor(
        private readonly datasource: UserDataSource
    ){}

    create(RegisterUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.datasource.create(RegisterUserDto)
    }

    loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.datasource.loginUser(loginUserDto)
    }
    getAll(): Promise<UserEntity[]> {
        return this.datasource.getAll()
    }
    findByEmail(email: string): Promise<UserEntity> {
        return this.datasource.findByEmail(email)
    }
    deleteById(id: number): Promise<UserEntity> {
        return this.datasource.deleteById(id)
    }
    
}