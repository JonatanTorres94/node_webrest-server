import { JwtGenerator, envs } from "../../../config";
import { EmailService } from "../../infrastructure/email/email.service";
import { RegisterUserDto } from "../../dtos";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";
import fs from 'fs';

const emailVerificationHTMLPath = './src/domain/infrastructure/email/emailVerification.html';

export interface CreateUserUseCase {
    execute(dto:RegisterUserDto) : Promise<UserEntity>
}

export class CreateUser implements CreateUserUseCase {

    constructor(
        private readonly repository: UserRepository,
        private readonly emailService: EmailService
    ){}

    async execute(dto: RegisterUserDto): Promise<UserEntity> {
        await this.sendEmailValidationLink(dto.email)
        return this.repository.create(dto)
    }

    private sendEmailValidationLink = async(email: string) =>{

        const token = await JwtGenerator.generateToken({email})
        if(!token) throw new Error('Error getting token')

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`

        let html = fs.readFileSync(emailVerificationHTMLPath, 'utf8');

        html = html.replace('{{LINK}}', link);

       const options = {
        to: email,
        subject: 'Validate your email',
        htmlBody: html
       }

       const isSet = await this.emailService.sendEmail(options)
       if(!isSet) throw  new Error('Error with send email')

       return true
    }
    
}