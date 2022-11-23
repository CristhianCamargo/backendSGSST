import { Sequelize } from 'sequelize';

const dataBase = new Sequelize('bd_sgsst', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  define: { 
    freezeTableName: true }
});

export default dataBase;