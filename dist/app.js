import mysql from 'mysql2/promise';
import dotenv from "dotenv";
// const mysql = require('mysql');

dotenv.config();

async function connectToDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    console.log('Connected to the Database!');
    const [companies] = await connection.execute('SELECT * FROM companies');
    const [employees] = await connection.execute('SELECT * FROM employees');
    const [employeesCount] = await connection.execute('SELECT COUNT(*) FROM employees');

    // console.log(companies, employees );
    console.log(employeesCount)
    await connection.end();
};
connectToDatabase().catch((err) => {
    console.error('Error connecting to the database:', err);
});
//# sourceMappingURL=app.js.map