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
exports.deleteAllComment = exports.deleteComment = exports.addComment = exports.getOneComment = exports.getComment = void 0;
const comment_1 = __importDefault(require("../models/comment"));
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comment_1.default.findAll();
        return res.status(200).json({ message: "OK", comment });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ ok: false, msg: "Ocurrio un error" });
    }
});
exports.getComment = getComment;
const getOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_id } = req.params;
        const comment = yield comment_1.default.findByPk(comment_id);
        if (!comment) {
            return res.status(404).json({ message: "Este comentario no existe" });
        }
        return res.status(200).json({ message: "OK", comment });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
});
exports.getOneComment = getOneComment;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { survey_id, comment_content } = req.body;
        const comment = yield comment_1.default.create({
            surveyId: survey_id,
            commentContent: comment_content
        });
        return res.status(200).json({ message: "OK", comment });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
});
exports.addComment = addComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_id } = req.params;
        const comment = yield comment_1.default.destroy({
            where: {
                comment_id
            }
        });
        if (!comment) {
            return res.status(404).json({ message: "Esta intentando eliminar un comentario que no existe" });
        }
        return res.status(200).json({ message: "OK", comment });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
});
exports.deleteComment = deleteComment;
const deleteAllComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield comment_1.default.destroy({
            truncate: true
        });
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log("😪error:", error);
        return res.status(500).json({ message: "Ocurrio un error" });
    }
});
exports.deleteAllComment = deleteAllComment;
//# sourceMappingURL=comment_controller.js.map