"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const role_1 = __importDefault(require("./role"));
const survey_1 = __importDefault(require("./survey"));
const Customer = connection_1.default.define('customer', {
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'customer_id',
        autoIncrement: true
    },
    customerDocument: {
        type: sequelize_1.DataTypes.STRING(10),
        field: 'customer_document',
        allowNull: false
    },
    customerFirstname: {
        type: sequelize_1.DataTypes.STRING(20),
        field: 'customer_firstname',
        allowNull: false
    },
    customerLastname: {
        type: sequelize_1.DataTypes.STRING(20),
        field: 'customer_lastname',
        allowNull: false
    },
    customerPhone: {
        type: sequelize_1.DataTypes.STRING(20),
        field: 'customer_phone',
        allowNull: false
    },
    customerState: {
        type: sequelize_1.DataTypes.BOOLEAN,
        field: 'customer_state',
        allowNull: false
    },
    /**
     * Foreign KEYS
     */
    roleId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'role_id',
        references: {
            model: role_1.default
        },
        allowNull: false
    },
    surveyId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'survey_id',
        references: {
            model: survey_1.default
        },
        allowNull: false
    },
}, { timestamps: false });
/**
 * Relaciones entre modelos
 */
role_1.default.hasMany(Customer, { foreignKey: 'roleId' });
Customer.belongsTo(role_1.default, { foreignKey: 'roleId' });
survey_1.default.hasMany(Customer, { foreignKey: 'surveyId' });
Customer.belongsTo(survey_1.default, { foreignKey: 'surveyId' });
exports.default = Customer;
//# sourceMappingURL=customer.js.map