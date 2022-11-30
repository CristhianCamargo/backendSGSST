"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const Survey = connection_1.default.define('survey', {
    surveyId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'survey_id',
        autoIncrement: true
    },
    surveyName: {
        type: sequelize_1.DataTypes.STRING(70),
        field: 'survey_name',
        allowNull: false
    },
    surveyState: {
        type: sequelize_1.DataTypes.BOOLEAN,
        field: 'survey_state',
        allowNull: false
    }
}, { timestamps: false });
exports.default = Survey;
//# sourceMappingURL=survey.js.map