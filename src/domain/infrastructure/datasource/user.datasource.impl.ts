import { JwtGenerator, bcryptAdapter } from '../../../config';
import { prisma } from '../../../data/sqlserver';
import { RegisterUserDto, UserEntity, UserDataSource, LoginUserDto } from '../../../domain'

export class UserDatasourceImpl implements UserDataSource {

    async create(registerUserDto: RegisterUserDto): Promise<UserEntity> {

        //Encriptar password
        const hashedPassword = bcryptAdapter.hash(registerUserDto.password)

        // Verificar si ya existe un usuario con el correo electrónico proporcionado
        const existingUser = await prisma.users_lotery.findUnique({ where: { email: registerUserDto.email } });
        if (existingUser) {
            throw new Error(`User with email ${registerUserDto.email} already exists`);
        }

        // Crear el usuario si no existe
        const user = await prisma.users_lotery.create({
            data: { ...registerUserDto, password: hashedPassword }
        });

        return UserEntity.fromObjet(user);
    }
    async getAll(): Promise<UserEntity[]> {
        const users = await prisma.users_lotery.findMany()
        return users.map(user => UserEntity.fromObjet(user))
    }

    async findByEmail(email: string): Promise<UserEntity> {
        const user = await prisma.users_lotery.findUnique({ where: { email } })

        if (!user) throw new Error(`User with email ${email} not found`);

        const {password, ...userwithoutpassword} = UserEntity.fromObjet(user);

        return userwithoutpassword
    }

    async deleteById(id: number): Promise<UserEntity> {

        const user = await prisma.users_lotery.findUnique({ where: { id } })

        if (!user) throw new Error(`User with Id ${id} not found`)

        const deleted = await prisma.users_lotery.delete({ where: { id } })

        return UserEntity.fromObjet(deleted)

    }

    async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await prisma.users_lotery.findUnique({ where: { email: loginUserDto.email } });
        if (!user) throw new Error('Email not exist');
    
        const isMatching = bcryptAdapter.compare(loginUserDto.password, user.password);
        if (!isMatching) throw new Error('Password is not valid');
    
        const {password, ...userwithoutpassword} = UserEntity.fromObjet(user);
    
        // Generar el token
        const token = await JwtGenerator.generateToken({id: user.id})
        if (!token) throw new Error('Token Null')


        return {
            ...userwithoutpassword,
            token: token as string
        }
    }

}