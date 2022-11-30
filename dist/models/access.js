"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const customer_1 = __importDefault(require("./customer"));
const Access = connection_1.default.define("access", {
    accessEmail: {
        type: sequelize_1.DataTypes.STRING(100),
        field: "access_email",
        allowNull: false,
    },
    accessPass: {
        type: sequelize_1.DataTypes.STRING(100),
        field: "access_pass",
        allowNull: false,
    },
    /**
     * Foreign KEYS
     */
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'customer_id',
        references: {
            model: customer_1.default
        },
        allowNull: false
    }
}, {
    timestamps: false,
});
/**
 * Relaciones
 */
customer_1.default.hasOne(Access, { foreignKey: 'customerId' });
Access.belongsTo(customer_1.default, { foreignKey: 'customerId' });
exports.default = Access;
//# sourceMappingURL=access.js.map