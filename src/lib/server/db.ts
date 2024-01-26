import { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD } from '$env/static/private';
import mysql, { type Pool } from 'mysql2/promise';

function getPoolConnection(){
  try {
    const pool:Pool= mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      database: DB_NAME,
      password: DB_PASSWORD,
      ssl: 'Amazon RDS',
    });

    const connection = async () => await pool.getConnection();
    return connection
  } catch (err) {
    return null
  }
}

export const connection =  getPoolConnection()



