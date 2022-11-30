"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const customer_1 = __importDefault(require("./customer"));
const UsuarioToken = connection_1.default.define('usuario_token', {
    idUsuarioToken: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'id_usuario_token',
        primaryKey: true,
        autoIncrement: true
    },
    usuarioId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'usuario_id',
        references: {
            model: customer_1.default,
            key: 'id'
        }
    },
    token: { type: sequelize_1.DataTypes.TEXT }
}, {
    name: {
        singular: 'usuario_token',
        plural: 'usuario_token'
    },
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});
exports.default = UsuarioToken;
//# sourceMappingURL=usuario-token.js.map