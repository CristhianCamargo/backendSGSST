"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const survey_1 = __importDefault(require("./survey"));
const Question = connection_1.default.define('question', {
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'question_id',
        autoIncrement: true
    },
    questionContent: {
        type: sequelize_1.DataTypes.STRING,
        field: 'question_content',
        allowNull: false
    },
    /**
     * Foreign KEYS
     */
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
survey_1.default.hasMany(Question, { foreignKey: 'surveyId' });
Question.belongsTo(survey_1.default, { foreignKey: 'surveyId' });
exports.default = Question;
//# sourceMappingURL=question.js.map