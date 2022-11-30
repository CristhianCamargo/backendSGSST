"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.addQuestion = exports.getQuestionBySurvey = exports.getOneQuestion = exports.getQuestion = void 0;
const sequelize_1 = require("sequelize");
const question_1 = __importDefault(require("../models/question"));
const getQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield question_1.default.findAll({
            order: [["question_id", "ASC"]]
        });
        return res.status(200).json({ message: "OK", question });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getQuestion = getQuestion;
const getOneQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.params;
        const question = yield question_1.default.findByPk(question_id);
        if (!question) {
            return res.status(404).json({ message: "Pregunta no encontrada" });
        }
        return res.status(200).json({ message: "OK", question });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrion un error" });
    }
});
exports.getOneQuestion = getOneQuestion;
const getQuestionBySurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { survey_id } = req.query;
        const question = yield question_1.default.findAll({
            where: {
                surveyId: survey_id
            }
        });
        return res.status(200).json({ message: "OK", question });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getQuestionBySurvey = getQuestionBySurvey;
const addQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { survey_id, question_content } = req.body;
        const questionValidate = yield question_1.default.findOne({
            where: {
                questionContent: question_content
            }
        });
        if (questionValidate) {
            return res.status(500).json({ message: "Esta pregunta ya existe" });
        }
        const resQuestions = yield question_1.default.create({
            surveyId: survey_id,
            questionContent: question_content
        });
        return res.status(200).json({ message: "OK", resQuestions });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
});
exports.addQuestion = addQuestion;
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.params;
        const { survey_id, question_content } = req.body;
        const questionData = yield question_1.default.findByPk(question_id);
        if (survey_id !== "") {
            questionData.surveyId = 1;
        }
        if (question_content !== "") {
            const questionValidate = yield question_1.default.findAll({
                where: {
                    [sequelize_1.Op.and]: [
                        { question_content },
                        {
                            question_id: {
                                [sequelize_1.Op.ne]: question_id
                            }
                        }
                    ]
                }
            });
            if (questionValidate.length > 0) {
                return res.status(400).json({ ok: false, message: "Esta pregunta ya existe" });
            }
            questionData.questionContent = question_content;
        }
        yield questionData.save();
        return res.status(200).json({ message: "OK", questionData });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
});
exports.updateQuestion = updateQuestion;
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.params;
        const question = yield question_1.default.findOne({
            where: {
                question_id
            }
        });
        if (!question) {
            return res.status(400).json({ message: "Esta intentando borrar una pregunta que no existe" });
        }
        yield question_1.default.destroy({
            where: {
                question_id
            }
        });
        return res.status(200).json({ message: "OK", question });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.deleteQuestion = deleteQuestion;
//# sourceMappingURL=question_controller.js.map