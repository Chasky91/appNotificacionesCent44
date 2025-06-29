import dotenv from 'dotenv'
dotenv.config()

export const config = {
  host: process.env.HOST,
  port: process.env.PORT,
  user: 'root',
  password: process.env.DB_PASS,
  database: 'cent_44',
}