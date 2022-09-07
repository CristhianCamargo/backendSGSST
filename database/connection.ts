import { Sequelize } from 'sequelize';

const dataBase = new Sequelize( 'database_name', 'username', 'password', {
  host: 'ip',
  dialect: 'mysql'
} );

export default dataBase;