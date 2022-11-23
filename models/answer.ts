import { DataTypes } from "sequelize";

import dataBase from "../database/connection";
import AnswerOption from "./answer_option";
import Customer from "./customer";
import Question from "./question";
import Survey from "./survey";

const Answer = dataBase.define(
    "answer",
    {
        answerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "answer_id",
        },
        /**
         * Foreign KEYS
         */
        optionId: {
            type: DataTypes.INTEGER,
            field: 'option_id',
            references: {
                model: AnswerOption
            },
            allowNull: false
        },
        questionId: {
            type: DataTypes.INTEGER,
            field: 'question_id',
            references: {
                model: Question
            },
            allowNull: false
        },
        customerId: {
            type: DataTypes.INTEGER,
            field: 'customer_id',
            references: {
                model: Customer
            },
            allowNull: false
        },
    },
    {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "update_at",
    },

);

/**
 * Relaciones entre clases
 */

AnswerOption.hasMany(Answer, { foreignKey: 'optionId' });
Answer.belongsTo(AnswerOption, { foreignKey: 'optionId' });

Question.hasMany(Answer, { foreignKey: 'questionId' });
Answer.belongsTo(Question, { foreignKey: 'questionId' });

Customer.hasMany(Answer, { foreignKey: 'customerId'});
Answer.belongsTo(Customer, {foreignKey: 'customerId'});

export default Answer;