import sql from 'mssql'
import dotenv from 'dotenv'
import process from 'node:process'

dotenv.config()

const config = {
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  server: process.env.SERVER,
  database: process.env.DATABASE,
  pool: {
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
}

export async function InsertUser(userIP) {
  try {
    const pool = await sql.connect(config)
    const query = await pool
      .request()
      .input('UserIP', sql.VarChar, userIP)
      .query('INSERT INTO PHISHING_TEST(UserIP) Values(@UserIP)')
    console.log(query)
  } catch (error) {
    console.error(`Error en la consulta ${error}`)
  } finally {
    sql.close()
  }
}
