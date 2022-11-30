"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const answer_controller_1 = require("../controllers/answer_controller");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const validar_rol_1 = require("../middlewares/validar-rol");
const router = (0, express_1.Router)();
router.get('/answerId', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], answer_controller_1.getOneAnswer);
router.get('/customer', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], answer_controller_1.getAnswerByCustomer);
router.get('/option', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], answer_controller_1.getAnswerByOption);
router.get('/quesOption', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], answer_controller_1.getAnswerByOptionAndQuestion);
router.get('/quesCustomer', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], answer_controller_1.getAnswerByQuestionAndCustomer);
router.get('/question', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], answer_controller_1.getAnswerByQuestion);
router.post('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], answer_controller_1.addAnswer);
router.delete('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1)], answer_controller_1.deleteAllAnswer);
router.get('/', [validar_jwt_1.validateJWT, (0, validar_rol_1.validateRole)(1, 2)], answer_controller_1.getAnswer);
exports.default = router;
//# sourceMappingURL=answer.routes.js.map