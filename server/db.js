import mysql from 'mysql2/promise';

export async function connectDatabase() {
  const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

  if (!MYSQL_HOST || !MYSQL_USER || !MYSQL_DATABASE) {
    return null;
  }

  const pool = mysql.createPool({
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT) || 3306,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD || '',
    database: MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
  });

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(100) NOT NULL DEFAULT '',
        message VARCHAR(2000) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await pool.query('SELECT 1');
    console.log('Connected to MySQL');
    return pool;
  } catch (error) {
    await pool.end();
    console.warn('MySQL connection failed, using in-memory data.', error.message);
    return null;
  }
}