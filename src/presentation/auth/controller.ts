import { Request, Response } from 'express'
import {
    RegisterUserDto,
    UserRepository,
    CreateUser,
    DeleteUser,
    GetUsersUseCase,
    LoginUserDto,
    LoginUser,
    ValidateEmailUseCase
} from '../../domain'
import { GetUserUseCase } from '../../domain/use-cases/user/get-user';
import { envs } from '../../config';
import { createEmailService } from '../../domain/infrastructure/email/emailServiceFactory';
import { error } from 'console';


export class UsersController {

    constructor(
        private readonly userRepository: UserRepository
    ) { }

    public registerUser = (req: Request, res: Response) => {

        const emailService = createEmailService(envs.MAILER_SERVICE, envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY!)

        const [error, registerUserDto] = RegisterUserDto.create(req.body)

        if (error) return res.status(400).json({ error: error })

        new CreateUser(this.userRepository, emailService)
            .execute(registerUserDto!)
            .then(register => res.json(register))
            .catch(error => res.status(400).json({ error: error.message }))
    }

    public loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body)

        if (error) return res.status(400).json({ error: error })

        new LoginUser(this.userRepository)
            .execute(loginUserDto!)
            .then(login => res.json(login))
            .catch(error => res.status(400).json({ error: error.message }))
    }

    public delete = (req: Request, res: Response) => {

        const id = +req.params.id;

        new DeleteUser(this.userRepository)
            .execute(id)
            .then(deleted => res.json(deleted))
            .catch(error => res.status(400).json({ error: error.message }))

    }

    public getUser = (req: Request, res: Response) => {

        const email = req.params.email

        new GetUserUseCase(this.userRepository)
            .execute(email)
            .then(email => res.json(email))
            .catch(error => res.status(400).json({ error: error.message }))
    }

    public getAll = (req: Request, res: Response) => {

        new GetUsersUseCase(this.userRepository)
            .execute()
            .then(user => res.json(user))
            .catch(error => res.status(400).json({ error: error.message }))
    }

    public validateEmail = (req: Request, res: Response) => {
        const { token } = req.params;

        new ValidateEmailUseCase(this.userRepository)
            .execute(token)
            .then(validated => res.json(validated))
            .catch((error) => res.status(400).json({ error: error.message }));


    }


}