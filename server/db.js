import mysql from 'mysql2/promise';

export async function connectDatabase() {
  const host = process.env.DB_HOST || process.env.MYSQL_HOST;
  const port = process.env.DB_PORT || process.env.MYSQL_PORT || 3306;
  const user = process.env.DB_USER || process.env.MYSQL_USER;
  const password = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD;
  const database = process.env.DB_NAME || process.env.MYSQL_DATABASE;

  if (!host || !user || !database) {
    console.warn('MySQL is not configured; using in-memory data. Copy .env.example to .env and set DB_* values.');
    return null;
  }

  try {
    const adminConnection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    const safeDatabase = database.replaceAll('`', '``');
    await adminConnection.query(`CREATE DATABASE IF NOT EXISTS \`${safeDatabase}\``);
    await adminConnection.end();

    const pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
    });

    await pool.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(100) NOT NULL DEFAULT '',
        message VARCHAR(2000) NOT NULL,
        attachment_name VARCHAR(255) NOT NULL DEFAULT '',
        attachment_path VARCHAR(500) NOT NULL DEFAULT '',
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);
    const [columns] = await pool.query(
      `SELECT COLUMN_NAME
       FROM information_schema.COLUMNS
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'contacts'`,
    );
    const columnNames = new Set(columns.map((column) => column.COLUMN_NAME));
    if (!columnNames.has('attachment_name')) {
      await pool.query('ALTER TABLE contacts ADD COLUMN attachment_name VARCHAR(255) NOT NULL DEFAULT ""');
    }
    if (!columnNames.has('attachment_path')) {
      await pool.query('ALTER TABLE contacts ADD COLUMN attachment_path VARCHAR(500) NOT NULL DEFAULT ""');
    }
    await pool.query('SELECT 1');
    console.log('Connected to MySQL');
    return pool;
  } catch (error) {
    console.warn('MySQL connection failed, using in-memory data.', error.message);
    return null;
  }
}