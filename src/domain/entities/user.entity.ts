
export class UserEntity {

    constructor(

        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly email_validated: boolean,
        public readonly profile_img: string,
        public readonly role: string[],
        public readonly password?: string,
        public readonly token?: string
    ){}

    static fromObjet( object: {[key:string]: any} ){

        const {id,_id, name, email, email_validated,password,profile_img,role } = object;

        if (!_id && !id) throw new Error('Missing id')

        if (!name) throw new Error('Missing Name')
        
        // Verificar si falta el email
        if (!email) throw new Error('Missing Email');

        // Verificar si falta el password
        if (!password) throw new Error('Missing Password');

        const userEntity = new UserEntity(id || _id,name,email,email_validated,profile_img,role,password)


        return userEntity

    }


}