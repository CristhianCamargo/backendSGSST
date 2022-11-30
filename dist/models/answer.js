"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const answer_option_1 = __importDefault(require("./answer_option"));
const customer_1 = __importDefault(require("./customer"));
const question_1 = __importDefault(require("./question"));
const Answer = connection_1.default.define("answer", {
    answerId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "answer_id",
    },
    /**
     * Foreign KEYS
     */
    optionId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'option_id',
        references: {
            model: answer_option_1.default
        },
        allowNull: false
    },
    questionId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'question_id',
        references: {
            model: question_1.default
        },
        allowNull: false
    },
    customerId: {
        type: sequelize_1.DataTypes.INTEGER,
        field: 'customer_id',
        references: {
            model: customer_1.default
        },
        allowNull: false
    },
}, {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "update_at",
});
/**
 * Relaciones entre clases
 */
answer_option_1.default.hasMany(Answer, { foreignKey: 'optionId' });
Answer.belongsTo(answer_option_1.default, { foreignKey: 'optionId' });
question_1.default.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(question_1.default, { foreignKey: 'questionId' });
customer_1.default.hasMany(Answer, { foreignKey: 'customerId' });
Answer.belongsTo(customer_1.default, { foreignKey: 'customerId' });
exports.default = Answer;
//# sourceMappingURL=answer.js.map