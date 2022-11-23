import { DataTypes } from "sequelize";
import dataBase from "../database/connection";

const Survey = dataBase.define('survey', {
    surveyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'survey_id',
        autoIncrement: true
    },
    surveyName: {
        type: DataTypes.STRING(70),
        field: 'survey_name',
        allowNull: false
    },
    surveyState: {
        type: DataTypes.BOOLEAN,
        field: 'survey_state',
        allowNull: false
    }
},
{timestamps: false}
);

export default Survey;