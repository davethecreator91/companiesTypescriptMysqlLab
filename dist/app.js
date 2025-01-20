import mysql from 'mysql2/promise';
import dotenv from "dotenv";
import { createPool } from 'mysql2';
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
    const [NewEmployerColumn] = await connection.execute('ALTER TABLE employees ADD COLUMN employer VARCHAR(64)')
    // const [NewEmployers] = await connection.execute('INSERT INTO employees (employer) VALUES (''))
    // const newEmployee
    // console.log(companies, employees );
    // console.log(employeesCount)
    console.log(NewEmployerColumn);

    try {
        const createProcedureSQL = `
    
    DELIMITER $$
    CREATE PROCEDURE add_employee(IN Bill VARCHAR(16))
    BEGIN
        INSERT INTO employees (name,email) VALUES ('Bill', 'bill@yahoo.com');
    END $$
    DELIMITER;
    `;
    await connection.query(createProcedureSQL);
    console.log('Stored procedure created successfully!');
    } catch (err) {
        console.error('Error creating stored procedure:', err);
    } finally {
        await createPool.end();
    }

    createProcedure();

    
    // \df
    // call add_employee('Bill')
    //     )

    await connection.end();
};
connectToDatabase().catch((err) => {
    console.error('Error connecting to the database:', err);
});
//# sourceMappingURL=app.js.map