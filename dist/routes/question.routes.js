"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const question_controller_1 = require("../controllers/question_controller");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_rol_1 = require("../middlewares/validar-rol");
const router = (0, express_1.Router)();
router.get('/:question_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], question_controller_1.getOneQuestion);
router.get('/survey_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], question_controller_1.getQuestionBySurvey);
router.post('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], question_controller_1.addQuestion);
router.put('/:question_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], question_controller_1.updateQuestion);
router.delete('/:question_id', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], question_controller_1.deleteQuestion);
router.get('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], question_controller_1.getQuestion);
exports.default = router;
//# sourceMappingURL=question.routes.js.map