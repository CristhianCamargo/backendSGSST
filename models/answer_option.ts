import { DataTypes } from "sequelize";
import dataBase from "../database/connection";

const AnswerOption = dataBase.define('answer_option', {
    optionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'option_id',
        autoIncrement: true
    },
    optionName: {
        type: DataTypes.STRING(20),
        field: 'option_name',
        allowNull: false 
    },
},
    { timestamps: false }
);

export default AnswerOption;