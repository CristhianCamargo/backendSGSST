"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const AnswerOption = connection_1.default.define('answer_option', {
    optionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'option_id',
        autoIncrement: true
    },
    optionName: {
        type: sequelize_1.DataTypes.STRING(20),
        field: 'option_name',
        allowNull: false
    },
}, { timestamps: false });
exports.default = AnswerOption;
//# sourceMappingURL=answer_option.js.map