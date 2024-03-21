import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
export const connection = new Sequelize('cafeteriadb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}