"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Role = connection_1.default.define('role', {
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'role_id',
        autoIncrement: true
    },
    roleName: {
        type: sequelize_1.DataTypes.STRING(30),
        field: 'role_name',
        allowNull: false
    },
}, { timestamps: false });
exports.default = Role;
//# sourceMappingURL=rol.js.map