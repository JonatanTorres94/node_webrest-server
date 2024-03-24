import { regularExps } from "../../../config"


export class RegisterUserDto {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string,
        public readonly profile_img: string
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { name, email, password, profile_img, role } = object

        if (!name) return ['Missing name']
        if (!email) return ['Missing email']
        if (!regularExps.email.test(email)) return ['Email is not valid']
        if (!password) return ['Missing password']
        if (password.length < 8) return ['Password too short']

        

        const finalProfileImg = profile_img || 'URL_profile';
        const finalRole = role || 'class_c';

        return [undefined, new RegisterUserDto(name, email, password, finalRole, finalProfileImg)]
    }
}