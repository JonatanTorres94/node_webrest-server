import 'dotenv/config'
import {get} from 'env-var'


export const envs = {
    
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),

    JWT_SEED: get('JWT_SEED').required().asString(),

    SA_PASSWORD: get('SA_PASSWORD').required().asString(),

    MAILER_SERVICE: get('MAILER_SERVICE').required().asString(),

    MAILER_EMAIL: get('MAILER_EMAIL').required().asString(),

    MAILER_SECRET_KEY: get('MAILER_SECRET_KEY').asString(),

    DATABASE_URL: get('DATABASE_URL').required(),

    WEBSERVICE_URL: get('WEBSERVICE_URL').required().asString()
    
}