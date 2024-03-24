import { Router } from "express";
import { UsersController } from "./controller";
import { UserDatasourceImpl } from "../../domain/infrastructure/datasource/user.datasource.impl";
import { UserRepositoryImpl } from "../../domain/infrastructure/repositories/user.repository.impl";


export class Authroutes {

    static get routes(): Router{

        const router = Router();

        const datasource = new UserDatasourceImpl

        const userRepository = new UserRepositoryImpl(datasource)

        const usersControler = new UsersController(userRepository);

        router.get('/get-user/:email', usersControler.getUser )

        router.get('/get-users', usersControler.getAll)

        router.post('/register', usersControler.registerUser)

        router.delete('/delete/:id', usersControler.delete)

        router.get('/validate-email/:token', usersControler.validateEmail)

        router.post('/login', usersControler.loginUser)

        return router
    }
}