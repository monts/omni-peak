import { config as envConfig } from 'dotenv'

envConfig()

export const jwtConstants = {
  secret: process.env.AUTH_SECRET,
  expiresIn: process.env.AUTH_EXPIRES_IN,
}
