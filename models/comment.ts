import { DataTypes } from "sequelize";
import dataBase from "../database/connection";
import Survey from "./survey";

const Comment = dataBase.define('comment', {
    commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: 'comment_id',
        autoIncrement: true
    },
    commentContent: {
        type: DataTypes.STRING(200),
        field: 'comment_content',
        allowNull: true
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

    }

},
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'update_at'
    }
);

/**
 * Relaciones entre modelos
 */

Survey.hasMany(Comment, { foreignKey: 'surveyId' });
Comment.belongsTo(Survey, { foreignKey: 'surveyId' });

export default Comment;