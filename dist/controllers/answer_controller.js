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
exports.deleteAllAnswer = exports.addAnswer = exports.getAnswerByQuestionAndCustomer = exports.getAnswerByQuestion = exports.getAnswerByOptionAndQuestion = exports.getAnswerByOption = exports.getAnswerByCustomer = exports.getOneAnswer = exports.getAnswer = void 0;
const answer_1 = __importDefault(require("../models/answer"));
const answer_option_1 = __importDefault(require("../models/answer_option"));
const question_1 = __importDefault(require("../models/question"));
const getAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = yield answer_1.default.findAll({
            include: [
                {
                    model: question_1.default
                }, {
                    model: answer_option_1.default
                }
            ]
        });
        return res.status(200).json({ message: "OK", answer });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getAnswer = getAnswer;
const getOneAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer_id } = req.query;
        let answerId = answer_id;
        const answer = yield answer_1.default.findByPk(answerId);
        if (!answer) {
            return res.status(400).json({ message: "No existe respuesta" });
        }
        return res.status(200).json({ message: "OK", answer });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getOneAnswer = getOneAnswer;
const getAnswerByCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customer_id } = req.query;
        const answerByCustomer = yield answer_1.default.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                //customerId: req.customer.customerId
                customerId: customer_id
            },
            include: [{
                    model: question_1.default,
                    attributes: ["question_content"]
                },
                {
                    model: answer_option_1.default,
                    attributes: ["option_name"]
                }]
        });
        return res.status(200).json({ message: "OK", answerByCustomer });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getAnswerByCustomer = getAnswerByCustomer;
const getAnswerByOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { option_id } = req.query;
        const answerByOption = yield answer_1.default.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                optionId: option_id
            },
            include: [
                {
                    model: answer_option_1.default,
                    attributes: ["option_name"]
                }
            ]
        });
        if (answerByOption.length == 0) {
            return res.status(400).json({ message: "Esta opcion no ha sido seleccionada", answerByOption });
        }
        return res.status(200).json({ message: "OK", answerByOption });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getAnswerByOption = getAnswerByOption;
const getAnswerByOptionAndQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { option_id, question_id } = req.query;
        const answerByOpAndQues = yield answer_1.default.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                optionId: option_id,
                questionId: question_id
            },
            include: [
                {
                    model: answer_option_1.default,
                    attributes: ["option_name"]
                }
            ]
        });
        if (answerByOpAndQues.length == 0) {
            return res.status(400).json({ message: "Esta opcion no ha sido seleccionada", answerByOpAndQues });
        }
        return res.status(200).json({ message: "OK", answerByOpAndQues });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getAnswerByOptionAndQuestion = getAnswerByOptionAndQuestion;
const getAnswerByQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.query;
        const answerByQuestion = yield answer_1.default.findAll({
            order: [["answer_id", "ASC"]],
            where: {
                questionId: question_id
            },
            include: [
                {
                    model: answer_option_1.default,
                    attributes: ["option_name"]
                }
            ]
        });
        if (answerByQuestion.length == 0) {
            return res.status(400).json({ message: "Esta pregunta no tiene respuestas", answerByQuestion });
        }
        return res.status(200).json({ message: "OK", answerByQuestion });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getAnswerByQuestion = getAnswerByQuestion;
const getAnswerByQuestionAndCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.query;
        const answerByQuestionCustomer = yield answer_1.default.findAll({
            where: {
                questionId: question_id,
                customerId: req.customer.customerId
            },
            include: [
                {
                    model: answer_option_1.default,
                    attributes: ["option_name"]
                }
            ]
        });
        if (answerByQuestionCustomer.length == 0) {
            return res.status(400).json({ message: "Esta pregunta no tiene respuestas de este usuario", answerByQuestionCustomer });
        }
        return res.status(200).json({ message: "OK", answerByQuestionCustomer });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getAnswerByQuestionAndCustomer = getAnswerByQuestionAndCustomer;
const addAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { option_id, question_id, } = req.body;
        const answer = yield answer_1.default.create({
            optionId: option_id,
            questionId: question_id,
            customerId: req.customer.customerId
        });
        yield answer.save();
        return res.status(200).json({ message: "OK", answer });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.addAnswer = addAnswer;
const deleteAllAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = yield answer_1.default.destroy({
            truncate: true
        });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
    }
});
exports.deleteAllAnswer = deleteAllAnswer;
//# sourceMappingURL=answer_controller.js.map