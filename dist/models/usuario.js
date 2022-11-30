"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Usuario = connection_1.default.define('Usuario', {
    idUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'id_usuarios'
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING
    },
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map