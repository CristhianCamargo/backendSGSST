"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dataBase = new sequelize_1.Sequelize('bd_sgsst', 'postgres', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freezeTableName: true
    }
});
exports.default = dataBase;
//# sourceMappingURL=connection.js.map