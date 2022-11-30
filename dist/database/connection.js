"use strict";
/*import { Sequelize } from 'sequelize';

const dataBase = new Sequelize('postgresql://postgres:QqHuOpxQrHsqMNz3FtpG@containers-us-west-100.railway.app:6337/railway');

export default dataBase;
*/
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dataBase = new sequelize_1.Sequelize('railway', 'postgres', 'QqHuOpxQrHsqMNz3FtpG', {
    host: 'containers-us-west-100.railway.app',
    port: 6337,
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});
exports.default = dataBase;
//# sourceMappingURL=connection.js.map