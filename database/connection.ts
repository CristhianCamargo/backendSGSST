/*import { Sequelize } from 'sequelize';

const dataBase = new Sequelize('postgresql://postgres:QqHuOpxQrHsqMNz3FtpG@containers-us-west-100.railway.app:6337/railway');

export default dataBase;
*/

import { Sequelize } from 'sequelize';

const dataBase = new Sequelize('railway', 'postgres', 'QqHuOpxQrHsqMNz3FtpG', {
  host: 'containers-us-west-100.railway.app',
  port: 6337,
  dialect: 'postgres',
  define: { 
    freezeTableName: true }
});

export default dataBase;
