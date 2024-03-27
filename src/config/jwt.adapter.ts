import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED

export class JwtGenerator{


    static async generateToken(payload: any, duration: string='90000'){
        
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, {expiresIn: duration}, (error, token) =>{
                if(error) return resolve(null);

                resolve(token)
            })
        })

    }

    static validateToken(token:string){
        return new Promise((resolve)=>{
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if(err) return resolve(null)

                resolve(decoded)
            })
        })
    }

} 