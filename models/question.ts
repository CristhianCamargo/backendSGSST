import { DataTypes } from "sequelize";
import dataBase from "../database/connection";
import Survey from "./survey";

const Question = dataBase.define('question',{
    questionId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'question_id',
        autoIncrement: true
    },
    questionContent: {
        type: DataTypes.STRING,
        field: 'question_content',
        allowNull: false
    },
    /**
     * Foreign KEYS
     */

     surveyId: {
        type: DataTypes.INTEGER,
        field: 'survey_id',
        references: {
          model: Survey
        },
        allowNull: false
      },
},
{timestamps:false});

/**
 * Relaciones entre modelos
 */

 Survey.hasMany(Question, { foreignKey: 'surveyId' });
 Question.belongsTo(Survey, { foreignKey: 'surveyId' });

export default Question;