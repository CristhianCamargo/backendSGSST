"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../database/connection"));
const survey_1 = __importDefault(require("./survey"));
const Comment = connection_1.default.define('comment', {
    commentId: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        field: 'comment_id',
        autoIncrement: true
    },
    commentContent: {
        type: sequelize_1.DataTypes.STRING(200),
        field: 'comment_content',
        allowNull: true
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
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'update_at'
});
/**
 * Relaciones entre modelos
 */
survey_1.default.hasMany(Comment, { foreignKey: 'surveyId' });
Comment.belongsTo(survey_1.default, { foreignKey: 'surveyId' });
exports.default = Comment;
//# sourceMappingURL=comment.js.map